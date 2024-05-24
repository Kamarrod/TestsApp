import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "./tests.css";

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
    // <>
    //   {errMsg && <p>{errMsg}</p>}
    //   {tests.map((test, index) => (
    //     <div key={index}>
    //       <p>{test.Name}</p>
    //       <Link to={`/test/${test.Id}`} state={test}>
    //         Перейти к вопросам
    //       </Link>
    //       <button onClick={() => DeleteTest(test.Id)}>Удалить</button>
    //       <Link to={`/students/${test.Id}`} state={test}>
    //         Информация о прошедших
    //       </Link>
    //     </div>
    //   ))}
    //   <Link to="/createTest">Create Test</Link>
    // </>
    <>
      {errMsg && <p className="error-message">{errMsg}</p>}
      <div className="test-container">
        {tests.map((test, index) => (
          <div key={index} className="test-card">
            <h2 className="test-name">{test.Name}</h2>
            <div>
              <div className="test-actions">
                <Link
                  to={`/test/${test.Id}`}
                  state={test}
                  className="test-link"
                >
                  Перейти к вопросам
                </Link>
                <Link
                  to={`/students/${test.Id}`}
                  state={test}
                  className="test-link"
                >
                  Информация о прошедших
                </Link>
              </div>
              <button
                onClick={() => DeleteTest(test.Id)}
                className="delete-button"
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
      <Link to="/createTest" className="create-test-link">
        Create Test
      </Link>
    </>
  );
};

export default GetTests;

{
  /* <>
      {errMsg && <p className="error-message">{errMsg}</p>}
      {tests.map((test, index) => (
        <div key={index} className="test-card">
          <h2 className="test-name">{test.Name}</h2>
          <div style={{ display: "flex" }}>
            <div className="test-actions">
              <Link to={`/test/${test.Id}`} state={test} className="test-link">
                Перейти к вопросам
              </Link>
              <Link
                to={`/students/${test.Id}`}
                state={test}
                className="test-link"
              >
                Информация о прошедших
              </Link>
            </div>
            <div>
              <button
                onClick={() => DeleteTest(test.Id)}
                className="delete-button"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      ))}
      <Link to="/createTest" className="create-test-link">
        Create Test
      </Link>
    </> */
}
