import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Home from "./pages/home";
import Private from './pages/private';
import { onAuthStateChanged } from 'firebase/auth';
import ProtectedRoute from './components/protectedRoute';
import { auth } from './firebase';
import { Register } from './pages/Register';
import { Start } from './pages/Start';
import { Visitante } from './pages/Visitante';
import { Usuario } from './pages/Usuario';
import Ruleta from './pages/Ruleta'; // Importa la página de la ruleta

function App() {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
        return;
      }
      setUser(null);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  if (isFetching) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Start />} />
        <Route path="/private" element={
          <ProtectedRoute user={user}>
            <Private />
          </ProtectedRoute>
        } />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/visitante" element={<Visitante />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/start" element={<Start />} />
        <Route path="/ruleta" element={<Ruleta />} /> {/* Nueva ruta de la ruleta */}
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
