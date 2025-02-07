import { useState } from 'react';
import './App.css';
import questions from './data/questions.json';
import EndScreen from './components/EndScreen';
import FeedbackScreen from './components/FeedBackScreen';
import QuestionScreen from './components/QuestionScreen';
import StartScreen from './components/StartScreen';

function App() {
  const [gameStarted, setGameStarted] = useState(false); 
  const [currentLevel, setCurrentLevel] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [correctAnswersInLevel, setCorrectAnswersInLevel] = useState(0);

  const levels = ['easy', 'medium', 'hard'] as const;
  const currentQuestions = questions[currentLevel];
  const currentQuestion = currentQuestions[currentQuestionIndex];

  const handleStart = () => {
    setGameStarted(true);
    setCurrentLevel('easy');
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameOver(false);
    setCorrectAnswersInLevel(0);
  };

  const handleAnswerSubmit = (answer: any) => {
    const isAnswerCorrect = answer === currentQuestion.correctAnswer;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + (currentLevel === 'easy' ? 10 : currentLevel === 'medium' ? 20 : 30));
      setCorrectAnswersInLevel((prev) => prev + 1);
    }
    setShowFeedback(true);
  };


  const [showLevelTransition, setShowLevelTransition] = useState(false);

const handleNextQuestion = () => {
  if (currentQuestionIndex < currentQuestions.length - 1) {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  } else {
    if (correctAnswersInLevel >= 2) {
      const nextLevel = levels[levels.indexOf(currentLevel) + 1];
      if (nextLevel) {
        setShowLevelTransition(true); 
        setTimeout(() => {
          setShowLevelTransition(false);
          setCurrentLevel(nextLevel);
          setCurrentQuestionIndex(0);
          setCorrectAnswersInLevel(0);
        }, 2000); 
      } else {
        setGameOver(true);
      }
    } else {
      setGameOver(true);
    }
  }
  setShowFeedback(false);
};

  const handleRetryLevel = () => {
  setCurrentQuestionIndex(0);
  setCorrectAnswersInLevel(0);
  setShowFeedback(false);
  setGameOver(false);

 
  setScore((prevScore) => {
    const deduction = correctAnswersInLevel * (currentLevel === 'easy' ? 10 : currentLevel === 'medium' ? 20 : 30);
    return prevScore - deduction; 
  });
};


  if (!gameStarted) {
    return <StartScreen onStart={handleStart} />;
  }

  if (gameOver) {
    return <EndScreen score={score} onRestart={handleStart} onRetry={handleRetryLevel} />;
  }

  if (showFeedback) {
    return <FeedbackScreen isCorrect={isCorrect} onNext={handleNextQuestion} />;
  }

  if (showLevelTransition) {
    return (
      <div className="transition-screen">
        <h2>You passed this level! Moving to Next Level...</h2>
      </div>
    );
  }
  

  return (
    <div className="App">
      <QuestionScreen question={currentQuestion} onSubmit={handleAnswerSubmit} currentLevel={currentLevel} />
    </div>
  );
}
export default App;
