import { Box, IconButton, useTheme, Tooltip, Button } from '@mui/material'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { Delete, Edit } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import {
    useGetAllCoursesQuery,
    useDeleteCourseByIdAdminMutation,
} from '../../../services/api.service'
import toast from 'react-hot-toast'

export const AdminCourses = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const { data } = useGetAllCoursesQuery()

    const [deleteCourse] = useDeleteCourseByIdAdminMutation()

    const deleteCourseHandler = (id: number) => {
        deleteCourse(id)
            .then((res) => {
                toast('Контакт успешно удалён')
            })
            .catch((err) => {
                toast('Возникла ошибка при удалении!')
            })
    }

    return (
        <Box maxWidth="1200px" margin="0 auto" marginTop="3rem">
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
                                sx={{ background: theme.palette.primary.light }}
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
                                sx={{ background: theme.palette.primary.light }}
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
                                sx={{ background: theme.palette.primary.light }}
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
                                sx={{ background: theme.palette.primary.light }}
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
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                    key={course.id}
                                >
                                    <TableCell align="center" component="td">
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
                                    <TableCell align="center" component="td">
                                        {course.duration}
                                    </TableCell>{' '}
                                    <TableCell align="center" component="td">
                                        {course.teacher}
                                    </TableCell>
                                    <TableCell align="right" component="td">
                                        <IconButton
                                            onClick={() =>
                                                navigate(
                                                    `/admin/courses/edit-course/${course.id}`,
                                                )
                                            }
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton>
                                            <Delete
                                                onClick={() =>
                                                    deleteCourseHandler(
                                                        course.id,
                                                    )
                                                }
                                            />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                variant="contained"
                sx={{ marginTop: '1rem' }}
                onClick={() => navigate('/admin/courses/add-course')}
            >
                Добавить курс
            </Button>
        </Box>
    )
}
