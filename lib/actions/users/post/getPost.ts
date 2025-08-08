import { supabase } from "@/lib/supabase";

export const getPosts = async (currentUserId: string) => {
  const [postsRes, usersRes, commentsRes, likesRes, dislikesRes] = await Promise.all([
    supabase.from("posts").select("*"),
    supabase.from("profiles").select("id, full_name, avatar_url"),
    supabase.from("post_comments").select("*"),
    supabase.from("post_likes").select("*"),
    supabase.from("post_dislikes").select("*"),
  ]);
  if (postsRes.error) {
    console.error("❌ Error fetching posts:", postsRes.error);
  }
  if (usersRes.error) {
    console.error("❌ Error fetching users:", usersRes.error);
  }
  if (commentsRes.error) {
    console.error("❌ Error fetching comments:", commentsRes.error);
  }
  if (likesRes.error) {
    console.error("❌ Error fetching likes:", likesRes.error);
  }
  if (dislikesRes.error) {
    console.error("❌ Error fetching dislikes:", dislikesRes.error);
  }

  if (
    postsRes.error || usersRes.error ||
    commentsRes.error || likesRes.error || dislikesRes.error
  ) {
    return { success: false, error: "One or more fetches failed" };
  }

  const posts = postsRes.data ?? [];
  const users = usersRes.data ?? [];
  const comments = commentsRes.data ?? [];
  const likes = likesRes.data ?? [];
  const dislikes = dislikesRes.data ?? [];

  // 👇 Fetch follow relationships
  const postUserIds = [...new Set(posts.map(p => p.user_id))];
  const { data: followingData, error: followErr } = await supabase
    .from("followers")
    .select("following_id")
    .eq("follower_id", currentUserId)
    .in("following_id", postUserIds);

  const followingSet = new Set(followingData?.map(f => f.following_id));

  const mappedPosts = posts.map(post => {
    const user = users.find(u => u.id === post.user_id) ?? {
      name: "Anonymous",
      avatar_url: "https://placehold.co/100",
    };

    const postLikes = likes.filter(like => like.post_id === post.id);
    const postDislikes = dislikes.filter(dislike => dislike.post_id === post.id);
    const postComments = comments
      .filter(comment => comment.post_id === post.id)
      .map(comment => {
        const commentUser = users.find(u => u.id === comment.user_id) ?? {
          full_name: "Anonymous",
          avatar_url: "https://placehold.co/100",
        };
        return {
          id: comment.id,
          comment: comment.comment,
          created_at: comment.created_at,
          user: commentUser,
        };
      });

    return {
      id: post.id,
      title: post.title ?? "Untitled",
      description: post.description ?? "",
      image: post.image ?? "",
      tags: post.tags ?? [],
      created_at: post.created_at,
      user: user,
      likes: postLikes.length,
      disLikes: postDislikes.length,
      comments: postComments,
      isFollowing: followingSet.has(post.user_id),
    };
  });

  return { success: true, data: mappedPosts as any };
};
