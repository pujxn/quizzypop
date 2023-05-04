import QuestionText from "@/components/QuestionText";
import QuestionOptions from "@/components/QuestionOptions";


const QuestionContainer = ({ questionObject }) => {

    let questionHTMLText = new DOMParser().parseFromString(questionObject.question, "text/html");
    let correctAnswerHTMLText = new DOMParser().parseFromString(questionObject["correct_answer"], "text/html")


    return (
        <>
            <QuestionText question={questionHTMLText.documentElement.textContent} />
            <QuestionOptions options={[questionObject["correct_answer"], ...questionObject["incorrect_answers"]]} correctAnswer={correctAnswerHTMLText.documentElement.textContent} />
        </>
    )
}

export default QuestionContainer;