import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { addGameToDb } from "@/services/firebase";
import { listenForJoiner } from "@/services/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import style from "@/styles/CreateGameBox.module.css"


const CreateGameBox = ({ handleModeReset, userName }) => {

    const navigate = useNavigate();
    const [currentGameId, setCurrentGameId] = useState(uuidv4());
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        addGameToDb(currentGameId, userName)
            .then(res => listenForJoiner(currentGameId, setGameStarted))
            .catch(e => { console.log(e) })
    }, [currentGameId]);

    useEffect(() => {
        gameStarted && navigate(`/game/${currentGameId}`, { state: { "gameId": currentGameId, "playerType": "creator" } });
    }, [gameStarted])

    return (
        <div className={style.container}>
            <button className={style["popup-close"]} aria-label="Close" onClick={handleModeReset}><i className="material-icons">close</i></button>
            <h2>Ask Player 2 to &quot;Join game&quot; with this code:</h2><p>{currentGameId}</p>
        </div >
    )
}

export default CreateGameBox;