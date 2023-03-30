import axios from 'axios';
import dotenv from 'dotenv';
import { Request } from 'express';
import { Error, WAKA_TIME_URL } from '../utils/constants';
import { wakaResponse } from './wakatimeTypes';

dotenv.config()

export const getUserStats = async (req: Request): Promise<wakaResponse | Error> => {
    const { username } = req.params;

    const config = axios.create({
        baseURL: WAKA_TIME_URL,
        headers: {
            Authorization: `Basic ${Buffer.from(process.env.WAKATIME_TOKEN!).toString('base64')}`
        }
    });
    const data = await config.get(`users/${username}/stats/all_time`, {
        params: {}
    })
        .then(res => { return res.data as wakaResponse })
        .catch(err => { return {
            message: "Error accessing WakaTime API",
            error: err,
            error_code: 500
        } as Error })
    return data;
}