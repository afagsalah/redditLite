const LEMMY_BASE_URL = "https://lemmy.world";

export const getPosts = async (community = "home") => {
  let url;

  if (community === "home" || community === "popular") {
    url = `${LEMMY_BASE_URL}/api/v3/post/list?sort=Hot&limit=20`;
  } else {
    url =
      `${LEMMY_BASE_URL}/api/v3/post/list` +
      `?community_name=${encodeURIComponent(community)}` +
      `&sort=Hot&limit=20`;
  }

  console.log("Requested community:", community);
  console.log("Request URL:", url);

  const response = await fetch(url);

  console.log("Status:", response.status);
  console.log("Status text:", response.statusText);

  if (!response.ok) {
    throw new Error(`Failed to fetch Lemmy posts (${response.status})`);
  }

  const data = await response.json();

  console.log("Number of posts:", data.posts.length);

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
