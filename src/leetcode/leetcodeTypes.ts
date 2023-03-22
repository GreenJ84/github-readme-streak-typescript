import { THEMETYPE } from "../utils/themes";

export enum LeetCodeGraphQLResponse {
    ProbeResponse,
    StreakResponse,
    ProfileResponse,
    QuesionsAnsweredResponse,
    BadgeReponse,
    any
}
export interface ProbeResponse{
    matchedUser: {
        userCalendar: {
            activeYears: number[]
        }
    }
}

export interface StreakResponse {
    allQuestionsCount: AllQuestionsCount[];
    matchedUser: {
        userCalendar: {
            streak: number
            totalActiveDays: number
        }
        submitStats: {
            acSubmissionNum: {
                difficulty: string
                count: number
                submissions: number
            }
        }
    }
}
export interface STREAKDATA{
    streak: [number, number]
    totalActive: number
    completion: number
}




export interface ProfileResponse {
    allQuestionsCount: AllQuestionsCount[];
    matchedUser: {
        contributions: {
            points: number
        }
        profile: {
            starRating: number
            reputation: number
        }
        submitStats: {
            acSubmissionNum: {
                difficulty: string
                count: number
                submissions: number
            }[]
        }
        badges: {
            id: string
        }[];
    }
}
    interface AllQuestionsCount {
        difficulty: string;
        count: number;
    }
export interface PROFILEDATA {
    title?: string
    completion: string
    reputation: number
    stars: number
    badges: number
    contributions: number
    grade: string
    theme: THEMETYPE
}


export interface BadgeReponse {
    matchedUser: {
        badges: {
            id: string;
            displayName: string;
            icon: string;
            creationDate: string;
        }[]
    }
}
export interface BADGEDATA {
    badges: {
        displayName: string;
        icon: string;
        creationDate: string;
    }[]
}


export interface QuesionsAnsweredResponse {
    allQuestionsCount: AllQuestionsCount[]
    matchedUser: {
        submitStats: {
            acSubmissionNum: {
                difficulty: string
                count: number
                submissions: number
            }[]
        }
        profile: {
            ranking: number
        }
    }
}
export interface QUESTIONDATA {
    ranking: number
    all: [number, number]
    hard: [number, number]
    medium: [number, number]
    easy: [number, number]
    acceptance: string
}



export interface RecentSubmissionResponse {
    recentSubmissionList: {
        title: string;
        titleSlug: string;
        timestamp: string;
        statusDisplay: string;
        lang: string;
    }[]
}