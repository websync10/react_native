import { supabase } from "@/lib/supabase";

export const getUserLookbooks = async (userId: string) => {
  const { data, error } = await supabase.rpc("get_user_lookbooks", {
    user_id: userId,
  });

  if (error) {
    console.error("Error fetching user lookbooks:", error);
    return [];
  }
  return data;
};
