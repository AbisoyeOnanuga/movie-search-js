import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TitleById = () => {
    const [titleData, setTitleData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTitleById = async (id) => {
        const options = {
            method: 'GET',
            url: `https://imdb-movies-web-series-etc-search.p.rapidapi.com/${id}.json`,
            headers: {
                'x-rapidapi-key': 'f2bbb5b1a3msh7d83c14ad42bc40p1625f7jsn1b8d7d32e5a8',
                'x-rapidapi-host': 'imdb-movies-web-series-etc-search.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setTitleData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTitleById('tt0944947'); // Example ID for demonstration
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>{titleData?.title?.primary_title}</h1>
            <p>{titleData?.title?.plot}</p>
            {/* Display other data as needed */}
        </div>
    );
};

export default TitleById;
