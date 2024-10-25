import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Card image URLs for all ranks and suits
const cardImages = {
    '2': {
        'Hearts': 'https://deckofcardsapi.com/static/img/2H.png',
        'Diamonds': 'https://deckofcardsapi.com/static/img/2D.png',
        'Clubs': 'https://deckofcardsapi.com/static/img/2C.png',
        'Spades': 'https://deckofcardsapi.com/static/img/2S.png',
    },
    '3': {
        'Hearts': 'https://deckofcardsapi.com/static/img/3H.png',
        'Diamonds': 'https://deckofcardsapi.com/static/img/3D.png',
        'Clubs': 'https://deckofcardsapi.com/static/img/3C.png',
        'Spades': 'https://deckofcardsapi.com/static/img/3S.png',
    },
    '4': {
        'Hearts': 'https://deckofcardsapi.com/static/img/4H.png',
        'Diamonds': 'https://deckofcardsapi.com/static/img/4D.png',
        'Clubs': 'https://deckofcardsapi.com/static/img/4C.png',
        'Spades': 'https://deckofcardsapi.com/static/img/4S.png',
    },
    '5': {
        'Hearts': 'https://deckofcardsapi.com/static/img/5H.png',
        'Diamonds': 'https://deckofcardsapi.com/static/img/5D.png',
        'Clubs': 'https://deckofcardsapi.com/static/img/5C.png',
        'Spades': 'https://deckofcardsapi.com/static/img/5S.png',
    },
    '6': {
        'Hearts': 'https://deckofcardsapi.com/static/img/6H.png',
        'Diamonds': 'https://deckofcardsapi.com/static/img/6D.png',
        'Clubs': 'https://deckofcardsapi.com/static/img/6C.png',
        'Spades': 'https://deckofcardsapi.com/static/img/6S.png',
    },
    '7': {
        'Hearts': 'https://deckofcardsapi.com/static/img/7H.png',
        'Diamonds': 'https://deckofcardsapi.com/static/img/7D.png',
        'Clubs': 'https://deckofcardsapi.com/static/img/7C.png',
        'Spades': 'https://deckofcardsapi.com/static/img/7S.png',
    },
    '8': {
        'Hearts': 'https://deckofcardsapi.com/static/img/8H.png',
        'Diamonds': 'https://deckofcardsapi.com/static/img/8D.png',
        'Clubs': 'https://deckofcardsapi.com/static/img/8C.png',
        'Spades': 'https://deckofcardsapi.com/static/img/8S.png',
    },
    '9': {
        'Hearts': 'https://deckofcardsapi.com/static/img/9H.png',
        'Diamonds': 'https://deckofcardsapi.com/static/img/9D.png',
        'Clubs': 'https://deckofcardsapi.com/static/img/9C.png',
        'Spades': 'https://deckofcardsapi.com/static/img/9S.png',
    },
    '10': {
        'Hearts': 'https://deckofcardsapi.com/static/img/10H.png',
        'Diamonds': 'https://deckofcardsapi.com/static/img/10D.png',
        'Clubs': 'https://deckofcardsapi.com/static/img/10C.png',
        'Spades': 'https://deckofcardsapi.com/static/img/10S.png',
    },
    'Jack': {
        'Hearts': 'https://deckofcardsapi.com/static/img/JH.png',
        'Diamonds': 'https://deckofcardsapi.com/static/img/JD.png',
        'Clubs': 'https://deckofcardsapi.com/static/img/JC.png',
        'Spades': 'https://deckofcardsapi.com/static/img/JS.png',
    },
    'Queen': {
        'Hearts': {
            'url': 'https://deckofcardsapi.com/static/img/QH.png',
        },
        'Diamonds': {
            'url': 'https://deckofcardsapi.com/static/img/QD.png',
        },
        'Clubs': {
            'url': 'https://deckofcardsapi.com/static/img/QC.png',
        },
        'Spades': {
            'url': 'https://deckofcardsapi.com/static/img/QS.png',
        },
    },
    'King': {
        'Hearts': {
            'url': 'https://deckofcardsapi.com/static/img/KH.png',
        },
        'Diamonds': {
            'url': 'https://deckofcardsapi.com/static/img/KD.png',
        },
        'Clubs': {
            'url': 'https://deckofcardsapi.com/static/img/KC.png',
        },
        'Spades': {
            'url': 'https://deckofcardsapi.com/static/img/KS.png',
        },
    },
    'Ace': {
        'Hearts': {
            'url': 'https://deckofcardsapi.com/static/img/AH.png',
        },
        'Diamonds': {
            'url': 'https://deckofcardsapi.com/static/img/AD.png',
        },
        'Clubs': {
            'url': 'https://deckofcardsapi.com/static/img/AC.png',
        },
        'Spades': {
            'url': 'https://deckofcardsapi.com/static/img/AS.png',
        },
    }
};

export const BlackJack = (props) => {
    const navigate = useNavigate();

    const [deckId, setDeckId] = useState('');
    const [deck, setDeck] = useState([]); // Initialize as an empty array
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [gameStatus, setGameStatus] = useState('');
    const [isGameActive, setIsGameActive] = useState(false);

    useEffect(() => {
        resetGame();
    }, []);

    const resetGame = async () => {
        const newDeck = await createDeck();
        setDeckId(newDeck.deck_id);
        setDeck(newDeck.cards || []); // Ensure deck is an empty array if cards are undefined
        setPlayerHand([]);
        setDealerHand([]);
        setGameStatus('');
        setIsGameActive(false);
    };

    const createDeck = async () => {
        try {
            const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            return await response.json(); // Return the whole deck object
        } catch (error) {
            console.error('Error fetching deck:', error);
            return { deck_id: '', cards: [] }; // Ensure it returns an empty deck
        }
    };

    const drawCard = async () => {
        try {
            const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
            const cardData = await response.json();
            return cardData.cards[0]; // Return the single card drawn
        } catch (error) {
            console.error('Error drawing card:', error);
            return null; // Handle error accordingly
        }
    };

    const calculateHandValue = (hand) => {
        let value = 0;
        let aces = 0;

        for (const card of hand) {
            if (['JACK', 'QUEEN', 'KING'].includes(card.value)) {
                value += 10;
            } else if (card.value === 'ACE') {
                value += 11;
                aces++;
            } else {
                value += parseInt(card.value);
            }
        }

        while (value > 21 && aces) {
            value -= 10;
            aces--;
        }

        return value;
    };

    const dealCard = async () => {
        const card = await drawCard();
        if (card) {
            setDeck((prevDeck) => prevDeck.filter(c => c.code !== card.code)); // Use 'code' to identify unique cards
            return card;
        }
        return null; // Handle cases where the card could not be drawn
    };

    const startGame = async () => {
        const playerCard1 = await dealCard();
        const playerCard2 = await dealCard();
        const dealerCard1 = await dealCard();
        const dealerCard2 = await dealCard();

        setPlayerHand([playerCard1, playerCard2]);
        setDealerHand([dealerCard1, dealerCard2]);
        setGameStatus('');
        setIsGameActive(true);
    };

    const hit = async () => {
        const newCard = await dealCard();
        if (newCard) {
            setPlayerHand((prev) => [...prev, newCard]);
            checkForEndGame();
        }
    };

    const stand = async () => {
        let updatedDealerHand = [...dealerHand];
        let dealerValue = calculateHandValue(updatedDealerHand);
        const playerValue = calculateHandValue(playerHand);
        
        while (dealerValue < 17 && dealerValue < playerValue) {
            const newCard = await dealCard();
            if (newCard) {
                updatedDealerHand.push(newCard);
                dealerValue = calculateHandValue(updatedDealerHand);
            }
        }

        setDealerHand(updatedDealerHand);
        checkForEndGame(updatedDealerHand);
    };

    const checkForEndGame = (updatedDealerHand) => {
        const playerValue = calculateHandValue(playerHand);
        const dealerValue = calculateHandValue(updatedDealerHand || dealerHand);

        if (playerValue > 21) {
            setGameStatus('Bust! You lose.');
            setIsGameActive(false);
            alert('You bust! You lose.');
        } else if (dealerValue > 21) {
            setGameStatus('Dealer busts! You win!');
            setIsGameActive(false);
            alert('Dealer busts! You win!');
        } else if (updatedDealerHand) {
            if (playerValue > dealerValue) {
                setGameStatus('You win!');
                setIsGameActive(false);
            } else if (playerValue < dealerValue) {
                setGameStatus('You lose.');
                setIsGameActive(false);
            } else {
                setGameStatus('It\'s a tie!');
                setIsGameActive(false);
            }
        }
    };

    return (
        <div>

            <div className="topnav">
                <h3 className="marca"> GameGuard </h3>
                <div className="buttonContainer">
                    <button className="topButton2" onClick={() => navigate('/usuario')}> Exit Game </button>
                </div>
            </div>

            <h1>Blackjack</h1>
            <div>
                <h2>Dealer's Hand</h2>
                <div>
                    {dealerHand.map((card, index) => (
                        <img className="card" key={index} src={card.image} alt={`${card.value} of ${card.suit}`} />
                    ))}
                </div>
            </div>
            <div>
                <h2>Your Hand</h2>
                <div>
                    {playerHand.map((card, index) => (
                        <img className="card" key={index} src={card.image} alt={`${card.value} of ${card.suit}`} />
                    ))}
                </div>
            </div>
            <div>
                <h3>Status: {gameStatus}</h3>
            </div>
            <div>
                {!isGameActive ? (
                    <button onClick={startGame}>Start Game</button>
                ) : (
                    <div className="buttonContainer">
                        <button onClick={hit}>Hit</button>
                        <button onClick={stand}>Stand</button>
                    </div>
                )}
            </div>
        </div>
    );
};