import Profile from "../screens/Profile";

export interface Auth {
    name?: string;
    user: string;
    password: string;
}

export interface UserToken {
    profile: {
        _id: string;
        name: string;
    };
    user: string;
}