/** @format */

import { Request, Response } from "express";

// API Global imports
import { preFlight, sleep } from "../utils/utils";
import {
  UserCache,
  deleteCacheData,
  getCacheData,
  getCacheKey,
  setCacheData,
} from "../utils/cache";
import { DATA_UDPDATE_INTERVAL } from "../utils/constants";

// GitHub specific imports
import {
  GithProfile,
  GithRawProfileData,
  GithStreak,
} from "../github/githubTypes";
import {
  preQery,
  updateStreak,
  streakQuery,
  updateUser,
} from "../github/query";
import { getGithResponseParse } from "../github/apiParser";
import { getGithCardDirect } from "../github/githubUtils";
import { streakCardSetup } from "../github/cards/streak-card";

let sleepMod = -2;

export const githubRegister = async (req: Request, res: Response) => {
  // Ensure Caller is viable
  if (!preFlight(req, res)) {
    return;
  }
  const cacheKey = getCacheKey(req);
  res.set("Content-Type", "application/json");

  // Try for cached data, Query API if not present
  const [success, _] = await getCacheData(cacheKey);
  if (success) {
    res.status(208).json({
      message: "User already registered",
      code: "208",
    });
    return;
  }

  let variables = { login: req.params.username! };
  const queryResponse = await preQery(variables)
    .then((data) => {
      return data as GithRawProfileData;
    })
    .catch((err) => {
      throw err;
    });

  const intervalId = setInterval(() => {
    // console.log(intervalId);
    updateUser(cacheKey, intervalId, req.params.username!);
  }, DATA_UDPDATE_INTERVAL);

  await setCacheData(cacheKey, {
    interval: intervalId,
    data: queryResponse,
  });

  res.status(201).json({
    message: "User Registered",
    code: "201",
  });
  return;
};

// GitHub controller for all GitHub routes except - Commit Streak Data
export const getProfileStats = async (req: Request, res: Response) => {
  if (!preFlight(req, res)) {
    return;
  }

  const cacheKey = getCacheKey(req);

  sleepMod = (sleepMod + 2) % 10;
  await sleep(sleepMod);

  const [success, cacheData] = await getCacheData(cacheKey);
  if (!success) {
    res.set("Content-Type", "application/json");
    res.status(401).json({
      message: "User unauthorized. Registration required for API data.",
      code: "401",
    });
    return;
  }

  const data = (cacheData as UserCache)?.data as GithRawProfileData;

  // Get Function to parse data type
  const parse = getGithResponseParse(req);
  const parsedData = parse(data) as GithProfile;

  // Get Function to create svg card for data type
  const createCard: Function = getGithCardDirect(req);
  const card: string = createCard(req, parsedData);

  // Send created card as svg string
  res.status(200).send(card);
  return;
};

export const githubStreakRegister = async (req: Request, res: Response) => {
  // Ensure Caller is viable
  if (!preFlight(req, res)) {
    return;
  }
  const cacheKey = getCacheKey(req);
  res.set("Content-Type", "application/json");

  // Try for cached data, Query API if not present
  const [success, _] = await getCacheData(cacheKey);
  if (success) {
    res.status(208).json({
      message: "User already registered",
      code: "208",
    });
    return;
  }

  const queryResponse = await streakQuery(req).catch((err) => {
    throw err;
  });

  const intervalId = setInterval(() => {
    // console.log(intervalId);
    updateStreak(cacheKey, intervalId, { ...req } as Request);
  }, DATA_UDPDATE_INTERVAL);

  await setCacheData(cacheKey, {
    interval: intervalId,
    data: queryResponse,
  });

  res.status(201).json({
    message: "User Registered",
    code: "201",
  });
  return;
};

// GitHub Streak Controller
export const getCommitStreak = async (req: Request, res: Response) => {
  if (!preFlight(req, res)) {
    return;
  }
  const cacheKey = getCacheKey(req);

  const [success, cacheData] = await getCacheData(cacheKey);
  if (!success) {
    res.set("Content-Type", "application/json");
    res.status(401).json({
      message: "User unauthorized. Registration required for API data.",
      code: "401",
    });
    return;
  }
  const data = (cacheData as UserCache)?.data as GithStreak;

  const card: string = streakCardSetup(req, data);
  res.status(200).send(card);
  return;
};

export const githubUnregister = async (req: Request, res: Response) => {
  // Ensure caller is viable
  if (!preFlight(req, res)) {
    return;
  }

  let cacheKey = getCacheKey(req);
  res.set("Content-Type", "application/json");

  // Try for cached data, Query API if not present
  const [profSuccess, profCache] = await getCacheData(cacheKey);
  if (!profSuccess) {
    console.error("User's profile data not found.");
  } else {
    const intervalID = (profCache as UserCache)?.interval;
    if (intervalID) {
      clearInterval(intervalID);
    }
    const deleted = await deleteCacheData(cacheKey);
    if (!deleted) {
      console.error("Cached profile data didn't get deleted.");
    }
  }

  req.path = req.path
    .split("/")
    .map((sec, idx) => {
      if (idx == 2) {
        return "streak";
      } else {
        return sec;
      }
    })
    .join("/");
  cacheKey = getCacheKey(req);
  // Try for cached data, Query API if not present
  const [streakSuccess, streakCache] = await getCacheData(cacheKey);
  if (!streakSuccess) {
    console.error("User's streak data not found.");
  } else {
    const intervalID = (streakCache as UserCache)?.interval;
    if (intervalID) {
      clearInterval(intervalID);
    }
    const deleted = await deleteCacheData(cacheKey);
    if (!deleted) {
      console.error("Cached Streak data didn't get deleted.");
    }
  }

  if (!profSuccess && !streakSuccess) {
    res.status(400).json({
      message: "Unregistration process failed.",
      code: "400",
    });
    return;
  } else if (!profSuccess || !streakSuccess) {
    res.status(400).json({
      message:
        "Unregistration partial success. May be partially registered still.",
      code: "400",
    });
    return;
  } else {
    res.status(200).json({
      message: "User unregistered",
      code: "200",
    });
    return;
  }
};
