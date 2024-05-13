import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command, DuoApiResponse, XpSummary } from "../types";
import { DB } from "../data";
import {
    calcStreakFreezes,
    getAllUserData,
    getDuoData,
    getXpSummaries,
} from "../duolingo";

const command: Command = {
    data: new SlashCommandBuilder()
        .setName("weeklyxp")
        .setDescription("Get the weekly xp leaderboard!"),
    async execute(interaction) {
        const duoData = await getAllUserData();
        const xpGainData = (
            (
                await Promise.allSettled(
                    duoData.map(async ({ id, duo }) => {
                        if (!duo?.id) throw 1;
                        return {
                            id,
                            xp: (
                                await getXpSummaries(duo?.id.toString())
                            ).slice(0, -1),
                        };
                    })
                )
            ).filter(
                (p) => p.status === "fulfilled"
            ) as PromiseFulfilledResult<{ id: string; xp: XpSummary[] }>[]
        ).map((p) => p.value);
        const sortedData = xpGainData
            .sort(
                (a, b) =>
                    (b.xp.reduce((s, d) => s + (d.gainedXp || 0), 0) || 0) -
                    (a.xp.reduce((s, d) => s + (d.gainedXp || 0), 0) || 0)
            )
            .slice(0, 10);

        const embed = new EmbedBuilder()
            .setColor("#58cc02")
            .setTitle("Leaderboard")
            .setAuthor({
                name: "Duolingo Weekly XP Leaderboard",
                iconURL:
                    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Freeoo.qiniudn.com%2FDuolingo-icon.png!icon512&f=1&nofb=1&ipt=db742292abf71538b451da860a08675d975171bf0aa1317df53a9df8f3976208&ipo=images",
            })
            .addFields(
                sortedData.map((data, index) => ({
                    name: `${index + 1}. ${
                        data.xp.reduce((s, d) => s + (d.gainedXp || 0), 0) || 0
                    } XP`,
                    value: `<@!${data.id}>`,
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
