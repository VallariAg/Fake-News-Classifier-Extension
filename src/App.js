/*global chrome*/
import React, { useState } from 'react';
import logo from './logo.png';
import news from './news.svg';

import './App.css';
import { Button, Paper, Fab } from '@material-ui/core';

function App() {
  const [result, setResult] = useState("")

  async function predict() {
    setResult("...")
    const API_URL = "https://fake-news---detector.herokuapp.com/predict";
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      let url = (tabs[0].url);
      fetch(API_URL, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'text/plain;charset=UTF-8'
        }),
        body: url,
      }).then(function (response) {
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status code: ${response.status}`);
          return;
        }
        response.json().then(function (data) {
          setResult(data['result'].toUpperCase());
        });
      })
        .catch(function (error) {
          console.log("Fetch error: " + error);
        });
    });
  }
  return (
    <div className="App">
      <header className="App-header">
        <div id="xheader"><img src={news} className="App-logo" alt="logo" /></div>
        <div id="xbody">
          <div id="text"> Is this article fake?</div>
          <Fab color="secondary" variant="extended" id="predict" onClick={predict}>Predict news</Fab>
          <div id="result"> {result} </div>
        </div>
      </header>
    </div>
  );
}

export default App;
