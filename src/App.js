import React from 'react';
import { Link } from "react-router-dom"
import './App.css';

function App() {
  return (
    <div className="App">

        <Link className="App-link" to="/home">Link to the About Page</Link>
      
    </div>
  );
}

export default App;
