/*global chrome*/
import React, { useState } from 'react';
import logo from './logo.png';
import './App.css';
import { Button, Paper } from '@material-ui/core';

function App() {
  const [result, setResult] = useState("")

  async function predict() {
    setResult("...")
    const API_URL = "http://127.0.0.1:5000/predict";
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
        <img src={logo} className="App-logo" alt="logo" />
        <Button id="predict" color="default" onClick={predict}>Predict news</Button>
        <div id="result" elevation={3}> {result} </div>
      </header>
    </div>
  );
}

export default App;
