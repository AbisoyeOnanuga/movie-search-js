import React from 'react';
import './Spinner.css'; // Import spinner styles

const Spinner = () => {
    return (
        <div className="spinner">
            {/* You can use an animated SVG or CSS animation here */}
            <div className="loader"></div>
        </div>
    );
};

export default Spinner; 