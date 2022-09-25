import styled from "styled-components";

export const CommentItemWrapper = styled.div`
  border: 2px solid #e5e5e5;
  border-radius: 5px;
  padding: 5px 10px;
  margin-bottom: 10px;
  .content {
    max-height: 30vh;
    overflow-y: auto;
    margin: 0px;
    padding: 0px;
    font-size: 14px;
  }
  .sub-text {
    font-size: 14px;
    color: grey;
  }
`;
