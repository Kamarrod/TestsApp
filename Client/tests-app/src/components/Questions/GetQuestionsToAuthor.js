// import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import React from "react";
// import "./question.css";
// import { useState, useEffect } from "react";
// import useAuth from "../../hooks/useAuth";
// import CreateQuestion from "./CreateQuestion";

// const QUESTIONS_URL = "/api/tests/";

// const GetQuestionsToAuthor = (props) => {
//   const { state } = props;
//   const test = state;
//   //const { testId } = useParams();
//   const { auth } = useAuth();
//   const [questions, setQuestions] = useState([]);
//   const [errMsg, setErrMsg] = useState("");
//   const axios = useAxiosPrivate();

//   //console.log(test);

//   const url = QUESTIONS_URL + test.id + "/questions";

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get(
//           url,
//           //JSON.stringify({ testId: test.id }),
//           {
//             headers: { "Content-Type": "application/json" },
//             withCredentials: true,
//           }
//         );
//         setQuestions(response.data);
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

//     fetchQuestions();
//   }, []);

//   if (questions.length === 0) {
//     return <p>Нет вопросов</p>;
//   }

//   const handleEditQuestion = async (question) => {
//     const userInput = prompt(
//       "Введите новый текст вопроса и ответ, разделив их символом '|' (например, Вопрос|Ответ)",
//       `${question.QuestionText}|${question.Answer}`
//     );

//     if (userInput !== null) {
//       const [newQuestionText, newAnswer] = userInput
//         .split("|")
//         .map((item) => item.trim());

//       if (newQuestionText !== "" && newAnswer !== "") {
//         try {
//           await axios.put(
//             `${url}/${question.Id}`,
//             { QuestionText: newQuestionText, Answer: newAnswer },
//             {
//               headers: { "Content-Type": "application/json" },
//               withCredentials: true,
//             }
//           );

//           const updatedQuestions = questions.map((q) =>
//             q.id === question.id
//               ? { ...q, QuestionText: newQuestionText, Answer: newAnswer }
//               : q
//           );
//           setQuestions(updatedQuestions);
//         } catch (err) {
//           if (!err.response) {
//             setErrMsg("No Server Response");
//           } else if (err.response.status === 401) {
//             setErrMsg("Unauthorized");
//           } else {
//             setErrMsg("Failed");
//           }
//         }
//       } else {
//         alert("Введите текст вопроса и ответ!");
//       }
//     }
//   };

//   const renderAnswerField = (question) => {
//     //console.log("User ID = " + auth.id);
//     //console.log(test);
//     if (auth && auth.id === test.authorId) {
//       return (
//         <div>
//           <p className="answer-p">{question.Answer}</p>
//           <button onClick={() => handleEditQuestion(question)}>
//             Изменить вопрос
//           </button>
//           <button onClick={() => DeleteQuestion(question.Id)}>Удалить</button>
//         </div>
//       );
//     } else {
//       return <textarea className="answer-input" placeholder="Your answer..." />;
//     }
//   };

//   const renderCreateField = () => {
//     if (auth && auth.id === test.authorId) {
//       return <CreateQuestion state={test.id} />;
//     }
//     return;
//   };

//   const DeleteQuestion = async (id) => {
//     const url = QUESTIONS_URL + test.Id + "/questions";
//     try {
//       await axios.delete(url + "/" + id, {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       });
//     } catch (err) {
//       if (!err.response) {
//         setErrMsg("No Server Response");
//       } else if (err.response.status === 401) {
//         setErrMsg("Unauthorized");
//       } else {
//         setErrMsg("Failed");
//       }
//     }
//     window.location.reload();
//   };

//   return (
//     <>
//       {errMsg && <p>{errMsg}</p>}
//       {questions.map((question, index) => (
//         <div className="question-card" key={question.Id}>
//           <div className="question-question">{question.QuestionText}</div>
//           {renderAnswerField(question)}
//         </div>
//       ))}
//       {renderCreateField()}
//     </>
//   );
// };

// export default GetQuestionsToAuthor;

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import React from "react";
import "./question.css";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import CreateQuestion from "./CreateQuestion";

const QUESTIONS_URL = "/api/tests/";

const GetQuestionsToAuthor = (props) => {
  const { state } = props;
  const test = state;
  const { auth } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const axios = useAxiosPrivate();

  const url = QUESTIONS_URL + test.id + "/questions";

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(url, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
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

  const handleEditQuestion = async (question) => {
    const userInput = prompt(
      "Введите новый текст вопроса и ответ, разделив их символом '|' (например, Вопрос|Ответ)",
      `${question.QuestionText}|${question.Answer}`
    );

    if (userInput !== null) {
      const [newQuestionText, newAnswer] = userInput
        .split("|")
        .map((item) => item.trim());

      if (newQuestionText !== "" && newAnswer !== "") {
        try {
          await axios.put(
            `${url}/${question.Id}`,
            { QuestionText: newQuestionText, Answer: newAnswer },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );

          const updatedQuestions = questions.map((q) =>
            q.id === question.id
              ? { ...q, QuestionText: newQuestionText, Answer: newAnswer }
              : q
          );
          setQuestions(updatedQuestions);
        } catch (err) {
          if (!err.response) {
            setErrMsg("No Server Response");
          } else if (err.response.status === 401) {
            setErrMsg("Unauthorized");
          } else {
            setErrMsg("Failed");
          }
        }
      } else {
        alert("Введите текст вопроса и ответ!");
      }
    }
  };

  const renderAnswerField = (question) => {
    if (auth && auth.id === test.authorId) {
      return (
        <div className="answer-section">
          <p className="answer-label">Ответ:</p>
          <p className="answer-p">{question.Answer}</p>
          <button
            onClick={() => handleEditQuestion(question)}
            className="edit-button"
          >
            Изменить вопрос
          </button>
          <button
            onClick={() => DeleteQuestion(question.Id)}
            className="delete-button"
          >
            Удалить
          </button>
        </div>
      );
    } else {
      return (
        <div className="answer-section">
          <p className="answer-label">Ответ:</p>
          <textarea
            className="answer-input"
            placeholder="Ваш ответ..."
          ></textarea>
        </div>
      );
    }
  };

  const renderCreateField = () => {
    if (auth && auth.id === test.authorId) {
      return <CreateQuestion state={test.id} />;
    }
    return null;
  };

  const DeleteQuestion = async (id) => {
    const url = QUESTIONS_URL + test.id + "/questions";
    try {
      await axios.delete(url + "/" + id, {
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
    window.location.reload();
  };

  return (
    <>
      {errMsg && <p className="error-message">{errMsg}</p>}
      {renderCreateField()}
      {questions.length === 0 && (
        <p className="loading-message">Нет вопросов</p>
      )}
      {questions.map((question, index) => (
        <div className="question-card" key={question.Id}>
          <p className="question-label">Вопрос:</p>
          <div className="question-question">{question.QuestionText}</div>
          {renderAnswerField(question)}
        </div>
      ))}
    </>
  );
};

export default GetQuestionsToAuthor;
