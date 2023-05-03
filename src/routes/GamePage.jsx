import { useState, useEffect } from "react";
import { getRecordDetails } from "@/services/firebase";
import { useOutletContext } from "react-router-dom";
import QuestionContainer from "@/components/QuestionContainer";

const GamePage = () => {

    const gameId = useOutletContext();
    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState([]);


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
        <>
            {questions.map((ele, idx) => {
                // let questionHTMLText = new DOMParser().parseFromString(ele.question, "text/html");
                // return <p key={idx}> {questionHTMLText.documentElement.textContent}</p>
                return <QuestionContainer key={idx} questionObject={ele} />
            })}
        </>
    )
}

export default GamePage;