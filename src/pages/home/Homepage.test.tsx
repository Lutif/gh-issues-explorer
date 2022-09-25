import { render, screen } from "@testing-library/react";
import { HomePage } from "./HomePage";
import { MemoryRouter } from "react-router-dom";
import { orgs } from "./constansts";

describe("HomePage test", () => {
  it("test HomePage snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders all orgs", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    orgs.forEach((org) => {
      const [orgName, repoName] = org.split("/");
      const element = `go to ${repoName} of ${orgName}`;
      expect(screen.getByText(element)).toBeInTheDocument();
    });
  });
});
