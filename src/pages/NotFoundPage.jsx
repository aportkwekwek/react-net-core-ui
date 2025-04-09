import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h1>Not Found 404</h1>
      <Link to={"/"}>
        <button>Go Home</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
