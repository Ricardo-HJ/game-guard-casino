import React, { useState } from "react"
import { useNavigate } from 'react-router-dom';

export const Visitante =  (props) => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log();
    }
    return (
        <div>
            <div className="topnav">
                <h3 className="marca" > GameGuard </h3>
                <div className="buttonContainer">
                    <button className="topButton2" onClick={() => navigate('/start')}> Return </button>
                </div>
            </div>
            <h1 className = "subtitulos">Start Playing</h1>
            <div className="row">
                <div className="column">
                    <div className="content-box">
                        <h2>POKER</h2>
                        <button className="column-button">Play Now</button> {/*AGREGAR ONCLICK PARA NAV */}
                        <img 
                            src="https://pngimg.com/uploads/poker/poker_PNG50.png" 
                            alt="Image 2" 
                            className="image" 
                        /> 
                    </div>
                </div>
                <div className="column">
                    <div className="content-box">
                        <h2>BLACKJACK</h2>
                        <button className="column-button">Play Now</button> 
                        <img 
                            src="https://png.pngtree.com/png-vector/20220812/ourmid/pngtree-blackjack-png-image_6107450.png " 
                            alt="Image 2" 
                            className="image" 
                        />
                    </div>
                </div>
                <div className="column">
                    <div className="content-box">
                        <h2>ROULETTE</h2>
                        <button className="column-button" onClick={() => navigate('/ruleta')}>Play Now</button> {/*AGREGAR ONCLICK PARA NAV */}
                        <img
                            src="https://i.pinimg.com/originals/29/be/02/29be02186cc40532049ad529a7ff11af.png"
                            alt="Roulette"
                            className="image"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}