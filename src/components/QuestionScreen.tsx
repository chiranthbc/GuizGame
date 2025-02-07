import { useState } from 'react';

const QuestionScreen = ({ question, onSubmit , currentLevel }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    onSubmit(answer);
    setAnswer('');
  };

  return (
    <div className="question-screen">
      <h2>Level: {currentLevel}</h2>
      <h2>{question.question}</h2>
      {question.type === 'multiple-choice' && (
        <div className="options">
          {question.options.map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                name="option"
                value={option}
                onChange={(e) => setAnswer(e.target.value)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
      {question.type === 'true-false' && (
        <div className="options">
          <label>
            <input
              type="radio"
              name="option"
              value="true"
              onChange={(e) => setAnswer(e.target.value)}
            />
            True
          </label>
          <label>
            <input
              type="radio"
              name="option"
              value="false"
              onChange={(e) => setAnswer(e.target.value)}
            />
            False
          </label>
        </div>
      )}
      {question.type === 'text-input' && (
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here"
        />
      )}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default QuestionScreen;