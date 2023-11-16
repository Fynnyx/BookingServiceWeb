import type { User } from "./User";

export interface Auth {
    jwt: string;
    user: User;
}


export interface RegisterUser {
    username: string;
    email: string;
    password: string;
}