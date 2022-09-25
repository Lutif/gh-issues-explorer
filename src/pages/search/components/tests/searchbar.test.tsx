import { fireEvent, render, screen } from "@testing-library/react";
import { SearchBar } from "../Searchbar";

describe("<SearchBar /> tests", () => {
  it("renders the SearchBar component", () => {
    render(
      <SearchBar
        setSearchText={(text: string) => {}}
        performSearch={() => {}}
      />
    );
    const element = screen.getByPlaceholderText("Search issue title or body");
    expect(element).toBeInTheDocument();
  });

  it("should call performSearch on Enter key press", () => {
    let result;
    render(
      <SearchBar
        setSearchText={() => {}}
        performSearch={() => {
          result = true;
        }}
      />
    );
    const element = screen.getByPlaceholderText("Search issue title or body");
    fireEvent.keyDown(element, { key: "Enter", code: "Enter" });
    expect(result).toBe(true);
  });
  //not so happy tests
  it("should not call performSearch on other key press", () => {
    let result;
    render(
      <SearchBar
        setSearchText={() => {}}
        performSearch={() => {
          result = true;
        }}
      />
    );
    const element = screen.getByPlaceholderText("Search issue title or body");
    fireEvent.keyDown(element, { key: "a", code: "a" });
    expect(result).toBe(undefined);
  });
});
it("should call setSearchText on change", () => {
  let result;
  render(
    <SearchBar
      setSearchText={(text: string) => {
        result = text;
      }}
      performSearch={() => {}}
    />
  );
  const element = screen.getByPlaceholderText("Search issue title or body");
  fireEvent.change(element, { target: { value: "test" } });
  expect(result).toBe("test");
});
