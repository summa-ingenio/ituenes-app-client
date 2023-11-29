import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders search input and button", () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText("Enter search term");
  const searchButton = screen.getByText("Search");
  expect(searchInput).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();
});

test("search and add to favorites", async () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText("Enter search term");
  const searchButton = screen.getByText("Search");

  userEvent.type(searchInput, "test");
  userEvent.selectOptions(screen.getByRole("combobox"), "movie");
  userEvent.click(searchButton);

  // Simulate API response, adjust as needed based on your actual API response structure
  const fakeApiResponse = {
    data: {
      results: [{ trackId: 123, trackName: "Test Movie" }],
    },
  };

  // Mock the axios.get method to return the fake response
  jest.mock("axios");
  const axios = require("axios");
  axios.get.mockResolvedValue(fakeApiResponse);

  // Wait for the search results to appear
  const searchResults = await screen.findAllByRole("listitem");
  expect(searchResults.length).toBe(1);

  // Click on "Add to Favorites" button
  const addToFavoritesButton = screen.getByText("Add to Favorites");
  userEvent.click(addToFavoritesButton);

  // Check if the item appears in the Favorites section
  const favoritesList = screen.getByRole("heading", {
    name: /favorites/i,
  }).nextElementSibling;
  const favoriteItem = screen.getByText("Test Movie");
  expect(favoritesList).toContainElement(favoriteItem);
});
