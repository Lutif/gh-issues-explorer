import { Switch, Route } from "react-router-dom";
import { lazyLoad } from "./pages/shared";

const IssueDetailsPage = lazyLoad(
  () => import("./pages/issueDetail/IssueDetailsPage"),
  "IssueDetailsPage"
);
const HomePage = lazyLoad(() => import("./pages/home/HomePage"), "HomePage");
const SearchPage = lazyLoad(
  () => import("./pages/search/SearchPage"),
  "SearchPage"
);

const App = () => {
  return (
    <div className="App" style={{ width: "100%" }}>
      <Switch>
        <Route
          path="/:org/:repo/issues/:issue"
          exact
          component={IssueDetailsPage}
        />
        <Route path="/:org/:repo/issues" exact component={SearchPage} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    </div>
  );
};

export default App;
