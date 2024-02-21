import { Alert, Box, Button, FormControl } from "@mui/material";
import { addNewQuestion } from "../service/QuestionService";
import { useNavigate } from "react-router";
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
const difficulty_level = [
  "Select a difficulty level",
  "Easy",
  "Medium",
  "Hard",
];

const AddQuestion = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    category: categories[0],
    difficulty_level: difficulty_level[0],
    title: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewQuestion({ ...newQuestion, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      newQuestion.category === categories[0] ||
      newQuestion.difficulty_level === difficulty_level[0] ||
      newQuestion.option1 === "" ||
      newQuestion.option2 === "" ||
      newQuestion.option3 === "" ||
      newQuestion.option4 === "" ||
      newQuestion.answer === ""
    ) {
      alert("Please fill all fields!");
    } else {
      try {
        addNewQuestion(
          newQuestion.category,
          newQuestion.difficulty_level,
          newQuestion.title,
          newQuestion.option1,
          newQuestion.option2,
          newQuestion.option3,
          newQuestion.option4,
          newQuestion.answer
        );
        setNewQuestion({
          category: categories[0],
          difficulty_level: difficulty_level[0],
          title: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          answer: "",
        });
        setTimeout(() => {
          setShowAlert(true);
        }, 300);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {showAlert && (
        <Alert
          variant="filled"
          severity="success"
          className="w-[548px] absolute"
          sx={{ marginX: "30%", transition: "ease-in-out" }}
        >
          New question added successfully!
        </Alert>
      )}
      <div
        className="container  p-5 mx-[30%] sm:mx-[10%] md:mx-[30%] w-[40%] sm:w-[80%] lg:w-[60%] mb-5 mt-4 justify-center items-center"
        style={{ border: "1px solid black" }}
      >
        <h1
          className="text-blue-600 text-center"
          style={{ fontSize: "1.4rem" }}
        >
          Add Question
        </h1>
        <FormControl fullWidth className="grid">
          <select
            name="category"
            id="category"
            value={newQuestion.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <br />
          <select
            name="difficulty_level"
            id="difficulty_level"
            value={newQuestion.difficulty_level}
            onChange={handleChange}
          >
            {difficulty_level.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          <br />
          <input
            placeholder="Title"
            type="text"
            name="title"
            id="title"
            value={newQuestion.title}
            onChange={handleChange}
            className="w-full px-3 py-2 m-2 border-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
          />
          <input
            placeholder="Option-1"
            type="text"
            name="option1"
            id="option1"
            value={newQuestion.option1}
            onChange={handleChange}
            className="w-full m-2 px-3 py-2 border-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
          />
          <input
            placeholder="Option-2"
            type="text"
            name="option2"
            id="option2"
            value={newQuestion.option2}
            onChange={handleChange}
            className="w-full m-2 px-3 py-2 border-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
          />
          <input
            placeholder="Option-3"
            type="text"
            name="option3"
            id="option3"
            value={newQuestion.option3}
            onChange={handleChange}
            className="w-full m-2 px-3 py-2 border-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
          />
          <input
            placeholder="Option-4"
            type="text"
            name="option4"
            id="option4"
            value={newQuestion.option4}
            onChange={handleChange}
            className="w-full m-2 px-3 py-2 border-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
          />
          <input
            placeholder="Right answer"
            type="text"
            name="answer"
            id="answer"
            value={newQuestion.answer}
            onChange={handleChange}
            className="w-full m-2 px-3 py-2 border-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
          />
          <Box>
            <Button
              variant="contained"
              color="success"
              sx={{ width: "40%", marginX: "5%" }}
              onClick={handleSubmit}
            >
              Add
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ width: "40%", marginX: "5%" }}
              onClick={() => navigate("/home")}
            >
              Cancel
            </Button>
          </Box>
        </FormControl>
      </div>
    </>
  );
};

export default AddQuestion;
