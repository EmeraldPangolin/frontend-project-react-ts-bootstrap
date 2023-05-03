import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Home } from './Home';
import { Setup } from './Setup';
import { Play } from './Play';

import {
	HashRouter
	, Routes 
	, Route
} from 'react-router-dom';

import { 
	GameResult
	, calculateLeaderboard
	, SetupInfo
	, getPreviousPlayers
	, getShortestGameDuration
	, getLongestGameDuration
	, getAverageGameDurationByPlayerCount
	, getPercentGamesTwoDirectionalWin
	, getPercentGamesThreeDirectionalWin
	, getDiagonalWinTotal
	, getHorizontalWinTotal
	, getVerticalWinTotal
} from './front-end-model';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import localforage from 'localforage';

import { saveGameToCloud, loadGamesFromCloud } from './tca-cloud-api';


const App = () => {

	// State hooks...
	const [results, setGameResults] = useState<GameResult[]>([]);

	const [setupInfo, setSetupInfo] = useState<SetupInfo>({
		start: ""
		, chosenPlayers: []
	});

	const [emailKeyInput, setEmailKeyInput] = useState("");
	const [emailKeySaved, setEmailKeySaved] = useState("");

	
	// useEffect hook
	useEffect(
		() => {

			const loadEmailKeyAndGameResults = async () => {

				try {
					const ek = String(await localforage.getItem("emailKey")) ?? "";

					if (ek.length > 0) {

						const resultsFromCloud = await loadGamesFromCloud(
							ek
							, "tca-bar-react-ts-bootstrap"
						);

						if (!ignore) {
							setGameResults(resultsFromCloud);
						}
					}

					if (!ignore) { 
						setEmailKeyInput(ek);
						setEmailKeySaved(ek);
					}
				}
				catch (err) {
					console.error(err);
				}
			};

			let ignore = false;
			loadEmailKeyAndGameResults();
			return () => {
				ignore = true;
			};
		}
		, [emailKeySaved]
	);

	// Helper functions...
	const addGameResult = (r: GameResult) => {

				// Save the game result to the cloud.
				saveGameToCloud(
					emailKeySaved
					, "tca-bar-react-ts-bootstrap"
					, r.end
					, r
				);
		
				// Optimistically update the lifted app state.

		setGameResults([
			...results
			, r
		]);
	};

	const saveEmailKey = async () => {
		try {
			await localforage.setItem(
				"emailKey"
				, emailKeyInput
			);

			setEmailKeySaved(emailKeyInput);
		}
		catch (err) {
			console.error(err);
		}
	};

	// JSX
	return (
		<div className="App m-3">
			<h1>
				Connect 4
			</h1>
			<h2>
				Companion App
			</h2>
			<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
				<Form.Label>Email address</Form.Label>
				<Form.Control 
					type="text" 
					placeholder="Enter the email to save under"
					value={emailKeyInput} 
					onChange={(e) => setEmailKeyInput(e.target.value)}
				/>
				<Button
					onClick={saveEmailKey}
				>
					Save
				</Button>
			</Form.Group>
			<hr />
			<HashRouter>
				<Routes>
					<Route 
						path="/" 
						element={
							<Home
								leaderboardData={calculateLeaderboard(results)} 
								shortestGameDuration={getShortestGameDuration(results)}
								longestGameDuration={getLongestGameDuration(results)}
								averageGameDurationData={getAverageGameDurationByPlayerCount(results)}
								twoDirectionalWinPercent={getPercentGamesTwoDirectionalWin(results)}
								threeDirectionalWinPercent={getPercentGamesThreeDirectionalWin(results)}
								horizontalWinTotal={getHorizontalWinTotal(results)}
								verticalWinTotal={getVerticalWinTotal(results)}
								diagonalWinTotal={getDiagonalWinTotal(results)}
							/>
						} 
					/>
					<Route 
						path="/setup" 
						element={
							<Setup 
								previousPlayers={getPreviousPlayers(results)}
								setSetupInfo={setSetupInfo}
							/>
						} 
					/>
					<Route 
						path="/play" 
						element={
							<Play
								addGameResultFunc={addGameResult} 
								setupInfo={setupInfo}
							/>
						} 
					/>
				</Routes>
				</HashRouter>
		</div>
	);
}

export default App;