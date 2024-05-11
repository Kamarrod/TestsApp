import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const GetStudentInfo = () => {
  const [answers, setAnswers] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const axios = useAxiosPrivate();
  const { testId, studentId } = useParams();

  const url = "/api/tests/" + testId + "/students/" + studentId + "/answers";

  useEffect(() => {
    const getAnswers = async () => {
      try {
        const response = await axios.get(url);
        setAnswers(response.data);
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

    getAnswers();
  }, [axios, url]);

  return (
    <div>
      {errMsg && <p>{errMsg}</p>}
      <table>
        <thead>
          <tr>
            <th>User Answer</th>
            <th>Question ID</th>
            <th>Is Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((answer, index) => (
            <tr key={index}>
              <td>{answer.userAnswer}</td>
              <td>{answer.questionId}</td>
              <td>{answer.isCorrectAnswer ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetStudentInfo;
