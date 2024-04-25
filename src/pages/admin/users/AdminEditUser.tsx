import {
    Button,
    TextField,
    Box,
    Typography,
    Select,
    OutlinedInput,
    MenuItem,
    Checkbox,
    ListItemText,
    InputLabel,
    FormHelperText,
} from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { roles } from '../../../types/roles.type'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller, FormProvider, Form } from 'react-hook-form'
import { AdminAddUserFormInterface } from '../../../types/forms'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const rolesArray = [roles.user, roles.admin]
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}
export default function AdminEditUser() {
    const methods = useForm<AdminAddUserFormInterface>()
    const { control, watch } = methods
    const navigate = useNavigate()

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
                        Редактирование пользователя
                    </Typography>
                    <FormProvider {...methods}>
                        <Form onSubmit={(res) => console.log(res.data)}>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message:
                                                'Это поле обязательно для заполнения',
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
                                            label="Почта"
                                            variant="filled"
                                            type="email"
                                            value={value}
                                            onChange={onChange}
                                            error={Boolean(errors.email)}
                                            helperText={errors.email?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name="password"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message:
                                                'Это поле обязательно для заполения',
                                        },
                                        minLength: {
                                            value: 8,
                                            message:
                                                'Минимальная длина - 8 символов',
                                        },
                                    }}
                                    render={({
                                        field: { value, onChange },
                                        formState: { errors },
                                    }) => (
                                        <TextField
                                            id="filled-basic"
                                            label="Пароль"
                                            variant="filled"
                                            type="password"
                                            value={value}
                                            onChange={onChange}
                                            error={Boolean(errors.password)}
                                            helperText={
                                                errors.password?.message
                                            }
                                        />
                                    )}
                                />

                                <Controller
                                    name="roles"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message:
                                                'Задайте хотя бы одну роль',
                                        },
                                    }}
                                    render={({
                                        field: { value, onChange },
                                        formState: { errors },
                                    }) => (
                                        <FormControl
                                            error={Boolean(errors.roles)}
                                        >
                                            <InputLabel id="demo-multiple-checkbox-label">
                                                Роль
                                            </InputLabel>

                                            <Select
                                                labelId="demo-multiple-checkbox-label"
                                                id="demo-multiple-checkbox"
                                                multiple
                                                value={value ? value : []}
                                                onChange={onChange}
                                                input={
                                                    <OutlinedInput label="Tag" />
                                                }
                                                renderValue={(
                                                    selected: string[],
                                                ) => selected.join(', ')}
                                                MenuProps={MenuProps}
                                            >
                                                {rolesArray.map((role) => (
                                                    <MenuItem
                                                        key={role}
                                                        value={role}
                                                    >
                                                        <Checkbox
                                                            checked={
                                                                value?.indexOf(
                                                                    role,
                                                                ) > -1
                                                            }
                                                        />
                                                        <ListItemText
                                                            primary={role}
                                                        />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {errors.roles && (
                                                <FormHelperText>
                                                    Выберете хотя бы одну роль
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    )}
                                />
                            </Box>
                            <Button
                                variant="contained"
                                style={{ marginTop: '16px' }}
                                type="submit"
                            >
                                Изменить
                            </Button>
                        </Form>
                    </FormProvider>

                    <Button
                        variant="outlined"
                        onClick={() => navigate('/admin/users')}
                    >
                        Вернуться к списку
                    </Button>
                </Box>
            </Box>

            <footer>&copy; 2024 МГТУ им. Баумана. Все права защищены.</footer>
        </>
    )
}
