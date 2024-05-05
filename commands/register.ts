import { SlashCommandBuilder } from "discord.js";
import { Command } from "../types";
import { getDuoData } from "../duolingo";
import { DB } from "../data";

const command: Command = {
    data: new SlashCommandBuilder()
        .setName("register")
        .setDescription("Register your duo!")
        .addStringOption((option) =>
            option
                .setName("duo")
                .setDescription("The user id of your duolingo account.")
                .setRequired(true)
        ),
    async execute(interaction) {
        // Get the user's id
        const userId = interaction.user.id;
        // Get the duo's id
        const duoId = interaction.options.getString("duo")!;
        // Check duolingo api
        try {
            const duoData = await getDuoData(duoId);
            const db = await DB();
            // Save the duo's id
            // Save the discord's id
            db.addUser(userId, {
                duoData: {
                    id: duoId,
                },
            });

            interaction.reply({
                content: `Registered ${duoData.username} with id ${duoData.id}!\nYou have a streak of ${duoData.streakData.currentStreak.length} days!`,
            });
        } catch (e) {
            if (interaction.isRepliable())
                interaction.reply("Could not register your duolingo account!");
        }
    },
};

export default command;
