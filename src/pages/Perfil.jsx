import React from "react";
import { useNavigate } from 'react-router-dom';

export const Perfil = (props) => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log();
    };

    return (
        <div className="fondoPerfil">
            <div className="topnav">
                <h3 className="marca"> GameGuard </h3>
                <div className="buttonContainer">
                    <button className="topButton2" onClick={() => navigate('/usuario')}> Back </button>
                    <button className="topButton1" onClick={() => navigate('/start')}> SignOut </button>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', margin: '0 auto' }}>
                <h1 style={{ margin: '200px ' }}>Statistics</h1>
                
                <div className="statistic-container" style={{ display: 'flex', justifyContent: 'space-around', width: '100%', maxWidth: '1100px' }}>
                    <div className="statistic-box">
                        <a>MoneyLost</a>
                        <h1 className="statistics">$800</h1>
                    </div>
                    <div className="statistic-box">
                        <a>MoneyGained</a>
                        <h1 className="statistics">$500</h1>
                    </div>
                    <div className="statistic-box">
                        <a>GamesPlayed</a>
                        <h1 className="statistics">115</h1>
                    </div>
                    <div className="statistic-box">
                        <a>CurrentOutcome</a>
                        <h1 className="statistics" style={{ color: 'greenyellow' }}>Positivo</h1>
                    </div>
                </div>
            </div>

        </div>
    );
};
