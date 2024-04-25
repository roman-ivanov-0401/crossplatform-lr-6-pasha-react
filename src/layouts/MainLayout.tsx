import { Outlet, Link, useNavigate } from 'react-router-dom'
import { Button, Tab, Tabs, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../hooks'
import { userActions } from '../store/slices/users.slice'
import { roles } from '../types/roles.type'

export default function MainLayout() {
    const { currentUser } = useAppSelector((state) => state.usersReducer)
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
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleExitButtonClick}
                    >
                        Выйти из учётной записи
                    </Button>
                </div>
            </header>
            <Tabs centered>
                <Link to="/">
                    <Tab label="Главная"></Tab>
                </Link>
                <Link to="/about">
                    <Tab label="О нас"></Tab>
                </Link>
                <Link to="/courses">
                    <Tab label="Курсы"></Tab>
                </Link>
                <Link to="/contacts">
                    <Tab label="Контакты"></Tab>
                </Link>
                {currentUser && currentUser.roles.includes(roles.admin) && (
                    <Link to="/admin/contacts">
                        <Tab label="Панель администратора"></Tab>
                    </Link>
                )}
            </Tabs>
            <main>
                <Outlet />
            </main>
            <footer>&copy; 2024 МГТУ им. Баумана. Все права защищены.</footer>
        </>
    )
}
