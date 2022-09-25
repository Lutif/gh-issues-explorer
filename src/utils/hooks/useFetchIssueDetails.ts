import { GetIssueData, Issue, Comment, PAGE_SIZE } from "../../utils";
import { useLocation } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_ISSUE, GET_COMMENTS_OF_ISSUE } from "../../apollo";
import { useCallback, useState } from "react";
import Materilize from "materialize-css";

interface useFetchIssueDetailsResponse {
  issue: Issue;
  comments: Comment[];
  isError: boolean;
  isLoading: boolean;
  hasMoreComments: boolean;
  loadingComments: boolean;
  fetchMoreComments: () => void;
}

export const useFetchIssueDetails = (): useFetchIssueDetailsResponse => {
  const { pathname } = useLocation();
  const [data, setData] = useState<Issue>(null as unknown as Issue);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsCursor, setCommentsCursor] = useState<String | null>();

  const [org, repo, _, issueNum] = pathname.split("/").slice(1);

  const { loading, error } = useQuery<GetIssueData>(GET_ISSUE, {
    variables: {
      repositoryName: repo,
      repositoryOwner: org,
      issueNumber: parseInt(issueNum),
      pageSize: PAGE_SIZE,
    },
    onCompleted: (data) => {
      setData(data.repository.issue);
      const comments = data.repository.issue.comments.edges;
      comments && setComments((prev) => [...prev, ...comments]);
      const cursor = data.repository.issue.comments.pageInfo.endCursor;
      setCommentsCursor(cursor);
    },
    onError: (err) => {
      Materilize.toast({ html: err.message });
    },
  });

  const [fetchComments, { loading: fetchingComments }] = useLazyQuery(
    GET_COMMENTS_OF_ISSUE,
    {
      onCompleted: (data) => {
        const newComments = data.repository.issue.comments.edges;
        setComments((prev) => [...prev, ...newComments]);
        const newCursor = data.repository.issue.comments.pageInfo.endCursor;
        setCommentsCursor(newCursor);
      },
      onError: (err) => {
        Materilize.toast({ html: err.message });
      },
    }
  );

  const fetchMoreComments = useCallback(() => {
    fetchComments({
      variables: {
        repositoryName: repo,
        repositoryOwner: org,
        issueNumber: parseInt(issueNum),
        cursor: commentsCursor,
        pageSize: PAGE_SIZE,
      },
    });
  }, [commentsCursor, fetchComments, issueNum, org, repo]);

  return {
    issue: data as Issue,
    hasMoreComments: !!commentsCursor && comments.length >= PAGE_SIZE,
    comments,
    isLoading: loading,
    isError: !!error,
    fetchMoreComments,
    loadingComments: fetchingComments,
  };
};
