import { useFetchIssueDetails } from "../../utils/hooks/useFetchIssueDetails";
import React from "react";
import { CommentItem } from "./components/CommentItem";
import { ShouldRender, Loading } from "../shared";
import { IssueDetailsWrapper } from "./issueDetailsPage.styles";
import { Button } from "@mui/material";

interface IssueDetailsProps {}

export const IssueDetailsPage: React.FC<IssueDetailsProps> = () => {
  const {
    issue,
    comments,
    isLoading,
    hasMoreComments,
    loadingComments,
    fetchMoreComments,
  } = useFetchIssueDetails?.() || {};

  const { title, bodyHTML, author } = issue || {};
  const { login } = author || {};
  return (
    <IssueDetailsWrapper>
      <ShouldRender if={isLoading}>
        <Loading />
      </ShouldRender>
      <ShouldRender if={!isLoading}>
        <>
          <div className="title">
            {title} <span className="author">Created by {login}</span>
          </div>
          <div
            className="body"
            dangerouslySetInnerHTML={{ __html: bodyHTML as string }}
          />
          <div className="comments">
            {comments?.map((comment, index) => (
              <CommentItem key={index} comment={comment} />
            ))}
          </div>
          <div className="fetch-more">
            <Button
              variant="outlined"
              color="info"
              size="small"
              disabled={!hasMoreComments || loadingComments}
              onClick={fetchMoreComments}
            >
              {`${
                loadingComments || isLoading
                  ? "Loading.."
                  : "Fetch more comments"
              }`}
            </Button>
          </div>
        </>
      </ShouldRender>
    </IssueDetailsWrapper>
  );
};
