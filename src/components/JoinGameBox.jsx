import { useState } from "react";
import { checkGameExists, updateRecord } from "@/services/firebase";
import { useNavigate } from "react-router-dom";

const JoinGameBox = () => {
    const navigate = useNavigate();
    const [gameIdFieldVal, setGameIdFieldVal] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handlFormSubmit = (e) => {
        e.preventDefault();
        checkGameExists(gameIdFieldVal).then(result => {
            if (result) {


                let sessionToken = "";

                fetch("https://opentdb.com/api_token.php?command=request")
                    .then(
                        res => res.json()
                    )
                    .catch((e) => {
                        console.log(e);
                    })
                    .then(res => {
                        // console.log(res)
                        sessionToken = res.token;
                        // console.log("Session Token", sessionToken)
                        // return res;
                    })
                    .then(
                        res =>
                            fetch(`https://opentdb.com/api.php?amount=2&token=${sessionToken}`)

                    ).
                    then(
                        res => res.json()
                    )
                    .catch((e) => {
                        console.log(e);
                    })
                    .then(
                        res => {
                            updateRecord(gameIdFieldVal, "questions", [...res.results]);
                            navigate(`/game/${gameIdFieldVal}`, { state: { "gameId": gameIdFieldVal } });
                            updateRecord(gameIdFieldVal, "joiningPlayer", "pujan");
                        }
                    )

            }
            else {
                setErrorMessage("Please enter a valid game");
            }

        });
    }

    return (
        <>
            <form>
                <input type="text" value={gameIdFieldVal} onChange={(e) => setGameIdFieldVal(e.target.value)} />
                <button onClick={handlFormSubmit}>Join game</button>
            </form>
            {errorMessage != "" && <p>{errorMessage}</p>}
        </>
    )
}

export default JoinGameBox;