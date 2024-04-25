import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks'
import { roles } from '../types/roles.type'

export const useAuthGuard = (role: string) => {
    const currentUser = useAppSelector(
        (state) => state.usersReducer.currentUser,
    )

    const navigate = useNavigate()

    useEffect(() => {
        if (role === roles.admin && !currentUser?.roles.includes(role))
            navigate('/auth/login')
        if (role === roles.user && !currentUser) navigate('/auth/login')
    }, [currentUser, navigate, role])
}
