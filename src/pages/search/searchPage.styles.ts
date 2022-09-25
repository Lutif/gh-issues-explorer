import styled from "styled-components";

export const SearchPageStyled = styled.div`
  margin: 20px 10px;
  .header {
    display: flex;
    padding: 10px 20px;
    border: 2px solid #e5e5e5;
    border-radius: 5px;
    .search-btn {
      margin-left: 10px;
    }
  }
  .issues {
    margin-top: 20px;
    padding: 10px 0px 20px 0px;
    border: 2px solid #e5e5e5;
    border-radius: 5px;
  }
  .status-checkboxes {
    margin-left: 15px;
  }
  .no-result {
    margin-top: 30vh;
    padding: 10px 0px 20px 0px;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    font-color: #grey;
    min-height: 30vh;
  }
  .pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    button {
      margin: 0px 5px;
      height: 30px;
    }
    .page {
      height: 50px;
      justify-content: center;
      margin: 5px;
    }
  }
`;
