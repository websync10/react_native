import { supabase } from "@/lib/supabase";

export const getUserLookbooks = async (userId: string) => {
  if (!userId) {
    console.error("No userId provided");
    return [];
  }

  // First try to use the stored procedure
  const { data: rpcData, error: rpcError } = await supabase.rpc("get_user_lookbooks", {
    user_id: userId,
  });

  if (rpcError) {
    console.error("Error with stored procedure, falling back to direct query:", rpcError);
    
    // Fallback to direct query with explicit user ID filtering
    const { data: directData, error: directError } = await supabase
      .from('lookbooks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (directError) {
      console.error("Error fetching user lookbooks:", directError);
      return [];
    }
    
    return directData || [];
  }

  return rpcData || [];
};
