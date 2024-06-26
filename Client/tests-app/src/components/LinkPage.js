import { Link } from "react-router-dom";
import React from "react";

const LinkPage = () => {
  return (
    <section>
      <h1>Links</h1>
      <br />
      <h2>Public</h2>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/unauthorized">Unauthorized</Link>
      <br />
      <h2>Private</h2>
      <Link to="/">Home</Link>
      <Link to="/tests">Tests</Link>
    </section>
  );
};

export default LinkPage;
