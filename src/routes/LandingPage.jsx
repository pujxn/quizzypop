import { useState } from "react";
import JoinGameBox from "@/components/JoinGameBox";
import CreateGameBox from "@/components/CreateGameBox";


const LandingPage = () => {

    const [mode, setMode] = useState("");

    const handleJoinGame = () => {
        setMode("join");
    }

    const handleCreateGame = () => {
        setMode("create");
    }

    return (
        <>
            {mode != "join" && <button onClick={handleJoinGame}>Join Game</button>}
            {mode != "create" && <button onClick={handleCreateGame}>Create Game</button>}
            {
                (mode == "join") ? <JoinGameBox /> : (mode == "create") && <CreateGameBox />
            }
        </>
    )
}

export default LandingPage;