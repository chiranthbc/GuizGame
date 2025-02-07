const EndScreen = ({ score, onRestart , onRetry }: { score: number; onRestart: () => void; onRetry: () => void }) => {
    return (
      <div className="end-screen">
        <h1>Quiz Completed</h1>
        <p>Your Total Score is: {score}</p>
        <button onClick={onRestart}>Restart Quiz</button>
        <button onClick={onRetry}>Retry Level</button>
      </div>
    );
  };
  
  export default EndScreen;