import React from 'react';
import {Answer} from '../API';

// Styles

import { Wrapper, ButtonWrapper} from './QuestionCards.styles';

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: Answer | undefined;
    questionNumber: number;
    totalQuestions: number;
}
const QuestionCard: React.FC<Props> = ({
    question, 
    answers, 
    callback, 
    userAnswer, 
    questionNumber, 
    totalQuestions,
}) => (
    <Wrapper>
        <p className="number">
            Question: {questionNumber} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{
            __html: question
        }}/>
        <div>
            {answers.map(answer => (
                <ButtonWrapper key={answer}
                    correct={userAnswer?.correctAnswer === answer}
                    userClick={userAnswer?.answer === answer}
                >
                    <button disabled={!!userAnswer} onClick={callback} value={answer}
                        dangerouslySetInnerHTML={{
                            __html: answer
                        }}
                    />
                </ButtonWrapper>
            ))}
        </div>
    </Wrapper>
);

export default QuestionCard;