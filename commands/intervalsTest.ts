import { SlashCommandBuilder } from "discord.js";
import { Command } from "../types";
import { funcs as intervalFuncs } from "../intervalFuncs";

const command: Command = {
    data: new SlashCommandBuilder()
        .setName("intervalsTest")
        .setDescription("Test the intervals.")
        .setDefaultMemberPermissions(0),
    async execute(interaction) {
        interaction.reply("Intervals test!");

        // Test the intervals
        Object.values(intervalFuncs).forEach((func) => {
            func();
        });
    },
};

export default command;
