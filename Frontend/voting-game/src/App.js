import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Card } from "react-bootstrap";

const App = () => {
  const [joke, setJoke] = useState({ question: "", answer: "", joke: "" });
  const [votes, setVotes] = useState({ like: 0, meh: 0, dislike: 0 });

  // Fetch joke from API and reset votes
  const fetchJoke = async () => {
    try {
      const response = await fetch("https://teehee.dev/api/joke");
      if (!response.ok) throw new Error("Failed to fetch joke");

      const data = await response.json();

      // Store question and answer separately for formatting
      if (data.question && data.answer) {
        setJoke({ question: data.question, answer: data.answer, joke: "" });
      } else if (data.joke) {
        setJoke({ question: "", answer: "", joke: data.joke });
      } else {
        setJoke({ question: "", answer: "", joke: "No joke available!" });
      }

      // Reset votes for the new joke
      setVotes({ like: 0, meh: 0, dislike: 0 });
    } catch (error) {
      console.error("Error fetching joke:", error);
      setJoke({ question: "", answer: "", joke: "Failed to load a joke." });
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  // Handle voting
  const handleVote = (type) => {
    setVotes((prevVotes) => ({ ...prevVotes, [type]: prevVotes[type] + 1 }));
  };

  return (
    <Container className="text-center mt-5">
      <h1 className="mb-4">😂 Voting Game!</h1>
      <Card className="p-4 shadow-sm">
        <Card.Body>
          {joke.joke ? (
            <Card.Text className="fs-4">{joke.joke}</Card.Text>
          ) : (
            <Card.Text className="fs-4">
              {joke.question}
              <br />
              <strong>{joke.answer}</strong>
            </Card.Text>
          )}

          <div className="mt-3">
            <Button variant="success" className="me-2" onClick={() => handleVote("like")}>
              <span role="img" aria-label="thumbs up">👍</span> {votes.like}
            </Button>

            <Button variant="secondary" className="me-2" onClick={() => handleVote("meh")}>
              <span role="img" aria-label="neutral face">😐</span> {votes.meh}
            </Button>

            <Button variant="danger" onClick={() => handleVote("dislike")}>
              <span role="img" aria-label="thumbs down">👎</span> {votes.dislike}
            </Button>
          </div>

          <Button variant="primary" className="mt-3" onClick={fetchJoke}>
            🔄 New Joke
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default App;
