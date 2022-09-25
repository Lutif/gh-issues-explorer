import { Button } from "@mui/material";
import React, { useState } from "react";
import { IssueListItem } from "./components/IssueListItem";
import { SearchBar } from "./components/Searchbar";
import { PAGE_SIZE, useSearchIssues } from "../../utils";
import { ShouldRender, Loading } from "../shared";
import Checkbox from "@mui/material/Checkbox";
import { SearchPageStyled } from "./searchPage.styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

interface SearchPageProps {}

export const SearchPage: React.FC<SearchPageProps> = () => {
  const [open, setOpen] = useState(true);
  const {
    search,
    gotoNextPage,
    gotoPrevPage,
    data: issues,
    currentPage,
    hasMore,
    isLoading,
    setSearchText,
  } = useSearchIssues();

  const performSearch = () => {
    search({ isOpen: open });
  };

  return (
    <SearchPageStyled>
      <div className="header">
        <SearchBar
          setSearchText={setSearchText}
          performSearch={performSearch}
        />
        <FormGroup className="status-checkboxes">
          <FormControlLabel
            control={
              <Checkbox
                checked={open}
                onClick={() => setOpen((prev) => !prev)}
              />
            }
            label="Open"
          />
        </FormGroup>
        <Button
          onClick={performSearch}
          className="search-btn"
          variant="contained"
          color="primary"
        >
          Search
        </Button>
      </div>
      <ShouldRender if={isLoading}>
        <Loading />
      </ShouldRender>
      <ShouldRender if={!isLoading}>
        <>
          <ShouldRender if={issues.length > 0}>
            <div className="issues">
              {issues?.map((issue, index) => (
                <IssueListItem key={`${issue.id}-${index}`} issue={issue} />
              ))}
            </div>
          </ShouldRender>
          <ShouldRender if={issues.length === 0}>
            <div className="no-result">No result found</div>
          </ShouldRender>
        </>
      </ShouldRender>
      <ShouldRender if={issues.length > 0}>
        <div className="pagination-container">
          <Button
            variant="outlined"
            color="info"
            size="small"
            disabled={currentPage <= 1 || isLoading}
            onClick={() => gotoPrevPage()}
          >
            prvious page
          </Button>
          <p className="page">{currentPage}</p>
          <Button
            variant="outlined"
            color="info"
            size="small"
            disabled={(!hasMore && issues.length < PAGE_SIZE) || isLoading}
            onClick={() => gotoNextPage(open)}
          >
            Next page
          </Button>
        </div>
      </ShouldRender>
    </SearchPageStyled>
  );
};
