import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase'; 
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase'; 
import './SlotMachine.css';
import Reel from './Reel';

const iconMap = ["banana", "seven", "cherry", "plum", "orange", "bell", "bar", "lemon", "melon"];
const numIcons = 9;
const iconHeight = 79;
const timePerIcon = 100;
const spinCost = 50;
const winPayouts = {
  win1: 100,
  win2: 500
};

const SlotMachine = () => {
  const [indexes, setIndexes] = useState([0, 0, 0]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [money, setMoney] = useState(null); // Initialize as null to indicate loading

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const fetchUserMoney = async () => {
        const userDoc = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          setMoney(docSnap.data().money); // Set the actual money from Firestore
        }
      };
      fetchUserMoney();
    }
  }, []);

  const updateUserStatsInFirestore = async (newMoney, spentAmount = 0, winningsAmount = 0) => {
    const user = auth.currentUser;
    if (user) {
      const userDoc = doc(db, 'users', user.uid);
      const userSnapshot = await getDoc(userDoc);
      
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();

        await setDoc(userDoc, {
          money: newMoney,
          moneyLost: (userData.moneyLost || 0) + spentAmount,
          moneyGained: (userData.moneyGained || 0) + winningsAmount,
          gamesPlayed: (userData.gamesPlayed || 0) + 1 // Increment gamesPlayed by 1
        }, { merge: true });
      }
    }
  };

  const resetMoneyTo1000 = async () => {
    const user = auth.currentUser;
    if (user) {
      const userDoc = doc(db, 'users', user.uid);
      await setDoc(userDoc, { money: 1000 }, { merge: true });
      setMoney(1000); // Update the state after resetting the money
    }
  };

  const roll = (reel, offset = 0) => {
    const delta = (offset + 2) * numIcons + Math.round(Math.random() * numIcons);
    const style = getComputedStyle(reel);
    const backgroundPositionY = parseFloat(style['background-position-y']);
    const targetBackgroundPositionY = backgroundPositionY + delta * iconHeight;
    const normTargetBackgroundPositionY = targetBackgroundPositionY % (numIcons * iconHeight);

    return new Promise(resolve => {
      setTimeout(() => {
        reel.style.transition = `background-position-y ${(8 + delta) * timePerIcon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
        reel.style.backgroundPositionY = `${targetBackgroundPositionY}px`;
      }, offset * 150);

      setTimeout(() => {
        reel.style.transition = 'none';
        reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
        resolve(delta % numIcons);
      }, (8 + delta) * timePerIcon + offset * 150);
    });
  };

  const checkResults = (newIndexes) => {
    let winnings = 0;
    if (newIndexes[0] === newIndexes[1] || newIndexes[1] === newIndexes[2]) {
      const winClass = newIndexes[0] === newIndexes[2] ? 'win2' : 'win1';
      winnings = winClass === 'win2' ? winPayouts.win2 : winPayouts.win1;
      const newMoney = money + winnings;
      setMoney(newMoney);
      updateUserStatsInFirestore(newMoney, 0, winnings); // Update Firestore with new money and winnings
      document.querySelector('.slots').classList.add(winClass);
      setTimeout(() => document.querySelector('.slots').classList.remove(winClass), 2000);
    }
  };

  const rollAll = () => {
    if (isSpinning || money < spinCost) return;
    setIsSpinning(true);
    const newMoney = money - spinCost;
    setMoney(newMoney);
    updateUserStatsInFirestore(newMoney, spinCost); // Update Firestore with new money and spent

    const reels = document.querySelectorAll('.slots > .reel');

    Promise.all([...reels].map((reel, i) => roll(reel, i))).then(deltas => {
      const newIndexes = indexes.map((index, i) => (index + deltas[i]) % numIcons);
      setIndexes(newIndexes);
      checkResults(newIndexes);
      setIsSpinning(false);
    });
  };

  if (money === null) {
    return <div>Loading...</div>; // Display loading state while fetching data
  }

  return (
    <div>
      <div className="slots">
        <Reel />
        <Reel />
        <Reel />
      </div>
      <button onClick={rollAll} disabled={isSpinning || money < spinCost}>
        {isSpinning ? 'Spinning...' : `Spin (-$${spinCost})`}
      </button>
      <div className="money">Money: ${money}</div>
      {money < spinCost && <div className="no-money">Not enough money to spin!</div>}
      <button onClick={resetMoneyTo1000}>Reset Money to $1000</button>
    </div>
  );
};

export default SlotMachine;
