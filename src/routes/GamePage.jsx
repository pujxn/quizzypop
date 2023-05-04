import { useState, useEffect } from "react";
import { getRecordDetails } from "@/services/firebase";
import { useOutletContext } from "react-router-dom";
import QuestionContainer from "@/components/QuestionContainer";

const GamePage = () => {

    const { gameId } = useOutletContext();
    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [questionNumber, setQuestionNumber] = useState(1);



    useEffect(() => {
        getRecordDetails(gameId, "questions")
            .then(res => {
                console.log(res);
                setQuestions([...res]);
                setIsLoading(false);
            })
    }, []);
    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        // <>
        //     {questions.map((ele, idx) => {
        //         return <QuestionContainer key={idx} questionObject={ele} />
        //     })}
        // </>
        <QuestionContainer questionObject={questions} currentQuestion={questionNumber} />
    )
}

export default GamePage;