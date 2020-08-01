import React, { useState } from 'react';
import logo from './logo.png';
import './App.css';
import { Button, Paper } from '@material-ui/core';

function App() {
  const [result, setResult] = useState("")

  // let result = <h3>
  async function predict() {
    const API_URL = "http://127.0.0.1:5000/predict";
    console.log(API_URL)
    await fetch(API_URL, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'text/plain;charset=UTF-8'
      }),
      body: "https://stackoverflow.com/questions/25860304/how-do-i-set-response-headers-in-flask",
    }).then(function (response) {
      if (response.status !== 200) {
        console.log(`Looks like there was a problem. Status code: ${response.status}`);
        return;
      }
      response.json().then(function (data) {
        console.log(data);
        setResult(data['result'].toUpperCase());
        console.log(data['result']);
      });
    })
      .catch(function (error) {
        console.log("Fetch error: " + error);
      });
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button id="predict" color="primary" onClick={predict}>Predict news</Button>
        <Paper elevation={3}> {result} </Paper>
      </header>
    </div>
  );
}

export default App;
