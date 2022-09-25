import { IssueState } from "../../../../utils";

const testIssue = {
  id: "1",
  title: "test",
  createdAt: new Date(),
  state: IssueState.OPEN,
  bodyHTML: "<p>test body</p>",
  url: "test",
  closed: false,
  closedAt: "test",
  number: "2",
  author: {
    login: "test",
    avatarUrl: "test",
    url: "test",
  },
  comments: {
    totalCount: 1,
    pageInfo: {
      endCursor: "test",
      hasNextPage: true,
      startCursor: "test",
    },
  },
};

export const genrateTestIssue = () => {
  return testIssue;
};
