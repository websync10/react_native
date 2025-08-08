import { supabase } from "@/lib/supabase";

export const getProfile = async (userId: string) => {
    try {
        const { data, error } = await supabase.rpc("get_user_profile", { user_id: userId });
        if (error) throw error;

        return data;
    } catch (error) {
        console.error("Failed to fetch profile:", error);
        return { success: false, error };
    }
};