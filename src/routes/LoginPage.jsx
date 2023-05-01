import { useAuth0 } from "@auth0/auth0-react";

const LoginPage = () => {

    const { loginWithRedirect } = useAuth0();

    return (
        <button onClick={loginWithRedirect}>Login/Signup</button>
    )
}

export default LoginPage;