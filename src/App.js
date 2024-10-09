import React, { useState, useEffect } from 'react';
import axios from 'axios';
import searchIcon from './search.svg';
import './App.css';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('Titanic');
    const [showSearch, setShowSearch] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    const searchMovies = async (term) => {
        if (!term) return;
        setLoading(true);
        const options = {
            method: 'GET',
            url: 'https://imdb-com.p.rapidapi.com/search',
            params: { searchTerm: term },
            headers: {
                'x-rapidapi-key': 'f2bbb5b1a3msh7d83c14ad42bc40p1625f7jsn1b8d7d32e5a8',
                'x-rapidapi-host': 'imdb-com.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            setMovies(response.data.data.mainSearch.edges);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchTerm) {
            searchMovies(searchTerm);
        }
    }, [searchTerm]);

    useEffect(() => {
        document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    const handleSearchInput = (e) => {
        setSearchTerm(e.target.value);
        resetTimeout();
    };

    const handleSearchIconClick = () => {
        setShowSearch(true);
        resetTimeout();
    };

    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            searchMovies(searchTerm);
            resetTimeout();
        }
    };

    const resetTimeout = () => {
        if (timeoutId) clearTimeout(timeoutId);
        const newTimeoutId = setTimeout(() => setShowSearch(false), 5000);
        setTimeoutId(newTimeoutId);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="App">
            <button className={`theme-toggle-button ${darkMode ? 'dark' : ''}`} onClick={toggleTheme}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <h1>Movie Land</h1>
            <div className={`search-bar ${showSearch ? 'active' : ''}`}>
                <img
                    src={searchIcon}
                    alt="search"
                    className={`search-icon ${showSearch ? 'animate' : ''}`}
                    onClick={handleSearchIconClick}
                />
                <input
                    placeholder="Titles, people, genres"
                    value={searchTerm}
                    onChange={handleSearchInput}
                    onKeyDown={handleSearchSubmit}
                    className="search-input"
                />
            </div>
            <div className="movies-grid">
                {movies.map(movie => (
                    <div key={movie.node.entity.id} className="movie-card">
                        <img src={movie.node.entity.primaryImage?.url} alt={movie.node.entity.titleText.text} />
                        <h2>{movie.node.entity.titleText.text} ({movie.node.entity.releaseYear.year})</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
