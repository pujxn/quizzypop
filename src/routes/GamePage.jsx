import { useState, useEffect } from "react";
import { getRecordDetails } from "@/services/firebase";
import { useOutletContext } from "react-router-dom";

const GamePage = () => {

    const gameId = useOutletContext();
    console.log("GAME IDDDD", gameId)

    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState([]);


    useEffect(() => {
        getRecordDetails(gameId, "questions")
            .then(res => {
                setQuestions([...res]);
                setIsLoading(false);
            })
    }, []);

    // useEffect(() => {
    //     let sessionToken = "";

    //     fetch("https://opentdb.com/api_token.php?command=request")
    //         .then(
    //             res => res.json()
    //         )
    //         .catch((e) => {
    //             console.log(e);
    //         })
    //         .then(res => {
    //             // console.log(res)
    //             sessionToken = res.token;
    //             // console.log("Session Token", sessionToken)
    //             // return res;
    //         })
    //         .then(
    //             res =>
    //                 fetch(`https://opentdb.com/api.php?amount=10&token=${sessionToken}`)

    //         ).
    //         then(
    //             res => res.json()
    //         )
    //         .catch((e) => {
    //             console.log(e);
    //         })
    //         .then(
    //             res => {
    //                 setQuestions([...res.results]);
    //                 setIsLoading(false);
    //             }
    //         )
    // }, [])


    console.log(questions);

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <>
            {questions.map((ele, idx) =>
                <p key={idx}>{ele.question}</p>
            )}
        </>
    )
}

export default GamePage;