/*const REDDIT_BASE_URL = "https://www.reddit.com";

export const getPosts = async (subreddit = "popular") => {
  const response = await fetch(`${REDDIT_BASE_URL}/r/${subreddit}.json`);

  if (!response.ok) {
    throw new Error("Failed to fetch Reddit posts");
  }

  const json = await response.json();

  return json.data.children.map((child) => child.data);
};*/
import { postsData } from "../data/postsData";

export const getPosts = async (subreddit = "popular") => {
  console.log("Requested subreddit:", subreddit);

  return postsData;
};

/*import { postsData } from "../data/postsData";

export const getPosts = async (subreddit = "popular") => {
  console.log("Requested subreddit:", subreddit);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return postsData;
};*/
