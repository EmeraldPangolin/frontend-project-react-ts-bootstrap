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
    const nav = useNavigate();

    if (setupInfo.chosenPlayers.length !== 2) {
        alert("You need to pick two names");
        setTimeout(function(){
            nav(-1);
        }, 50); 
    }

    const [happened, setHappened] = useState(false);
    const [happened2, setHappened2] = useState(false);

    const [happenedVertical, setHappenedVertical] = useState(false);
    const [happenedHorizontal, setHappenedHorizontal] = useState(false);
    const [happenedDiagonal, setHappenedDiagonal] = useState(false);


    

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
            <h2 >Play</h2>
            <hr/>
            <form>
                <h3>Win Direction</h3>
                <div className="d-flex flex-row m-3 justify-content-center">
                    <p className="mr-5 p-3">
                        <Form.Check
                            label="Horizontal Win"
                            type="radio"
                            name="group1"
                            checked={happenedHorizontal}
                            onChange={(e) => setHappenedHorizontal(e.target.checked)}
                        />                
                    </p>
                    <p className="mr-5 p-3">
                        <Form.Check
                            label="Vertical Win"
                            type="radio"
                            name="group1"
                            checked={happenedVertical}
                            onChange={(e) => setHappenedVertical(e.target.checked)}
                        />                
                    </p>
                    <p className="mr-5 p-3">
                        <Form.Check
                            label="Diagonal Win"
                            type="radio"
                            name="group1"
                            checked={happenedDiagonal}
                            onChange={(e) => setHappenedDiagonal(e.target.checked)}
                        />                
                    </p>
                </div>
                <div className="d-flex flex-col m-3 justify-content-center">
                    <p className="mr-5 p-2">
                        <Form.Check
                            label="Two Directional Win"
                            type="radio"
                            name="group1"
                            checked={happened}
                            onChange={(e) => setHappened(e.target.checked)}
                        />                
                    </p>
                    <p className="mr-5 p-2">
                        <Form.Check
                            label="Three Directional Win"
                            type="radio"
                            name="group1"
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