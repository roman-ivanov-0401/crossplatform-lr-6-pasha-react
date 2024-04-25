import { useAuthGuard } from '../../guards/AuthGuard'
import { roles } from '../../types/roles.type'
import { Typography } from '@mui/material'

export const About = () => {
    useAuthGuard(roles.user)

    return (
        <>
            <Typography variant="h2" align="center">
                О нас
            </Typography>

            <Typography variant="subtitle2" align="center">
                МГТУ имени Н. Э. Баумана — старейший технический университет
                России. Более 180 лет мы вносим свой вклад в развитие науки и
                образования.
            </Typography>
            <Typography variant="subtitle2" align="center">
                Узнать о нашем сайте подробнее можно{' '}
                <a href="example.pdf" download>
                    здесь
                </a>
                .
            </Typography>
        </>
    )
}
