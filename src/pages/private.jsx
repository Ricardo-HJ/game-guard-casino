import React from 'react'
import SlotMachine from '../components/slotmachine/SlotMachine'
import { useNavigate } from 'react-router-dom';

const Private = (props) => {
  const navigate = useNavigate(); // Get the navigate function

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log();
  };
  return (
    <section>
        <div className="topnav">
                <h3 className="marca"> GameGuard </h3>
                <div className="buttonContainer">
                    <button className="topButton2" onClick={() => navigate('/perfil')}> My Account </button> {/* Change route to profile */}
                    <button className="topButton1" onClick={() => navigate('/start')}> SignOut </button>
                </div>
            </div>
        <SlotMachine/>
    </section>
  )
}

export default Private