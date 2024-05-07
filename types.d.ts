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

type XpSummary = {
    gainedXp?: number;
    frozen: boolean;
    streakExtended: boolean;
    date: number;
    userId: number;
    repaired: boolean;
    dailyGoalXp?: number;
    numSessions?: number;
    totalSessionTime?: number;
};

type DuoApiResponse = DuoApiResponseExt;
