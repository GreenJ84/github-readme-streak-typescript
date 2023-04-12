import { RedisClientType, createClient } from 'redis';
import { LeetCodeGraphQLResponse, STREAKDATA } from '../leetcode/leetcodeTypes';
import { GraphQLResponse, STREAKTYPE } from '../github/githubTypes';
import { wakaResponse } from '../wakatime/wakatimeTypes';
import { PRODUCTION, PROD_HOST, PROD_PORT, REDIS_PASS, REDIS_USER } from './constants';


type cacheType = 
    LeetCodeGraphQLResponse |
    STREAKDATA |
    GraphQLResponse |
    STREAKTYPE |
    wakaResponse |
    { times: number }

export const client: RedisClientType = PRODUCTION ?
    createClient({
            url: `redis://${REDIS_USER}:${REDIS_PASS}@${PROD_HOST}:${PROD_PORT}`
        })
    :
    createClient();

client.on("error", err => console.error(`Redis client error: ${err}`))

export const buildRedis = async () => {
    await client.connect()
        .then(() => console.log("Redis server connected."))
}

export const teardownRedis = async () => {
    await client.disconnect()
        .then(() => console.log("Redis server disconnected."));
}

export const getCacheData = async (key: string): Promise<[boolean, cacheType | null]> => {
    try {
        const data = await client.get(
            key
        );
        if (data == undefined) {
            console.warn("Empty Cache");
            return [false, null]
        }
        return [true, JSON.parse(data)]
    }
    catch {
        console.error("Cache retrieval Error");
        return [false, null]
    }
}

export const setCacheData = async (key: string, data: any): Promise<void> => {
    await client.set(
        key,
        JSON.stringify(data), {
            // 30 sec development cache lifetime
            // 8hr and 6min production cache lifetime
            "EX": PRODUCTION ? (60 * 61 * 8) : 30
        }
    )
    return;
}

