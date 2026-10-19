const LEMMY_BASE_URL = "https://lemmy.world";

// ========================================
// GET POSTS
// ========================================

export const getPosts = async (community = "home", sort = "Hot") => {
  let url;

  if (community === "home" || community === "popular") {
    url = `${LEMMY_BASE_URL}/api/v3/post/list` + `?sort=${sort}&limit=20`;
  } else {
    url =
      `${LEMMY_BASE_URL}/api/v3/post/list` +
      `?community_name=${encodeURIComponent(community)}` +
      `&sort=${sort}&limit=20`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch Lemmy posts (${response.status})`);
  }

  const data = await response.json();

  return data.posts.map((item) => ({
    id: item.post.id,
    subreddit: item.community.name,
    author: item.creator.name,
    title: item.post.name,
    score: item.counts.score,
    comments: item.counts.comments,
    createdAt: item.post.published,
    time: new Date(item.post.published).toLocaleString(),

    image:
      item.post.url && /\.(jpg|jpeg|png|webp|gif)$/i.test(item.post.url)
        ? item.post.url
        : item.post.thumbnail_url || null,

    url: item.post.url,
    body: item.post.body || "",
  }));
};

// ========================================
// GET ONE POST
// ========================================

export const getPost = async (postId) => {
  const response = await fetch(`${LEMMY_BASE_URL}/api/v3/post?id=${postId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch post (${response.status})`);
  }

  const data = await response.json();

  const item = data.post_view;

  return {
    id: item.post.id,
    subreddit: item.community.name,
    author: item.creator.name,
    title: item.post.name,
    score: item.counts.score,
    comments: item.counts.comments,
    createdAt: item.post.published,
    time: new Date(item.post.published).toLocaleString(),

    image:
      item.post.url && /\.(jpg|jpeg|png|webp|gif)$/i.test(item.post.url)
        ? item.post.url
        : item.post.thumbnail_url || null,

    url: item.post.url,
    body: item.post.body || "",
  };
};

// ========================================
// GET COMMENTS
// ========================================

export const getComments = async (postId) => {
  const response = await fetch(
    `${LEMMY_BASE_URL}/api/v3/comment/list` +
      `?post_id=${postId}&sort=Hot&limit=50`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch comments (${response.status})`);
  }

  const data = await response.json();

  return data.comments.map((item) => ({
    id: item.comment.id,
    postId: item.comment.post_id,
    author: item.creator.name,
    body: item.comment.content,
    score: item.counts.score,
    time: new Date(item.comment.published).toLocaleString(),
  }));
};
