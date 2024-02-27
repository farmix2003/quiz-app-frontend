/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getAllQuizzes } from "../service/QuizService";
import {
  Box,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { QuizQuestions } from "..";

const TryQuiz = ({
  error,
  setError,
  quizId,
  setQuizId,
  selectedAnswer,
  setSelectedAnswer,
  handleInputChange,
  handleSubmit,
  quizQuestions,
}) => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    getAllQuizzes().then((data) => {
      setQuizzes(data);
    });
  }, []);
  const tryQuiz = (id) => {
    setQuizId(id);
  };
  return (
    <Box sx={{ marginLeft: "20px" }}>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Quiz
      </Typography>
      <Box sx={{ display: "flex", columnGap: "2rem" }}>
        <TableContainer sx={{ maxWidth: 400 }} component={Paper}>
          <Typography variant="h5">List of Quizzes</Typography>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Quiz Name</TableCell>
                <TableCell>Number of Questions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quizzes.map((quiz) => {
                return (
                  <TableRow
                    key={quiz.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component={"th"}
                      onClick={() => tryQuiz(quiz.id)}
                      sx={{ cursor: "pointer" }}
                      id="quiz_name"
                      className="hover:text-red-800 font-mono"
                    >
                      {quiz.title}
                    </TableCell>
                    <TableCell component={"th"}>
                      {quiz.questions.length}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <QuizQuestions
          quizId={quizId}
          error={error}
          setError={setError}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          quizQuestions={quizQuestions}
        />
      </Box>
    </Box>
  );
};

export default TryQuiz;
