import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import React from "react";
import "./question.css";
import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import CreateQuestion from "./CreateQuestion";

const QUESTIONS_URL = "/api/tests/";

const GetQuestions = (props) => {
  const location = useLocation();
  const test = location.state;
  const { auth } = useAuth();
  const { testId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const axios = useAxiosPrivate();

  // console.log("test");
  // console.log(test);

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
    //console.log("User ID = " + auth.id);
    //console.log(test);
    if (auth && auth.id === test.AuthorId) {
      return (
        <div>
          <p className="answer-p">{question.Answer}</p>
          <button onClick={() => handleEditQuestion(question)}>
            Изменить вопрос
          </button>
          <button onClick={() => DeleteQuestion(question.Id)}>Удалить</button>
        </div>
      );
    } else {
      return <textarea className="answer-input" placeholder="Your answer..." />;
    }
  };

  const renderCreateField = () => {
    if (auth && auth.id === test.AuthorId) {
      return <CreateQuestion state={test.Id} />;
    }
    return;
  };

  const DeleteQuestion = async (id) => {
    const url = QUESTIONS_URL + testId + "/questions";
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
      {errMsg && <p>{errMsg}</p>}
      {questions.map((question, index) => (
        <div className="question-card" key={question.Id}>
          <div className="question-question">{question.QuestionText}</div>
          {renderAnswerField(question)}
        </div>
      ))}
      {renderCreateField()}
    </>
  );
};

export default GetQuestions;

// import React, { useState, useEffect } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";
// import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import "./question.css";

// const QUESTIONS_URL = "/api/tests/";

// const GetQuestions = (props) => {
//   const location = useLocation();
//   const test = location.state;
//   const { auth } = useAuth();
//   const { testId } = useParams();
//   const [questions, setQuestions] = useState([]);
//   const [errMsg, setErrMsg] = useState("");
//   const [editingQuestion, setEditingQuestion] = useState(null);
//   const [editedQuestionText, setEditedQuestionText] = useState("");
//   const axios = useAxiosPrivate();

//   const url = QUESTIONS_URL + testId + "/questions";

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get(url, {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         });
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

//   const handleEditClick = (question) => {
//     setEditingQuestion(question);
//     setEditedQuestionText(question.QuestionText);
//   };

//   const handleCancelEdit = () => {
//     setEditingQuestion(null);
//     setEditedQuestionText("");
//   };

//   const handleSaveEdit = async () => {
//     try {
//       const updatedQuestion = {
//         ...editingQuestion,
//         QuestionText: editedQuestionText,
//       };
//       await axios.put(`${url}/${editingQuestion.id}`, updatedQuestion, {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       });
//       // Update questions list after successful edit
//       const updatedQuestions = questions.map((q) =>
//         q.id === editingQuestion.id ? updatedQuestion : q
//       );
//       setQuestions(updatedQuestions);
//       setEditingQuestion(null);
//       setEditedQuestionText("");
//     } catch (err) {
//       console.error("Error updating question:", err);
//       setErrMsg("Failed to update question");
//     }
//   };

//   const renderAnswerField = (question) => {
//     if (auth && auth.id === test.AuthorId) {
//       if (editingQuestion && editingQuestion.id === question.Id) {
//         return (
//           <div>
//             <textarea
//               className="answer-input"
//               value={editedQuestionText}
//               onChange={(e) => setEditedQuestionText(e.target.value)}
//             />
//             <div>
//               <button onClick={handleSaveEdit}>Save</button>
//               <button onClick={handleCancelEdit}>Cancel</button>
//             </div>
//           </div>
//         );
//       } else {
//         return (
//           <div>
//             <p className="answer-p">{question.QuestionText}</p>
//             <button onClick={() => handleEditClick(question)}>Edit</button>
//           </div>
//         );
//       }
//     } else {
//       return <textarea className="answer-input" placeholder="Your answer..." />;
//     }
//   };

//   return (
//     <>
//       {errMsg && <p>{errMsg}</p>}
//       {questions.map((question, index) => (
//         <div className="question-card" key={question.Id}>
//           {renderAnswerField(question)}
//         </div>
//       ))}
//     </>
//   );
// };

// export default GetQuestions;

// import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// //import { useNavigate } from "react-router-dom";
// import React from "react";

// import "./question.css";
// import { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";

// const QUESTIONS_URL = "/api/tests/";

// const GetQuestions = (test) => {
//   //const { auth } = useAuth();
//   const { testId } = useParams();
//   const [questions, setQuestions] = useState([]);
//   const [errMsg, setErrMsg] = useState("");
//   const axios = useAxiosPrivate();

//   const url = QUESTIONS_URL + testId + "/questions";

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get(
//           url,
//           JSON.stringify({ testId: testId }),
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
//     return <p>Загрузка...</p>;
//   }

//   return (
//     <>
//       {errMsg && <p>{errMsg}</p>}
//       {questions.map((question, index) => (
//         <div class="question-card">
//           <div class="question-question">{question.QuestionText}</div>
//           <textarea
//             class="answer-input"
//             placeholder="Your answer..."
//           ></textarea>
//         </div>
//       ))}
//       {/* <Link to="/createTest">Create Test</Link> */}
//     </>
//   );
// };

// export default GetQuestions;
