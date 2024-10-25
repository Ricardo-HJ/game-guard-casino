import React, { useState } from 'react';
import './Ruleta.css'; 
import ruletaImage from '../assets/ruleta.png'; 
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Import Firebase authentication

const tablero = [
  { numero: 3, color: 'red' }, { numero: 6, color: 'black' }, { numero: 9, color: 'red' }, { numero: 12, color: 'red' }, 
  { numero: 15, color: 'black' }, { numero: 18, color: 'red' }, { numero: 21, color: 'red' }, { numero: 24, color: 'black' }, 
  { numero: 27, color: 'red' }, { numero: 30, color: 'black' }, { numero: 33, color: 'red' }, { numero: 36, color: 'black' },
  { numero: 2, color: 'black' }, { numero: 5, color: 'red' }, { numero: 8, color: 'black' }, { numero: 11, color: 'black' }, 
  { numero: 14, color: 'red' }, { numero: 17, color: 'black' }, { numero: 20, color: 'black' }, { numero: 23, color: 'red' }, 
  { numero: 26, color: 'black' }, { numero: 29, color: 'black' }, { numero: 32, color: 'red' }, { numero: 35, color: 'black' },
  { numero: 1, color: 'red' }, { numero: 4, color: 'black' }, { numero: 7, color: 'red' }, { numero: 10, color: 'black' }, 
  { numero: 13, color: 'red' }, { numero: 16, color: 'black' }, { numero: 19, color: 'red' }, { numero: 22, color: 'black' }, 
  { numero: 25, color: 'red' }, { numero: 28, color: 'black' }, { numero: 31, color: 'red' }, { numero: 34, color: 'black' },
  { numero: 0, color: 'green' }
];

const Ruleta = () => {
  const navigate = useNavigate();
  const [apuesta, setApuesta] = useState(null);
  const [girando, setGirando] = useState(false);
  const [ganador, setGanador] = useState(null); // Estado para el número ganador

  const handleApuesta = (numero) => {
    setApuesta(numero);
    console.log(`Has apostado al número: ${numero}`);
  };

  const girarRuleta = () => {
    setGirando(true);
    setGanador(null); // Reinicia el mensaje de ganador antes del giro

    setTimeout(() => {
      const resultado = Math.floor(Math.random() * tablero.length);
      setGanador(tablero[resultado].numero); // Actualiza el número ganador
      setGirando(false);
    }, 3000); // Simula 3 segundos de giro
  };

  const handleNavigate = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        navigate('/usuario');
      } else {
        navigate('/visitante');
      }
    });
  };

  const picks = [
    { label: 'Red', color: 'red' }, 
    { label: 'Black', color: 'black' }
  ];

  return (
    <>
      <div className="topnav">
        <h3 className="marca">GameGuard</h3>
        <div className="buttonContainer">
          <button className="topButton2" onClick={handleNavigate}>Return</button>
          <button className="topButton1" onClick={() => navigate('/start')}>SignOut</button>
        </div>
      </div>
      
      <div className="ruleta-container">
        <img src={ruletaImage} alt="Ruleta" className={`ruleta-imagen ${girando ? 'girar' : ''}`} />

        <h2>Elige tu número</h2>
        <div className="tablero-grid">
          {tablero.map((item) => (
            <div
              key={item.numero}
              className={`casilla ${item.color} ${item.numero === 0 ? 'casilla-0' : ''}`}
              onClick={() => handleApuesta(item.numero)}
            >
              {item.numero}
            </div>
          ))}
          <div className="picks-grid">
            {picks.map((pick, index) => (
              <div key={index} className={`pick ${pick.color || ''}`} onClick={() => handleApuesta(pick.label)}>
                {pick.label}
              </div>
            ))}
          </div>
        </div>
        {apuesta !== null && <p>Apuesta seleccionada: {apuesta}</p>}
        
        <button onClick={girarRuleta} disabled={girando}>Girar ruleta</button>

        {/* Mostrar el número ganador */}
        {ganador !== null && <p>El número ganador es: {ganador}</p>}
      </div>
    </>
  );
};

export default Ruleta;
