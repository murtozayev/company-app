import { useDispatch } from "react-redux"
import { setIsAuth, setShowModal } from "../store"
import { $axios } from "../api/axios"
import { useNavigate } from "react-router-dom"

const Navbar = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    async function onLogout() {
        try {
            await $axios.post("/auth/logout")

            localStorage.removeItem("accessToken")

            dispatch(setIsAuth(false))
            alert("Logout successfully")
            navigate("/auth")


        } catch (error: any) {
            alert(error.data.response.message)
        }
    }

    return (
        <nav className=" flex items-center justify-between bg-[#313131] ">
            <h1 className=" text-[2vw] font-bold text-[white] ">Компании</h1>

            <div className=" flex items-center gap-[3vw] ">
                <button onClick={onLogout} className=" fa fa-door-open text-[2vw] text-[white]c cursor-pointer text-[white] " />
                <button onClick={() => dispatch(setShowModal(true))} className=" w-[12vw] h-[3vw] cursor-pointer bg-[#08979C] font-semibold text-[white] rounded-[0.3vw] text-[1vw] ">Добавить компания</button>
            </div>
        </nav>
    )
}

export default Navbar