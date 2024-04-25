import '../../styles/bootstrap.min.css'
import '../../styles/styles.css'
import { useAuthGuard } from '../../guards/AuthGuard'
import { roles } from '../../types/roles.type'
import { Box, Typography } from '@mui/material'
import pic from '../../assets/university_image.jpg'

export default function Home() {
    return (
        <div className="App">
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0 3rem',
                    height: '80vh',
                    background: ` url(${pic})`,
                    position: 'relative',
                    borderRadius: '2rem',
                    '&::after': {
                        content: '""',
                        borderRadius: '2rem',
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, .5)',
                    },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        zIndex: 10,
                    }}
                >
                    <Typography variant="h2" color="white">
                        Добро пожаловать!
                    </Typography>
                    <Typography variant="subtitle1" color="white">
                        МГТУ им. Баумана - один из ведущих технических
                        университетов России.
                    </Typography>
                </Box>
            </Box>
        </div>
    )
}
