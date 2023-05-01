import { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
const GameContainer = () => {

    // const location = useLocation();
    // console.log(location);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     navigate(location.state.gameId);
    // }, [])

    // // navigate(location.state.gameId);

    return (
        <Outlet />
    )
}

export default GameContainer;