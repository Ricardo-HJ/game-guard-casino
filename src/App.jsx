import { useEffect, useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./pages/home"
import Private from './pages/private'
import { onAuthStateChanged } from 'firebase/auth'
import ProtectedRoute from './components/protectedRoute'
import { auth } from './firebase'

function App() {
  const[user, setUser] = useState(null);
  const[isFetching, setIsFetching] = useState(true);
  //const [count, setCount] = useState(0)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user){
        setUser(user);
        setIsFetching(false);

        return;
      }
      setUser(null);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  if(isFetching){
    return <h2>Loading...</h2>
  }

  return (
    <BrowserRouter>
    <Routes>
        <Route index path='/' element={<Home></Home>}></Route>
        <Route index path='/private' element={<ProtectedRoute user={user}>
          <Private></Private>
        </ProtectedRoute>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
