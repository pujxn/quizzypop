import { useState } from "react";
import { checkGameExists, updateJoiningPlayer } from "@/services/firebase";
import { useNavigate } from "react-router-dom";

const JoinGameBox = () => {
    const navigate = useNavigate();
    const [gameIdFieldVal, setGameIdFieldVal] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handlFormSubmit = (e) => {
        e.preventDefault();
        checkGameExists(gameIdFieldVal).then(result => {
            !result && setErrorMessage("Please enter a valid game");
            result && navigate(`/game/${gameIdFieldVal}`, { state: { "gameId": gameIdFieldVal } });
            updateJoiningPlayer(gameIdFieldVal);
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