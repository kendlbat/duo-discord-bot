import { DB } from "./data";
import {
    getAllCachedUserData,
    getAllUserData,
    hasDoneDuolingoToday,
} from "./duolingo";
import { logger } from "./logger";
import dotenv from "dotenv";
import { Client } from "discord.js";

dotenv.config();

const reminderChannelid = process.env.DISCORD_REMINDER_CHANNEL_ID!;
export let funcs = {
    reminderFunc: (ignoreRedis: boolean = false) => {},
    checkFunc: (ignoreRedis: boolean = false) => {},
};

const checkTime = 16;
export default function createFuncs(client: Client) {
    const reminderFunc = async (ignoreRedis: boolean = false) => {
        const now = new Date();
        if (now.getHours() < checkTime) return;

        const db = await DB();

        if (!ignoreRedis) {
            const lastCheckFuncRun = await db.client.get("lastReminderFuncRun");
            // If the last check function run was less than 1 hour ago, don't run it again
            if (lastCheckFuncRun) {
                const lastCheckFuncRunDate = new Date(lastCheckFuncRun);
                const now = new Date();
                const diff = now.getTime() - lastCheckFuncRunDate.getTime();
                if (diff < 1000 * 60 * 60 * 1.9) return;
            }
        }

        await db.client.set("lastReminderFuncRun", new Date().toISOString());

        logger.debug(
            "Hourly checking for users who have not done their Duolingo lessons today."
        );

        const users = (await getAllUserData()).filter(
            (user) => !hasDoneDuolingoToday(user.duo.streakData.currentStreak)
        );

        if (users.length === 0) return;

        const channel = client.channels.cache.get(reminderChannelid);
        if (!channel) return;
        if (!channel.isTextBased()) return;

        const remainingMinutes = 60 - now.getMinutes();
        const remainingHours = 23 - now.getHours();

        const message = `These users
    ${users.map((user) => `<@${user.id}>`).join("\n")}
    have not done their Duolingo lessons today! There are ${
        remainingHours > 0 ? remainingHours + " hours and " : ""
    } ${remainingMinutes} minutes left to do them! :owl::knife:`;

        channel.send(message);
    };

    // This function handles creating "events" from updated duolingo data
    const checkFunc = async (ignoreRedis: boolean = false) => {
        const db = await DB();

        let streakextDataRaw = await db.client.get("streakextData");
        let streakextData: {
            date: string;
            sent: string[];
        };

        // StreakextData is a JSON key
        if (!streakextDataRaw) {
            streakextData = {
                date: new Date().toISOString().split("T")[0],
                sent: [],
            };
            await db.client.set("streakextData", JSON.stringify(streakextData));
        } else {
            streakextData = JSON.parse(streakextDataRaw);
        }

        let date = new Date();

        date.setHours(date.getHours() - date.getTimezoneOffset() / 60);

        if (streakextData.date !== date.toISOString().split("T")[0]) {
            streakextData = {
                date: date.toISOString().split("T")[0],
                sent: [],
            };
            await db.client.set("streakextData", JSON.stringify(streakextData));
        }

        const updated = (await getAllUserData()).filter(
            ({ id, duo }) =>
                duo &&
                hasDoneDuolingoToday(duo.streakData.currentStreak) &&
                !streakextData.sent.includes(id)
        );

        logger.info("Found streak extensions: " + updated.length);

        if (updated.length === 0) return;

        logger.info(`Streak extensions: ${updated.map((u) => u.id)}`);

        streakextData = {
            date: new Date().toISOString().split("T")[0],
            sent: [...streakextData.sent, ...updated.map((u) => u.id)],
        };
        await db.client.set("streakextData", JSON.stringify(streakextData));

        const channel = client.channels.cache.get(reminderChannelid);
        if (!channel) return;
        if (!channel.isTextBased()) return;

        if (updated.length == 1) {
            await channel.send(
                `Congratulations <@${updated[0].id}>! You have extended your Duolingo streak! :tada:`
            );
        } else {
            await channel.send(
                `Congratulations to these users: ${updated
                    .map((user) => `<@${user.id}>`)
                    .join(
                        ", "
                    )}! You have extended your Duolingo streak! :tada:`
            );
        }
    };

    funcs = {
        reminderFunc,
        checkFunc,
    };

    return {
        reminderFunc,
        checkFunc,
    };
}
