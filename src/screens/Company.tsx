import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import $api from "../api/api"
import { useDispatch } from "react-redux"
import { setId, setShowEdit } from "../store"
import Edit from "../components/Edit"
import AddModal from "../components/AddModal"

interface Data {
    name: string
    count: number
    _id: string
}

const Company = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState<Data[]>([])
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
    const [showRemoveId, setShowRemoveId] = useState<string | null>(null)

    async function getData() {
        try {
            const res = await $api.get("/company/get-all")
            setData(res.data)
        } catch (error: any) {
            alert(error?.data?.response?.message)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const toggleDropdown = (id: string) => {
        setOpenDropdownId(prevId => (prevId === id ? null : id))
    }

    function edit(id: string) {
        dispatch(setId(id))
        dispatch(setShowEdit(true))
    }

    function onClose() {
        setShowRemoveId(null)
        setOpenDropdownId(null)
    }

    async function onRemove(id: string) {
        setOpenDropdownId(null)
        setShowRemoveId(null)
        try {
            const res = $api.delete("/company/delete/" + id)

            alert((await res).data.message)

            window.location.reload()
        } catch (error: any) {
            alert(error.data.response.message)
        }
    }

    return (
        <div className="overflow-y-auto">
            <Navbar />
            <br />
            <div>
                <div className="flex items-center justify-between container border bg-slate-400 border-none font-semibold rounded-[0.3vw] text-[1vw]">
                    <span className="w-[45vw]">Названия компании</span>
                    <hr className="h-[3vw] border-[black] border" />
                    <span className="w-[40vw]">Количество сотрудников</span>
                </div>
                <div>
                    {data.map((item) => (
                        <div key={item._id} className="flex items-center justify-between container bg-slate-200 border-slate-400 border font-semibold rounded-[0.3vw] text-[1vw]">
                            <span className="w-[45vw]">{item.name}</span>
                            <hr className="h-[3vw] border-[black] border-none" />
                            <span className="w-[40vw]">{item.count} человек</span>
                            <div className="relative">
                                <button onClick={() => toggleDropdown(item._id)} className="fa-solid fa-ellipsis-vertical cursor-pointer w-[1vw] h-[1vw] " />
                                {openDropdownId === item._id && (
                                    <div className="absolute z-10 bg-[white] w-[10vw] h-[5vw] left-[-11vw] top-[-1.7vw] rounded-[0.4vw] flex flex-col justify-center items-center gap-[0.5vw]">
                                        <button onClick={() => edit(item._id)} className="flex w-[70%] items-center gap-[1vw] text-[1vw] cursor-pointer">
                                            <i className="fa-regular fa-pen-to-square" />
                                            <span>Изменить</span>
                                        </button>
                                        <button onClick={() => setShowRemoveId(item._id)} className="flex items-center w-[70%] gap-[1vw] text-[1vw] cursor-pointer">
                                            <i className="fas fa-trash text-[red]" />
                                            <span>Удалить</span>
                                        </button>
                                    </div>
                                )}
                                {showRemoveId === item._id && (
                                    <div className="w-[20vw] h-[7vw] absolute bg-[white] left-[-20vw] z-10 top-[-5vw] flex flex-col justify-center rounded-[1vw] items-center gap-[1vw]">
                                        <span className="text-[1.3vw] flex items-center justify-center gap-[1vw]">
                                            <i className="fa-solid fa-circle-info text-[orange]" /> Вы хотите удалить?
                                        </span>
                                        <div className="flex gap-[0.4vw] relative left-[4vw] ">
                                            <button onClick={onClose} className="cursor-pointer w-[3vw] h-[2vw] border text-[1vw]">Нет</button>
                                            <button onClick={() => onRemove(item._id)} className="cursor-pointer w-[3vw] h-[2vw] border text-[1vw] border-[red] text-[red]">Да</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Edit />
            <AddModal />
        </div>
    )
}

export default Company
