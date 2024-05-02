import useAxiosPrivate from "../../hooks/useAxiosPrivate";
//import { useNavigate } from "react-router-dom";
import "./question.css";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const QUESTIONS_URL = "/api/tests/";

const GetQuestions = (test) => {
  //const { auth } = useAuth();
  const { testId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const axios = useAxiosPrivate();

  const url = QUESTIONS_URL + testId + "/questions";

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          url,
          JSON.stringify({ testId: testId }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        setQuestions(response.data);
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

    fetchQuestions();
  }, []);

  if (questions.length === 0) {
    return <p>Загрузка...</p>;
  }

  return (
    <>
      {errMsg && <p>{errMsg}</p>}
      {questions.map((question, index) => (
        <div class="question-card">
          <div class="question-question">{question.QuestionText}</div>
          <textarea
            class="answer-input"
            placeholder="Your answer..."
          ></textarea>
        </div>
      ))}
      {/* <Link to="/createTest">Create Test</Link> */}
    </>
  );
};

export default GetQuestions;
