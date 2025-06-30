export interface Login {
    email: string;
    password: string;
}

export interface User {
    id: number;
    email: string;
    role: string;
}

export interface AuthResponse {
    accessToken: string;
    expiresIn: number;
}