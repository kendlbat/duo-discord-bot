import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../types";
import { getAllUserData, hasDoneDuolingoToday } from "../duolingo";

const funnyQuotes = [
    "Spanish or vanish!",
    "No lessons, no life!",
    "Duo is watching you!",
    "French or the trench!",
];

const command: Command = {
    data: new SlashCommandBuilder()
        .setName("naughty")
        .setDescription(
            "List of people who have not done their lessons for today."
        ),
    async execute(interaction) {
        const duoData = await getAllUserData();

        const users = duoData.filter(
            (user) => !hasDoneDuolingoToday(user.duo.streakData.currentStreak)
        );

        if (users.length === 0) {
            const embed = new EmbedBuilder()
                .setColor("#00ff00")
                .setTitle("Everyone has done their Duolingo lessons today!")
                .setFooter({
                    text: funnyQuotes[
                        Math.floor(Math.random() * funnyQuotes.length)
                    ],
                });

            interaction.reply({ embeds: [embed] });
            return;
        }

        const embed = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Kill List")
            .setDescription(users.map((user) => `<@${user.id}>`).join("\n"))
            .setFooter({
                text: funnyQuotes[
                    Math.floor(Math.random() * funnyQuotes.length)
                ],
            });

        interaction.reply({ embeds: [embed] });
    },
};

export default command;
