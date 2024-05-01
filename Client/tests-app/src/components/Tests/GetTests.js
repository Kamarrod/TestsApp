import axios from "../../api/axios";
import { useState, useEffect } from "react";
//import useAuth from "../../hooks/useAuth";
import "./tests.css";
import { Link } from "react-router-dom";

const QUESTIONS_URL = "/api/tests";

const GetTests = () => {
  const [tests, setTests] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(QUESTIONS_URL, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setTests(response.data);
      } catch (err) {
        if (!err.response) {
          setErrMsg("No Server Response");
        } else if (err.response.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Failed");
        }
      }
    };

    fetchTests();
  }, []);

  if (tests.length === 0) {
    return <p>Загрузка...</p>;
  }

  return (
    <>
      {errMsg && <p>{errMsg}</p>}
      {tests.map((test, index) => (
        <p>{test.Name}</p>
      ))}
      <Link to="/createTest">Create Test</Link>
    </>
  );
};

export default GetTests;
