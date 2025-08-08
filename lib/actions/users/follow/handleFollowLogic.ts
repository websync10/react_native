import { supabase } from "@/lib/supabase";

export const followUser = async (followerId: string, followingId: string) => {
    const { data, error } = await supabase
        .from("followers")
        .insert([{ follower_id: followerId, following_id: followingId }]);

    if (error) {
        console.error("Follow error:", error.message);
        return { success: false, error: error.message };
    }
    return { success: true };
};

export const unfollowUser = async (followerId: string, followingId: string) => {
    console.log(followerId, followingId)
    const { error } = await supabase
        .from("followers")
        .delete()
        .match({ follower_id: followerId, following_id: followingId });

    if (error) {
        console.error("Unfollow error:", error.message);
        return { success: false, error: error.message };
    }
    return { success: true };
};
