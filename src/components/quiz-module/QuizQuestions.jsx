/* eslint-disable react/prop-types */
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

const QuizQuestions = ({
  quizQuestions,
  error,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <FormControl component="fieldset">
      {error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : (
        quizQuestions.map((question) => (
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
        {quizQuestions.length > 0 && (
          <Button
            type="submit"
            variant="contained"
            sx={{
              textAlign: "center",
              marginBottom: "2rem",
              marginTop: "1rem",
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        )}
      </Box>
    </FormControl>
  );
};

export default QuizQuestions;
