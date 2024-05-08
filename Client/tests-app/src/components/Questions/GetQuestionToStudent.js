import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import React from "react";
import "./question.css";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const QUESTIONS_URL = "/api/tests/";

const GetQuestionsToStudent = (props) => {
  const { state } = props;
  const test = state;
  //const { testId } = useParams();
  const { auth } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const axios = useAxiosPrivate();

  //console.log(test);

  const url = QUESTIONS_URL + test.id + "/questions";

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          url,
          //JSON.stringify({ testId: test.Id }),
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

  const renderAnswerField = (question) => {
    return <textarea className="answer-input" placeholder="Your answer..." />;
  };

  return (
    <>
      {errMsg && <p>{errMsg}</p>}
      {questions.map((question, index) => (
        <div className="question-card" key={question.Id}>
          <div className="question-question">{question.QuestionText}</div>
          {renderAnswerField(question)}
        </div>
      ))}
    </>
  );
};

export default GetQuestionsToStudent;
