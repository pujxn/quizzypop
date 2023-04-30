import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { addGameToDb } from "@/services/firebase";

const CreateGameBox = () => {

    const currentGameId = uuidv4();

    useEffect(() => {
        addGameToDb(currentGameId);
    }, [currentGameId]);


    return (
        <span>{currentGameId}</span>
    )
}

export default CreateGameBox;