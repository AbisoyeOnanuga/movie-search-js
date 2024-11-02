import React from 'react';
import './MovieCard.css'; // Import the CSS file for MovieCard

const MovieCard = ({ movie }) => {
    const { titleText, releaseYear, primaryImage, releaseDate, titleType, principalCredits } = movie.node.entity;

    return (
        <div className="movie-card">
            <img src={primaryImage?.url} alt={titleText.text} />
            <h2>{titleText.text} ({releaseYear?.year || 'N/A'})</h2>
            <div className="movie-details">
                <p>Year: {releaseYear?.year || 'N/A'}</p>
                <p>Casts: {principalCredits?.flatMap(credit => credit.credits).map(credit => credit.name?.nameText.text).join(', ') || 'N/A'}</p>
                <p>Release Date: {releaseDate?.day}/{releaseDate?.month}/{releaseDate?.year}</p>
                <p>Type: {titleType?.text || 'N/A'}</p>
            </div>
        </div>
    );
};

export default MovieCard;
