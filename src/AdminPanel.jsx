import React, { useState } from 'react';

const AdminPanel = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newOption, setNewOption] = useState({});

  const addQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([...questions, { text: newQuestion, options: [] }]);
      setNewQuestion('');
    }
  };

  const addOption = (questionIndex) => {
    const optionText = newOption[questionIndex];
    if (optionText && optionText.trim()) {
      const updatedQuestions = [...questions];
      if (updatedQuestions[questionIndex].options.length < 3) { // limit to 3 options
        updatedQuestions[questionIndex].options.push(optionText.trim());
        setQuestions(updatedQuestions);
        setNewOption({ ...newOption, [questionIndex]: '' });
      } else {
        alert('You can only add up to 3 options per question.');
      }
    }
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const removeOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options = updatedQuestions[questionIndex].options.filter((_, i) => i !== optionIndex);
    setQuestions(updatedQuestions);
  };

  const optionLabel = (index) => {
    const labels = ['A', 'B', 'C', 'D'];
    return labels[index] || String.fromCharCode(65 + index);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        maxWidth: '600px',
        margin: '5rem auto',
        backgroundColor: '#1f2937',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
        color: '#f9fafb',
      }}
    >
      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Admin Panel</h2>
      <div style={{ display: 'flex', width: '100%', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Add a new question"
          style={{
            flex: 1,
            padding: '0.75rem',
            backgroundColor: '#374151',
            border: '1px solid #4b5563',
            borderRadius: '4px',
            color: '#f9fafb',
          }}
        />
        <button
          onClick={addQuestion}
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: '#fbbf24',
            color: '#1f2937',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Add Question
        </button>
      </div>

      <ul style={{ width: '100%', listStyle: 'none', padding: 0 }}>
        {questions.map((question, questionIndex) => (
          <li
            key={questionIndex}
            style={{
              backgroundColor: '#374151',
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: '4px',
              color: '#f9fafb',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{question.text}</span>
              <button
                onClick={() => removeQuestion(questionIndex)}
                style={{
                  marginLeft: '1rem',
                  padding: '0.5rem',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Remove
              </button>
            </div>

            <ul style={{ marginTop: '1rem' }}>
              {question.options.map((option, optionIndex) => (
                <li
                  key={optionIndex}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem',
                    backgroundColor: '#2d3748',
                    borderRadius: '4px',
                    marginBottom: '0.5rem',
                    color: '#f9fafb',
                  }}
                >
                  {optionLabel(optionIndex)}: {option}
                  <button
                    onClick={() => removeOption(questionIndex, optionIndex)}
                    style={{
                      marginLeft: '1rem',
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#ef4444',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', marginTop: '0.5rem' }}>
              <input
                type="text"
                value={newOption[questionIndex] || ''}
                onChange={(e) => setNewOption({ ...newOption, [questionIndex]: e.target.value })}
                placeholder="Add option"
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  backgroundColor: '#2d3748',
                  border: '1px solid #4b5563',
                  borderRadius: '4px',
                  color: '#f9fafb',
                }}
              />
              <button
                onClick={() => addOption(questionIndex)}
                style={{
                  marginLeft: '0.5rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#fbbf24',
                  color: '#1f2937',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Add Option
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;