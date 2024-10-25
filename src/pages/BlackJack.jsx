import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from "../components/TopBar";
import { auth } from '../firebase'; // Import Firebase authentication

// Card image mapping
const getCardImage = (value, suit) => {
  const suitMap = { 'HEARTS': 'h', 'DIAMONDS': 'd', 'CLUBS': 'c', 'SPADES': 's' };
  const valueMap = { 'JACK': 'J', 'QUEEN': 'Q', 'KING': 'K', 'ACE': 'A', '10': 'T' };
  const cardValue = valueMap[value] || value;
  const cardSuit = suitMap[suit];
  return `${cardValue}${cardSuit}.png`;
};

export default function BlackjackGame() {
  const navigate = useNavigate();

  const [deckId, setDeckId] = useState('');
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameStatus, setGameStatus] = useState('');
  const [isGameActive, setIsGameActive] = useState(false);
  const [pot, setPot] = useState(0);
  const [playerBank, setPlayerBank] = useState(500);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = async () => {
    const newDeck = await createDeck();
    setDeckId(newDeck.deck_id);
    setDeck(newDeck.cards || []);
    setPlayerHand([]);
    setDealerHand([]);
    setGameStatus('');
    setIsGameActive(false);
    setPot(0);
  };

  const createDeck = async () => {
    try {
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      return await response.json();
    } catch (error) {
      console.error('Error fetching deck:', error);
      return { deck_id: '', cards: [] };
    }
  };

  const drawCard = async () => {
    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
      const cardData = await response.json();
      return cardData.cards[0];
    } catch (error) {
      console.error('Error drawing card:', error);
      return null;
    }
  };

  const calculateHandValue = (hand) => {
    let value = 0;
    let aces = 0;

    for (const card of hand) {
      if (['JACK', 'QUEEN', 'KING'].includes(card.value)) {
        value += 10;
      } else if (card.value === 'ACE') {
        aces++;
      } else {
        value += parseInt(card.value);
      }
    }

    // Add Aces
    for (let i = 0; i < aces; i++) {
      if (value + 11 <= 21) {
        value += 11;
      } else {
        value += 1;
      }
    }

    return value;
  };

  const dealCard = async () => {
    const card = await drawCard();
    if (card) {
      setDeck((prevDeck) => prevDeck.filter(c => c.code !== card.code));
      return card;
    }
    return null;
  };

  const startGame = async () => {
    const playerCard1 = await dealCard();
    const dealerCard1 = await dealCard();
    const playerCard2 = await dealCard();
    const dealerCard2 = await dealCard();

    setPlayerHand([playerCard1, playerCard2]);
    setDealerHand([dealerCard1, dealerCard2]);
    setGameStatus('');
    setIsGameActive(true);

    const playerValue = calculateHandValue([playerCard1, playerCard2]);
    const dealerValue = calculateHandValue([dealerCard1, dealerCard2]);

    if (playerValue === 21 && dealerValue === 21) {
      endGame("It's a tie!");
    } else if (playerValue === 21) {
      endGame("Blackjack! You win!");
    } else if (dealerValue === 21) {
      endGame("Dealer Blackjack! You lose.");
    }
  };

  const hit = async () => {
    const newCard = await dealCard();
    if (newCard) {
      const updatedPlayerHand = [...playerHand, newCard];
      setPlayerHand(updatedPlayerHand);
      const playerValue = calculateHandValue(updatedPlayerHand);
      if (playerValue > 21) {
        endGame("Bust! You lose.");
      } else if (playerValue === 21) {
        stand();
      }
    }
  };

  const stand = async () => {
    let updatedDealerHand = [...dealerHand];
    let dealerValue = calculateHandValue(updatedDealerHand);
    
    while (dealerValue < 17) {
      const newCard = await dealCard();
      if (newCard) {
        updatedDealerHand.push(newCard);
        dealerValue = calculateHandValue(updatedDealerHand);
      }
    }

    setDealerHand(updatedDealerHand);
    const playerValue = calculateHandValue(playerHand);

    if (dealerValue > 21) {
      endGame("Dealer busts! You win!");
    } else if (dealerValue > playerValue) {
      endGame("You lose.");
    } else if (dealerValue < playerValue) {
      endGame("You win!");
    } else {
      endGame("It's a tie!");
    }
  };

  const endGame = (status) => {
    setGameStatus(status);
    setIsGameActive(false);
    if (status.includes("win")) {
      setPlayerBank(prevBank => prevBank + pot);
    } else if (status.includes("lose")) {
      setPlayerBank(prevBank => prevBank - pot);
    }
  };

  const placeBet = (amount) => {
    if (amount <= playerBank) {
      setPot(amount);
      setPlayerBank(prevBank => prevBank - amount);
      startGame();
    }
  };

  return (
    <React.Fragment>
      <TopBar status="Blackjack" />
      <div className="game-table">
        <div className="table-container">
          <div className="pot-container">
            <div className="pot-row">
              <img src={require('../assets/Coin Icon.png')} alt="Coin" />
              <text className="pot-label">Pot</text>
            </div>
            <text className="pot-amount">{gameStatus || `$${pot}`}</text>
          </div>
          <div className="cards-container">
            {dealerHand.map((card, index) => (
              <div key={index} className={`middle-card`}>
                <img className="card" src={require(`../assets/Cards/${getCardImage(card.value, card.suit)}`)} alt={`${card.value} of ${card.suit}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="frame-container">
          <div className="actions-container">
            <div className="player-hand-container">
              {playerHand.map((card, index) => (
                <img key={index} className="player-card" src={require(`../assets/Cards/${getCardImage(card.value, card.suit)}`)} alt={`${card.value} of ${card.suit}`} />
              ))}
            </div>
            <div className="actions">
              <div className="actions-row">
                {isGameActive ? (
                  <>
                    <div className="actions-label-container" onClick={stand}>
                      <img src={require('../assets/Check Icon.png')} alt="Stand" />
                      <text className="actions-label">Stand</text>
                    </div>
                    <div className="actions-label-container" onClick={hit}>
                      <img src={require('../assets/gFold Icon.png')} alt="Hit" />
                      <text className="actions-label">Hit</text>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="actions-label-container" onClick={() => placeBet(Math.floor(playerBank / 4))}>
                      <text className="actions-label">Bet 1/4</text>
                    </div>
                    <div className="actions-label-container" onClick={() => placeBet(Math.floor(playerBank / 2))}>
                      <text className="actions-label">Bet 1/2</text>
                    </div>
                    <div className="actions-label-container" onClick={() => placeBet(playerBank)}>
                      <text className="actions-label">All In</text>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="bank-info-container">
            <div className="bank-info-row">
              <img src={require('../assets/Bank Icon.png')} alt="Bank" /> 
              <text className="bank-info-label">Your bank</text>
            </div>
            <text className="bank-amount">${playerBank}</text>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
