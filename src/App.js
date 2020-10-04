/*global chrome*/
import React, { useState } from 'react';
import logo from './logo.png';
import news from './news.svg';

import './App.css';
import { Button, Paper, Fab, CircularProgress } from '@material-ui/core';
// import MuiAlert from '@material-ui/lab/Alert';


function App() {
  const loader = <CircularProgress color="secondary" />;
  const fakeNews = <div style={{ color: "red", paddingTop: "16%" }}>FAKE</div>;
  const trueNews = <div style={{ color: "green", paddingTop: "16%" }}>FACT</div>
  const predictButton = <Fab color="secondary" variant="extended" id="predict" onClick={predict}>Check this page</Fab>

  const [result, setResult] = useState(predictButton)

  async function predict() {
    setResult(loader);
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
          let result = data['result'];
          if (result == 'fake') { setResult(fakeNews); }
          else { setResult(trueNews); }
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
          <div id="text"> Fact or Fake? </div>
          <div id="result"> {result} </div>
        </div>
      </header>
    </div>
  );
}

export default App;
