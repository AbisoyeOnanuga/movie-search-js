import React, { useEffect, useState } from 'react';
import TitleById from './components/TitleById';
import axios from 'axios';
import './App.css'; // Import the CSS file
import searchIcon from './search.svg';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    const searchMovies = async (searchTerm) => {
        const options = {
            method: 'GET',
            url: 'https://imdb-com.p.rapidapi.com/search',
            params: { searchTerm: searchTerm },
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
        searchMovies('Titanic'); // Example search term for demonstration
    }, []);

    useEffect(() => {
        document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // Add a conditional check to ensure `movies` is defined and is an array
    if (!Array.isArray(movies)) {
        return <p>No movies found.</p>;
    }

    return (
        <div className="App">
            <button className={`theme-toggle-button ${darkMode ? 'dark' : ''}`} onClick={toggleTheme}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <h1>Movie Land</h1>
            <TitleById />
            <div>
                <input 
                    placeholder="search for movies"
                    value="{}"
                    onChange={() => {}}
                />
                <img 
                    src={searchIcon}
                    alt="search"
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
