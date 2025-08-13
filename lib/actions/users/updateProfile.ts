import { supabase } from "@/lib/supabase";

export interface UpdateProfileData {
  full_name?: string;
  username?: string;
  avatar_url?: string | null;
  gender?: string;
  dob?: string;
}

export const updateProfile = async (userId: string, profileData: UpdateProfileData) => {
  try {
    let { data, error } = await supabase
      .from("profiles")
      .update(profileData)
      .eq("id", userId)
      .select()
      .single();

    if (error && error.code === 'PGRST116') {
      const { data: insertData, error: insertError } = await supabase
        .from("profiles")
        .insert([{ id: userId, ...profileData }])
        .select()
        .single();
      
      if (insertError) throw insertError;
      data = insertData;
    } else if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return { success: false, error };
  }
};
