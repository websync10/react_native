import { supabase } from "@/lib/supabase";

export type InsertPost = {
    userId: string;
    title: string;
    description: string;
    tags: string[];
    image?: string;
}

interface InsertPostProps{
    postData: InsertPost
}

export const insertPost = async ({ postData }: InsertPostProps) => {
    const { data, error } = await supabase.from("posts").insert([
        {
            user_id: postData.userId,
            title: postData.title,
            description: postData.description,
            tags: postData.tags,
            image: postData.image,
        },
    ]);

    if (error) {
        console.error("Error creating post:", error);
        return { success: false, error };
    }

    return { success: true, data };
};
