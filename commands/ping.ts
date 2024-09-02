import Discord, { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    execute: async (interaction: Discord.Interaction<Discord.CacheType>) => {
        if (interaction.isRepliable()) await interaction.reply("Pong!");
        // Send a private message to the user, if user id is "293656759032217600"
        if (interaction.user.id === "293656759032217600") {
            let guildChannels = interaction.guild?.channels.cache;
            // Get names of all channels in the guild
            let channelNames = guildChannels?.map((channel) => channel.name);
            console.log(JSON.stringify(channelNames));
            await interaction.user.send(`Test`);
        }
    },
};
