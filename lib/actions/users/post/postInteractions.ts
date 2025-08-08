// services/postInteractions.ts

import { supabase } from "@/lib/supabase";

export const likePost = async (postId: string, userId: string) => {
  return supabase.from("post_likes").insert({ post_id: postId, user_id: userId });
};

export const dislikePost = async (postId: string, userId: string) => {
  return supabase.from("post_dislikes").insert({ post_id: postId, user_id: userId });
};

export const unlikePost = async (postId: string, userId: string) => {
  return supabase.from("post_likes").delete().match({ post_id: postId, user_id: userId });
};

export const undislikePost = async (postId: string, userId: string) => {
  return supabase.from("post_dislikes").delete().match({ post_id: postId, user_id: userId });
};


export const hasUserLikedPost = async (postId: string, userId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from("post_likes")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error checking if user liked post:', error);
    return false;
  }

  return !!data;
};


export const hasUserDislikedPost = async (postId: string, userId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from("post_dislikes")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .single();
  
  if (error && error.code !== 'PGRST116') {
    console.error('Error checking if user disliked post:', error);
    return false;
  }
  
  return !!data;
};