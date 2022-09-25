import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";
const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

interface LoadingProps {}

export const Loading: React.FC<LoadingProps> = () => {
  return (
    <LoadingWrapper data-testid="loading-spinner-test-id">
      <CircularProgress />
    </LoadingWrapper>
  );
};
