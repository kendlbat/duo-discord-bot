import fs from "node:fs";
import { UserData } from "./types";

import { createClient } from "redis";
import { logger } from "./logger";

const REDIS_DEFAULT_URL = "redis://redis";
const redis_url = process.env.REDIS_URL || REDIS_DEFAULT_URL;

async function Data() {
    const client = await createClient({
        url: redis_url,
    })
        .on("error", (error) => {
            console.error("Redis Client Error", error);
        })
        .connect();

    logger.info(
        "Connected to Redis" +
            (redis_url === REDIS_DEFAULT_URL
                ? " with default URL"
                : " with URL supplied via env variable")
    );

    return {
        async getUsers(userIds?: string[]): Promise<Record<string, UserData>> {
            if (!userIds)
                return Object.fromEntries(
                    Object.entries(await client.hGetAll("users")).map(
                        ([key, value]) => [key, JSON.parse(value)]
                    )
                );

            return Object.fromEntries(
                Object.entries(await client.hmGet("users", userIds)).map(
                    ([key, value]) => [key, JSON.parse(value)]
                )
            );
        },

        async getUser(discordId: string): Promise<UserData | undefined> {
            const data = await client.hGet("users", discordId);
            if (!data) return;
            return JSON.parse(data);
        },
        async addUser(discordId: string, userData: UserData): Promise<void> {
            await client.hSet("users", discordId, JSON.stringify(userData));
        },
        async removeUser(discordId: string): Promise<void> {
            await client.hDel("users", discordId);
        },
        async updateUser(discordId: string, userData: UserData): Promise<void> {
            await client.hSet("users", discordId, JSON.stringify(userData));
        },
        client,
    };
}

const db = Data();

export async function DB() {
    return await db;
}
