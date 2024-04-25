import { useAuthGuard } from '../../guards/AuthGuard'
import { roles } from '../../types/roles.type'

import {
    useForm,
    Controller,
    FormProvider,
    Form,
    FormSubmitHandler,
} from 'react-hook-form'
import {
    Box,
    Button,
    IconButton,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material'
import { AddCourseInterface } from '../../types/forms/AddCourse.interface'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { Delete } from '@mui/icons-material'
import TableContainer from '@mui/material/TableContainer'
import {
    useGetAllCoursesQuery,
    usePostCourseAdminMutation,
    useDeleteCourseByIdAdminMutation,
} from '../../services/api.service'
import toast from 'react-hot-toast'

export const Courses = () => {
    useAuthGuard(roles.user)
    const methods = useForm<AddCourseInterface>()
    const theme = useTheme()
    const { control } = methods
    const [postCourse] = usePostCourseAdminMutation()
    const { data } = useGetAllCoursesQuery()
    const [deleteCourse] = useDeleteCourseByIdAdminMutation()

    const handleFormSubmit: FormSubmitHandler<AddCourseInterface> = ({
        data,
    }) => {
        postCourse(data)
            .then((res) => {
                toast('Курс успешно добавлен')
            })
            .catch((err) => {
                toast('Ошибка при добавлении')
            })
    }

    const handleDeleteCourseClick = (id: number) => {
        deleteCourse(id)
            .then((res) => {
                toast('Курс успешно удален')
            })
            .catch((err) => {
                toast('Ошибка при удалении курса')
            })
    }

    return (
        <div
            style={{
                padding: '2rem 3rem',
            }}
        >
            <Typography variant="h2" align="center">
                Добавить курс
            </Typography>
            <FormProvider {...methods}>
                <Form onSubmit={handleFormSubmit}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                        }}
                    >
                        <Controller
                            name="name"
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
                                    label="Курс"
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
                                        'Это поле обязательно для заполения',
                                },
                            }}
                            render={({
                                field: { value, onChange },
                                formState: { errors },
                            }) => (
                                <TextField
                                    label="Описание"
                                    variant="filled"
                                    multiline
                                    rows={4}
                                    value={value}
                                    onChange={onChange}
                                    error={Boolean(errors.description)}
                                    helperText={errors.description?.message}
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
                                        'Это поле обязательно для заполения',
                                },
                            }}
                            render={({
                                field: { value, onChange },
                                formState: { errors },
                            }) => (
                                <TextField
                                    label="Продолжительность"
                                    variant="filled"
                                    type="number"
                                    value={value}
                                    onChange={onChange}
                                    error={Boolean(errors.duration)}
                                    helperText={errors.duration?.message}
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
                                        'Это поле обязательно для заполения',
                                },
                            }}
                            render={({
                                field: { value, onChange },
                                formState: { errors },
                            }) => (
                                <TextField
                                    label="Преподаватели"
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
                        type="submit"
                        sx={{
                            marginTop: '1rem',
                        }}
                    >
                        Добавить курс
                    </Button>
                </Form>
            </FormProvider>

            <div className="table-container">
                <Typography variant="h4">Курсы</Typography>
                <TableContainer
                    component={Paper}
                    sx={{ maxHeight: '75vh', overflowY: 'scroll' }}
                >
                    <Table
                        sx={{
                            minWidth: 650,
                        }}
                        stickyHeader
                        aria-label="simple table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    align="center"
                                    component="th"
                                    style={{
                                        fontWeight: 700,
                                        fontSize: '1.5rem',
                                        color: 'white',
                                    }}
                                    sx={{
                                        background: theme.palette.primary.light,
                                    }}
                                >
                                    Название
                                </TableCell>
                                <TableCell
                                    align="center"
                                    component="th"
                                    style={{
                                        fontWeight: 700,
                                        fontSize: '1.5rem',
                                        color: 'white',
                                    }}
                                    sx={{
                                        background: theme.palette.primary.light,
                                    }}
                                >
                                    Описание
                                </TableCell>
                                <TableCell
                                    align="center"
                                    component="th"
                                    style={{
                                        fontWeight: 700,
                                        fontSize: '1.5rem',
                                        color: 'white',
                                    }}
                                    sx={{
                                        background: theme.palette.primary.light,
                                    }}
                                >
                                    Длительность
                                </TableCell>
                                <TableCell
                                    align="center"
                                    component="th"
                                    style={{
                                        fontWeight: 700,
                                        fontSize: '1.5rem',
                                        color: 'white',
                                    }}
                                    sx={{
                                        background: theme.palette.primary.light,
                                    }}
                                >
                                    Преподаватель
                                </TableCell>
                                <TableCell
                                    align="right"
                                    component="th"
                                    style={{
                                        fontWeight: 700,
                                        fontSize: '1.5rem',
                                        color: 'white',
                                    }}
                                    sx={{
                                        background: theme.palette.primary.light,
                                    }}
                                >
                                    Действия
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data &&
                                data.map((course) => (
                                    <TableRow
                                        sx={{
                                            '&:last-child td, &:last-child th':
                                                {
                                                    border: 0,
                                                },
                                        }}
                                        key={course.name}
                                    >
                                        <TableCell
                                            align="center"
                                            component="td"
                                        >
                                            {course.name}
                                        </TableCell>
                                        <Tooltip title={course.description}>
                                            <TableCell
                                                align="center"
                                                component="td"
                                                sx={{
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                    overflow: 'hidden',
                                                    maxWidth: '300px',
                                                }}
                                            >
                                                {course.description}
                                            </TableCell>
                                        </Tooltip>
                                        <TableCell
                                            align="center"
                                            component="td"
                                        >
                                            {course.duration}
                                        </TableCell>{' '}
                                        <TableCell
                                            align="center"
                                            component="td"
                                        >
                                            {course.teacher}
                                        </TableCell>
                                        <TableCell align="right" component="td">
                                            <IconButton
                                                onClick={() =>
                                                    handleDeleteCourseClick(
                                                        course.id,
                                                    )
                                                }
                                            >
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}
