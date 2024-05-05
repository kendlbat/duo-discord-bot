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
import createFuncs from "./intervalFuncs";

dotenv.config();

const token = process.env.DISCORD_TOKEN!;
const guildid = process.env.DISCORD_GUILD_ID!;
const clientId = process.env.DISCORD_CLIENT_ID!;

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

        // Every two hours after 2pm UTC, check who has not done their duolingo lessons for today

        const { reminderFunc, checkFunc } = createFuncs(client);

        setInterval(reminderFunc, 1000 * 60 * 60 * 2);
        setInterval(checkFunc, 1000 * 60 * 5);
        reminderFunc();
        checkFunc();
    });

    logger.debug(`Discord commands: ${Object.keys(commands).join(", ")}`);

    logger.info("Logging into Discord...");
    client.login(token);
};
