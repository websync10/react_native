import { supabase } from "@/lib/supabase";

export async function getUser(userId: string) {
    if (!userId) return;
    const {
        data,
        error,
    } = await supabase
        .from("users")
        .select('isOnboarded')
        .eq('user_id', userId)
        .limit(1)
        .single()

    if (error) {
        console.log(" hello Error fetching user:", error.message);
        return;
    } else {
        return data?.isOnboarded
    }
}