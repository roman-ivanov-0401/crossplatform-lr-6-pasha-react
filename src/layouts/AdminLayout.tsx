import { Outlet, useNavigate } from 'react-router-dom'
import { useAuthGuard } from '../guards/AuthGuard'
import { roles } from '../types/roles.type'
import {
    BottomNavigation,
    Typography,
    BottomNavigationAction,
    Button,
} from '@mui/material'
import { Person, Comment, School } from '@mui/icons-material'
import { useAppDispatch } from '../hooks'
import { userActions } from '../store/slices/users.slice'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export const AdminLayout = () => {
    useAuthGuard(roles.admin)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleExitButtonClick = () => {
        dispatch(userActions.setCurrentUser(null))
        navigate('/auth/login')
    }

    return (
        <>
            <header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                    }}
                >
                    <img
                        src="../../university_icon.png"
                        alt="МГТУ им. Баумана"
                        width={35}
                        height={35}
                    />
                    <Typography variant="h4" fontWeight={700}>
                        МГТУ им. Баумана
                    </Typography>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Typography variant="h5" fontWeight={700}>
                        Панель администратора
                    </Typography>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleExitButtonClick}
                    >
                        Выйти из учётной записи
                    </Button>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
            <BottomNavigation
                showLabels
                style={{ position: 'fixed', bottom: '0', width: '100%' }}
            >
                <BottomNavigationAction
                    label="Назад"
                    icon={<ArrowBackIcon />}
                    onClick={() => navigate('/')}
                />
                <BottomNavigationAction
                    label="Курсы"
                    icon={<School />}
                    onClick={() => navigate('/admin/courses')}
                />
                <BottomNavigationAction
                    label="Контакты"
                    icon={<Comment />}
                    onClick={() => navigate('/admin/contacts')}
                />
            </BottomNavigation>
        </>
    )
}
