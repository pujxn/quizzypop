import style from "@/styles/QuestionText.module.css"

const QuestionText = ({ question }) => {
    return (
        <h2 className={style.question}>{question}</h2>
    )
}

export default QuestionText;