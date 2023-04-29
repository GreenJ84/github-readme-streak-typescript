import { Request, Response } from "express"

export const serverHealthSuccess = (_: Request, res: Response) => {
    res.set("Content-Type", "application/json");
    res.status(200).send({ message: 'Server is up and running' });
}


export const renderModalDisplay = (_: Request, res: Response) => {
    res.set('Content-Type', 'text/html');
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta 
        http-equiv="Content-Security-Policy" 
        content="img-src 'self' data: https://greenj-readme-stats.onrender.com">
        <title>GreenJ ReadMe Stats</title>

        <style>
            body{
                padding: 0 6vw;
                font-size: clamp(18px, 1.25vw, 24px);
            }
            h1{
                text-align: center;
                font-size: clamp(40px, 5vw, 60px);
                margin: 50px 0 150px;
            }
            h2{
                width: 40vw;
                margin: 0 auto 50px;
                text-align: center;
                font-size: clamp(36px, 3vw, 50px);
                border-bottom: 1px solid grey;
            }
            h4{
                margin-left: 40px;
                font-size: clamp(24px, 1.5vw, 32px);
            }
            h4 + p{
                color: rgb(5, 29, 212);
                margin-left: 40px;
            }
            p{
                width: 50vw;
            }
            img {
                display: block;
                margin-left: 100px;
            }
        </style>
    </head>
    <body>
        <h1>GreenJ's TypeScript Readme Stats</h1>
    
    
        <!-- GitHub Modals -->
        <h2>GitHub Routes</h2>
        
        <h4>Green84 Github Profile Stats</h4>
        <p>.../github/stats/GreenJ84 </p><p>
            - This route provides the all the commits, pull requests, issues, and repositories created by the user plus total stars earned and total projects contributed to. The stats are also compiled to provide an overall grade to the statistics provided.
        </p>
        <img src="https://greenj-readme-stats.onrender.com/github/stats/GreenJ84" alt="Green84 Github Profile Stats">
    
        <h4>Green84 Github Commit Streak</h4>
        <p>.../github/streak/&lt;username&gt; </p><p>
            - This route provides details for the user's current github commit streak, the longest recorded github commit streak, and the total number of contributions since account creation.
        </p>
        <img src="https://greenj-readme-stats.onrender.com/github/streak/GreenJ84" alt="Green84 Github Commit Streak">
    
        <h4>Green84 Github Languages Used</h4>
        <p>.../github/languages/&lt;username&gt; </p><p>
            - This route provides the user's top 8 most used languages within all of their owned github repositories.
        </p>
        <img src="https://greenj-readme-stats.onrender.com/github/languages/GreenJ84" alt="Green84 Github Languages Used">
    
        <!-- LeetCode Modals -->
        <h2>LeetCode Routes</h2>
    
        <h4>Green84 LeetCode Profile Stats</h4>
        <p>.../leetcode/stats/&lt;username&gt; </p><p>
            - This route provides the completion percentage, reputaion and contribution scores, total badges earned, and total stars earned. The stats are then compiled to provide an overall grade to the statistics provided.
        </p>
        <img src="https://greenj-readme-stats.onrender.com/leetcode/stats/GreenJ84" alt="Green84 LeetCode Profile Stats">
    
        <h4>Green84 LeetCode Questions Solved</h4>
        <p>.../leetcode/completion/&lt;username&gt; </p><p>
            - This route provieds the user's overall leetcode completion and breaks it down by question difficulty. It also provided the leetcode ranking and acceptance percentage. 
        </p>
        <img src="https://greenj-readme-stats.onrender.com/leetcode/completion/GreenJ84" alt="Green84 LeetCode Questions Solved">
    
        <h4>Green84 LeetCode Recent Questions Answered</h4>
        <p>.../leetcode/submission/&lt;username&gt; </p><p>
            -This route provides a list of latest 6 questions answered by the user on the leetcode platform.
        </p>
        <img src="https://greenj-readme-stats.onrender.com/leetcode/submission/GreenJ84" alt="Green84 LeetCode Recent Questions Answered">
    
        <h4>Green84 LeetCode Activity Steak</h4>
        <p>.../leetcode/streak/&lt;username&gt; </p><p>
            - This route provides details for the user's leetcode total activity. It provided the user's longest streak and the year it was achieved, the percentatge and actual platform completion stats, and the total activty on the platform both all time and within the current year.
        </p>
        <img src="https://greenj-readme-stats.onrender.com/leetcode/streak/GreenJ84" alt="Green84 LeetCode Activity Steak"/>
    
        <!-- WakaTime Modals -->
        <h2>WakaTime Routes</h2>
    
        <h4>Green84 Wakatime Profile Insights</h4>
        <p>.../wakatime/insights/&lt;username&gt; </p><p>
            - This route provides details for the user's overall profile insights. This includes, the user's top language and percentage of coding it takes up, average daily coding time, top project developing, and top items for programming category, editor used, and operating system used. 
        </p>
        <img src="https://greenj-readme-stats.onrender.com/wakatime/insights/GreenJ84" alt="Green84 Wakatime Profile Insights"/>
    
        <h4>Green84 Wakatime Languages Used</h4>
        <p>.../wakatime/languages/&lt;username&gt; </p><p>
            This route provides a detailed view of the user's top 6 languages used in development with percentages and a pie chart display. 
        </p>
        <img src="https://greenj-readme-stats.onrender.com/wakatime/languages/GreenJ84" alt="Green84 Wakatime Languages Used"/>
    
        <h4>Green84 Wakatime Stats</h4>
        <p>.../wakatime/stats/&lt;username&gt; </p><p>
            - This route provides a concise detailed view of average daily development time, total days of activity, longest day development stats and total hours of development on the platform. 
        </p>
        <img src="https://greenj-readme-stats.onrender.com/wakatime/stats/GreenJ84" alt="Green84 Wakatime Stats"/>
    </body>
    </html>`)
}