import React from "react";
import { Spinner } from "react-bootstrap";
export const Loader = () => {
  return (
    <div>
      <Spinner animation="grow" role="status" className="loader">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};
