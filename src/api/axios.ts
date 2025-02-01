import axios from "axios"

export const BaseURL = "https://company-theta-lyart.vercel.app/api/"

export const $axios = axios.create({
    withCredentials: true,
    baseURL: BaseURL
})