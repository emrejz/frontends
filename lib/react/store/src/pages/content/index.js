import React, { useContext } from "react";
import { StoreContext } from "../../store/StoreProvider";
import { CONTENT_PAGE_NAME } from "../../../store/actions";

import "./content.css";

const Content = () => {
  const { state, dispatch } = useContext(StoreContext);
  const changeName = () => {
    dispatch({
      type: CONTENT_PAGE_NAME,
      payload: "Content " + Math.floor(Math.random() * 100),
    });
  };
  return (
    <div id="contentContainer">
      <h1>{state.contentPageName}</h1>
      <button onClick={changeName}>Change Name</button>
    </div>
  );
};

export default Content;
