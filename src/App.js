import React, { useEffect, useState } from 'react';
import TitleById from './components/TitleById';
import axios from 'axios';
import './App.css'; // Import the CSS file

const App = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    const searchMovies = async (title) => {
        const options = {
            method: 'GET',
            url: 'https://movie-database-alternative.p.rapidapi.com/',
            params: {
                s: title,
                r: 'json',
                page: '1'
            },
            headers: {
                'x-rapidapi-key': 'f2bbb5b1a3msh7d83c14ad42bc40p1625f7jsn1b8d7d32e5a8',
                'x-rapidapi-host': 'movie-database-alternative.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data); // Log the response to check its structure
            setMovies(response.data.Search); // Access the 'Search' array from the response
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        searchMovies('Avengers Endgame');
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
            <div className="movies-grid">
                {movies.map(movie => (
                    <div key={movie.imdbID} className="movie-card">
                        <img src={movie.Poster} alt={movie.Title} />
                        <h2>{movie.Title} ({movie.Year})</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
