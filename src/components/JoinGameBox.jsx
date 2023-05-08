import { useState } from "react";
import { checkGameExists, updateRecord } from "@/services/firebase";
import { useNavigate } from "react-router-dom";
import style from "@/styles/JoinGameBox.module.css"

const JoinGameBox = ({ handleModeReset, userName }) => {
    const navigate = useNavigate();
    const [gameIdFieldVal, setGameIdFieldVal] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handlFormSubmit = (e) => {
        e.preventDefault();
        checkGameExists(gameIdFieldVal).then(result => {
            if (result) {


                let sessionToken = "";

                fetch("https://opentdb.com/api_token.php?command=request")
                    .then(res => res.json()
                    )
                    .then(res => sessionToken = res.token
                    )
                    .then(res => fetch(`https://opentdb.com/api.php?amount=10&token=${sessionToken}`)
                    )
                    .then(
                        res => res.json()
                    )
                    .then(
                        res => updateRecord(gameIdFieldVal, "questions", [...res.results])
                    )
                    .then(res => updateRecord(gameIdFieldVal, "joiningPlayer", userName)
                    )
                    .then(res => navigate(`/game/${gameIdFieldVal}`, { state: { "gameId": gameIdFieldVal, "playerType": "joiner" } })
                    )
                    .catch(e => { console.log(e) });

            }
            else {
                setErrorMessage("Please enter a valid game");
            }

        });
    }

    return (
        <div className={style.container}>
            <button className={style["popup-close"]} aria-label="Close" onClick={handleModeReset}><i className="material-icons">close</i></button>
            {/* <h2>Ask Player 2 to &quot;Join game&quot; with this code:</h2><p>{currentGameId}</p> */}
            <form>
                <input placeholder="Enter game code" type="text" value={gameIdFieldVal} onChange={(e) => setGameIdFieldVal(e.target.value)} />
                <button className={style["join-btn"]} onClick={handlFormSubmit}>Join game</button>
            </form>
            {errorMessage != "" && <p>{errorMessage}</p>}
        </div >

    )
}

export default JoinGameBox;