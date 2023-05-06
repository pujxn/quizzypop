import QuestionText from "@/components/QuestionText";
import QuestionOptions from "@/components/QuestionOptions";


const QuestionContainer = ({ handleScoreUdpate, questionObject, currentQuestion }) => {

    console.log("Current Question Number", currentQuestion);
    console.log("Question Object", questionObject)

    let questionHTMLText = new DOMParser().parseFromString(questionObject[currentQuestion].question, "text/html");
    let correctAnswerHTMLText = new DOMParser().parseFromString(questionObject[currentQuestion]["correct_answer"], "text/html")


    return (
        <>
            <QuestionText question={questionHTMLText.documentElement.textContent} />
            <QuestionOptions
                handleScoreUdpate={handleScoreUdpate}
                options={[questionObject[currentQuestion]["correct_answer"], ...questionObject[currentQuestion]["incorrect_answers"]]}
                correctAnswer={correctAnswerHTMLText.documentElement.textContent}
                currentQuestion={currentQuestion} />
        </>
    )
}

export default QuestionContainer;