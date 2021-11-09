import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div className="body-center">
      <Spinner animation="border" variant="danger" className="center" />
    </div>
  );
};

export default Loading;
