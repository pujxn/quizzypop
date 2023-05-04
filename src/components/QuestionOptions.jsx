import { useState } from "react";

const QuestionOptions = ({ options, correctAnswer }) => {

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

    const handleOptionClick = (e, idx) => {
        setSelectedOption(idx);
        if (e.target.innerHTML == correctAnswer) {
            setStyleObj(correctStyle);
        }
        else {
            setStyleObj(incorrectStyle);
        }
    }

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