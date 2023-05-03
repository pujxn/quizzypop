const QuestionOptions = ({ options }) => {
    let shuffledOptions = options.sort((a, b) => 0.5 - Math.random());
    // console.log(shuffledOptions);
    return (
        shuffledOptions.map((ele, idx) => (
            <button key={idx}>{ele}</button>
        ))
    )
}

export default QuestionOptions;