import { supabase } from "@/lib/supabase";

export const getPostById = async (postId: string, currentUserId: string) => {
    const [postRes, usersRes, commentsRes, likesRes, dislikesRes] = await Promise.all([
        supabase.from("posts").select("*").eq("id", postId).single(),
        supabase.from("profiles").select("id, full_name, avatar_url"),
        supabase.from("post_comments").select("*").eq("post_id", postId),
        supabase.from("post_likes").select("*").eq("post_id", postId),
        supabase.from("post_dislikes").select("*").eq("post_id", postId),
    ]);

    if (postRes.error || usersRes.error || commentsRes.error || likesRes.error || dislikesRes.error) {
        console.error("❌ Error fetching post or related data:", {
            post: postRes.error,
            users: usersRes.error,
            comments: commentsRes.error,
            likes: likesRes.error,
            dislikes: dislikesRes.error
        });
        return { success: false, error: "Error fetching post data" };
    }

    const post = postRes.data;
    const users = usersRes.data ?? [];
    const comments = commentsRes.data ?? [];
    const likes = likesRes.data ?? [];
    const dislikes = dislikesRes.data ?? [];

    // Check if current user follows this post's author
    const { data: followingData, error: followErr } = await supabase
        .from("followers")
        .select("following_id")
        .eq("follower_id", currentUserId)
        .eq("following_id", post.user_id);

    const isFollowing = (followingData?.length ?? 0) > 0;

    const user = users.find(u => u.id === post.user_id) ?? {
        full_name: "Anonymous",
        avatar_url: "https://placehold.co/100",
    };

    const postComments = comments.map(comment => {
        const commentUser = users.find(u => u.id === comment.user_id) ?? {
            full_name: "Anonymous",
            avatar_url: "https://placehold.co/100",
        };
        return {
            id: comment.id,
            comment: comment.comment,
            created_at: comment.created_at,
            user: commentUser,
        };
    });

    const mappedPost = {
        id: post.id,
        title: post.title ?? "Untitled",
        description: post.description ?? "",
        image: post.image ?? "",
        tags: post.tags ?? [],
        created_at: post.created_at,
        user,
        likes: likes.length,
        disLikes: dislikes.length,
        comments: postComments,
        isFollowing,
    };

    return { success: true, data: mappedPost as any };
};
