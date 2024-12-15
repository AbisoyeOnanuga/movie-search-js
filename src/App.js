import React, { useEffect, useState } from 'react';
import axios from 'axios';
import searchIcon from './search.svg'; // Import the search icon
import searchIconWhite from './search-white.svg'; // Import the white search icon
import './App.css'; // Import the CSS file
import MovieCard from './MovieCard'; // Import the MovieCard component
import Spinner from './Spinner'; // Import the Spinner component
import ErrorMessage from './ErrorMessage'; // Import the ErrorMessage component

const App = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('Titanic'); // Default search term
    const [showSearch, setShowSearch] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const searchMovies = async (term, page = 1) => {
        if (!term) return; // Prevent making a request if the search term is empty
        setLoading(true);
        const options = {
            method: 'GET',
            url: 'https://imdb-com.p.rapidapi.com/search',
            params: { searchTerm: term, page: page },
            headers: {
                'x-rapidapi-key': 'f2bbb5b1a3msh7d83c14ad42bc40p1625f7jsn1b8d7d32e5a8',
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
        document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    }, [darkMode]);

    useEffect(() => {
        searchMovies('Titanic'); // Perform the initial search with the default term
    }, []); // Empty dependency array to run only once on mount    

    const resetTimeout = () => {
        if (timeoutId) clearTimeout(timeoutId);
        const newTimeoutId = setTimeout(() => {
            setShowSearch(false);
            setIsSearchActive(false);
        }, 10000); // 5 seconds of inactivity
        setTimeoutId(newTimeoutId);
    };
    
    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    const handleSearchInput = (e) => {
        setSearchTerm(e.target.value);
        resetTimeout();
    };

    const handleSearchIconClick = () => {
        if (!isSearchActive) {
            setShowSearch(true);
            setIsSearchActive(true);
            resetTimeout();
        } else {
            searchMovies(searchTerm);
        }
    };

    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            searchMovies(searchTerm);
            resetTimeout();
        }
    };

    if (loading) return <Spinner />;
    if (error) return <ErrorMessage message={`Error: ${error}`} onRetry={() => searchMovies(searchTerm)} />;

    return (
        <div className="App">
            <button className={`theme-toggle-button ${darkMode ? 'dark' : ''}`} onClick={toggleTheme}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <div className="header">
                <h1>Movie Land</h1>
            </div>
            <div className={`search-bar ${showSearch ? 'active' : ''}`}>
                <img 
                    src={darkMode ? searchIconWhite : searchIcon}
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
                    <MovieCard key={movie.node.entity.id} movie={movie} />
                ))}
            </div>
            <footer>
                <p className="disclaimer">
                    Disclaimer: The API used in this application has a rate limit of 500 requests per month and 5 requests per second.
                </p>
            </footer>
        </div>
    );    
}

export default App;
