import React, {useState} from 'react';
// Components
import QuestionCard from './components/QuestionCards';

// API
import {fetchQuizQuestions} from './API';

// TYPES
import {QuestionState, Difficulty, Answer} from './API';

// Styles
import {Wrapper, Style} from './App.styles';

const TOTAL_QUESTIONS = 10;
const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  console.log(questions);
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (gameOver) { return; }
    const answer = e.currentTarget.value;
    const correct = questions[number].correct_answer === answer;
    if(correct) { 
      setScore(prev => prev + 1); 
    }

    const answerObject = {
      question: questions[number].question,
      correct,
      answer,
      correctAnswer: questions[number].correct_answer,
    };
    setUserAnswers(prev => [...prev, answerObject]);
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (number === TOTAL_QUESTIONS) {
      setGameOver(true);
      return; 
    }
    setNumber(nextQuestion);
  };
  return (
    <>
      <Style />
      <Wrapper>
        <h1>React Quiz</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        ) : null}
        
        {!gameOver && <p className="score">Score: {score}</p>}
        {loading && <p>Loading Questions ...</p>}
        {!loading && !gameOver && (
          <QuestionCard 
            questionNumber={number + 1} 
            totalQuestions={TOTAL_QUESTIONS} 
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          /> )
        }
        {!gameOver && !loading && 
          userAnswers.length === number + 1 && 
          number !== TOTAL_QUESTIONS - 1 && (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        )
        }
      </Wrapper>
    </>
  );
};


export default App;
