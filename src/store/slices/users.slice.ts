import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserModel } from '../../models/user.model'

// Define a type for the slice state
interface CounterState {
    currentUser: UserModel | null
    allUsers: UserModel[]
}

// Define the initial state using that type
const initialState: CounterState = {
    currentUser: null,
    allUsers: [],
}

export const counterSlice = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        setCurrentUser(state, { payload }: PayloadAction<UserModel | null>) {
            state.currentUser = payload
        },
        setAllUsers(state, { payload }: PayloadAction<UserModel[]>) {
            state.allUsers = payload
        },
    },
})

export const userActions = counterSlice.actions

export const usersReducer = counterSlice.reducer
