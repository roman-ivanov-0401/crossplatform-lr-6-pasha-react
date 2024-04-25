import { roles } from '../roles.type'

enum UserRoles {}

export interface AdminAddUserFormInterface {
    email: string
    password: string
    roles: string[]
}
