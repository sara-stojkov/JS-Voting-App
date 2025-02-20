// src/components/VotingGame.js
import React, { useState, useEffect } from 'react';

const VotingGame = () => {
  const [joke, setJoke] = useState(null);

  useEffect(() => {
    fetchJoke(); // Fetch a joke when the component mounts
  }, []);

  const fetchJoke = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/joke');
      if (response.ok) {
        const jokeData = await response.json();
        setJoke(jokeData); // Store the joke in state
      } else {
        console.error('Failed to fetch joke');
      }
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
  };

  const submitVote = async (emoji) => {
    if (!joke) return;
    try {
      const response = await fetch(`http://localhost:5000/api/joke/${joke.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emoji }),
      });

      if (response.ok) {
        const updatedJoke = await response.json();
        setJoke(updatedJoke); // Update the joke with new vote counts
      } else {
        console.error('Failed to submit vote');
      }
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };

  return (
    <div>
      {joke ? (
        <div>
          <h2>{joke.question}</h2>
          <p>{joke.answer}</p>
          <div>
            {joke.availableVotes.map((emoji) => (
              <button key={emoji} onClick={() => submitVote(emoji)}>
                {emoji} {joke.votes.find((vote) => vote.label === emoji)?.value || 0}
              </button>
            ))}
          </div>
          <button onClick={fetchJoke}>Next Joke</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default VotingGame;
