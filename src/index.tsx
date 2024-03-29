import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/client";
import { Route, BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "./pages/shared/ErrorBoundary";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <React.StrictMode>
      <ErrorBoundary>
        <ApolloProvider client={client}>
          <Route path="/" component={App} />
        </ApolloProvider>
      </ErrorBoundary>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
