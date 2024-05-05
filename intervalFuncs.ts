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

const checkTime = 14;
export default function createFuncs(client: Client) {
    const reminderFunc = async (ignoreRedis: boolean = false) => {
        const now = new Date();
        if (now.getUTCHours() < checkTime) return;

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

        const remainingMinutes = 60 - now.getUTCMinutes();
        const remainingHours = 23 - now.getUTCHours();

        const message = `These users
    ${users.map((user) => `<@${user.id}>`).join("\n")}
    have not done their Duolingo lessons today! There are ${
        remainingHours > 0 ? remainingHours + "hours and " : ""
    } ${remainingMinutes} minutes left to do them! :owl::knife:`;

        channel.send(message);
    };

    // This function handles creating "events" from updated duolingo data
    const checkFunc = async (ignoreRedis: boolean = false) => {
        (async () => {
            // This checks for streak extensions
            const prev = Object.fromEntries(
                Object.entries(await getAllCachedUserData()).filter(
                    ([key, value]) =>
                        !hasDoneDuolingoToday(
                            value.duo.streakData.currentStreak
                        )
                )
            );

            const now = await getAllUserData(Object.keys(prev));

            logger.debug(JSON.stringify(prev));

            const updated = now.filter(
                (user) =>
                    prev[user.id]?.duo &&
                    user?.duo &&
                    !hasDoneDuolingoToday(
                        prev[user.id].duo.streakData.currentStreak
                    ) &&
                    hasDoneDuolingoToday(user.duo.streakData.currentStreak)
            );

            if (updated.length === 0) return;

            logger.info(`Streak extensions: ${updated.map((u) => u.id)}`);

            const channel = client.channels.cache.get(reminderChannelid);
            if (!channel) return;
            if (!channel.isTextBased()) return;

            if (updated.length == 1) {
                channel.send(
                    `Congratulations <@${updated[0].id}>! You have extended your Duolingo streak! :tada:`
                );
            } else {
                channel.send(
                    `Congratulations to these users: ${updated
                        .map((user) => `<@${user.id}>`)
                        .join(
                            ", "
                        )}! You have extended your Duolingo streak! :tada:`
                );
            }
        })();
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
