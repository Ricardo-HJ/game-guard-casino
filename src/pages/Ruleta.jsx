import React, { useState } from 'react';
import './Ruleta.css'; // Asegúrate de tener el archivo CSS para la ruleta
import { db, auth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const numeros = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];

const Ruleta = () => {
  const [girando, setGirando] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [apuesta, setApuesta] = useState('');
  const [dinero, setDinero] = useState(1000);

  const girar = () => {
    setGirando(true);
    const indiceAleatorio = Math.floor(Math.random() * numeros.length);
    const duracion = 5000; // Duración de la animación en milisegundos

    setTimeout(() => {
      setGirando(false);
      const numeroElegido = numeros[indiceAleatorio];
      setResultado(numeroElegido);

      if (parseInt(apuesta) === numeroElegido) {
        alert(`¡Ganaste! El número es ${numeroElegido}`);
        setDinero(dinero + 100);
        actualizarFirestore(dinero + 100, apuesta, numeroElegido);
      } else {
        alert(`¡Perdiste! El número es ${numeroElegido}`);
        setDinero(dinero - 50);
        actualizarFirestore(dinero - 50, apuesta, numeroElegido);
      }
    }, duracion);
  };

  const actualizarFirestore = async (nuevoDinero, cantidadApuesta, numeroResultado) => {
    const usuario = auth.currentUser;
    if (usuario) {
      const docUsuario = doc(db, 'usuarios', usuario.uid);
      await setDoc(docUsuario, {
        dinero: nuevoDinero,
        ultimaApuesta: cantidadApuesta,
        ultimoResultado: numeroResultado,
      }, { merge: true });
    }
  };

  return (
    <div className="contenedor-ruleta">
      <div className={`ruleta ${girando ? 'girando' : ''}`}></div>
      <input
        type="number"
        placeholder="Coloca tu apuesta (0-36)"
        value={apuesta}
        onChange={(e) => setApuesta(e.target.value)}
        disabled={girando}
      />
      <button onClick={girar} disabled={girando || !apuesta}>
        Girar la Ruleta
      </button>
      {resultado !== null && <p>Resultado: {resultado}</p>}
      <p>Dinero: ${dinero}</p>
    </div>
  );
};

export default Ruleta;
