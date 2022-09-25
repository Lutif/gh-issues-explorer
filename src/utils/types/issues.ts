export enum IssueState {
  OPEN = "OPEN",
  CLOSE = "CLOSE",
}

export interface Actor {
  login: String;
  avatarUrl: String;
  url: String;
}

export interface Comment {
  node: {
    bodyHTML: String;
    author: Actor;
    createdAt: Date;
  };
}
export interface Comments {
  totalCount: number;
  edges?: Comment[];
  pageInfo: PageInfo;
}

export interface Issue {
  id: String;
  number: String;
  state: IssueState;
  title: String;
  url: String;
  bodyHTML: String;
  closed: Boolean;
  closedAt: String;
  createdAt: Date;
  author: Actor;
  comments: Comments;
}

export interface PageInfo {
  endCursor: String;
  hasNextPage: Boolean;
  startCursor: String;
}

export interface GetIssuesData {
  repository: {
    issues: {
      edges: [
        {
          node: Issue;
        }
      ];
      pageInfo: PageInfo;
    };
  };
}

export interface SearchIssuesData {
  search: {
    nodes: [Issue];
    pageInfo: PageInfo;
  };
}

export interface GetIssueData {
  repository: {
    issue: Issue;
  };
}

export interface GetIssueCommentsData {
  repository: {
    issue: {
      comments: Comments;
    };
  };
}
