export interface UserModel {
    id: number
    login: string
    password: string
    roles: string[]
}

export interface UserModelForPost extends Omit<UserModel, 'roles'> {
    role: string
}
