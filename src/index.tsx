import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './store'
import { Provider } from 'react-redux'

import { RouterProvider } from 'react-router-dom'
import { router } from './routers'
import { Toaster } from 'react-hot-toast'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Toaster />
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>,
)
