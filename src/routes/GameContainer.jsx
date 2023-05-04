import { useLocation, useParams, NavLink, Outlet } from "react-router-dom";

const GameContainer = () => {
    const location = useLocation();
    const { slug } = useParams();
    const gameId = location.state?.gameId;
    const playerType = location.state?.playerType
    return (
        <>
            {(gameId && slug && slug.trim() != "") ? <Outlet context={{ "gameId": gameId, "playerType": playerType }} /> : <p>Please go to the <NavLink to="/">home page</NavLink> to create/join a game </p>}
        </>

    )
}

export default GameContainer;