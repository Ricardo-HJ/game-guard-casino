import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase'; 
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; 

export const Perfil = () => {
    const navigate = useNavigate();
    const [userStats, setUserStats] = useState({ moneyLost: 0, moneyGained: 0, gamesPlayed: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const fetchUserStats = async () => {
                const userDoc = doc(db, 'users', user.uid);
                const docSnap = await getDoc(userDoc);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUserStats({
                        moneyLost: userData.moneyLost || 0,
                        moneyGained: userData.moneyGained || 0,
                        gamesPlayed: userData.gamesPlayed || 0
                    });
                }
                setLoading(false); // Set loading to false after fetching
            };
            fetchUserStats();
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log();
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading state while fetching user stats
    }

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
                        <a>Money Lost</a>
                        <h1 className="statistics">${userStats.moneyLost}</h1>
                    </div>
                    <div className="statistic-box">
                        <a>Money Gained</a>
                        <h1 className="statistics">${userStats.moneyGained}</h1>
                    </div>
                    <div className="statistic-box">
                        <a>Games Played</a>
                        <h1 className="statistics">{userStats.gamesPlayed}</h1>
                    </div>
                    <div className="statistic-box">
                        <a>Current Outcome</a>
                        <h1 className="statistics" style={{ color: 'greenyellow' }}>
                            {userStats.moneyGained > userStats.moneyLost ? 'Positivo' : 'Negativo'}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};
