//
// Interfaces and function types...
//
export interface GameResult {
    winner: string;
    players: string[];
};

export interface LeaderboardPlayer {
    name: string;
    wins: number;
    losses: number;
    avg: string;
};

export type GetPreviousPlayersFunc = (results: GameResult[]) => string[];
export type CalculateLeaderboardFunc = (results: GameResult[]) => LeaderboardPlayer[];

//
// Default function implementations...
//
export const getPreviousPlayers: GetPreviousPlayersFunc = (grs) => {

    // const allPreviousPlayers = grs.map(x => x.players);
    const allPreviousPlayers = grs.flatMap(x => x.players);

    return [
        ...new Set(allPreviousPlayers)
    ].sort();
};

export const calculateLeaderboard: CalculateLeaderboardFunc = (results) => {

    const gameResultsGroupedByPlayer = getPreviousPlayers(results).reduce(
        (acc, x) => acc.set(
            x
            , results.filter(y => y.players.includes(x))
        )
        , new Map<string, GameResult[]>() 
    );

    return [...gameResultsGroupedByPlayer]

        // First object with names game counts and wins...
        .map(x => ({
            name: x[0]
            , totalGames: x[1].length
            , wins: x[1].filter(y => y.winner === x[0]).length
        }))

        /// Now use wins and total games to get avg and losses
        .map(x => ({
            name: x.name
            , wins: x.wins 
            , losses: x.totalGames - x.wins
            , avg: x.wins / x.totalGames
        }))

        // Sort order, with tie breaks that include number of games played
        .sort(
            (a, b) => (a.avg * 1000 + a.wins + a.losses) > (b.avg * 1000 + b.wins + b.losses) ? -1 : 1
        )

        // Turn the avg into a 3 digit string.
        .map(x => ({
            ...x
            , avg: x.avg.toFixed(3)
        }))
    ;
};
