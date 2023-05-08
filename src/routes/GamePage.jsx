import { useState, useEffect } from "react";
import { getRecordDetails, listenForBothAnswered, updateRecord } from "@/services/firebase";
import { useOutletContext } from "react-router-dom";
import QuestionContainer from "@/components/QuestionContainer";
import { NavLink } from "react-router-dom";

const GamePage = () => {

    const { gameId, playerType } = useOutletContext();
    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [joinerScore, setJoinerScore] = useState(0);
    const [creatorScore, setCreatorScore] = useState(0);
    const [creatorName, setCreatorName] = useState("");
    const [joinerName, setJoinerName] = useState("");




    useEffect(() => {
        getRecordDetails(gameId, "questions")
            .then(res => {
                console.log(res);
                setQuestions([...res]);
                setIsLoading(false);
            });
        updateRecord(gameId, `${playerType}Score`, 0)

    }, []);

    useEffect(() => {
        if (questionNumber <= 9) {
            listenForBothAnswered(gameId, questionNumber, setQuestionNumber);
        }
        else {
            getRecordDetails(gameId, "joinerScore")
                .then(res => setJoinerScore(res))
                .catch(e => { console.log(e) });

            getRecordDetails(gameId, "creatorScore")
                .then(res => setCreatorScore(res))
                .catch(e => { console.log(e) });

            getRecordDetails(gameId, "creator")
                .then(res => setCreatorName(res))
                .catch(e => { console.log(e) });

            getRecordDetails(gameId, "joiner")
                .then(res => setJoinerName(res))
                .catch(e => { console.log(e) });

        }
    }, [questionNumber])

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (questionNumber == 10) {
        return (
            <>
                <h2>Game Over.</h2>
                <p>Winner: {creatorScore > joinerScore ? creatorName : (creatorScore != joinerScore ? joinerName : "Draw")}</p>
                <p>Please go to the <NavLink to="/">home page</NavLink> to create/join a game </p>
            </>
        )
    }

    return (
        <QuestionContainer questionObject={questions} currentQuestion={questionNumber} />
    )
}

export default GamePage;