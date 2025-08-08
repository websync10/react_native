//tryon looks model

declare type tryonlookshistory = {
    id: string;
    userId: string;
    image: string;
    type: string;
}



declare type MyProfile = {
    userId: string;
    username: string;
    avatar: string;
    posts: string;
    followers: string;
    following: string;
    outfits: [
        {
            id: number,
            image: string;
        }
    ]
    linkedOutfits: [
        {
            id: number,
            image: string;
        }
    ]
    createdAt: string;
}

declare type HelpAndSupport = {
    userId: string;
    title: string;
    problem: string;
}

declare type LookBook = {
    userId: string;
    id: string;
    image: string;
    title: string;
    date: string;
    isPublic: boolean;
}

declare type createpost = {
    userId: string;
    title: string;
    description: string;
    tags: string;
    image: string;
    likes: string;
    dislikes: string;
    comments: [
        {
            userId: string;
            postId: string;
            comment: string;
            replies: string[];
        }
    ]
    createdAt: string;
}