import { configureStore, createSlice,  PayloadAction } from "@reduxjs/toolkit"

interface InitialState {
    authType: "login" | "register"
    showAddModal: boolean
    isAuth: boolean
    loading: boolean
    showEdit: boolean
    id: string
}

const initialState: InitialState = {
    authType: "login",
    showAddModal: false,
    isAuth: false,
    loading: false,
    showEdit: false,
    id: ""
}

const companySlice = createSlice({
    name: "comapny",
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<"login" | "register">) {
            state.authType = action.payload
        },
        setShowModal(state, action: PayloadAction<boolean>) {
            state.showAddModal = action.payload
        },
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
        setShowEdit(state, action: PayloadAction<boolean>) {
            state.showEdit = action.payload
        },
        setId(state, action: PayloadAction<string>) {
            state.id = action.payload
        }
    }
})

export const store = configureStore({
    reducer: {
        company: companySlice.reducer
    }
})

export type RootType = ReturnType<typeof store.getState>

export const { setAuth, setShowModal, setIsAuth, setLoading, setShowEdit, setId } = companySlice.actions