import { useLazyQuery, useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { GET_ISSUES_OF_REPOSITORY, SEARCH_FOR_ISSUE } from "../../apollo";
import { GetIssuesData, Issue, SearchIssuesData, PAGE_SIZE } from "../../utils";
import { useLocation } from "react-router-dom";
import Materilize from "materialize-css";

interface SearchInput {
  isOpen: boolean;
  isNextPage?: boolean;
}

interface userSearchIssueResponse {
  search: (props: SearchInput) => void;
  gotoNextPage: (isOpen: boolean) => void;
  gotoPrevPage: () => void;
  data: Issue[];
  isError: boolean;
  isLoading: boolean;
  currentPage: number;
  hasMore: boolean;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

export const useSearchIssues = (): userSearchIssueResponse => {
  const [result, setResult] = useState<Issue[]>([]);
  const [searchResult, setSearchResult] = useState<Issue[]>([]);

  const [isSearchActive, setIsSearchActive] = useState(false);

  const [nextPage, setNextPage] = useState<null | String>(null);
  const [searchNextPage, setSearchNextPage] = useState<null | String>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const [searchText, setSearchText] = useState("");

  const { pathname } = useLocation();
  const [org, repo] = pathname.split("/").slice(1, 3);
  //helpers
  const incrementPageNumber = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
  }, []);
  const resetPageNumber = useCallback(() => {
    setCurrentPage(0);
  }, []);
  const decrementPageNumber = useCallback(() => {
    setCurrentPage((prev) => prev - 1);
  }, []);

  const [searchIssues, { error: searchError, loading: searching }] =
    useLazyQuery<SearchIssuesData>(SEARCH_FOR_ISSUE, {
      onCompleted: (data) => {
        const newItems = data.search.nodes;
        newItems.length && incrementPageNumber();
        const newArr = [...searchResult, ...newItems];
        setSearchResult(newArr);
        setSearchNextPage(data.search.pageInfo.endCursor);
      },
      onError: (err) => {
        Materilize.toast({ html: err.message });
      },
      fetchPolicy: "network-only",
    });

  const {
    error: intialLoadError,
    loading,
    refetch,
  } = useQuery<GetIssuesData>(GET_ISSUES_OF_REPOSITORY, {
    variables: {
      repositoryOwner: org,
      repositoryName: repo,
      pageSize: PAGE_SIZE,
      issueState: "OPEN",
    },
    fetchPolicy: "cache-first",
    onCompleted: (data) => {
      const newItems = data.repository.issues.edges.map((edge) => edge.node);
      newItems.reverse();
      newItems.length && incrementPageNumber();
      setResult((prev) => [...prev, ...newItems]);
      setNextPage(data.repository.issues.pageInfo.startCursor);
    },
    onError: (err) => {
      Materilize.toast({ html: err.message });
    },
  });

  const search = useCallback(
    ({ isOpen, isNextPage }: SearchInput) => {
      setIsSearchActive(!!searchText);
      if (!searchText) return;

      let query = `repo:${org}/${repo} type:issue ${searchText} state:${
        isOpen ? "open" : "closed"
      }`;

      if (!isNextPage) {
        resetPageNumber();
        setSearchNextPage(null);
        setSearchResult([]);
      }

      searchIssues({
        variables: {
          text: query,
          pageSize: PAGE_SIZE,
          cursor: isNextPage && searchNextPage,
        },
      });
    },
    [org, repo, resetPageNumber, searchIssues, searchNextPage, searchText]
  );

  const getNextPageForSearch = useCallback(
    (isOpen: boolean) => {
      search({ isNextPage: true, isOpen: isOpen });
    },
    [search]
  );

  const gotoNextPage = useCallback(
    (isOpen: boolean) => {
      if ((isSearchActive && searching) || (loading && !isSearchActive)) return;
      if (searchText) {
        const nextPageDataExist = searchResult.length > currentPage * PAGE_SIZE;
        nextPageDataExist
          ? incrementPageNumber()
          : getNextPageForSearch(isOpen);
      } else {
        const nextPageDataExist = result.length > currentPage * PAGE_SIZE;
        nextPageDataExist
          ? incrementPageNumber()
          : refetch({ cursor: nextPage });
      }
    },
    [
      currentPage,
      getNextPageForSearch,
      incrementPageNumber,
      isSearchActive,
      loading,
      nextPage,
      refetch,
      result.length,
      searchResult.length,
      searchText,
      searching,
    ]
  );

  useEffect(() => {
    !searchText && setIsSearchActive(false);
  }, [searchText]);

  const isError = !!(searchError || intialLoadError);
  const isLoading = loading || searching;

  const startIndex = ((currentPage || 1) - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const resultArr = isSearchActive ? searchResult : result;

  return {
    search,
    data: resultArr.slice(startIndex, endIndex),
    currentPage,
    hasMore: searchText ? !!searchNextPage : !!nextPage,
    isError,
    isLoading,
    gotoNextPage,
    gotoPrevPage: decrementPageNumber,
    setSearchText,
  };
};
