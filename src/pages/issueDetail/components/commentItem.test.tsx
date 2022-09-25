import { render, screen } from "@testing-library/react";
import moment from "moment";
import { Comment } from "../../../utils";
import { CommentItem } from "./CommentItem";
describe("<CommentItem /> tests", () => {
  const commentBody = "test comment";

  const testComment: Comment = {
    node: {
      bodyHTML: `<p>${commentBody}</p>`,
      createdAt: new Date(),
      author: {
        login: "lutif",
        avatarUrl: "test",
        url: "test",
      },
    },
  };
  const subText = `Commented ${moment(
    testComment.node.createdAt
  ).fromNow()} by ${testComment.node.author.login}`;
  it("renders the CommentItem component", () => {
    render(<CommentItem comment={testComment} />);
    const element = screen.getByText(commentBody);
    expect(element).toBeInTheDocument();
  });

  it("test CommentItem snapshot", () => {
    const { asFragment } = render(<CommentItem comment={testComment} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("test commentItem author name in document", () => {
    render(<CommentItem comment={testComment} />);
    const element = screen.getByText(subText);
    expect(element).toBeInTheDocument();
  });
});
