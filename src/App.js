import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';
import './Coin.css'

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data);
        console.log(res);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
      </div>
      <div className='coin-container'>
        <div className='coin-row'>
          <div className='coin' style={{ justifyContent: "center" }}>
            
            <h1 className='colChange' style={{ fontWeight: "100",fontSize:"16px" }}>Name</h1>
            <p className='coin-symbol colChange' style={{ textTransform: "capitalize" }}>Symbol</p>
          </div>
          <div className='coin-data'>
            <p className='coin-price colChange'>Price</p>
            <p className='coin-volume colChange'>Volume</p>
            <p className='coin-volume colChange'>Price Change(in %)</p>



            <p className='coin-marketcap colChange'>
              Mkt Cap
            </p>
          </div>
        </div>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}

export default App;