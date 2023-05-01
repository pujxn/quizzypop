import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { addGameToDb } from "@/services/firebase";
import { listenForJoiner } from "@/services/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CreateGameBox = () => {

    const navigate = useNavigate();
    const currentGameId = uuidv4();
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        addGameToDb(currentGameId);
        listenForJoiner(currentGameId, setGameStarted);
    }, [currentGameId]);

    useEffect(() => {
        gameStarted && navigate(`/game/${currentGameId}`);
    }, [gameStarted])

    return (
        <span>{currentGameId}</span>
    )
}

export default CreateGameBox;