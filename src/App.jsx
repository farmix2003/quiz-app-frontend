import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/home/Home";
import { AddQuestion, Category, Navbar, TryQuiz } from "./components";
import Quiz from "./components/quiz-module/Quiz";
import { useEffect, useState } from "react";
import { getAllQuestions } from "./components/service/QuestionService";
function App() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    getAllQuestions().then((data) => {
      setQuestions(data);
    });
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home questions={questions} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/add-question" element={<AddQuestion />} />
        <Route path="/create" element={<Quiz questions={questions} />} />
        <Route path="/try-quiz" element={<TryQuiz />} />
        <Route path="/try-quiz/:id" element={<TryQuiz />} />
      </Routes>
    </>
  );
}

export default App;
