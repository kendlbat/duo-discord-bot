import { SlashCommandBuilder } from "discord.js";
import { Command } from "../types";
import { getAvatarUrl, getDuoData } from "../duolingo";

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

        const userData = await getDuoData(user.id);
        const avatarUrl = await getAvatarUrl(userData, size);

        interaction.reply({
            content: `Here is the avatar of ${user.username}!`,
            files: [avatarUrl],
        });
    },
};

export default command;
