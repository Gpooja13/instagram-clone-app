import React from "react";
import "../css/Error.css";

const Error = () => {
  return (
    <div className="errorPage">
      <div class="error-container">
        <h1 className="error-code"> 404 </h1>
        <p className="error-msg">Oops! The page you're looking for is not here.</p>
        <a href="http://localhost:3000">Go Back to Home</a>
      </div>
    </div>
  );
};

export default Error;
