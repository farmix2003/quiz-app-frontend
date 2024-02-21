/* eslint-disable react/prop-types */
const Home = ({ questions }) => {
  return (
    <>
      {questions.map((question) => {
        return (
          <div className="card" key={question.id}>
            <h6>{question.category}</h6>
            <p>{question.difficultylevel}</p>
          </div>
        );
      })}
    </>
  );
};

export default Home;
