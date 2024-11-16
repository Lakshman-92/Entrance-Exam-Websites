import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const Start = () => {
  const navigate = useNavigate();

  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correct: "Paris",
    },
    {
      id: 2,
      question: "Who developed the theory of relativity?",
      options: ["Newton", "Einstein", "Tesla", "Curie"],
      correct: "Einstein",
    },
    {
      id: 3,
      question: "What is 5 + 3?",
      options: ["6", "7", "8", "9"],
      correct: "8",
    },
  ];

  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
  });

  const [currentQuestion, setCurrentQuestion] = useState(1);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const startExam = () => {
    setExamStarted(true);
  };

  const submitExam = () => {
    let score = 0;
    questions.forEach((question) => {
      if (answers[`q${question.id}`] === question.correct) {
        score += 1;
      }
    });
    setScore(score);
    setExamCompleted(true);
  };

  const pieChartData = {
    labels: ["Correct", "Incorrect"],
    datasets: [
      {
        data: [score, questions.length - score],
        backgroundColor: ["#28a745", "#dc3545"],
      },
    ],
  };

  const handleQuestionNavigation = (id) => {
    setCurrentQuestion(id);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-blue-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">National Entrance Examination Portal</h1>
          <div className="text-xl">Your Exam</div>
        </div>
      </header>

      <div className="container mx-auto flex mt-8 p-8">
        <div className="w-3/4 pr-8">
          {!examStarted && (
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
              <h2 className="text-2xl font-semibold mb-4">Exam Rules</h2>
              <ul className="text-gray-300 space-y-2">
                <li>1. The exam duration is 30 minutes.</li>
                <li>2. There are a total of 10 questions.</li>
                <li>3. You will receive 1 mark for each correct answer.</li>
                <li>4. No negative marking for incorrect answers.</li>
                <li>5. Once you start the exam, you cannot pause or resume it.</li>
              </ul>
            </div>
          )}

          {!examStarted && !examCompleted && (
            <div className="flex justify-center">
              <button
                onClick={startExam}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
              >
                Start Exam
              </button>
            </div>
          )}

          {examStarted && !examCompleted && (
            <div className="space-y-8">
              {questions
                .filter((q) => q.id === currentQuestion)
                .map((question) => (
                  <div key={question.id}>
                    <h2 className="text-2xl font-semibold mb-4">{question.question}</h2>
                    <div className="space-y-4">
                      {question.options.map((option, idx) => (
                        <label key={idx} className="block text-lg">
                          <input
                            type="radio"
                            name={`q${question.id}`}
                            value={option}
                            checked={answers[`q${question.id}`] === option}
                            onChange={() => handleAnswerChange(`q${question.id}`, option)}
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

              {currentQuestion === questions.length && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={submitExam}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                  >
                    Submit Exam
                  </button>
                </div>
              )}

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                  disabled={currentQuestion === 1}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg disabled:bg-gray-500"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  disabled={currentQuestion === questions.length}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg disabled:bg-gray-500"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {examCompleted && (
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center mt-8">
              <h2 className="text-2xl font-semibold mb-4">Your Exam Results</h2>
              <div className="flex justify-center mb-6">
                <Pie data={pieChartData} width={200} height={200} />
              </div>
              <p className="text-lg">You scored {score} out of {questions.length}</p>
              <div className="mt-6">
                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>

        {examStarted && !examCompleted && (
          <div className="w-1/4 fixed right-0 mt-20 pr-8">
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg h-full">
              <h3 className="text-xl font-semibold text-center mb-4">Questions</h3>
              <div className="space-y-4">
                {questions.map((question) => {
                  const isAnswered = answers[`q${question.id}`] !== "";
                  return (
                    <button
                      key={question.id}
                      onClick={() => handleQuestionNavigation(question.id)}
                      className={`w-full py-3 px-4 rounded-lg text-left text-white font-medium ${
                        isAnswered ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      Question {question.id}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Start;
