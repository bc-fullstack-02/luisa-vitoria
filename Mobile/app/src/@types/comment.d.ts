
export interface Comment {
    _id: string;
    description: string;
    profile: {
        name: string;
        user: {
            user: string;
        };
        image: boolean;
        urlImage: string;
    };
    likes: string[];
    likedByUser?: boolean
}[]