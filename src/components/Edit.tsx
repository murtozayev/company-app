import { useDispatch, useSelector } from "react-redux"
import Input from "./Input"
import { RootType, setShowEdit } from "../store"
import { FormEvent } from "react"
import $api from "../api/api"

const Edit = () => {

    const { showEdit, id } = useSelector((state: RootType) => state.company)

    const dispatch = useDispatch()

    async function onCreate(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)

        const data = Object.fromEntries(formData.entries())
        try {
            await $api.put("/company/update/" + id, JSON.stringify(data), {
                headers: { "Content-Type": "application/json" }
            });

            alert("Updated successfully")

            window.location.reload()
        } catch (error: any) {
            alert(error?.data?.response.message)
        }
    }


    return (
        <div onClick={() => dispatch(setShowEdit(false))} className={` w-full h-screen absolute backdrop-brightness-[0.5] top-0 left-0 flex items-center justify-center transition duration-[0.2s] ease-linear ${showEdit ? "scale-[1]" : "scale-0"} `}>
            <form onSubmit={onCreate} onClick={(e) => e.stopPropagation()} className=" w-[40vw] h-[20vw] bg-[white] rounded-[0.5vw] ">
                <h1 className=" text-[2vw] font-bold ">Изменить компания</h1>
                <br />
                <label className=" flex items-center ">
                    <span className=" text-[1vw] w-[60%] font-semibold ">Изменить компания</span>
                    <Input placeholder="Введите названия" type="text" name="name" />
                </label>
                <br />
                <label className="flex items-center">
                    <span className=" text-[1vw] w-[60%] font-semibold ">Изменить сотрудников</span>
                    <Input placeholder="Введите сотрудников" type="number" name="count" />
                </label>
                <button onClick={() => dispatch(setShowEdit(false))} className=" w-[12vw] h-[3vw] bg-[#08979C] font-semibold text-[white] rounded-[0.3vw] text-[1vw] cursor-pointer ">Изменить компания</button>
            </form>
        </div>
    )
}

export default Edit