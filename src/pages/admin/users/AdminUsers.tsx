import { Box, Button, IconButton, Tooltip, useTheme } from '@mui/material'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { Delete, Edit } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export const AdminUsers = () => {
    const theme = useTheme()
    const navigate = useNavigate()

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
                                Почта
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
                                Пароль
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
                                Роли
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
                        {[].map((i) => (
                            <TableRow
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                                key={i}
                            >
                                <TableCell align="center" component="td">
                                    почта {i}
                                </TableCell>
                                <TableCell align="center" component="td">
                                    Пароль {i}
                                </TableCell>{' '}
                                <TableCell align="center" component="td">
                                    Роли {i}
                                </TableCell>
                                <TableCell align="right" component="td">
                                    <IconButton
                                        onClick={() =>
                                            navigate(
                                                '/admin/users/edit-user/' + i,
                                            )
                                        }
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton>
                                        <Delete />
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
                onClick={() => navigate('/admin/users/add-user')}
            >
                Добавить пользователя
            </Button>
        </Box>
    )
}
