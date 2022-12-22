
export interface Post {
    _id: string;
    title: string;
    description: string;
    profile: {
        name: string;
        user: {
            user: string;
        };
        image: boolean;
        urlImage: string;
    }
    comments: {
        _id: string; 
        description: string; 
        likes: string[];
        profile: {
            image: boolean;
            urlImage: string;
            _id: string;
            name: string;
            user: string;
        }
    }[];
    likes: string[];
    image: boolean;
    urlImage: string;
    likedByUser?: boolean
}

