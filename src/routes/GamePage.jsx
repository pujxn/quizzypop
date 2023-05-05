import { useState, useEffect } from "react";
import { getRecordDetails, listenForBothAnswered } from "@/services/firebase";
import { useOutletContext } from "react-router-dom";
import QuestionContainer from "@/components/QuestionContainer";

const GamePage = () => {

    const { gameId } = useOutletContext();
    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [questionNumber, setQuestionNumber] = useState(0);



    useEffect(() => {
        getRecordDetails(gameId, "questions")
            .then(res => {
                console.log(res);
                setQuestions([...res]);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        listenForBothAnswered(gameId, questionNumber, setQuestionNumber)
    }, [questionNumber])

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (questionNumber == 10) {
        return (
            <h2>Game Over</h2>
        )
    }

    return (
        <QuestionContainer questionObject={questions} currentQuestion={questionNumber} />
    )
}

export default GamePage;