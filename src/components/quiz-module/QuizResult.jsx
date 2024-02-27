/* eslint-disable react/prop-types */
import { Box, Button, CircularProgress, Typography } from "@mui/material";

const QuizResult = ({ quizResult, quizQuestions, navigate }) => {
  return (
    <>
      <Box
        sx={{
          margin: "100px 40%",

          width: "200px",
          height: "200px",
          padding: "10px",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          borderRadius: "10px",
          position: "relative",
        }}
      >
        {quizResult !== null ? (
          <Typography
            variant="body1"
            sx={{ fontFamily: "cursive", marginTop: "40%" }}
          >
            Quiz Result: {quizResult} out of {quizQuestions.length}
          </Typography>
        ) : (
          <CircularProgress sx={{ marginTop: "60px", marginLeft: "70px" }} />
        )}
        <Box display={"flex"} gap={"5px"} mb={"5px"}>
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            sx={{ marginBottom: "20px" }}
            position={"absolute"}
          >
            Home
          </Button>
          <Button
            onClick={() => navigate("/try-quiz")}
            variant="contained"
            color="success"
            sx={{ marginBottom: "20px" }}
          >
            Try Quiz
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default QuizResult;
