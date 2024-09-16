import React, { useEffect, useState } from 'react';
import TitleById from './components/TitleById';
import axios from 'axios';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const searchMovies = async (title) => {
        const options = {
            method: 'GET',
            url: `https://imdb-movies-web-series-etc-search.p.rapidapi.com/${title}.json`,
            headers: {
                'x-rapidapi-key': 'f2bbb5b1a3msh7d83c14ad42bc40p1625f7jsn1b8d7d32e5a8',
                'x-rapidapi-host': 'imdb-movies-web-series-etc-search.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setMovies(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        searchMovies('spiderman');
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="App">
            <h1>App</h1>
            <TitleById />
            {movies.map(movie => (
                <div key={movie.id}>
                    <h2>{movie.title} ({movie.year})</h2>
                </div>
            ))}
        </div>
    );
}

export default App;
