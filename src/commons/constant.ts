export const ROLE = {
    ADMIN: 1,
    CONTRIBUTOR: 2,
    PROJECT_ADMIN: 3,
    PROJECT_USER: 4,
    READER: 5
}

export interface Success {
    code?: number,
    message?: string,
    data?: any
}

export interface Error {
    code?: number,
    message?: string,
}

export interface ResponseModel {
    status: boolean,
    code: number,
    message: string,
    data?: any
}