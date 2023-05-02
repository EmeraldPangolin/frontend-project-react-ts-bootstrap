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


const hardcodedGameResults: GameResult[] = [
	{
			winner: "Tom"
			, players: ["Tom", "Taylor"]
			, start: "2023-03-23T17:38:23.230Z"
			, end: "2023-03-23T17:40:23.230Z"
			, twoDirectionalWin: false
			, threeDirectionalWin: false
			, verticalWin: false
			, horizontalWin: true
			, diagonalWin: false
	}
	, {
			winner: "Taylor"
			, players: ["Jack", "Taylor"]
			, start: "2023-03-23T17:38:23.230Z"
			, end: "2023-03-23T17:40:23.230Z"
			, twoDirectionalWin: false
			, threeDirectionalWin: false
			, verticalWin: true
			, horizontalWin: false
			, diagonalWin: false
	}
	, {
			winner: "Taylor"
			, players: ["Tom", "Taylor"]
			, start: "2023-03-23T17:38:23.230Z"
			, end: "2023-03-23T17:48:23.230Z"
			, twoDirectionalWin: false
			, threeDirectionalWin: false
			, verticalWin: false
			, horizontalWin: false
			, diagonalWin: true
	}
	, {
			winner: "X"
			, players: ["X", "Joe"]
			, start: "2023-03-23T17:38:23.230Z"
			, end: "2023-03-23T17:40:23.230Z"
			, twoDirectionalWin: true
			, threeDirectionalWin: false
			, verticalWin: false
			, horizontalWin: false
			, diagonalWin: false
	}
	, {
			winner: "X"
			, players: ["X", "Joe"]
			, start: "2023-03-23T17:38:23.230Z"
			, end: "2023-03-23T17:40:23.230Z"
			, twoDirectionalWin: true
			, threeDirectionalWin: false
			, verticalWin: false
			, horizontalWin: false
			, diagonalWin: false
	}
	, {
			winner: "Joe"
			, players: ["X", "Joe"]
			, start: "2023-03-23T17:38:23.230Z"
			, end: "2023-03-23T17:40:23.230Z"
			, twoDirectionalWin: false
			, threeDirectionalWin: true
			, verticalWin: false
			, horizontalWin: false
			, diagonalWin: false
	}
	, {
			winner: "Jack"
			, players: ["X", "Joe"]
			, start: "2023-03-23T17:38:23.230Z"
			, end: "2023-03-23T17:40:23.230Z"
			, twoDirectionalWin: false
			, threeDirectionalWin: false
			, verticalWin: false
			, horizontalWin: false
			, diagonalWin: false
	}
];

const App = () => {

	// State hooks...
	const [results, setGameResults] = useState(hardcodedGameResults);

	const [setupInfo, setSetupInfo] = useState<SetupInfo>({
		start: ""
		, chosenPlayers: []
	});

	const [emailKey, setEmailKey] = useState("");

	
	// useEffect hook
	useEffect(
		() => {

			const loadEmailKey = async () => {

				try {
					setEmailKey(
						await localforage.getItem("emailKey") ?? ""
					);
				}
				catch (err) {
					console.error(err);
				}
			};

			loadEmailKey();
		}
		, []
	);

	// Helper functions...
	const addGameResult = (r: GameResult) => {
		setGameResults([
			...results
			, r
		]);
	};

	const saveEmailKey = async () => {
		try {
			await localforage.setItem(
				"emailKey"
				, emailKey
			);
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
					value={emailKey} 
					onChange={(e) => setEmailKey(e.target.value)}
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