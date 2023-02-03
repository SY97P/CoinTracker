import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CoinTracker from './CoinTracker.js';

function App() {
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(true);
	const [coinIdx, setCoinIdx] = useState(0);
	
	useEffect(() => {
		fetch('https://api.coinpaprika.com/v1/tickers')
		.then((response) => response.json())
		.then((json) => {
			setCoins(json);
			setLoading(false);
		});
	}, []);
	
	function changeCoinIdx(event) {
		setCoinIdx(event.target.value);
	}
	
	return (
		<div className="App">
			<div className="App-header">
				<img className="App-logo" src={logo} alt=""/>
				<h4><b>Coin Tracker!!</b></h4>
			</div>
			<hr/>
			<div className="Body">
				{
					loading ? "Coin Information is on loading" : 
					(
						<select onChange={changeCoinIdx}>
							{coins.map((coin, index) => (
								<option value={index} key={index}>
									{coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
								</option>
							))}
						</select>
					)
				}
			</div>
			<div className="Result">
				{loading ? null : (
					<CoinTracker coin={coins[coinIdx]} />
				)}
			</div>
		</div>
	);
}

export default App;