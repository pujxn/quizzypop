import { useState } from "react";
import { checkGameExists } from "@/services/firebase";
import { useNavigate } from "react-router-dom";

const JoinGameBox = () => {
    const navigate = useNavigate();
    const [gameIdFieldVal, setGameIdFieldVal] = useState("");
    const [validGameEntered, setValidGameEntered] = useState(false);

    const handlFormSubmit = (e) => {
        e.preventDefault();
        checkGameExists(gameIdFieldVal).then(result => {
            !result && setValidGameEntered(result);
            result && navigate("/game");
        });
        // setValidGameEntered();
    }

    return (
        <>
            <form>
                <input type="text" value={gameIdFieldVal} onChange={(e) => setGameIdFieldVal(e.target.value)} />
                <button onClick={handlFormSubmit}>Join game</button>
            </form>
            {validGameEntered ? <p>Congratulations on joining the game!</p> : <p>Try with a valid game ID</p>}
        </>

    )
}

export default JoinGameBox;