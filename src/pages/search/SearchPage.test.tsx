import { render, screen } from "@testing-library/react";
import { SearchPage } from "./SearchPage";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";

describe("<SearchPage /> tests", () => {
  it("renders the SearchPage component", () => {
    render(
      <MemoryRouter>
        <MockedProvider>
          <SearchPage />
        </MockedProvider>
      </MemoryRouter>
    );
    const element = screen.getByText("Search");
    expect(element).toBeInTheDocument();
  });

  it("test SearchPage snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <MockedProvider>
          <SearchPage />
        </MockedProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
