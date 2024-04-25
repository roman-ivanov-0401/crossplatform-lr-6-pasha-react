import { Box, Button, IconButton, useTheme } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Edit } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useGetAllContactsAdminQuery } from '../../../services/api.service'
import { useAppDispatch } from '../../../hooks'
import { setCurrentContact } from '../../../store/slices/contacts.slice'
import { ContactModel } from '../../../models/contact.model'

export const AdminContacts = () => {
    const { data: allContacts } = useGetAllContactsAdminQuery()
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleEditButton = (contact: ContactModel) => {
        dispatch(setCurrentContact(contact))
        navigate(`/admin/contacts/edit-contact/${contact.id}`)
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
                                Логин
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
                                Сообщение
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
                        {allContacts?.map((contact) => (
                            <TableRow
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                                key={contact.login}
                            >
                                <TableCell align="center" component="td">
                                    {contact.login}
                                </TableCell>
                                <TableCell align="center" component="td">
                                    {contact.email}
                                </TableCell>
                                <TableCell align="center" component="td">
                                    {contact.message}
                                </TableCell>
                                <TableCell align="right" component="td">
                                    <IconButton
                                        onClick={() =>
                                            handleEditButton(contact)
                                        }
                                    >
                                        <Edit />
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
                onClick={() => navigate('/admin/contacts/add-contact')}
            >
                Добавить контакт
            </Button>
        </Box>
    )
}
