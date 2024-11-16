// src/Dashboard.js

import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getQuestions = () => {
      const sampleQuestions = [
        'What is your name?',
        'What is your favorite color?',
        'What is the capital of France?'
      ];
      setQuestions(sampleQuestions);
    };

    getQuestions();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <ul>
        {questions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
