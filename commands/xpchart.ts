import { SlashCommandBuilder } from "discord.js";
import { Command } from "../types";
import { getXpSummaries } from "../duolingo";
import { DB } from "../data";
import { createSingleUserChart } from "../charts";

const command: Command = {
    data: new SlashCommandBuilder()
        .setName("xpchart")
        .setDescription("Show a chart of XP progress.")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription(
                    "The user to show the chart for. (Defaults to you)"
                )
        ),

    async execute(interaction) {
        const user = interaction.options.getUser("user") || interaction.user;

        const db = await DB();
        const duoData = (await db.getUser(user.id))?.duoData;

        if (!duoData?.id) {
            await interaction.reply({
                content: "No data found for this user.",
                ephemeral: true,
            });
            return;
        }

        const data = await getXpSummaries(duoData.id);

        const chart = await createSingleUserChart(data);

        await interaction.reply({
            files: [
                {
                    attachment: chart,
                    name: "chart.png",
                },
            ],
        });
    },
};

export default command;
