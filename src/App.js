import React from 'react';
import { useEffect } from 'react';
import TitleById from './components/TitleById';

const API_URL = 'https://graph.imdbapi.dev/v1'

const App = () => {
    return (
        <div className="App">
            <h1>App</h1>
            <TitleById />
        </div>
    );
}

export default App;
