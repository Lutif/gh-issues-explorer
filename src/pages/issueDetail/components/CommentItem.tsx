import moment from "moment";
import { Comment } from "../../../utils";
import { CommentItemWrapper } from "./commentItem.styles";

interface CommentItemProps {
  comment: Comment;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const { bodyHTML, author: { login } = {}, createdAt } = comment.node;
  const subText = `Commented ${moment(createdAt).fromNow()} by ${login}`;
  return (
    <CommentItemWrapper>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: bodyHTML as string }}
      />
      <div className="sub-text">{subText}</div>
    </CommentItemWrapper>
  );
};
