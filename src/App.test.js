import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders the home page", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  const titleElement = screen.getByRole("heading", {
    name: /Nông sản sạch từ tâm - Kết nối từ đất lành đến phố thị/i,
  });
  expect(titleElement).toBeInTheDocument();
});
