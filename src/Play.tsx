import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { GameResult, SetupInfo } from './front-end-model';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Dropdown, Option } from "./Dropdown";

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
    const nav = useNavigate();

    const endGame = (winner: string) => {
        
        addGameResultFunc({
            winner: winner
            , players: setupInfo.chosenPlayers
            , start: setupInfo.start
            , end: new Date().toISOString()
            , twoDirectionalWin: happened
            , threeDirectionalWin: happened
        });
        nav(-2);
    };
    return (
        <>
            <h2>Play</h2>
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
                    checked={!happened}
                    onChange={(e) => setHappened(e.target.checked)}
                />                
            </p>
            <div>
                <Dropdown
                formLabel="Choose a service"
                buttonText="Send form"
                action="/"
                >
                <Option selected value="Click to see options" />
                <Option value="Option 1" />
                <Option value="Option 2" />
                <Option value="Option 3" />
                </Dropdown>
            </div>
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