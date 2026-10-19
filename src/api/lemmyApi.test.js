import { getPosts, getPost, getComments } from "./lemmyApi";

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

// --------------------------------------------------
// Test 1: getPosts()
// --------------------------------------------------

test("getPosts fetches and converts Lemmy posts", async () => {
  const lemmyResponse = {
    posts: [
      {
        post: {
          id: 101,
          name: "Learning React",
          published: "2026-10-19T10:00:00Z",
          url: "https://example.com/image.jpg",
          thumbnail_url: null,
          body: "React is useful.",
        },

        community: {
          name: "programming",
        },

        creator: {
          name: "alice",
        },

        counts: {
          score: 50,
          comments: 12,
        },
      },
    ],
  };

  global.fetch.mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(lemmyResponse),
  });

  const posts = await getPosts("programming", "Hot");

  expect(posts).toHaveLength(1);

  expect(posts[0]).toMatchObject({
    id: 101,
    subreddit: "programming",
    author: "alice",
    title: "Learning React",
    score: 50,
    comments: 12,
    image: "https://example.com/image.jpg",
    url: "https://example.com/image.jpg",
    body: "React is useful.",
  });
});

// --------------------------------------------------
// Test 2: getPosts URL
// --------------------------------------------------

test("getPosts sends the community and sort in the URL", async () => {
  global.fetch.mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue({
      posts: [],
    }),
  });

  await getPosts("programming", "New");

  expect(global.fetch).toHaveBeenCalledWith(
    expect.stringContaining("community_name=programming"),
  );

  expect(global.fetch).toHaveBeenCalledWith(
    expect.stringContaining("sort=New"),
  );
});

// --------------------------------------------------
// Test 3: home does not use community_name
// --------------------------------------------------

test("getPosts does not send community_name for home", async () => {
  global.fetch.mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue({
      posts: [],
    }),
  });

  await getPosts("home", "Hot");

  const requestedUrl = global.fetch.mock.calls[0][0];

  expect(requestedUrl).toContain("sort=Hot");

  expect(requestedUrl).not.toContain("community_name=");
});

// --------------------------------------------------
// Test 4: getPost()
// --------------------------------------------------

test("getPost fetches and converts one post", async () => {
  const lemmyResponse = {
    post_view: {
      post: {
        id: 123,
        name: "React Testing",
        published: "2026-10-19T10:00:00Z",
        url: null,
        thumbnail_url: null,
        body: "Testing React applications.",
      },

      community: {
        name: "programming",
      },

      creator: {
        name: "bob",
      },

      counts: {
        score: 100,
        comments: 20,
      },
    },
  };

  global.fetch.mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(lemmyResponse),
  });

  const post = await getPost(123);

  expect(post).toMatchObject({
    id: 123,
    subreddit: "programming",
    author: "bob",
    title: "React Testing",
    score: 100,
    comments: 20,
    image: null,
    url: null,
    body: "Testing React applications.",
  });

  expect(global.fetch).toHaveBeenCalledWith(
    expect.stringContaining("/api/v3/post?id=123"),
  );
});

// --------------------------------------------------
// Test 5: getComments()
// --------------------------------------------------

test("getComments fetches and converts comments", async () => {
  const lemmyResponse = {
    comments: [
      {
        comment: {
          id: 1,
          post_id: 123,
          content: "Great post!",
          published: "2026-10-19T11:00:00Z",
        },

        creator: {
          name: "charlie",
        },

        counts: {
          score: 10,
        },
      },
    ],
  };

  global.fetch.mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(lemmyResponse),
  });

  const comments = await getComments(123);

  expect(comments).toHaveLength(1);

  expect(comments[0]).toMatchObject({
    id: 1,
    postId: 123,
    author: "charlie",
    body: "Great post!",
    score: 10,
  });

  expect(global.fetch).toHaveBeenCalledWith(
    expect.stringContaining("post_id=123"),
  );
});

// --------------------------------------------------
// Test 6: API error
// --------------------------------------------------

test("getPosts throws an error when the API request fails", async () => {
  global.fetch.mockResolvedValue({
    ok: false,
    status: 500,
  });

  await expect(getPosts("home", "Hot")).rejects.toThrow(
    "Failed to fetch Lemmy posts (500)",
  );
});
