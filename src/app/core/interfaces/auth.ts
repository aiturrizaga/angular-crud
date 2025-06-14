export interface Login {
    email: string;
    password: string;
}

export interface User {
    id: number;
    email: string;
    password: string;
    role: string;
    accessToken: string;
    expiresIn: number;
}