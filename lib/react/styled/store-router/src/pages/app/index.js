import React from "react";
import { ThemeProvider } from "styled-components";
import Router from "../../router";
import theme from "../../styledComponents/theme";
import { StoreProvider } from "../../store/StoreProvider";

import "./app.css";

const App = () => {
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <div className="appContainer">
          <Router />
        </div>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;
