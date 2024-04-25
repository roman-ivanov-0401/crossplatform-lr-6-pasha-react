import { configureStore } from '@reduxjs/toolkit'
import { usersReducer } from './slices/users.slice'
import contactsReducer from './slices/contacts.slice'
import coursesReducer from './slices/course.slice'
import { api } from '../services/api.service'

export const store = configureStore({
    reducer: {
        usersReducer: usersReducer,
        contactsReducer,
        coursesReducer,
        // comments: contactsReducer,
        [api.reducerPath]: api.reducer,
    },
    // @ts-ignore
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
