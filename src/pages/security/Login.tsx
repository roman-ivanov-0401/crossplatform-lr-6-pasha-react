import { Button, TextField, Box, Typography } from '@mui/material'
import {
    useForm,
    Controller,
    FormProvider,
    Form,
    FormSubmitHandler,
} from 'react-hook-form'
import { LoginFormInterface } from '../../types/forms'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../../services/api.service'
import { useAppDispatch } from '../../hooks'
import { userActions } from '../../store/slices/users.slice'
import toast from 'react-hot-toast'

export default function Login() {
    const methods = useForm<LoginFormInterface>()
    const { control } = methods
    const [sendLogin] = useLoginUserMutation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleSubmit: FormSubmitHandler<LoginFormInterface> = (req) => {
        sendLogin(req.data as LoginFormInterface)
            .unwrap()
            .then((data) => {
                dispatch(userActions.setCurrentUser(data))
                navigate('/')
            })
            .catch((error) => {
                toast('Неверный логин или пароль:( Попробуйте что-то другое!')
            })

        // .then((data) => {
        //     dispatch(userActions.setCurrentUser(data.body))
        //     navigate('/')
        // })
        // .catch((error) => {
        //     toast('Неверный логин или пароль:( Попробуйте что-то другое!')
        // })
    }

    return (
        <>
            <Box>
                <Box
                    maxWidth={600}
                    height="80vh"
                    margin="0 auto"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                >
                    <img
                        src="../university_icon.png"
                        width="100px"
                        height="100px"
                        style={{ margin: '0 auto', marginBottom: '1rem' }}
                    />
                    <Typography align="center" variant="h2">
                        Вход
                    </Typography>
                    <FormProvider {...methods}>
                        <Form onSubmit={handleSubmit}>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <Controller
                                    name="login"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message:
                                                'Это поле обязательно для заполнения',
                                        },
                                    }}
                                    render={({
                                        field: { value, onChange },
                                        formState: { errors },
                                    }) => (
                                        <TextField
                                            label="Логин"
                                            variant="filled"
                                            value={value}
                                            onChange={onChange}
                                            error={Boolean(errors.login)}
                                            helperText={errors.login?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name="password"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message:
                                                'Это поле обязательно для заполения',
                                        },
                                        minLength: {
                                            value: 3,
                                            message:
                                                'Минимальная длина - 8 символов',
                                        },
                                    }}
                                    render={({
                                        field: { value, onChange },
                                        formState: { errors },
                                    }) => (
                                        <TextField
                                            label="Пароль"
                                            variant="filled"
                                            type="password"
                                            value={value}
                                            onChange={onChange}
                                            error={Boolean(errors.password)}
                                            helperText={
                                                errors.password?.message
                                            }
                                        />
                                    )}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Button
                                    variant="contained"
                                    style={{ marginTop: '16px' }}
                                    type="submit"
                                >
                                    Войти
                                </Button>
                                <Link to="/auth/register">
                                    <Typography variant="overline">
                                        Нет аккаунта? Зарегистрируйтесь здесь!
                                    </Typography>
                                </Link>
                            </Box>
                        </Form>
                    </FormProvider>
                </Box>
            </Box>

            <footer>&copy; 2024 МГТУ им. Баумана. Все права защищены.</footer>
        </>
    )
}
