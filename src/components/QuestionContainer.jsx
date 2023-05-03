import QuestionText from "@/components/QuestionText";
import QuestionOptions from "@/components/QuestionOptions";


const QuestionContainer = ({ questionObject }) => {

    let questionHTMLText = new DOMParser().parseFromString(questionObject.question, "text/html");


    return (
        <>
            <QuestionText question={questionHTMLText.documentElement.textContent} />
            <QuestionOptions options={[questionObject["correct_answer"], ...questionObject["incorrect_answers"]]} correctAnswer={questionObject["correct_answer"]} />
        </>
    )
}

export default QuestionContainer;