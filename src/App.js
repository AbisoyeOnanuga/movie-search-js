import React, { useEffect, useState } from 'react';
import TitleById from './components/TitleById';
import axios from 'axios';
import './App.css'; // Import the CSS file

const App = () => {
    const [taglines, setTaglines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    const fetchTaglines = async (tconst) => {
        const options = {
            method: 'GET',
            url: 'https://imdb-com.p.rapidapi.com/title/get-taglines',
            params: {
                tconst: tconst
            },
            headers: {
                'x-rapidapi-key': 'f2bbb5b1a3msh7d83c14ad42bc40p1625f7jsn1b8d7d32e5a8',
                'x-rapidapi-host': 'imdb-com.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data); // Log the response to check its structure
            setTaglines(response.data.taglines); // Access the 'taglines' array from the response
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTaglines('tt0120338'); // Example tconst for demonstration
    }, []);

    useEffect(() => {
        document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="App">
            <button className={`theme-toggle-button ${darkMode ? 'dark' : ''}`} onClick={toggleTheme}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <h1>App</h1>
            <TitleById />
            <div className="taglines">
                {taglines.map((tagline, index) => (
                    <div key={index} className="tagline-card">
                        <p>{tagline}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
