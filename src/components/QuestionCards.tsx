import React from 'react';
import {Answer} from '../API';
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
    <div>
        <p className="number">
            Question: {questionNumber} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{
            __html: question
        }}/>
        <div>
            {answers.map(answer => (
                <div key={answer}>
                    <button disabled={!!userAnswer} onClick={callback} value={answer}
                        dangerouslySetInnerHTML={{
                            __html: answer
                        }}
                    />
                </div>
            ))}
        </div>
    </div>
);

export default QuestionCard;