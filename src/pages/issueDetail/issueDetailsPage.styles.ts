import styled from "styled-components";

export const IssueDetailsWrapper = styled.div`
  margin: 20px 10px;
  .title {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    border: 2px solid #e5e5e5;
    border-radius: 5px;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    .author {
      font-size: 18px;
      color: grey;
      margin-right: 10px;
    }
  }
  .body {
    margin-top: 10px;
    font-size: 16px;
    color: #222;
    border: 2px solid #e5e5e5;
    border-radius: 5px;
    padding: 5px 10px;
    max-height: 80vh;
    overflow-y: auto;
  }
  .comments {
    margin: 15px 0px 0px 20px;
  }
  .fetch-more {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
`;
