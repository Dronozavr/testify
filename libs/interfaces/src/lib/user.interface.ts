export enum UserRole {
    Creator = 'Creator',
    User = 'User',
}
export interface IUser {
    _id?: string;
    displayName: string
    email: string;
    passwordHash: string;
    role: UserRole
}