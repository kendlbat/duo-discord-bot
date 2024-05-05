import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../types";
import { getAvatarUrl, getDuoData } from "../duolingo";
import { DB } from "../data";

const command: Command = {
    data: new SlashCommandBuilder()
        .setName("duoavatar")
        .setDescription("Get the avatar of a duolingo user.")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to get the avatar of.")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("size")
                .setDescription("The size of the avatar. (Default: Large)")
                .addChoices([
                    {
                        name: "Small (24x24)",
                        value: "small",
                    },
                    {
                        name: "Medium (48x48)",
                        value: "medium",
                    },
                    {
                        name: "Large (90x90)",
                        value: "large",
                    },
                    {
                        name: "X-Large (200x200)",
                        value: "xlarge",
                    },
                    {
                        name: "XX-Large (1000x1000)",
                        value: "xxlarge",
                    },
                ])
                .setRequired(false)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser("user")!;
        const size = interaction.options.getString("size") || "large";
        if (
            !(
                size === "small" ||
                size === "medium" ||
                size === "large" ||
                size === "xlarge" ||
                size === "xxlarge"
            )
        ) {
            return;
        }
        const db = await DB();

        const userDataRaw = await db.client.hGet("users", user.id);

        if (!userDataRaw) {
            interaction.reply({
                content: `This user is not registered!`,
            });
            return;
        }

        const userData = JSON.parse(userDataRaw);

        if (!userData?.duoData?.id) {
            interaction.reply({
                content: `This user is not registered!`,
            });
            return;
        }

        const duoData = await getDuoData(userData.duoData.id);

        const avatarUrl = await getAvatarUrl(duoData, size);

        const embed = new EmbedBuilder()
            .setTitle(duoData.username)
            .setImage(avatarUrl);

        interaction.reply({ embeds: [embed] });
    },
};

export default command;
