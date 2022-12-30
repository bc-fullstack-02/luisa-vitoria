export interface Profile {
    _id: string;
    name: string;
    followers: string[];
    following: string[];
    user: {
        user: string
    }
    image: boolean;
    urlImage: string;
}