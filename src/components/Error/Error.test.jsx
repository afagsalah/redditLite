import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Error from "./Error";

test("displays the error message", () => {
  render(<Error message="Failed to load posts" onRetry={() => {}} />);

  expect(screen.getByText("Failed to load posts")).toBeInTheDocument();
});

test("calls onRetry when Try Again is clicked", async () => {
  const user = userEvent.setup();

  const mockRetry = jest.fn();

  render(<Error message="Failed to load posts" onRetry={mockRetry} />);

  const retryButton = screen.getByRole("button", {
    name: /try again/i,
  });

  await user.click(retryButton);

  expect(mockRetry).toHaveBeenCalledTimes(1);
});
