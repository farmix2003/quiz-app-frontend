/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { calculateResponse, getQuizQuestion } from "../service/QuizService";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

const QuizQuestions = ({ quizId }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getQuizQuestion(quizId)
      .then((questions) => {
        setQuestions(questions);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching quiz questions:", error);
        setError("Error fetching quiz questions. Please try again later.");
      });
  }, [quizId]);

  const handleInputChange = (questionId, answer) => {
    setSelectedAnswer({ ...selectedAnswer, [questionId]: answer });
  };

  const handleSubmit = () => {
    // Check if questions array is empty or undefined
    if (!questions || questions.length === 0) {
      console.error("No questions available.");
      return;
    }

    const responses = Object.values(selectedAnswer).map((answer, index) => ({
      id: questions[index].id,
      response: answer,
    }));

    console.log(responses);

    calculateResponse(quizId, responses)
      .then((result) => {
        setQuizResult(result);
      })
      .catch((err) => {
        console.error("Error calculating quiz result:", err);
        setError("Error calculating quiz result. Please try again later.");
      });
  };

  return (
    <FormControl component="fieldset">
      {error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : (
        questions.map((question) => (
          <div key={question.id}>
            <FormLabel component="legend" sx={{ marginTop: "10px" }}>
              {question.question_title}
            </FormLabel>
            <RadioGroup
              aria-label={`question-${question.id}`}
              name={`question-${question.id}`}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
            >
              <FormControlLabel
                value={question.option1}
                control={<Radio />}
                label={question.option1}
              />
              <FormControlLabel
                value={question.option2}
                control={<Radio />}
                label={question.option2}
              />
              <FormControlLabel
                value={question.option3}
                control={<Radio />}
                label={question.option3}
              />
              <FormControlLabel
                value={question.option4}
                control={<Radio />}
                label={question.option4}
              />
            </RadioGroup>
            <Divider orientation="horizontal" variant="middle" />
          </div>
        ))
      )}
      <Box>
        {questions.length > 0 && (
          <Button
            type="submit"
            variant="contained"
            sx={{ textAlign: "center", marginBottom: "3rem" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        )}
      </Box>
      {quizResult !== null && (
        <Typography variant="body1">
          Quiz Result: {quizResult} out of {questions.length}
        </Typography>
      )}
    </FormControl>
  );
};

export default QuizQuestions;
