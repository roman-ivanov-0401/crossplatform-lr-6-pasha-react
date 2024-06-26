import { Button, TextField, Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import {
    useForm,
    Controller,
    FormProvider,
    Form,
    FormSubmitHandler,
} from 'react-hook-form'
import { AdminAddCourseInterface } from '../../../types/forms'
import { usePostCourseAdminMutation } from '../../../services/api.service'
import toast from 'react-hot-toast'

export default function AdminAddCourse() {
    const navigate = useNavigate()
    const methods = useForm<AdminAddCourseInterface>()
    const { control } = methods
    const [addCourse] = usePostCourseAdminMutation()

    const submitHandler: FormSubmitHandler<AdminAddCourseInterface> = ({
        data: { name, duration, teacher, description },
    }) => {
        addCourse({ name, duration, teacher, description })
            .then((res) => {
                toast('Курс успешно добавлен')
            })
            .catch((err) => {
                toast('Ошибка при добавлении курса')
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
                        Добавление нового курса
                    </Typography>
                    <FormProvider {...methods}>
                        <Form onSubmit={submitHandler}>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <Controller
                                    name="name"
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
                                            id="filled-basic"
                                            label="Название"
                                            variant="filled"
                                            value={value}
                                            onChange={onChange}
                                            error={Boolean(errors.name)}
                                            helperText={errors.name?.message}
                                        />
                                    )}
                                />

                                <Controller
                                    name="description"
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
                                            id="outlined-multiline-static"
                                            label="Описание"
                                            multiline
                                            rows={4}
                                            variant="filled"
                                            value={value}
                                            onChange={onChange}
                                            error={Boolean(errors.description)}
                                            helperText={
                                                errors.description?.message
                                            }
                                        />
                                    )}
                                />

                                <Controller
                                    name="duration"
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
                                            id="filled-basic"
                                            label="Длительность"
                                            type="number"
                                            variant="filled"
                                            value={value}
                                            onChange={onChange}
                                            error={Boolean(errors.duration)}
                                            helperText={
                                                errors.duration?.message
                                            }
                                        />
                                    )}
                                />

                                <Controller
                                    name="teacher"
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
                                            id="filled-basic"
                                            label="Преподаватель"
                                            variant="filled"
                                            value={value}
                                            onChange={onChange}
                                            error={Boolean(errors.teacher)}
                                            helperText={errors.teacher?.message}
                                        />
                                    )}
                                />
                            </Box>
                            <Button
                                variant="contained"
                                style={{ marginTop: '16px' }}
                                type="submit"
                            >
                                Добавить
                            </Button>
                        </Form>
                    </FormProvider>

                    <Button
                        variant="outlined"
                        onClick={() => navigate('/admin/courses')}
                    >
                        Вернуться к списку
                    </Button>
                </Box>
            </Box>

            <footer>&copy; 2024 МГТУ им. Баумана. Все права защищены.</footer>
        </>
    )
}
