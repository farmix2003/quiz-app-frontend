/* eslint-disable react/prop-types */
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { createQuiz } from "../service/QuizService";
import { useState } from "react";

const categories = [
  "Select a category",
  "Java",
  "Python",
  "JavaScript",
  "C++",
  "Golang",
  "C#",
  "Ruby",
  "React",
];

const Quiz = ({ questions }) => {
  const [newQuiz, setNewQuiz] = useState({
    category: categories[0],
    numQ: 0,
    title: "",
  });
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewQuiz({ ...newQuiz, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      newQuiz.category === categories[0] ||
      newQuiz.numQ <= 0 ||
      newQuiz.title === ""
    ) {
      setShowError(true);
    } else {
      const numQuestionsForCategory = questions.filter(
        (question) => question.category === newQuiz.category
      ).length;
      if (numQuestionsForCategory < newQuiz.numQ) {
        alert("There are not enough questions for the selected category");
        return;
      }
      createQuiz(newQuiz.category, newQuiz.numQ, newQuiz.title);
      setNewQuiz({
        category: categories[0],
        numQ: 0,
        title: "",
      });
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        className="text-center text-amber-700"
        sx={{ marginTop: "1rem", fontStyle: "bold" }}
      >
        Create Quiz
      </Typography>
      <FormControl
        className="w-[500px] h-[500px]"
        sx={{
          marginTop: "20px",
          marginX: "30%",
        }}
      >
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={newQuiz.category}
          onChange={handleChange}
          label="Category"
          name="category"
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
        <TextField
          required
          id="outlined-basic"
          label="Number of Questions"
          variant="outlined"
          type="number"
          sx={{ marginTop: "10px" }}
          onChange={handleChange}
          value={newQuiz.numQ}
          name="numQ"
        />
        <TextField
          required
          id="outlined-basic"
          label="Title of Quiz"
          variant="outlined"
          type="text"
          sx={{ marginTop: "10px" }}
          onChange={handleChange}
          value={newQuiz.title}
          name="title"
        />
        <Button
          sx={{ marginTop: "10px" }}
          variant="contained"
          onClick={handleSubmit}
        >
          Create
        </Button>
        <Button sx={{ marginTop: "10px" }} variant="contained" color="error">
          Cancel
        </Button>
      </FormControl>
      {showError && (
        <Alert severity="error" sx={{ marginTop: "10px" }}>
          Please fill all fields with valid number or text!
        </Alert>
      )}
    </Box>
  );
};

export default Quiz;
