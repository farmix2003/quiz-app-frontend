/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";

const QuizResult = ({ quizResult, questions }) => {
  return (
    <div>
      {quizResult !== null && (
        <Typography variant="body1">
          Quiz Result: {quizResult} out of {questions.length}
        </Typography>
      )}
    </div>
  );
};

export default QuizResult;
