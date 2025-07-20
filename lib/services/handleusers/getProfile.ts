import { supabase } from "@/lib/supabase";

export const getUserProfile = async (userId: string) => {
    if (!userId) return null;

    const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url")
        .eq("id", userId)
        .single();

    if (error) {
        console.error("Error fetching profile:", error.message);
        return null;
    }

    const userData: User = {
        id: data.id,
        fullName: data.full_name,
        profileImage: data.avatar_url,
    };
    return userData;
};
