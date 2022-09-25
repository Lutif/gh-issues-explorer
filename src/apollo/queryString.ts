import gql from "graphql-tag";

export const GET_ISSUES_OF_REPOSITORY = gql`
  query getRepoIssues(
    $repositoryOwner: String!
    $repositoryName: String!
    $issueState: IssueState!
    $cursor: String
    $pageSize: Int = 10
  ) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      issues(last: $pageSize, states: [$issueState], before: $cursor) {
        edges {
          node {
            id
            number
            state
            title
            url
            bodyHTML
            closed
            createdAt
            closedAt
            author {
              login
              avatarUrl
              url
            }
            comments(last: $pageSize) {
              totalCount
              edges {
                node {
                  bodyHTML
                  createdAt
                  author {
                    login
                    avatarUrl
                    url
                  }
                }
              }
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          startCursor
        }
      }
    }
  }
`;

export const GET_ISSUE = gql`
  query FindIssueID(
    $repositoryOwner: String!
    $repositoryName: String!
    $issueNumber: Int!
    $pageSize: Int = 10
  ) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      issue(number: $issueNumber) {
        id
        number
        state
        title
        url
        bodyHTML
        closed
        createdAt
        closedAt
        author {
          login
          avatarUrl
          url
        }
        comments(first: $pageSize) {
          totalCount
          pageInfo {
            endCursor
            hasNextPage
            startCursor
          }
          edges {
            node {
              bodyHTML
              createdAt
              author {
                login
                avatarUrl
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const SEARCH_FOR_ISSUE = gql`
  query searchIssue($text: String!, $cursor: String, $pageSize: Int = 10) {
    search(first: $pageSize, query: $text, type: ISSUE, after: $cursor) {
      pageInfo {
        endCursor
        hasNextPage
        startCursor
      }
      nodes {
        ... on Issue {
          id
          number
          state
          title
          url
          bodyHTML
          closed
          createdAt
          closedAt
          author {
            login
            avatarUrl
            url
          }
        }
      }
    }
  }
`;

export const GET_COMMENTS_OF_ISSUE = gql`
  query fetchComments(
    $repositoryOwner: String!
    $repositoryName: String!
    $issueNumber: Int!
    $cursor: String
    $pageSize: Int = 10
  ) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      issue(number: $issueNumber) {
        id
        comments(first: $pageSize, after: $cursor) {
          edges {
            node {
              id
              bodyHTML
              author {
                login
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            startCursor
          }
        }
      }
    }
  }
`;
