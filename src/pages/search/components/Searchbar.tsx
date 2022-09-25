import React from "react";
import TextField from "@mui/material/TextField";

interface SearchBarProps {
  setSearchText: (text: string) => void;
  performSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  setSearchText,
  performSearch,
}) => {
  return (
    <TextField
      style={{ width: "100%" }}
      onChange={(e) => {
        setSearchText(e.target.value);
      }}
      // onBlur={performSearch}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          performSearch();
        }
      }}
      variant="outlined"
      placeholder="Search issue title or body"
      size="small"
    />
  );
};
