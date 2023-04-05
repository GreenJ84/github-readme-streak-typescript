import { Request, Response } from 'express';

import { preFlight, sleep } from '../utils/utils';
import { ResponseError } from '../utils/constants';

import { getUserStats } from '../wakatime/query';
import { parseDirect } from '../wakatime/apiParse';
import { cardDirect } from '../wakatime/wakatimeUtils';
import { wakaResponse } from '../wakatime/wakatimeTypes';
import { getCacheData, setCacheData } from '../utils/cache';

let sleepMod = -2;

export const getProfileStats = async (req: Request, res: Response): Promise<void> => {
    // Ensure caller is viable
    if (!preFlight(req, res)) {
        return;
    }

    const subRoute = req.path.split("/")[2]!;
    const cacheKey = `wakatime:${req.params.username!}`

    
    sleepMod = (sleepMod + 2) % 10
    await sleep(sleepMod);
    
    // Try for cached data, Query API if not present
    let data: wakaResponse;
    const [success, cacheData] = await getCacheData(cacheKey);
    if (!success) {
        // Query WakaTime api
        const queryRepsonse: wakaResponse = await getUserStats(req)
            .catch(err => {
                throw new ResponseError(
                    "Server error building Wakatime API call",
                    err, 502
                );
            });
            // Add new query data to cache
            setCacheData(cacheKey, queryRepsonse)
            
            data = queryRepsonse;
        }
        else {
            data = cacheData as wakaResponse;
        }
        
        // Parse Data, Build Card, and Send
        const dataParse = parseDirect(subRoute);
        const parsedData = dataParse(data);
        
        const cardCreate = cardDirect(subRoute);
        const card: string = cardCreate(req, parsedData);
        
        res.status(200).send(card);
        return;
    }