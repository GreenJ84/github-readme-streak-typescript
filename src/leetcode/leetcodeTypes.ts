export interface UserProfile {
    allQuestionsCount: AllQuestionsCount[];
    matchedUser: MatchedUser | null;
    recentSubmissionList: RecentSubmission[] | null;
}

    export interface AllQuestionsCount {
        difficulty: string;
        count: number;
    }

    export interface MatchedUser {
        username: string;
        socialAccounts: unknown;
        githubUrl: null;
        contributions: Contributions;
        profile: Profile;
        submissionCalendar: string;
        submitStats: SubmitStats;
        badges: Badge[];
        upcomingBadges: Badge[];
        activeBadge: Badge | null;
    }
        export interface Contributions {
            points: number;
            questionCount: number;
            testcaseCount: number;
        }
        
        export interface Profile {
            realName: string;
            websites: string[];
            countryName: string | null;
            skillTags: string[];
            company: string | null;
            school: string | null;
            starRating: number;
            aboutMe: string;
            userAvatar: string;
            reputation: number;
            ranking: number;
        }
        
        export interface SubmitStats {
            acSubmissionNum: AcSubmissionNum[];
            totalSubmissionNum: TotalSubmissionNum[];
        }
            export interface AcSubmissionNum {
                difficulty: string;
                count: number;
                submissions: number;
            }
            export interface TotalSubmissionNum {
                difficulty: string;
                count: number;
                submissions: number;
            }
        
        export interface Badge {
            id: string;
            displayName: string;
            icon: string;
            creationDate?: string;
        }


    export interface RecentSubmission {
        title: string;
        titleSlug: string;
        timestamp: string;
        statusDisplay: string;
        lang: string;
    }

export interface Contest {
    title: string;
    startTime: number;
}

export interface ContestInfo {
    attended: boolean;
    trendDirection: string;
    problemsSolved: number;
    totalProblems: number;
    finishTimeInSeconds: number;
    rating: number;
    ranking: number;
    contest: Contest;
}
export interface ContestRanking {
    attendedContestsCount: number;
    rating: number;
    globalRanking: number;
    totalParticipants: number;
    topPercentage: number;
    badge: null | {
        name: string;
    };
}

export interface UserContestInfo {
    userContestRanking: ContestRanking;
    userContestRankingHistory: ContestInfo[];
}

export interface TopicTag {
    name: string;
    slug: string;
    translatedName: string | null;
}

export interface CodeSnippet {
    lang: string;
    langSlug: string;
    code: string;
}

export interface ChallengeQuestion {
    id: string;
    date: string;
    incompleteChallengeCount: number;
    streakCount: number;
    type: string;
}

export type ProblemDifficulty = "Easy" | "Medium" | "Hard";

export interface Problem {
    questionId: string;
    questionFrontendId: string;
    boundTopicId: unknown;
    title: string;
    titleSlug: string;
    content: string;
    translatedTitle: string | null;
    translatedContent: string | null;
    isPaidOnly: boolean;
    difficulty: ProblemDifficulty;
    likes: number;
    dislikes: number;
    isLiked: boolean | null;
    similarQuestions: string;
    exampleTestcases: string;
    contributors: unknown[];
    topicTags: TopicTag[];
    companyTagStats: unknown;
    codeSnippets: CodeSnippet[];
    stats: string;
    hints: string[];
    solution: OfficialSolution;
    status: unknown;
    sampleTestCase: string;
    metaData: string;
    judgerAvailable: boolean;
    judgeType: string;
    mysqlSchemas: unknown[];
    enableRunCode: boolean;
    enableTestMode: boolean;
    enableDebugger: boolean;
    envInfo: string;
    libraryUrl: string | null;
    adminUrl: string | null;
    challengeQuestion: ChallengeQuestion;
    /** null if not logged in */
    note: string | null;
}


export interface ProblemList {
    total: number;
    questions: {
        acRate: number;
        difficulty: "Easy" | "Medium" | "Hard";
        freqBar: null;
        questionFrontendId: string;
        isFavor: boolean;
        isPaidOnly: boolean;
        status: string | null;
        title: string;
        titleSlug: string;
        topicTags: {
            name: string;
            id: string;
            slug: string;
        }[];
        hasSolution: boolean;
        hasVideoSolution: boolean;
    }[];
}

export interface DailyChallenge {
    date: string;
    link: string;
    question: Problem;
}