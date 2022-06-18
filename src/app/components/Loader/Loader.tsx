import React from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";
import "./loader.scss";

const Loader = () => {
  return (
    <Backdrop className="loader" open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
