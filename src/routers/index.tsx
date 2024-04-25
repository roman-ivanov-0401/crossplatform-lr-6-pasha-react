import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Login from '../pages/security/Login'
import { Courses } from '../pages/courses/Courses'
import { Contact } from '../pages/contact/Contact'
import { About } from '../pages/about/About'
import { AdminLayout } from '../layouts/AdminLayout'
import { AdminUsers } from '../pages/admin/users/AdminUsers'
import { AdminContacts } from '../pages/admin/contacts/AdminContacts'
import { AdminCourses } from '../pages/admin/courses/AdminCourses'
import NotFound from '../pages/NotFound'
import Home from '../pages/home/Home'
import { Register } from '../pages/security/Register'
import AdminEditContact from '../pages/admin/contacts/AdminEditContact'
import AdminAddContact from '../pages/admin/contacts/AdminAddContact'
import AdminEditUser from '../pages/admin/users/AdminEditUser'
import AdminAddUser from '../pages/admin/users/AdminAddUser'
import AdminEditCourse from '../pages/admin/courses/AdminEditCourse'
import AdminAddCourse from '../pages/admin/courses/AdminAddCourse'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/courses',
                element: <Courses />,
                children: [],
            },
            {
                path: '/contacts',
                element: <Contact />,
            },
            {
                path: '/about',
                element: <About />,
            },
        ],
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            // {
            //     path: '/admin/users',
            //     element: <AdminUsers />,
            // },
            {
                path: '/admin/contacts',
                element: <AdminContacts />,
            },
            {
                path: '/admin/courses',
                element: <AdminCourses />,
            },
            {
                path: '/admin/courses/add-course',
                element: <AdminAddCourse />,
            },
            {
                path: '/admin/courses/edit-course/:id',
                element: <AdminEditCourse />,
            },
            // {
            //     path: '/admin/users/add-user',
            //     element: <AdminAddUser />,
            // },
            // {
            //     path: '/admin/users/edit-user/:id',
            //     element: <AdminEditUser />,
            // },
            {
                path: '/admin/contacts/add-contact',
                element: <AdminAddContact />,
            },
            {
                path: '/admin/contacts/edit-contact/:id',
                element: <AdminEditContact />,
            },
        ],
    },
    {
        path: '/auth/login',
        element: <Login />,
    },
    {
        path: '/auth/register',
        element: <Register />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
])
