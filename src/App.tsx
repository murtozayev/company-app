import { Route, Routes, useNavigate } from "react-router-dom"
import Auth from "./screens/Auth"
import Company from "./screens/Company"
import { useDispatch, useSelector } from "react-redux"
import { RootType, setIsAuth, setLoading } from "./store"
import { useEffect } from "react"
import { $axios } from "./api/axios"

const App = () => {

  const { isAuth } = useSelector((state: RootType) => state.company)

  const navigate = useNavigate()

  const dispatch = useDispatch()
  useEffect(() => {
    async function checkAuth() {
      dispatch(setLoading(true))
      try {
        if (localStorage.getItem("accessToken")){
          const { data } = await $axios.get("/auth/refresh")

          localStorage.setItem("accessToken", data.accessToken)

          dispatch(setIsAuth(true))
        } else {
          navigate("/auth")
        }
      } catch (error: any) {
        const errorMessage = error?.response?.data?.message || 'An error occurred'
        alert(errorMessage)
        localStorage.removeItem("accessToken")
        navigate("/auth")
      } finally {
        dispatch(setLoading(false))
      }
    }

    checkAuth()
  }, [navigate])

  return (
    <div className=" w-[100vw] h-[100vh] ">
      <Routes>
        {isAuth ? (
          <Route path="/" element={<Company />} />
        ) : (
          <Route path="/auth" element={<Auth />} />
        )}
      </Routes>
    </div>
  )
}

export default App