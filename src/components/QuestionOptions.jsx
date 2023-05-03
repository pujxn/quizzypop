import { useState } from "react";

const QuestionOptions = ({ options, correctAnswer }) => {
    // let shuffledOptions = options.sort((a, b) => 0.5 - Math.random());
    // console.log(correctAnswer);
    const [shuffledOptions, setShuffledOptions] = useState(() => options.sort((a, b) => 0.5 - Math.random()))
    // const [questionAnswered, setQuestionAnswered] = useState(false);
    const [selectedOption, setSelectedOption] = useState(-1);
    const [styleObj, setStyleObj] = useState({});

    const correctStyle = {
        "backgroundColor": "green"
    }

    const incorrectStyle = {
        "backgroundColor": "red"
    }

    // let styleObj = { "backgroundColor": "white" };

    const handleOptionClick = (e, idx) => {
        // console.log(e.target.(e) => {
        // styleObj = e.target.innerHTML == correctAnswer ? correctStyle : incorrectStyle;
        // console.log(e.target.innerHTML);
        // console.log(styleObj);
        // setQuestionAnswered(true)
        setSelectedOption(idx);
        if (e.target.innerHTML == correctAnswer) {
            setStyleObj(correctStyle);
        }
        else {
            setStyleObj(incorrectStyle);
        }
        // setQuestionAnswered()
    }

    return (
        shuffledOptions.map((ele, idx) => (
            <button style={idx == selectedOption ? styleObj : null} onClick={(e) => handleOptionClick(e, idx)} key={idx}>{ele}</button>
        ))
    )
}

export default QuestionOptions;