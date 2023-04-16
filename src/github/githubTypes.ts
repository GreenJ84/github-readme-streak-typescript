/** @format */

import { ThemeType } from "../utils/themes";

export type GithRawGraphResponse = GithRawUserProbe | GithRawUserData;

export interface GithRawUserProbe {
  user: {
    createdAt: string;
    contributionsCollection: {
      contributionYears: number[];
    };
  };
}

export type GithRawUserData = GithRawStreakData | GithRawProfileData;

export interface GithRawStreakData {
  user: {
    createdAt: string;
    contributionsCollection: {
      contributionYears: number[];
      contributionCalendar: {
        weeks: {
          contributionDays: {
            contributionCount: number;
            date: string;
          }[];
        }[];
      };
    };
  };
}
export interface GithRawProfileData {
  user: {
    name: string;
    contributionsCollection: {
      totalCommitContributions: number;
      restrictedContributionsCount: number;
    };
    repositoriesContributedTo: {
      totalCount: number;
    };
    pullRequests: {
      totalCount: number;
    };
    issues: {
      totalCount: number;
    };
    followers: {
      totalCount: number;
    };
    repositories: {
      totalCount: number;
      nodes: {
        name: string;
        stargazers: {
          totalCount: number;
        };
        languages: {
          edges: {
            size: number;
            node: {
              color: string;
              name: string;
            };
          }[];
        };
      }[];
    };
  };
}

export type GithUserData = GithStreak | GithProfile;

export interface GithStreak {
  title?: string;
  total: number;
  totalText: string;
  totalRange: string[];
  curr: number;
  currText: string;
  currDate: string[];
  longest: number;
  longestText: string;
  longestDate: string[];
  theme?: ThemeType;
}

export type GithRawProfile =
  | GithRawUserStats
  | GithRawUserLanguages
  | GithRawUserBadges;

export type GithProfile = GithUserStats | GithUserLanguages | GithUserBadges;

export interface GithRawUserStats {
  user: {
    name: string;
    contributionsCollection: {
      totalCommitContributions: number;
      restrictedContributionsCount: number;
    };
    repositoriesContributedTo: {
      totalCount: number;
    };
    pullRequests: {
      totalCount: number;
    };
    issues: {
      totalCount: number;
    };
    followers: {
      totalCount: number;
    };
    repositories: {
      totalCount: number;
      nodes: {
        name: string;
        stargazers: {
          totalCount: number;
        };
      }[];
    };
  };
}
export interface GithUserStats {
  title?: string;
  grade?: [string, number];
  stars: number;
  followers: number;
  commits: number;
  PR: number;
  issues: number;
  contributedTo: number;
  repos: number;
  theme?: ThemeType;
}

// Language related types
export interface GithRawUserLanguages {
  user: {
    repositories: {
      nodes: {
        name: string;
        languages: {
          edges: {
            size: number;
            node: {
              color: string;
              name: string;
            };
          }[];
        };
      }[];
    };
  };
}
export interface GithUserLanguages {
  title?: string;
  totalSize: number;
  languages: {
    name: string;
    usage: number | string;
    position: number;
    width: number;
    color: string;
  }[];
  theme?: ThemeType;
}

export interface GithRawUserBadges {}

export interface GithUserBadges {}
