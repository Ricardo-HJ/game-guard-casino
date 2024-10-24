import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = () => {
    if (!email || !password) return;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate('/usuario');  // Redirect to a private page upon successful login
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  return (
    <div>
        <div className="topnav">
            <h3 className="marca" > GameGuard </h3>
            <button className="topButton2"  onClick={() => navigate("/start")}> Return </button>
        </div>

        <div className="auth-form-container">
            <h2>Login</h2>
            <div className="login-form">
                <br/>
                <input value={email}  onChange={handleEmailChange} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <input value={password} onChange={handlePasswordChange} type="password" placeholder="Password" id="password" name="password" />
                <br/>
                <button type="button" onClick={handleSignIn}> Login </button>
            </div>
            <button className="link-btn" onClick={() => navigate("/register")}> Don't have an account? Register here.</button>
        </div>
    </div>
  );
};

export default Home;
