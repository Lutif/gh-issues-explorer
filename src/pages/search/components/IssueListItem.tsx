import React from "react";
import { Issue } from "../../../utils";
import moment from "moment";
import { useHistory, useLocation } from "react-router-dom";
import { IssueListItemWrapper } from "./issueListItem.styled";

interface IssueListItemProps {
  issue: Issue;
}

export const IssueListItem: React.FC<IssueListItemProps> = ({ issue }) => {
  const {
    title,
    state,
    createdAt,
    author,
    comments: { totalCount: totalComments } = {},
  } = issue;
  const login = author || {};
  const history = useHistory();
  const { pathname } = useLocation();

  const gotoIssueDetail = () => history.push(`${pathname}/${issue.number}`);

  const content = `#${issue.number} ${"Opened"} ${moment(
    createdAt
  ).fromNow()} by ${login}`;

  return (
    <IssueListItemWrapper onClick={gotoIssueDetail}>
      <div className="title">{title}</div>
      <div className="details">{content}</div>
      <div>
        {totalComments || 0} comments | {state}{" "}
      </div>
    </IssueListItemWrapper>
  );
};
