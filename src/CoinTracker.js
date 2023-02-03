import React, { useState, useEffect } from 'react';
import style from './CoinTracker.module.css';

function CoinTracker({coin}) {
	const [value, setValue] = useState(0);
	const [isCoin, setCoin] = useState(false);
	
	function onChange(event) {
		setValue(event.target.value);
	}
	
	function onReset() {
		setValue(0);
	}
	
	function onToggle() {
		setCoin((current) => !current);
		onReset();
	}
	
	return (
		<div>
			<h3>Coin Info</h3>
			<ul>
				<li className={style.li}>NAME : {coin.name}</li>
				<li className={style.li}>SYMB : {coin.symbol}</li>
				<li className={style.li}>1DAT : {coin.first_date_at}</li>
				<li className={style.li}>LAST : {coin.last_updated}</li>
				<li className={style.li}>RANK : {coin.rank}</li>
				<li className={style.li}>USD  : {coin.quotes.USD.price}</li>
			</ul>
			<label htmlFor="usd" style={{marginRight:'10px'}}>USD</label>
			<input
				value={isCoin ? Number.parseFloat(value*(coin.quotes.USD.price)).toFixed(5) : value}
				id="usd"
				type="number"
				disabled={isCoin}
				onChange={onChange}
			/>
			<br/>
			<label htmlFor="coin" style={{marginRight:'10px'}}>COIN</label>
			<input
				value={isCoin ? value : Number.parseFloat(value/coin.quotes.USD.price).toFixed(5)}	
				id="coin"
				type="number"
				disabled={!isCoin}
				onChange={onChange}
			/>
			<div>
				<button onClick={onToggle}>전환</button>
				<button onClick={onReset}>리셋</button>
			</div>
		</div>
	);
}

export default CoinTracker;