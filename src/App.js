import React, { useEffect, useState } from 'react';
import axios from 'axios';
import searchIcon from './search.svg'; // Import the search icon
import './App.css'; // Import the CSS file

const App = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('Titanic'); // Default search term
    const [showSearch, setShowSearch] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    const searchMovies = async (term) => {
        if (!term) return; // Prevent making a request if the search term is empty
        setLoading(true);
        const options = {
            method: 'GET',
            url: 'https://imdb-com.p.rapidapi.com/search',
            params: { searchTerm: term },
            headers: {
                'x-rapidapi-key': 'your-api-key',
                'x-rapidapi-host': 'imdb-com.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data); // Log the response to check its structure
            setMovies(response.data.data.mainSearch.edges); // Access the 'edges' array from the response
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        searchMovies(searchTerm); // Only search on initial render or when searchTerm changes
    }, []);

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
        searchMovies(searchTerm);
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
        const newTimeoutId = setTimeout(() => setShowSearch(false), 5000); // 5 seconds of inactivity
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
                    className="search-icon"
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
                        <h2>{movie.node.entity.titleText.text} ({movie.node.entity.releaseYear?.year || 'N/A'})</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
