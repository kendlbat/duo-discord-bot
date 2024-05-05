import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command, DuoApiResponse } from "../types";
import { DB } from "../data";
import { calcStreakFreezes, getAllUserData, getDuoData } from "../duolingo";

const command: Command = {
    data: new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription("Get the leaderboard!"),
    async execute(interaction) {
        const duoData = await getAllUserData();
        const sortedData = duoData
            .sort(
                (a, b) =>
                    b.duo.streakData.currentStreak.length -
                    a.duo.streakData.currentStreak.length
            )
            .slice(0, 10);

        const embed = new EmbedBuilder()
            .setColor("#58cc02")
            .setTitle("Leaderboard")
            .setAuthor({
                name: "Duolingo Streak Leaderboard",
                iconURL:
                    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Freeoo.qiniudn.com%2FDuolingo-icon.png!icon512&f=1&nofb=1&ipt=db742292abf71538b451da860a08675d975171bf0aa1317df53a9df8f3976208&ipo=images",
            })
            .addFields(
                sortedData.map((data, index) => ({
                    name: `${index + 1}. ${
                        data.duo.streakData.currentStreak.length
                    } days`,
                    value: `<@!${data.id}>\n${calcStreakFreezes(
                        data.duo.streakData.currentStreak
                    )} freezes`,
                    inline: false,
                }))
            )
            .setFooter({
                text: "Duo Bot by kendlbat",
            });

        interaction.reply({ embeds: [embed] });
    },
};

export default command;
