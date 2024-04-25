import { Button, TextField, Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import {
    useForm,
    Controller,
    FormProvider,
    Form,
    FormSubmitHandler,
} from 'react-hook-form'
import { AdminEditContactFormInterface } from '../../../types/forms'
import { useAppSelector } from '../../../hooks'
import { usePutContactAdminMutation } from '../../../services/api.service'
import { ContactModel } from '../../../models/contact.model'
import toast from 'react-hot-toast'

export default function AdminEditContact() {
    const navigate = useNavigate()
    const { currentContact } = useAppSelector((state) => state.contactsReducer)
    const [editContact] = usePutContactAdminMutation()
    const methods = useForm<AdminEditContactFormInterface>()
    const { control } = methods

    const handleSubmit: FormSubmitHandler<AdminEditContactFormInterface> = (
        contact,
    ) => {
        editContact({ id: currentContact!.id, message: contact.data.message })
            .then((res) => {
                toast('Контакт был успешно изменен')
            })
            .catch((err) => {
                toast('Ошибка при изменении контакта')
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
                    gap="1rem"
                >
                    <Typography align="center" variant="h4">
                        Редактирование контакта
                    </Typography>
                    <FormProvider {...methods}>
                        <Form onSubmit={handleSubmit}>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <Controller
                                    name="login"
                                    control={control}
                                    defaultValue={
                                        currentContact
                                            ? currentContact.login
                                            : ''
                                    }
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
                                    name="email"
                                    control={control}
                                    defaultValue={
                                        currentContact
                                            ? currentContact.email
                                            : ''
                                    }
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
                                            label="Почта"
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
                                    defaultValue={
                                        currentContact
                                            ? currentContact.message
                                            : ''
                                    }
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
                                style={{ marginTop: '16px' }}
                            >
                                Изменить
                            </Button>
                        </Form>
                    </FormProvider>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/admin/contacts')}
                    >
                        Вернуться к списку
                    </Button>
                </Box>
            </Box>

            <footer>&copy; 2024 МГТУ им. Баумана. Все права защищены.</footer>
        </>
    )
}
