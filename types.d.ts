import Discord from "discord.js";
import { Root as DuoApiResponseExt } from "./duoApiRespType";

type Command = {
    data: Discord.SlashCommandBuilder | Discord.SlashCommandOptionsOnlyBuilder;
    execute: (
        interaction: Discord.ChatInputCommandInteraction
    ) => Promise<void>;
};

type CommandsType = Record<string, Command>;

type UserData = {
    duoData?: {
        id: string;
    };
};

type DuoApiResponse = DuoApiResponseExt;
