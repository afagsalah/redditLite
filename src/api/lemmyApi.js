const LEMMY_BASE_URL = "https://lemmy.world";

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
    image: item.post.thumbnail_url || null,
    url: item.post.url,
  }));
};
