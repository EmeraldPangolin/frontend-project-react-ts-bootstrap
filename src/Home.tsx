import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { LeaderboardPlayer } from './front-end-model';
import Table from 'react-bootstrap/Table';
import { durationFormatter } from 'human-readable';

interface HomeProps {
    leaderboardData: LeaderboardPlayer[];
	shortestGameDuration: number;
	longestGameDuration: number;
    averageGameDurationData: {
		playerCount: number;
		avgGameDuration: number;
	}[];
    twoDirectionalWinPercent: number;
	threeDirectionalWinPercent: number;

	verticalWinTotal: number;
	horizontalWinTotal: number;
	diagonalWinTotal: number;
};

export const Home: React.FC<HomeProps> = ({
	leaderboardData
	, shortestGameDuration
	, longestGameDuration
    , averageGameDurationData
    , twoDirectionalWinPercent
	, threeDirectionalWinPercent
	, verticalWinTotal
	, horizontalWinTotal
	, diagonalWinTotal
}) => {

    console.log(leaderboardData);
    console.log(
		leaderboardData
		, shortestGameDuration
		, longestGameDuration
	);

    const nav = useNavigate();
    const format = durationFormatter();

	return (
		<>
			<Button 
				variant="outline-primary"
				onClick={() => nav("/setup")}
			>
				Play Bar
			</Button>
			<Card className="mt-3 overflow-hidden">
				<Card.Header>
				Leaderboard
				</Card.Header>
				<Card.Body>
					{
						leaderboardData.length == 0 &&
						<p>Play a game to see your leaderboard...</p>
					}
					{
						leaderboardData.length > 0 &&
						//our table for stats
						<Table striped bordered>
							<thead>
								<tr>
									<th>W</th>
									<th>L</th>
									<th>Win Rate</th>
									<th>Player</th>
								</tr>
							</thead>
							<tbody>
								{
									leaderboardData.map(x => (
										<tr>
											<td>{x.wins}</td>
											<td>{x.losses}</td>
											<td>{x.avg.substring(0,5)}%</td>
											<td>{x.name}</td>
										</tr>
									))
								}
							</tbody>
						</Table>                        
					}
				</Card.Body>
			</Card>

			<Card className="mt-3 overflow-hidden">
				<Card.Header>
				Win Direction Totals 
				</Card.Header>
				<Card.Body>
					{
						leaderboardData.length == 0 &&
						<p>Play a game to see your leaderboard...</p>
					}

					{
						leaderboardData.length > 0 &&
						//our table for stats
					

						<Table striped bordered>
							<thead>
								<tr>
									<th>Horizontal Wins</th>
									<th>Vertical Wins</th>
									<th>Diagonal Wins</th>
								</tr>
							</thead>
							<tbody>
								{
									leaderboardData.map(x => (
										<tr>
											
											<td>{horizontalWinTotal}</td>
											<td>{verticalWinTotal}</td>
											<td>{diagonalWinTotal}</td>

										</tr>
									))
								}
							</tbody>
						</Table>   
					}                     
				</Card.Body>
			</Card>

			<Card>
				<Card.Header>
					Game Time Fun Facts
				</Card.Header>
				<Card.Body>
					<p>
						{`Shortest game ever: ${Number.isInteger(shortestGameDuration) ? format(shortestGameDuration) : "N/A"}`}
					</p>
					<p>
						{`Longest game ever: ${Number.isInteger(longestGameDuration) ? format(longestGameDuration) : "N/A"}`}
					</p>
					{
						averageGameDurationData.length > 0 &&
						averageGameDurationData.map(x => (
							<p>
								{`The average game length is: ${format(x.avgGameDuration)}`}
							</p>
						))
					}

				</Card.Body>
			</Card>
            <Card>
				<Card.Header>
					Special Win Conditions
				</Card.Header>
				<Card.Body>
					<p>
						{`Two Directional Wins happen ${(twoDirectionalWinPercent * 100).toFixed(2)}% of games`}
					</p>
					<p>
						{`Three Directional Wins happen ${(threeDirectionalWinPercent * 100).toFixed(2)}% of games`}
					</p>
				</Card.Body>
			</Card>	
		</>
	)
};
