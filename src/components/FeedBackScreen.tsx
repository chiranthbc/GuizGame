const FeedbackScreen = ({ isCorrect, onNext }) => {
    return (
      <div className="feedback-screen">
        <h2>{isCorrect ? 'Correct!' : 'Incorrect!'}</h2>
        <button onClick={onNext}>Next Question</button>
      </div>
    );
  };
  
  export default FeedbackScreen;