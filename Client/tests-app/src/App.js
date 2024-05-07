import "./App.css";
import React from "react";

import Register from "./components/Register";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Unauthorized from "./components/Unauthorized";
import LinkPage from "./components/LinkPage";
import RequireAuth from "./components/RequireAuth";
import Missing from "./components/Missing";
import PersistLogin from "./components/PersistLogin";
import GetTests from "./components/Tests/GetTests";
import TestCreation from "./components/Tests/CreateTest";
import GetQuestions from "./components/Questions/GetQuestions";

const ROLES = {
  User: "User",
  Admin: "Admin",
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}
          >
            <Route path="tests" element={<GetTests />} />
            <Route path="linkpage" element={<LinkPage />} />

            <Route path="createTest" element={<TestCreation />} />
            <Route path="/test/:testId" element={<GetQuestions />} />
          </Route>
        </Route>
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
