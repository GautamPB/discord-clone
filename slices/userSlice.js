import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initializeUser: (state, action) => {
            state.user = [action.payload]
        },
    },
})

export const { initializeUser } = userSlice.actions
export const selectUser = (state) => state.user.user
export default userSlice.reducer
