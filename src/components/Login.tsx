import { useDispatch } from "react-redux"
import Input from "./Input"
import { setAuth, setIsAuth } from "../store"
import { FormEvent } from "react"
import { $axios } from "../api/axios"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    async function onLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)

        const data = Object.fromEntries(formData.entries())

        try {
            const res = await $axios.post("/auth/login", data)

            localStorage.setItem("accessToken", res.data.accessToken)

            dispatch(setIsAuth(true))

            navigate("/")


        } catch (error: any) {
            alert(error?.data?.response.message)
            localStorage.removeItem("accessToken")
            navigate("/auth")
        }
    }

    return (
        <div className=" login flex items-center justify-center ">
            <form onSubmit={onLogin} className=" w-[40vw] h-[25vw] bg-[white] relative z-1 rounded-[0.4vw] ">
                <h1 className=" text-[3vw] font-bold ">Вход</h1>

                <label className=" flex flex-col gap-[0.5vw] ">
                    <span className=" text-[1.2vw] ">Логин</span>
                    <Input placeholder="Введите логин" type="text" name="email" />
                </label>
                <br />
                <label className=" flex flex-col gap-[0.5vw] ">
                    <span className=" text-[1.2vw] ">Пароль</span>
                    <Input placeholder="Введите пароль" type="password" name="password" />
                </label>
                <div onClick={() => dispatch(setAuth("register"))} className=" text-[blue] text-[1vw] cursor-pointer ">Регистратция</div>

                <button className=" w-[6vw] h-[3vw] bg-[green] text-[white] rounded-[0.5vw] cursor-pointer ">
                    Вход
                </button>
            </form>
        </div>
    )
}

export default Login