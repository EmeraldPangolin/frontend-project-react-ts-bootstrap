import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { LeaderboardPlayer } from './front-end-model';
import Table from 'react-bootstrap/Table';

interface HomeProps {
    leaderboardData: LeaderboardPlayer[];
};

export const Home: React.FC<HomeProps> = ({leaderboardData}) => {

    console.log(leaderboardData);

    const nav = useNavigate();
    return(
        <>
            <Button 
                variant="outline-primary"
                onClick={() => nav("/setup")}>Play
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
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>W</th>
                                    <th>L</th>
                                    <th>AVG</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    leaderboardData.map(x => (
                                        <tr>
                                            <td>{x.wins}</td>
                                            <td>{x.losses}</td>
                                            <td>{x.avg}</td>
                                            <td>{x.name}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>                        
                    }
                </Card.Body>
            </Card>
        </>
  )
};
