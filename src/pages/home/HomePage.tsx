import React from "react";
import { useHistory } from "react-router-dom";
import { orgs } from "./constansts";
import { LinksWrapper } from "./homepage.styles";

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = () => {
  const history = useHistory();
  const gotoIssues = (repo: string) => history.push(`/${repo}/issues`);

  return (
    <LinksWrapper>
      {orgs.map((org, index) => {
        const [orgName, repoName] = org.split("/");
        return (
          <div
            key={`${org}-${index}`}
            onClick={() => gotoIssues(org)}
            className="repo"
          >{`go to ${repoName} of ${orgName}`}</div>
        );
      })}
    </LinksWrapper>
  );
};
