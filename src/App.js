import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.svg';

function App() {
	const [loading, setLoading] = useState(true);
	const [coins, setCoins] = useState([]);
	const [coinIdx, setCoinIdx] = useState(0);
	const [value, setValue] = useState(0);

	useEffect(() => {
		fetch(
			'https://api.coinpaprika.com/v1/tickers'
		).then((response) => 
			response.json()
		).then((json) => {
			setCoins(json);
			setLoading(false);
		});
	}, []);
	
	function onValChange(event) {
		setValue(event.target.value);
	}
	
	function onChange(event) {
		setCoinIdx(event.target.value);
		console.log(coinIdx);
	}

	return (
		<div className="App">
			<div style={{ backgroundColor: 'black', color: 'white', paddingBottom: '30px' }}>
				<img src={logo} alt="logo" height="50px" width="50px" />
				<h3>Coin Tracker</h3>
			</div>
			<hr/>
			<div className="CoinSelect">
				<h1>The Coin! {loading ? '' : `(${coins.length})`}</h1>
				{loading ? ("Loading...") : (
					<select onChange={onChange}>
						{coins.map((coin, index) => 
							<option value={index}>
								{coin.name}({coin.symbol})
							</option>
						)}
					</select>
				)}
			</div>
			<hr/>
			{loading ? null : (
				<div className="CoinConverter">
					<h4>Coin ID : {coins[coinIdx].id}</h4>
					<h5>Symbol : {coins[coinIdx].symbol}</h5>
					<h5>USD : ${coins[coinIdx].quotes.USD.price}</h5>
					<label htmlFor="USD">USD</label>
					<input
						value={value}
						id="USD"
						placeholder="USD"
						type="number"
						onChange={onValChange}
					/>
					<h5>{value/coins[coinIdx].quotes.USD.price} Coin</h5>
				</div>
			)}
		</div>
	);
}

export default App;