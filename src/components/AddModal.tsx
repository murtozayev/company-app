import { useDispatch, useSelector } from "react-redux"
import Input from "./Input"
import { RootType, setShowModal } from "../store"
import { FormEvent } from "react"
import $api from "../api/api"

const AddModal = () => {

    const { showAddModal } = useSelector((state: RootType) => state.company)

    const dispatch = useDispatch()

    async function onCreate(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)

        const data = Object.fromEntries(formData.entries())

        console.log(data);
        try {
            await $api.post("/company/add-company", JSON.stringify(data), {
                headers: { "Content-Type": "application/json" }
            });

            alert("Added successfully")

            window.location.reload()
        } catch (error: any) {
            alert(error?.data?.response.message)
        }
    }


    return (
        <div onClick={() => dispatch(setShowModal(false))} className={` w-full h-screen absolute backdrop-brightness-[0.5] top-0 left-0 flex items-center justify-center transition duration-[0.2s] ease-linear ${showAddModal ? "scale-[1]" : "scale-0"} `}>
            <form onSubmit={onCreate} onClick={(e) => e.stopPropagation()} className=" w-[40vw] h-[20vw] bg-[white] rounded-[0.5vw] ">
                <h1 className=" text-[2vw] font-bold ">Добавить компания</h1>
                <br />
                <label className=" flex items-center ">
                    <span className=" text-[1vw] w-[60%] font-semibold ">Названия компания</span>
                    <Input placeholder="Введите названия" type="text" name="name" />
                </label>
                <br />
                <label className="flex items-center">
                    <span className=" text-[1vw] w-[60%] font-semibold ">Количество сотрудников</span>
                    <Input placeholder="Введите сотрудников" type="number" name="count" />
                </label>
                <button onClick={() => dispatch(setShowModal(false))} className=" w-[12vw] h-[3vw] bg-[#08979C] font-semibold text-[white] rounded-[0.3vw] text-[1vw] cursor-pointer ">Добавить компания</button>
            </form>
        </div>
    )
}

export default AddModal