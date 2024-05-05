import { SlashCommandBuilder } from "discord.js";
import type { Command } from "../types";

const command: Command = {
    data: new SlashCommandBuilder().setName("mika").setDescription("Nu uh!"),
    async execute(interaction) {
        if (interaction.isRepliable())
            interaction.reply("Nu uh! <@827206807343726612>");
    },
};

export default command;
