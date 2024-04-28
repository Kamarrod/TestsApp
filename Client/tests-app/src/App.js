import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Unauthorized from "./components/Unauthorized";
import LinkPage from "./components/LinkPage";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route element={<RequireAuth />}>
          <Route path="linkpage" element={<LinkPage />} />
        </Route>
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
