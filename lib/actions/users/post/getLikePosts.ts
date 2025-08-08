import { supabase } from "@/lib/supabase";

export const getLikedPosts = async (userId: string) => {
    const { data: likedPostIds, error } = await supabase
        .from("post_likes")
        .select("post_id")
        .eq("user_id", userId);

    if (error) {
        console.error("❌ Error fetching liked post IDs:", error);
        return { success: false, error };
    }

    const postIds = likedPostIds.map((p) => p.post_id);

    if (postIds.length === 0) {
        return { success: true, data: [] };
    }

    const { data: likedPosts, error: postError } = await supabase
        .from("posts")
        .select("*")
        .in("id", postIds);

    if (postError) {
        console.error("❌ Error fetching liked posts:", postError);
        return { success: false, error: postError };
    }

    return { success: true, data: likedPosts };
};
