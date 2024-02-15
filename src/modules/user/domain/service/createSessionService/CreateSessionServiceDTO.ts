export type CreateSessionServiceInputDTO = {
    email: string;
    password: string;
}

export type CreateSessionServiceOutputDTO = {
    id: string;
    name: string;
    token: string
}