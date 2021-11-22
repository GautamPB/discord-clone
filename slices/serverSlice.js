import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    servers: [],
}

export const serverSlice = createSlice({
    name: 'servers',
    initialState,
    reducers: {
        initializeServers: (state, action) => {
            state.servers = [...state.servers, action.payload]
        },

        deactivateServers: (state) => {
            state.servers = []
        },
    },
})

export const { initializeServers, deactivateServers } = serverSlice.actions
export const selectServers = (state) => state.servers.servers
export default serverSlice.reducer
