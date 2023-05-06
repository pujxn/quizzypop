import { useAuth0 } from "@auth0/auth0-react";
import style from "@/styles/LoginPage.module.css"

const LoginPage = () => {

    const { loginWithRedirect } = useAuth0();

    return (
        <div className={style.container}>
            <h1 className={style.heading}>Quizzypop - made by Pujan</h1>
            <button className={style.button} onClick={loginWithRedirect}>Login/Signup</button>
        </div>

    )
}

export default LoginPage;