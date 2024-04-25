import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserModel, UserModelForPost } from '../models/user.model'
import { LoginFormInterface, RegisterFormInterface } from '../types/forms'
import { ContactModel } from '../models/contact.model'
import { AddContactFormInterface } from '../types/forms/addContactForm.interface'
import { CourseModel } from '../models/course.model'
import { AddCourseInterface } from '../types/forms/AddCourse.interface'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_PROXY}/api`,
        credentials: 'include',
        mode: 'cors',
    }),
    tagTypes: ['allContacts', 'allCourses'],
    endpoints: (builder) => ({
        // AUTH API
        loginUser: builder.mutation<UserModel, LoginFormInterface>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        registerUser: builder.mutation<
            UserModel,
            Omit<RegisterFormInterface, 'repeatPassword'>
        >({
            query: (credentials) => ({
                url: '/auth/register',
                method: 'POST',
                body: credentials,
            }),
        }),
        logoutUser: builder.mutation<null, null>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
                // credentials: 'include',
            }),
        }),

        // CONTACTS API
        getAllContacts: builder.query<ContactModel[], void>({
            query: () => ({ url: '/guest/contacts', credentials: 'include' }),
            providesTags: ['allContacts'],
        }),
        getAllContactsAdmin: builder.query<ContactModel[], void>({
            query: () => ({
                url: '/admin/contacts',
                // credentials: 'include',
                mode: 'cors',
                headers: {
                    Accept: 'text/plain',
                },
            }),
            providesTags: ['allContacts'],
        }),
        postContact: builder.mutation<
            Omit<ContactModel, 'login'>,
            AddContactFormInterface
        >({
            query: ({ email, message }) => ({
                url: '/guest/contact',
                method: 'POST',
                body: { email, message },
                // credentials: 'include',
            }),
            invalidatesTags: ['allContacts'],
        }),
        putContactAdmin: builder.mutation<
            void,
            {
                message: string
                id: number
            }
        >({
            query: (contact) => ({
                url: `/admin/contacts/${contact.id},`,
                method: 'PUT',
                body: {
                    message: contact.message,
                },
                invalidatesTags: ['allContacts'],
                // credentials: 'include',
            }),
        }),

        // COURSE API
        getAllCourses: builder.query<CourseModel[], void>({
            query: () => ({ url: '/courses', credentials: 'include' }),
            providesTags: ['allCourses'],
        }),
        getCourseByIdAdmin: builder.query<CourseModel, number>({
            query: (id) => ({
                url: `/admin/course/${id}`,
                // credentials: 'include',
            }),
        }),
        postCourseAdmin: builder.mutation<null, AddCourseInterface>({
            query: (formData) => ({
                url: '/admin/course',
                method: 'POST',
                // credentials: 'include',
                body: formData,
            }),
            invalidatesTags: ['allCourses'],
        }),
        putCourseAdmin: builder.mutation<
            void,
            AddCourseInterface & { id: string }
        >({
            query: ({ id, name, teacher, duration, description }) => ({
                url: `/admin/course/${id}`,
                // credentials: 'include',
                method: 'PUT',
                body: { name, teacher, duration, description },
            }),
            invalidatesTags: ['allCourses'],
        }),
        deleteCourseByIdAdmin: builder.mutation<void, number>({
            query: (id) => ({
                url: `/admin/course/${id}`,
                // credentials: 'include',
                method: 'DELETE',
            }),
            invalidatesTags: ['allCourses'],
        }),

        // USER API
        postUserAdmin: builder.mutation<void, UserModelForPost>({
            query: (newUser) => ({
                url: '/admin/users/register',
                method: 'POST',
                credentials: 'include',
                body: newUser,
            }),
        }),
        putUserAdmin: builder.mutation<void, UserModelForPost>({
            query: ({ id, login, role, password }) => ({
                url: `/admin/users/${id}`,
                method: 'PUT',
                // credentials: 'include',
                params: {
                    Login: login,
                    Password: password,
                    Role: role,
                },
            }),
        }),
        deleteUserAdmin: builder.mutation<null, number>({
            query: (id) => ({
                url: `/admin/users/${id}`,
                // credentials: 'include',
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    usePostUserAdminMutation,
    useDeleteUserAdminMutation,
    usePostContactMutation,
    useGetAllContactsQuery,
    useGetAllContactsAdminQuery,
    useGetCourseByIdAdminQuery,
    useGetAllCoursesQuery,
    useDeleteCourseByIdAdminMutation,
    useLogoutUserMutation,
    useRegisterUserMutation,
    useLoginUserMutation,
    usePostCourseAdminMutation,
    usePutCourseAdminMutation,
    usePutUserAdminMutation,
    usePutContactAdminMutation,
} = api
