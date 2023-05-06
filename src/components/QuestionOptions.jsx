import { useState, useEffect } from "react";
import { updateRecord, getRecordDetails } from "@/services/firebase";
import { useOutletContext } from "react-router-dom";
import { increment } from "firebase/firestore";


const QuestionOptions = ({ options, correctAnswer, currentQuestion }) => {

    console.log("Options", options);
    console.log("Current Question:", currentQuestion)

    const { gameId, playerType } = useOutletContext();
    console.log("YOOO", gameId);

    const [shuffledOptions, setShuffledOptions] = useState(() => options.sort((a, b) => 0.5 - Math.random()))
    const [selectedOption, setSelectedOption] = useState(-1);
    const [styleObj, setStyleObj] = useState({});

    const correctStyle = {
        "backgroundColor": " #2ECC71",
        "color": "#FFFFFF"
    }

    const incorrectStyle = {
        "backgroundColor": "#E74C3C",
        "color": "#FFFFFF"
    }

    const handleOptionClick = async (e, idx) => {
        if (e.target.innerHTML == correctAnswer) {
            setStyleObj(correctStyle);
            await updateRecord(gameId, `${playerType}Score`, increment(10));
        }
        else {
            setStyleObj(incorrectStyle);
        }
        setSelectedOption(idx);

        getRecordDetails(gameId, "questions").then(
            res => updateRecord(gameId, "questions", Object.values({ ...res, [currentQuestion]: { ...res[currentQuestion], [`${playerType}Answered`]: true } }))
        ).catch(e => {
            console.log(e);
        })
    }

    useEffect(() => {
        setShuffledOptions(() => options.sort((a, b) => 0.5 - Math.random()));
        setSelectedOption(-1);
        setStyleObj({});
    }, [options])

    return (
        shuffledOptions.map((ele, idx) => {
            let optionHTMLText = new DOMParser().parseFromString(ele, "text/html");
            return (
                <button disabled={selectedOption != -1} style={idx == selectedOption ? styleObj : null} onClick={(e) => handleOptionClick(e, idx)} key={idx}>{optionHTMLText.documentElement.textContent}</button>
            )
        })
    )
}

export default QuestionOptions;