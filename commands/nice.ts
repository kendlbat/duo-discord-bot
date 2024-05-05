import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../types";
import { getAllUserData, hasDoneDuolingoToday } from "../duolingo";

const command: Command = {
    data: new SlashCommandBuilder()
        .setName("nice")
        .setDescription(
            "List of people who have done their lessons for today."
        ),
    async execute(interaction) {
        const duoData = await getAllUserData();

        const users = duoData.filter((user) =>
            hasDoneDuolingoToday(user.duo.streakData.currentStreak)
        );

        if (users.length === 0) {
            interaction.reply(
                "No one has done their lessons today! Duo is very angry! :owl::knife:"
            );
            return;
        }

        const embed = new EmbedBuilder()
            .setColor("#00ff44")
            .setTitle("Nice List")
            .setDescription(users.map((user) => `<@${user.id}>`).join("\n"))
            .setFooter({
                text: "Good job!",
            });
        interaction.reply({ embeds: [embed] });
    },
};

export default command;
