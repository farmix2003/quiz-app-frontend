import { useEffect, useState } from "react";
import { getQuestionsByCategory } from "../service/QuestionService";
import { Box, Container, Typography } from "@mui/material";

const categories = [
  "Java",
  "Python",
  "JavaScript",
  "Golang",
  "C#",
  "Ruby",
  "React",
];

const Category = () => {
  const [topic, setTopic] = useState(categories[0]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getQuestionsByCategory(topic)
      .then((data) => {
        setQuestions(data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setError("Error fetching questions. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [topic]);

  return (
    <Container>
      <Typography
        variant="h3"
        sx={{ marginTop: "1.2rem" }}
        className="text-center"
      >
        Categories
      </Typography>
      <Typography variant="h5">All categories</Typography>
      <Box
        sx={{
          marginLeft: "-50px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          borderRadius: "10px",
          padding: "20px",
          margin: "10px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}
      >
        {categories.map((category) => (
          <label key={category}>
            <input
              type="radio"
              name="category"
              value={category}
              checked={topic === category}
              onChange={(e) => setTopic(e.target.value)}
            />
            {category}
          </label>
        ))}
      </Box>
      <Typography variant="h5">Details</Typography>
      <div
        style={{
          display: "grid",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          borderRadius: "10px",
          padding: "20px",
          margin: "10px",
        }}
      >
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {questions.length > 0 ? (
          <>
            <h6>Number of Questions: {questions.length}</h6>
            {/* Display other details here */}
          </>
        ) : (
          "No questions available"
        )}
      </div>
    </Container>
  );
};

export default Category;
