import Discord, { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    execute: async (interaction: Discord.Interaction<Discord.CacheType>) => {
        if (interaction.isRepliable()) await interaction.reply("Pong!");
    },
};
