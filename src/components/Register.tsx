import { useDispatch } from "react-redux"
import Input from "./Input"
import { setAuth, setIsAuth } from "../store"
import { $axios } from "../api/axios"
import { FormEvent } from "react"
import { useNavigate } from "react-router-dom"

const Register = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    async function onRegister(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)

        const data = Object.fromEntries(formData.entries())

        try {
            const res = await $axios.post("/auth/register", data)

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
            <form onSubmit={onRegister} className=" w-[40vw] h-[35vw] bg-[white] relative z-1 rounded-[0.4vw] ">
                <h1 className=" text-[3vw] font-bold ">Регистратция</h1>

                <label className=" flex flex-col gap-[0.5vw] ">
                    <span className=" text-[1.2vw] ">Ф.И.О</span>
                    <Input name="name" placeholder="Введите Ф.И.О" type="text" />
                </label>
                <br />
                <label className=" flex flex-col gap-[0.5vw] ">
                    <span className=" text-[1.2vw] ">Логин</span>
                    <Input name="email" placeholder="Введите логин" type="text" />
                </label>
                <br />
                <label className=" flex flex-col gap-[0.5vw] ">
                    <span className=" text-[1.2vw] ">Пароль</span>
                    <Input name="password" placeholder="Введите пароль" type="password" />
                </label>
                <div onClick={() => dispatch(setAuth("login"))} className=" text-[blue] text-[1vw] cursor-pointer ">Вход</div>

                <button className=" w-[10vw] h-[3vw] bg-[green] text-[white] rounded-[0.5vw] cursor-pointer ">
                    Регистратция
                </button>
            </form>
        </div>
    )
}

export default Register