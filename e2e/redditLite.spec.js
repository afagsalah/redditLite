import { test, expect } from "@playwright/test";

// Test 1
test("RedditLite loads successfully", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "Home",
    }),
  ).toBeVisible();

  await expect(page.getByPlaceholder("Search posts...")).toBeVisible();
});

// Test 2
test("user can search for posts", async ({ page }) => {
  await page.goto("/");

  const posts = page.locator(".post-card");

  await expect(posts.first()).toBeVisible();

  const firstTitle = await posts.first().locator(".post-title").textContent();

  const searchTerm = firstTitle.trim().split(" ")[0];

  const searchInput = page.getByPlaceholder("Search posts...");

  await searchInput.fill(searchTerm);

  await expect(page.locator(".post-card").first()).toBeVisible();

  const visibleTitles = await page.locator(".post-title").allTextContents();

  for (const title of visibleTitles) {
    expect(title.toLowerCase()).toContain(searchTerm.toLowerCase());
  }
});

// Test 3
test("displays no posts found when search has no matches", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator(".post-card").first()).toBeVisible();

  const searchInput = page.getByPlaceholder("Search posts...");

  await searchInput.fill("zzzzzzzzzz-no-post-should-match-12345");

  await expect(page.getByText("No posts found.")).toBeVisible();
});
test("user can select the Technology category", async ({ page }) => {
  await page.goto("/");

  // Wait for the Home page
  await expect(page.getByRole("heading", { name: "Home" })).toBeVisible();

  // Click Technology in the sidebar
  await page
    .getByRole("button", {
      name: /technology/i,
    })
    .click();

  // Page heading should change
  await expect(
    page.getByRole("heading", {
      name: "Technology",
    }),
  ).toBeVisible();

  // Description should also change
  await expect(
    page.getByText("Explore the latest technology discussions"),
  ).toBeVisible();
});
test("user can change sorting from Hot to New", async ({ page }) => {
  await page.goto("/");

  const newButton = page.getByRole("button", {
    name: /new/i,
  });

  await newButton.click();

  await expect(newButton).toHaveClass(/active/);
});

test("user can change sorting from Hot to Top", async ({ page }) => {
  await page.goto("/");

  const topButton = page.getByRole("button", {
    name: /top/i,
  });

  await topButton.click();

  await expect(topButton).toHaveClass(/active/);
});
test("Hot sorting is selected initially", async ({ page }) => {
  await page.goto("/");

  const hotButton = page.getByRole("button", {
    name: /hot/i,
  });

  await expect(hotButton).toHaveClass(/active/);
});
test("user can open a post and return to the posts page", async ({ page }) => {
  await page.goto("/");

  // Wait for posts to load
  const firstPost = page.locator(".post-card").first();

  await expect(firstPost).toBeVisible();

  // Click the first post
  await firstPost.click();

  // URL should now contain /post/
  await expect(page).toHaveURL(/\/post\/\d+/);

  // Post detail should be displayed
  await expect(page.locator(".post-detail-card")).toBeVisible();

  // Back button should be visible
  const backButton = page.getByRole("button", {
    name: /back to posts/i,
  });

  await expect(backButton).toBeVisible();

  // Return to Home
  await backButton.click();

  await expect(page).toHaveURL("/");

  await expect(
    page.getByRole("heading", {
      name: "Home",
      level: 1,
      exact: true,
    }),
  ).toBeVisible();
});
test("user can switch between dark and light mode", async ({ page }) => {
  await page.goto("/");

  const app = page.locator(".app");

  const themeButton = page.getByRole("button", {
    name: /switch to dark mode/i,
  });

  // Initially light mode
  await expect(app).not.toHaveClass(/dark-mode/);

  // Switch to dark mode
  await themeButton.click();

  await expect(app).toHaveClass(/dark-mode/);

  // Button should now offer light mode
  const lightModeButton = page.getByRole("button", {
    name: /switch to light mode/i,
  });

  await expect(lightModeButton).toBeVisible();

  // Switch back to light mode
  await lightModeButton.click();

  await expect(app).not.toHaveClass(/dark-mode/);
});
