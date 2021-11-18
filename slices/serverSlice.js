import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    servers: [],
}

export const serverSlice = createSlice({
    name: 'servers',
    initialState,
    reducers: {
        serServers: (state, action) => {
            state.servers = [...state.servers, action.payload]
        },
    },
})

export const { initializeServers } = serverSlice.actions
export const selectServers = (state) => state.servers.servers
export default serverSlice.reducer