import { useState } from "react";
import JoinGameBox from "@/components/JoinGameBox";
import CreateGameBox from "@/components/CreateGameBox";
import { useAuth0 } from "@auth0/auth0-react";
import LoginPage from "@/routes/LoginPage";



const LandingPage = () => {

    const { logout, user, isLoading, isAuthenticated } = useAuth0();

    const [mode, setMode] = useState("");

    const handleJoinGame = () => {
        setMode("join");
    }

    const handleCreateGame = () => {
        setMode("create");
    }

    if (isLoading) {
        return (<div>Loading...</div>)
    }

    return (
        <>
            {isAuthenticated ? (
                <>
                    <span>{user.name}</span><img src={user.picture} />
                    <button onClick={logout}>Logout</button>
                    {mode != "join" && <button onClick={handleJoinGame}>Join Game</button>}
                    {mode != "create" && <button onClick={handleCreateGame}>Create Game</button>}
                    {
                        (mode == "join") ? <JoinGameBox /> : (mode == "create") && <CreateGameBox />
                    }
                </>
            ) : <LoginPage />}
        </>
    )
}

export default LandingPage;