import { Route, Routes, useNavigate } from "react-router";
import "./App.css";
import Home from "./components/home/Home";
import {
  AddQuestion,
  Category,
  Navbar,
  QuizResult,
  TryQuiz,
} from "./components";
import Quiz from "./components/quiz-module/Quiz";
import { useEffect, useState } from "react";
import { getAllQuestions } from "./components/service/QuestionService";
import {
  calculateResponse,
  getQuizQuestion,
} from "./components/service/QuizService";
function App() {
  const [questions, setQuestions] = useState([]);
  const [quizResult, setQuizResult] = useState(null);
  const [quizId, setQuizId] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState({});

  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllQuestions().then((data) => {
      setQuestions(data);
    });
  }, []);
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    getQuizQuestion(quizId)
      .then((questions) => {
        setQuizQuestions(questions);
      })
      .catch((error) => {
        console.error("Error fetching quiz questions:", error);
      });
  }, [quizId]);
  const handleInputChange = (questionId, answer) => {
    setSelectedAnswer({ ...selectedAnswer, [questionId]: answer });
  };
  const handleSubmit = () => {
    if (!quizQuestions || quizQuestions.length === 0) {
      console.error("No questions available.");
      return;
    }

    const responses = Object.values(selectedAnswer).map((answer, index) => ({
      id: quizQuestions[index]?.id,
      response: answer,
    }));

    console.log(responses);

    calculateResponse(quizId, responses)
      .then((result) => {
        setQuizResult(result);
        setSelectedAnswer({});
      })
      .catch((err) => {
        console.error("Error calculating quiz result:", err);
        setError("Error calculating quiz result. Please try again later.");
      });
    setSelectedAnswer({});

    navigate("/result");
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home questions={questions} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/add-question" element={<AddQuestion />} />
        <Route path="/create" element={<Quiz questions={questions} />} />
        <Route
          path="/try-quiz"
          element={
            <TryQuiz
              error={error}
              setError={setError}
              handleSubmit={handleSubmit}
              handleInputChange={handleInputChange}
              quizId={quizId}
              setQuizId={setQuizId}
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
              quizQuestions={quizQuestions}
            />
          }
        />
        <Route path="/try-quiz/:id" element={<TryQuiz />} />
        <Route
          path="/result"
          element={
            <QuizResult
              quizResult={quizResult}
              setQuizResult={setQuizResult}
              quizQuestions={quizQuestions}
              navigate={navigate}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
