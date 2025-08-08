// utils/createUserLookbook.ts
import { supabase } from "@/lib/supabase";

export const createUserLookbook = async ({
    user_id,
    title,
    image,
    is_public,
}: {
    user_id: string;
    title: string;
    image: string;
    is_public: boolean;
}) => {
    const { data, error } = await supabase.from("lookbooks").insert([
        { user_id, title, image, is_public },
    ]);

    if (error) {
        console.error("Error creating lookbook:", error);
        return { success: false, error };
    }

    return { success: true, data };
};
