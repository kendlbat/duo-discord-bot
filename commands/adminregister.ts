import { SlashCommandBuilder } from "discord.js";
import { Command } from "../types";
import { DB } from "../data";

const command: Command = {
    data: new SlashCommandBuilder()
        .setName("adminregister")
        .setDescription("Register a user's duo!")
        .setDefaultMemberPermissions("0")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to register.")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("duo")
                .setDescription("The user id of the duolingo account.")
                .setRequired(true)
        ),
    async execute(interaction) {
        // Get the user's id
        const userId = interaction.options.getUser("user")!.id;
        // Get the duo's id
        const duoId = interaction.options.getString("duo")!;
        // Check duolingo api
        try {
            const db = await DB();
            // Save the duo's id
            // Save the discord's id
            db.addUser(userId, {
                duoData: {
                    id: duoId,
                },
            });

            interaction.reply({
                content: `Registered ${userId} with id ${duoId}!`,
            });
        } catch (e) {
            if (interaction.isRepliable())
                interaction.reply(
                    "Could not register the user's duolingo account!"
                );
        }
    },
};

export default command;
