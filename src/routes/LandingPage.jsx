import { useState } from "react";
import JoinGameBox from "@/components/JoinGameBox";
import CreateGameBox from "@/components/CreateGameBox";
import { useAuth0 } from "@auth0/auth0-react";
import LoginPage from "@/routes/LoginPage";
import style from "@/styles/LandingPage.module.css"



const LandingPage = () => {

    const { logout, user, isLoading, isAuthenticated } = useAuth0();

    const [mode, setMode] = useState("");

    const handleModeReset = () => {
        setMode("");
    }

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
        <div className={style.container}>
            {isAuthenticated ? (
                <div>

                    <div className={style["avatar-container"]}>
                        <div className={style.avatar}>
                            <img src={user.picture} />
                        </div>
                        <div className={style.username}>{user.name}</div>
                    </div>

                    <button className={style["logout-button"]} onClick={logout}>Logout</button>
                    <div className={style["button-container"]}>
                        {mode == "" && <button className={style.button} onClick={handleJoinGame}>Join Game</button>}
                        {mode == "" && <button className={style.button} onClick={handleCreateGame}>Create Game</button>}
                    </div>

                    {
                        (mode == "join") ? <JoinGameBox userName={user.name} handleModeReset={handleModeReset} /> : (mode == "create") && <CreateGameBox userName={user.name} handleModeReset={handleModeReset} />
                    }
                </div>
            ) : <LoginPage />}
        </div>
    )
}

export default LandingPage;