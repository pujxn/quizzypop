import { useParams, NavLink, Outlet } from "react-router-dom";
const GameContainer = () => {

    const { slug } = useParams();
    // const location = useLocation();
    // console.log(location);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     navigate(location.state.gameId);
    // }, [])

    // // navigate(location.state.gameId);

    return (
        <>
            {(!slug || slug.trim() == "") && <p>Please go to the <NavLink to="/">home page</NavLink> to create/join a game </p>}
            <Outlet />
        </>

    )
}

export default GameContainer;