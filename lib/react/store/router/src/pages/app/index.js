import React from "react";
import Router from "../../router";
import { StoreProvider } from "../../store/StoreProvider";

import "./app.css";

const App = () => {
  return (
    <StoreProvider>
      <div className="appContainer">
        <Router />
      </div>
    </StoreProvider>
  );
};

export default App;
