import React from 'react';
import '../App.css'; // Optional: CSS for styling
import { useNavigate } from 'react-router-dom';

const TopBar = ({ status }) => {

    const Navigate = useNavigate();

    return (
    <div className="topbar">
        <span className={`status ${status.toLowerCase()}`}>
            ✴ {status}
        </span>
        <div className="buttonContainer">
            <button className="topButton2" onClick={() => Navigate('/start')}>Exit</button> 
        </div>
    </div>
    );
};

export default TopBar;
