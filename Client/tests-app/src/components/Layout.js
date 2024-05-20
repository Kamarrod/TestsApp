import { Outlet } from "react-router-dom";
import React from "react";
import GetHeader from "./Header/Header";

const Layout = () => {
  return (
    <div>
      <GetHeader />
      <main className="App">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
