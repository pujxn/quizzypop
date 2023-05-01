import { useState } from "react";
import JoinGameBox from "@/components/JoinGameBox";
import CreateGameBox from "@/components/CreateGameBox";
import { useAuth0 } from "@auth0/auth0-react";


const LandingPage = () => {

    const { loginWithRedirect, logout } = useAuth0();

    const [mode, setMode] = useState("");

    const handleJoinGame = () => {
        setMode("join");
    }

    const handleCreateGame = () => {
        setMode("create");
    }

    return (
        <>
            <button onClick={loginWithRedirect}>Login</button>
            <button onClick={logout}>Logout</button>
            {mode != "join" && <button onClick={handleJoinGame}>Join Game</button>}
            {mode != "create" && <button onClick={handleCreateGame}>Create Game</button>}
            {
                (mode == "join") ? <JoinGameBox /> : (mode == "create") && <CreateGameBox />
            }
        </>
    )
}

export default LandingPage;