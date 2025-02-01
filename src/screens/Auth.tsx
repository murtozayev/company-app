import { useSelector } from "react-redux"
import { RootType } from "../store"
import Login from "../components/Login"
import Register from "../components/Register"

const Auth = () => {

    const { authType } = useSelector((state: RootType) => state.company)

    return (
        <>
            {authType === "login" ? <Login /> : <Register />}
        </>
    )
}

export default Auth