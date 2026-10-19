import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

test("displays the loading message", () => {
  render(<Loading />);

  const loadingMessage = screen.getByText(/loading posts/i);

  expect(loadingMessage).toBeInTheDocument();
});
