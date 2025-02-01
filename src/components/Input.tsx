import { HTMLInputTypeAttribute } from "react"

interface InputType {
    placeholder: string
    type: HTMLInputTypeAttribute
    name: string
}

const Input = ({ placeholder, type, name }: InputType) => {
    return (
        <input placeholder={placeholder} name={name} type={type} className=" h-[3vw] border-[0.2vw] rounded-[0.5vw] border-slate-200 outline-none text-[1.3vw] w-[100%] " />
    )
}

export default Input