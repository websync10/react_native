export interface Post {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    created_at: string;
    user: {
        id: string,
        full_name: string;
        avatar_url: string;
    };
    isFollowing: boolean;
    likes: string[];
    disLikes: string[];
    comments: {
        id: string;
        comment: string;
        created_at: string;
        user_id: string;
    }[];
}

