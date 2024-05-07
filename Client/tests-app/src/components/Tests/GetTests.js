import { useState, useEffect } from "react";
import React from "react";
//import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const TESTS_URL = "/api/tests";

const GetTests = () => {
  const [tests, setTests] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const axios = useAxiosPrivate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(TESTS_URL, {
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

  const DeleteTest = async (id) => {
    try {
      const response = await axios.delete(TESTS_URL + "/" + id, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
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

  return (
    <>
      {errMsg && <p>{errMsg}</p>}
      {tests.map((test, index) => (
        <div key={index}>
          <p>{test.Name}</p>
          <Link to={`/test/${test.Id}`} state={test}>
            Перейти к вопросам
          </Link>
          <button onClick={() => DeleteTest(test.Id)}>Удалить</button>
        </div>
      ))}
      <Link to="/createTest">Create Test</Link>
    </>
  );
};

export default GetTests;
