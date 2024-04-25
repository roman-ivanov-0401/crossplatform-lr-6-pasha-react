import { SubmitHandler } from 'react-hook-form'

export interface LoginFormInterface {
    login: string
    password: string
}

export type LoginFormHandler = SubmitHandler<LoginFormInterface>
