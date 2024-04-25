import { useAuthGuard } from '../../guards/AuthGuard'
import { roles } from '../../types/roles.type'

import { Box, Button, Modal, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { useGetAllContactsQuery } from '../../services/api.service'

export default function Messages() {
    useAuthGuard(roles.user)
    const [open, setOpen] = useState<boolean>(false)
    const theme = useTheme()
    const { data: allContacts } = useGetAllContactsQuery()

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <>
            <Button
                onClick={handleOpen}
                variant="outlined"
                sx={{
                    marginTop: '1rem',
                }}
            >
                Показать все ваши сообщения
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        background: 'white',
                        position: 'absolute',
                        width: '70vw',
                        height: '80vh',
                        top: 'calc(50% - 40vh)',
                        left: 'calc(50% - 35vw)',
                        padding: '2rem 2rem',
                        borderRadius: '2rem',
                    }}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h4"
                        align="center"
                    >
                        Ваши отправленные сообщения
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            marginTop: '1rem',
                            height: '90%',
                            overflowY: 'scroll',
                        }}
                    >
                        {allContacts &&
                            allContacts.map((message) => (
                                <Box
                                    sx={{
                                        border: `1px solid ${theme.palette.divider}`,
                                        borderRadius: '1rem',
                                        padding: '1rem 1rem',
                                    }}
                                >
                                    <Typography variant="body1">
                                        {message.login}
                                    </Typography>
                                    <Typography variant="body1">
                                        {message.email}
                                    </Typography>
                                    <Typography variant="body1">
                                        {message.message}
                                    </Typography>
                                </Box>
                            ))}
                    </Box>
                </Box>
            </Modal>
        </>
    )
}
