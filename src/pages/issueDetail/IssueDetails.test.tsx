import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { IssueDetailsPage } from "./IssueDetailsPage";
import { GET_ISSUE } from "../../apollo";
import { MockedProvider } from "@apollo/client/testing";

const mocks = [
  {
    request: {
      query: GET_ISSUE,
      variables: {
        repositoryOwner: "facebook",
        repositoryName: "react",
        issueNumber: 1,
        pageSize: 10,
      },
    },
    result: {
      data: {
        repository: {
          issue: {
            id: "1",
            title: "test",
            createdAt: new Date(),
            state: "OPEN",
            bodyHTML: "<p>test body</p>",
            url: "test",
            closed: false,
            closedAt: "test",
            number: "2",
            author: {
              login: "testAuthor",
              avatarUrl: "testAvatar",
              url: "testUrl",
            },
            comments: {
              totalCount: 1,
              pageInfo: {
                endCursor: "test",
                hasNextPage: true,
                startCursor: "test",
              },
              edges: [
                {
                  node: {
                    bodyHTML: "<p>test comment</p>",
                    createdAt: new Date(),
                    author: {
                      login: "testAuthor",
                      avatarUrl: "testAvatar",
                      url: "testUrl",
                    },
                  },
                },
              ],
            },
          },
        },
      },
    },
  },
];

const renderComponent = () =>
  render(
    <MemoryRouter initialEntries={["/facebook/react/issues/1"]}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <IssueDetailsPage />
      </MockedProvider>
    </MemoryRouter>
  );

describe("<IssueDetail /> tests", () => {
  it("renders the shows loading component intialy", async () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <IssueDetailsPage />
        </MockedProvider>
      </MemoryRouter>
    );
    expect(
      await screen.findByTestId("loading-spinner-test-id")
    ).toBeInTheDocument();
  });

  it("renders the IssueDetail component", async () => {
    renderComponent();
    const element = await screen.findByText("test body");
    expect(element).toBeInTheDocument();
  });

  it("renders the IssueDetail component with comments", async () => {
    renderComponent();
    const element = await screen.findByText("test comment");
    expect(element).toBeInTheDocument();
  });

  it("renders the IssueDetail component with author", async () => {
    renderComponent();
    const element = await screen.findByText("Created by testAuthor");
    expect(element).toBeInTheDocument();
  });
});
