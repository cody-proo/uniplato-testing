import { UserRole } from '@prisma/client';

export interface IRequestUser {
    role: UserRole
    id: number
}

declare global {
    namespace Express {
        export interface Request {
            user?: IRequestUser
        }
    }
}