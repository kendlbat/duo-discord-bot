import Discord, { Routes } from "discord.js";
import path from "node:path";
import fs from "node:fs";
import dotenv from "dotenv";

import type { CommandsType } from "./types";
import { logger } from "./logger";
import {
    getAllCachedUserData,
    getAllUserData,
    hasDoneDuolingoToday,
} from "./duolingo";
import { DB } from "./data";

dotenv.config();

const token = process.env.DISCORD_TOKEN!;
const guildid = process.env.DISCORD_GUILD_ID!;
const clientId = process.env.DISCORD_CLIENT_ID!;
const reminderChannelid = process.env.DISCORD_REMINDER_CHANNEL_ID!;

const rest = new Discord.REST().setToken(token);

async function getCommands() {
    const commands: any[] = [];
    // Grab all the command folders from the commands directory you created earlier
    const foldersPath = path.join(__dirname, "commands");
    const commandFolders = fs.readdirSync(foldersPath);

    // Grab all the command files from the commands directory you created earlier
    const commandsPath = foldersPath;
    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith(".ts"));
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = (await import(filePath)).default;
        if ("data" in command && "execute" in command) {
            commands.push(command);
        } else {
            console.log(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
            );
        }
    }

    return commands;
}

async function registerCommands(commands: CommandsType) {
    const data = await rest.put(
        Routes.applicationGuildCommands(clientId, guildid),
        {
            body: Object.values(commands).map((command) =>
                command.data.toJSON()
            ),
        }
    );
}

export const discordMain = async () => {
    const client = new Discord.Client({
        intents: ["Guilds", "GuildMessages"],
    });

    let commandsList = await getCommands();
    const commands: CommandsType = {};
    for (const command of commandsList) {
        commands[command.data.name] = command;
    }

    client.on(
        Discord.Events.InteractionCreate,
        async (interaction: Discord.Interaction) => {
            if (!interaction.isChatInputCommand()) return;

            const command = commands[interaction.commandName];
            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred)
                    await interaction.followUp(
                        "There was an error while executing this command!"
                    );
                else
                    await interaction.reply(
                        "There was an error while executing this command!"
                    );
            }
        }
    );

    client.once("ready", () => {
        logger.info("Discord bot is ready!");
        registerCommands(commands);

        // Every two hours after 2pm UTC, check who has not done their duolingo lessons for today.
        const checkTime = 0;
        const reminderFunc = async () => {
            const now = new Date();
            if (now.getUTCHours() < checkTime) return;

            const db = await DB();

            const lastCheckFuncRun = await db.client.get("lastReminderFuncRun");
            // If the last check function run was less than 1 hour ago, don't run it again
            if (lastCheckFuncRun) {
                const lastCheckFuncRunDate = new Date(lastCheckFuncRun);
                const now = new Date();
                const diff = now.getTime() - lastCheckFuncRunDate.getTime();
                if (diff < 1000 * 60 * 60 * 1.9) return;
            }

            await db.client.set(
                "lastReminderFuncRun",
                new Date().toISOString()
            );

            logger.debug(
                "Hourly checking for users who have not done their Duolingo lessons today."
            );

            const users = (await getAllUserData()).filter(
                (user) =>
                    !hasDoneDuolingoToday(user.duo.streakData.currentStreak)
            );

            if (users.length === 0) return;

            const channel = client.channels.cache.get(reminderChannelid);
            if (!channel) return;
            if (!channel.isTextBased()) return;

            const remainingLocalTime = 24 - now.getHours();

            const message = `These users
${users.map((user) => `<@${user.id}>`).join("\n")}
have not done their Duolingo lessons today! There are ${remainingLocalTime} hours left to do them! :owl::knife:`;

            channel.send(message);
        };

        // This function handles creating "events" from updated duolingo data
        const checkFunc = async () => {
            (async () => {
                // This checks for streak extensions
                const prev = Object.fromEntries(
                    Object.entries(await getAllCachedUserData()).filter(
                        ([key, value]) =>
                            !hasDoneDuolingoToday(
                                value.duo.streakData.currentStreak
                            )
                    )
                );

                const now = await getAllUserData(Object.keys(prev));

                logger.debug(JSON.stringify(prev));

                const updated = now.filter(
                    (user) =>
                        prev[user.id]?.duo &&
                        user?.duo &&
                        !hasDoneDuolingoToday(
                            prev[user.id].duo.streakData.currentStreak
                        ) &&
                        hasDoneDuolingoToday(user.duo.streakData.currentStreak)
                );

                if (updated.length === 0) return;

                logger.info(`Streak extensions: ${updated.map((u) => u.id)}`);

                const channel = client.channels.cache.get(reminderChannelid);
                if (!channel) return;
                if (!channel.isTextBased()) return;

                if (updated.length == 1) {
                    channel.send(
                        `Congratulations <@${updated[0].id}>! You have extended your Duolingo streak! :tada:`
                    );
                } else {
                    channel.send(
                        `Congratulations to these users: ${updated
                            .map((user) => `<@${user.id}>`)
                            .join(
                                ", "
                            )}! You have extended your Duolingo streak! :tada:`
                    );
                }
            })();
        };

        setInterval(reminderFunc, 1000 * 60 * 60 * 2);
        setInterval(checkFunc, 1000 * 60 * 5);
        reminderFunc();
        checkFunc();
    });

    logger.debug(`Discord commands: ${Object.keys(commands).join(", ")}`);

    logger.info("Logging into Discord...");
    client.login(token);
};
