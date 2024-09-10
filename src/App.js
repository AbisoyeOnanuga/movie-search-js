import React, { useEffect } from 'react';
import TitleById from './components/TitleById';
import { ApolloProvider, gql, useLazyQuery } from '@apollo/client';
import client from './apolloClient';

const SEARCH_MOVIES = gql`
    query SearchMovies($title: String!) {
        searchMovies(title: $title) {
            id
            title
            year
        }
    }
`;

const App = () => {
    const [searchMovies, { loading, error, data }] = useLazyQuery(SEARCH_MOVIES);

    useEffect(() => {
        searchMovies({ variables: { title: 'spiderman' } }); // example title
    }, [searchMovies]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <ApolloProvider client={client}>
            <div className="App">
                <h1>App</h1>
                <TitleById />
                {data?.searchMovies.map(movie => (
                    <div key={movie.id}>
                        <h2>{movie.title} ({movie.year})</h2>
                    </div>
                ))}
            </div>
        </ApolloProvider>
    );
}

export default App;
