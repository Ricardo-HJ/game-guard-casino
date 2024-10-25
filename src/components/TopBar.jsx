import React from 'react';
import '../App.css'; // Optional: CSS for styling

const TopBar = ({ status }) => {
    return (
    <div className="topbar">
        <span className={`status ${status.toLowerCase()}`}>
            ✴ {status}
        </span>
    </div>
    );
};

export default TopBar;
