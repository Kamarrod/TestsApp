// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import useAxiosPrivate from "../../hooks/useAxiosPrivate";

// const GetStudentInfo = () => {
//   const [answers, setAnswers] = useState([]);
//   const [questions, setQuestions] = useState([]);
//   const [errMsg, setErrMsg] = useState("");
//   const axios = useAxiosPrivate();
//   const { testId, studentId } = useParams();

//   const answersUrl = `/api/tests/${testId}/students/${studentId}/answers`;
//   const questionsUrl = `/api/tests/${testId}/questions`;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [answersResponse, questionsResponse] = await Promise.all([
//           axios.get(answersUrl),
//           axios.get(questionsUrl),
//         ]);
//         setAnswers(answersResponse.data);
//         setQuestions(questionsResponse.data);
//       } catch (err) {
//         if (!err.response) {
//           setErrMsg("No Server Response");
//         } else if (err.response.status === 401) {
//           setErrMsg("Unauthorized");
//         } else {
//           setErrMsg("Failed");
//         }
//       }
//     };

//     fetchData();
//   }, [axios, answersUrl, questionsUrl]);

//   const mergedData = questions.map((question) => {
//     console.log(answers);
//     const answer = answers.find((a) => a.questionId === question.Id);
//     console.log(answer);
//     return {
//       ...question,
//       userAnswer: answer ? answer.userAnswer : "",
//       isCorrectAnswer: answer ? answer.isCorrectAnswer : false,
//     };
//   });

//   const correctAnswersCount = mergedData.filter(
//     (item) => item.isCorrectAnswer
//   ).length;
//   const percentageCorrect = (
//     (correctAnswersCount / questions.length) *
//     100
//   ).toFixed(2);

//   return (
//     <div>
//       {errMsg && <p>{errMsg}</p>}
//       <p>Процент правильных ответов: {percentageCorrect}%</p>
//       <table>
//         <thead>
//           <tr>
//             <th>Ответ пользователя</th>
//             <th>ID вопроса</th>
//             <th>Правильный ответ</th>
//             <th>Правильный ответ?</th>
//           </tr>
//         </thead>
//         <tbody>
//           {mergedData.map((item, index) => (
//             <tr key={index}>
//               <td>{item.userAnswer}</td>
//               <td>{item.Id}</td>
//               <td>{item.Answer}</td>
//               <td>{item.isCorrectAnswer ? "Да" : "Нет"}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default GetStudentInfo;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "./students.css";

const GetStudentInfo = () => {
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const axios = useAxiosPrivate();
  const { testId, studentId } = useParams();

  const answersUrl = `/api/tests/${testId}/students/${studentId}/answers`;
  const questionsUrl = `/api/tests/${testId}/questions`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [answersResponse, questionsResponse] = await Promise.all([
          axios.get(answersUrl),
          axios.get(questionsUrl),
        ]);
        setAnswers(answersResponse.data);
        setQuestions(questionsResponse.data);
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

    fetchData();
  }, [axios, answersUrl, questionsUrl]);

  const mergedData = questions.map((question) => {
    const answer = answers.find((a) => a.questionId === question.Id);
    return {
      ...question,
      userAnswer: answer ? answer.userAnswer : "",
      isCorrectAnswer: answer ? answer.isCorrectAnswer : false,
    };
  });

  const correctAnswersCount = mergedData.filter(
    (item) => item.isCorrectAnswer
  ).length;
  const percentageCorrect = (
    (correctAnswersCount / questions.length) *
    100
  ).toFixed(2);

  return (
    <div>
      {errMsg && <p>{errMsg}</p>}
      <p>Процент правильных ответов: {percentageCorrect}%</p>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${percentageCorrect}%` }}
        >
          {percentageCorrect}%
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Ответ пользователя</th>
              <th>ID вопроса</th>
              <th>Правильный ответ</th>
              <th>Правильный ответ?</th>
            </tr>
          </thead>
          <tbody>
            {mergedData.map((item, index) => (
              <tr key={index}>
                <td>{item.userAnswer}</td>
                <td>{item.Id}</td>
                <td>{item.Answer}</td>
                <td
                  className={
                    item.isCorrectAnswer ? "correct-answer" : "wrong-answer"
                  }
                >
                  {item.isCorrectAnswer ? "Да" : "Нет"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetStudentInfo;
