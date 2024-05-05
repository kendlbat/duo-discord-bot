import { discordMain } from "./discord-logic";
import {
    calcStreakFreezes,
    getDuoData,
    hasDoneDuolingoToday,
} from "./duolingo";

import dotenv from "dotenv";

dotenv.config();

const tracking: Record<string, string> = {
    Hafny: "631971796",
    Kay: "1095208580",
    Lea: "547112530",
    Mika: "630543502",
    Theresa: "341259201",
    Kendl: "902544029",
};

async function test(data: any) {
    console.log(data.username);

    const streak = data.streakData.currentStreak;

    console.log("Streak", streak.length);
    console.log("Freezes", calcStreakFreezes(streak));
    console.log("Today done?", hasDoneDuolingoToday(streak));
}

async function main() {
    discordMain();

    /* for (const name in tracking) {
        console.log(`Checking ${name}`);
        const userId: string = tracking[name];
        const data = test(await getDuoData(userId));
    } */
}

main();
