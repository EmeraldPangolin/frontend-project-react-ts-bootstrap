import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export const Home =() => {
    return(
        <>
        <Button 
            variant="outline-primary">Play
        </Button>
        <Card className="mt-3">
            <Card.Header>
            Leaderboard
            </Card.Header>
            <Card.Body>
            Play a game to see your leaderboard...
            </Card.Body>
        </Card>
        </>
  )
};