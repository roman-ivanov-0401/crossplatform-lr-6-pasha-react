import { useAuthGuard } from '../../guards/AuthGuard'
import { roles } from '../../types/roles.type'
import { Box, Button, TextField, Typography } from '@mui/material'
import {
    useForm,
    Controller,
    FormProvider,
    Form,
    FormSubmitHandler,
} from 'react-hook-form'
import { AddContactFormInterface } from '../../types/forms/addContactForm.interface'
import Messages from './Messages'
import { usePostContactMutation } from '../../services/api.service'
import toast from 'react-hot-toast'

export const Contact = () => {
    useAuthGuard(roles.user)
    const methods = useForm<AddContactFormInterface>()
    const { control } = methods
    const [postContact] = usePostContactMutation()

    const handleFormSubmit: FormSubmitHandler<AddContactFormInterface> = ({
        data,
    }) => {
        postContact(data)
            .then((res) => {
                toast('Контакт успешно оставлен')
            })
            .catch((err) => {
                toast('Ошибка при отправлении контакта')
            })
    }

    return (
        <div
            style={{
                padding: '2rem 3rem',
            }}
        >
            <Typography variant="h2" align="center">
                Контакты
            </Typography>
            <Typography variant="body1">
                <strong>Адрес:</strong> Москва, 2-я Бауманская улица, д. 5
            </Typography>
            <Typography variant="body1">
                <strong>Телефон:</strong> +7 (495) 500-00-00
            </Typography>
            <Typography variant="body1">
                <strong>Email:</strong> info@bmstu.ru
            </Typography>
            <div className="contact-form">
                <Typography variant="h5">Отправить сообщение</Typography>
                <FormProvider {...methods}>
                    <Form
                        id="contact_form"
                        method="post"
                        className="default_form"
                        onSubmit={handleFormSubmit}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                            }}
                        >
                            <Controller
                                name="login"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message:
                                            'Это поле обязательно для заполения',
                                    },
                                }}
                                render={({
                                    field: { value, onChange },
                                    formState: { errors },
                                }) => (
                                    <TextField
                                        id="filled-basic"
                                        label="Ваше имя"
                                        variant="filled"
                                        value={value}
                                        onChange={onChange}
                                        error={Boolean(errors.login)}
                                        helperText={errors.login?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message:
                                            'Это поле обязательно для заполения',
                                    },
                                    pattern: {
                                        value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                                        message:
                                            'Поле должно содержать адрес электронной почты',
                                    },
                                }}
                                render={({
                                    field: { value, onChange },
                                    formState: { errors },
                                }) => (
                                    <TextField
                                        id="filled-basic"
                                        type="email"
                                        label="Ваша почта"
                                        variant="filled"
                                        value={value}
                                        onChange={onChange}
                                        error={Boolean(errors.email)}
                                        helperText={errors.email?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="message"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message:
                                            'Это поле обязательно для заполения',
                                    },
                                }}
                                render={({
                                    field: { value, onChange },
                                    formState: { errors },
                                }) => (
                                    <TextField
                                        id="filled-basic"
                                        label="Сообщение"
                                        variant="filled"
                                        multiline
                                        rows={4}
                                        value={value}
                                        onChange={onChange}
                                        error={Boolean(errors.message)}
                                        helperText={errors.message?.message}
                                    />
                                )}
                            />
                        </Box>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                marginTop: '1rem',
                            }}
                        >
                            Отправить
                        </Button>
                    </Form>
                </FormProvider>
            </div>
            <Messages />
        </div>
    )
}
