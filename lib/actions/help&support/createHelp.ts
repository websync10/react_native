import { supabase } from "@/lib/supabase";

interface CreateHelpProps {
    helpData: CreateHelp
}

export const createHelp = async ({
    helpData
}: CreateHelpProps) => {
    try {
        const { data, error } = await supabase
            .from("help-and-support")
            .insert([
                {
                    user_id: helpData.userId,
                    title: helpData.title,
                    problem: helpData.problem,
                },
            ]);
        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error("Error inserting help request:", error);
        return { success: false, error };
    }
}