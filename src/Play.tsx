import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { GameResult, SetupInfo } from './front-end-model';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

interface PlayProps {
    addGameResultFunc: (r: GameResult) => void;
    setupInfo: SetupInfo;
};
export const Play: React.FC<PlayProps> = ({
    addGameResultFunc
    , setupInfo
}) => {

    console.log(setupInfo);

    const [happened, setHappened] = useState(false);
    const [happened2, setHappened2] = useState(false);

    const [happenedVertical, setHappenedVertical] = useState(false);
    const [happenedHorizontal, setHappenedHorizontal] = useState(false);
    const [happenedDiagonal, setHappenedDiagonal] = useState(false);


    const nav = useNavigate();

    const endGame = (winner: string) => {
        
        addGameResultFunc({
            winner: winner
            , players: setupInfo.chosenPlayers
            , start: setupInfo.start
            , end: new Date().toISOString()
            , twoDirectionalWin: happened
            , threeDirectionalWin: happened2
            , verticalWin: happenedVertical
            , horizontalWin: happenedHorizontal
            , diagonalWin: happenedDiagonal
        });
        nav(-2);
    };
    return (
        <>
            <h2>Play</h2>
            <br/>
            <form>
                <div>
                    <p>
                        <Form.Check
                            label="Horizontal Win"
                            type="switch"
                            checked={happenedHorizontal}
                            onChange={(e) => setHappenedHorizontal(e.target.checked)}
                        />                
                    </p>
                    <p>
                        <Form.Check
                            label="Vertical Win"
                            type="switch"
                            checked={happenedVertical}
                            onChange={(e) => setHappenedVertical(e.target.checked)}
                        />                
                    </p>
                    <p>
                        <Form.Check
                            label="Diagonal Win"
                            type="switch"
                            checked={happenedDiagonal}
                            onChange={(e) => setHappenedDiagonal(e.target.checked)}
                        />                
                    </p>
                </div>
                <hr/>
                <div>
                    <p>
                        <Form.Check
                            label="Two Directional Win"
                            type="switch"
                            checked={happened}
                            onChange={(e) => setHappened(e.target.checked)}
                        />                
                    </p>
                    <p>
                        <Form.Check
                            label="Three Directional Win"
                            type="switch"
                            checked={happened2}
                            onChange={(e) => setHappened2(e.target.checked)}
                        />                
                    </p>
                </div>
            </form>

            {
                setupInfo.chosenPlayers.map(x => (
                    <Button 
                        variant="outline-primary"
                        onClick={() => endGame(x)}
                    >
                        {x} Won
                    </Button>    
                ))
            }
        </>
    );
};