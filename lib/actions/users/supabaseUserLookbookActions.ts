import { supabase } from "@/lib/supabase";

export const toggleLookbookVisibility = async (
    id: string,
    userId: string,
    new_visibility: boolean
) => {
    const { data, error } = await supabase
        .rpc('toggle_lookbook_visibility', {
            target_lookbook_id: id,
            new_visibility: new_visibility,
            target_user_id: userId.toString(),
        });
    return { success: true }
};


export const deleteLookbook = async (id: string, userId: string) => {
    const { error } = await supabase.rpc("delete_lookbook", {
        lookbook_id: id,
        user_id: userId,
    });
    if (error) throw error;
    return { error }
};