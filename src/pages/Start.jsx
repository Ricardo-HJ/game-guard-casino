import React from "react";
import { useNavigate } from 'react-router-dom';

export const Start = () => {
  const navigate = useNavigate();

  return (
    <div>
        <div className="topnav">
            <h3 className="marca" > GameGuard </h3>
            <div className="buttonContainer">
            <button className="topButton1"  onClick={() => navigate('/register')}> Use your account </button>
            </div>
        </div>

        <h1 className = "titulos">Play Safe, Stay Safe</h1>
        <button className="button" onClick={() => navigate('/visitante')}> Get Started </button> {/*CAMBIAR RUTA A PAG INICIO DE VISITAS*/}
    </div>
  );
};
