import React from "react";
import { useNavigate } from 'react-router-dom';

export const Usuario = (props) => {
    const navigate = useNavigate(); // Get the navigate function

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log();
    };

    return (
        <div>
            <div className="topnav">
                <h3 className="marca"> GameGuard </h3>
                <div className="buttonContainer">
                    <button className="topButton2" onClick={() => navigate('/start')}> My Account </button> {/* Change route to profile */}
                    <button className="topButton1" onClick={() => navigate('/start')}> SignOut </button>
                </div>
            </div>
            <h1 className="subtitulos">Welcome Back</h1>
            <div className="row">
                <div className="column">
                    <div className="content-box">
                        <h2>POKER</h2>
                        <button className="column-button" onClick={() => navigate('/poker')}>Play Now</button> {/* Add onClick for nav */}
                        <br />
                        <img src="https://pngimg.com/uploads/poker/poker_PNG50.png" alt="Image 1" className="image" />
                    </div>
                </div>
                <div className="column">
                    <div className="content-box">
                        <h2>BLACKJACK</h2>
                        <button className="column-button" onClick={() => navigate('/blackjack')}>Play Now</button> {/* Add onClick for nav */}
                        <br />
                        <img src="https://png.pngtree.com/png-vector/20220812/ourmid/pngtree-blackjack-png-image_6107450.png" alt="Image 2" className="image" />
                    </div>
                </div>
                <div className="column">
                    <div className="content-box">
                        <h2>MY ACCOUNT</h2>
                        <button className="column-button" onClick={() => navigate('/my-account')}>Play Now</button> {/* Add onClick for nav */}
                        <br />
                        <img src="https://www.pngplay.com/wp-content/uploads/12/Coins-PNG-Photo-Clip-Art-Image.png" alt="Image 3" className="image" />
                    </div>
                </div>
            </div>
        </div>
    );
};
