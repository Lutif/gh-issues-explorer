import { render, screen } from "@testing-library/react";
import { IssueState } from "../../../../utils";
import { IssueListItem } from "../IssueListItem";
import { MemoryRouter as Router } from "react-router-dom";
import { genrateTestIssue } from "./helpers";
import moment from "moment";

const testIssue = genrateTestIssue();
describe("<IssueListItem /> tests", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("renders the IssueListItem component", () => {
    render(
      <Router>
        <IssueListItem issue={testIssue} />
      </Router>
    );
    const element = screen.getByText("test");
    expect(element).toBeInTheDocument();
  });

  it("renders the IssueListItem component with closed issue", () => {
    render(
      <Router>
        <IssueListItem issue={{ ...testIssue, closed: true }} />
      </Router>
    );
    const element = screen.getByText("test");
    expect(element).toBeInTheDocument();
  });

  it("test issueListItem snapshot", () => {
    const { asFragment } = render(
      <Router>
        <IssueListItem issue={testIssue} />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("test issueListItem content match", () => {
    const content = `#${testIssue.number} ${"Opened"} ${moment(
      testIssue.createdAt
    ).fromNow()} by ${testIssue.author.login}`;
    render(
      <Router>
        <IssueListItem issue={testIssue} />
      </Router>
    );
    const element = screen.getByText(content);
    expect(element).toBeInTheDocument();
  });
});
