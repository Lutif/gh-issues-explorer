import styled from "styled-components";

export const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  .repo {
    margin: 5px 0px;
    font-size: 20px;
    font-weight: bold;
    color: #555;
    &:hover {
      color: #000;
      cursor: pointer;
      font-size: 22px;
    }
  }
`;
