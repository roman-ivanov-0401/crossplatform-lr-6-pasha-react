import { Button, TextField, Box, Typography } from '@mui/material'
import {
    Controller,
    Form,
    FormProvider,
    FormSubmitHandler,
    useForm,
} from 'react-hook-form'
import { RegisterFormInterface } from '../../types/forms'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterUserMutation } from '../../services/api.service'
import toast from 'react-hot-toast'
import { useAppDispatch } from '../../hooks'
import { userActions } from '../../store/slices/users.slice'

export function Register() {
    const methods = useForm<RegisterFormInterface>()
    const { control, watch } = methods
    const [sendRegister] = useRegisterUserMutation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const currentPassword = watch('password')

    const formSubmitHandler: FormSubmitHandler<RegisterFormInterface> = ({
        data: { login, password },
    }) => {
        sendRegister({ login, password })
            .then((res) => {
                if ('data' in res) {
                    dispatch(userActions.setCurrentUser(res.data))
                    navigate('/')
                }
            })
            .catch((error) => {
                toast('Что-то пошло не так:(')
            })
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
                        Регистрация
                    </Typography>
                    <FormProvider {...methods}>
                        <Form onSubmit={formSubmitHandler}>
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
                                            value: 8,
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
                                <Controller
                                    name="repeatPassword"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message:
                                                'Это поле обязательно для заполения',
                                        },
                                        minLength: {
                                            value: 8,
                                            message:
                                                'Минимальная длина - 8 символов',
                                        },
                                        validate: (current) =>
                                            current === currentPassword
                                                ? true
                                                : 'Пароли не совпадают',
                                    }}
                                    render={({
                                        field: { value, onChange },
                                        formState: { errors },
                                    }) => (
                                        <TextField
                                            label="Повторите пароль"
                                            variant="filled"
                                            type="password"
                                            value={value}
                                            onChange={onChange}
                                            error={Boolean(
                                                errors.repeatPassword,
                                            )}
                                            helperText={
                                                errors.repeatPassword?.message
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
                                    Зарегистрироваться
                                </Button>
                                <Link to="/auth/login">
                                    <Typography variant="overline">
                                        Есть аккаунт? Войдите здесь!
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
