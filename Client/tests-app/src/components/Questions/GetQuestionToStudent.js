// import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import React from "react";
// import "./question.css";
// import { useState, useEffect } from "react";
// import useAuth from "../../hooks/useAuth";

// const QUESTIONS_URL = "/api/tests/";

// const GetQuestionsToStudent = (props) => {
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
//           //JSON.stringify({ testId: test.Id }),
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

//   const renderAnswerField = (question) => {
//     return <textarea className="answer-input" placeholder="Your answer..." />;
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
//     </>
//   );
// };

// export default GetQuestionsToStudent;

import React, { useState } from "react";
import { useEffect } from "react";
import Modal from "react-modal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "./question.css";

const WelcomeModal = ({ isOpen, onClose, onSubmit }) => {
  const [nickname, setNickname] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(nickname);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Добро пожаловать!</h2>
      <p>Пожалуйста, введите ваш ник:</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <button type="submit">Отправить</button>
      </form>
    </Modal>
  );
};

const GetQuestionsToStudent = (props) => {
  const { state } = props;
  const test = state;
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [answers, setAnswers] = useState({});
  const axios = useAxiosPrivate();
  //const [endTime, setEndTime] = useState();

  const url = `/api/tests/${test.id}/questions`;

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitNickname = async (nickname) => {
    console.log(test);
    const time = new Date();
    var endTime = new Date();
    if (test.haveTimeLimit) {
      endTime.setMinutes(endTime.getMinutes() + test.timeLimit);
    } else {
      endTime = time.closeTime;
    }
    console.log(time);
    console.log(endTime);
    try {
      const response = await axios.post(
        "/api/tests/" + test.id + "/students",
        JSON.stringify({
          Name: nickname,
          TestId: test.id,
          StartTime: time,
          EndTime: endTime,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      localStorage.setItem("student", JSON.stringify(response.data));
      console.log(response.data);
      // Закрыть модальное окно и загрузить вопросы
      setIsModalOpen(false);
      fetchQuestions();
    } catch (error) {
      console.error("Ошибка при отправке ника:", error);
      // Возможно, здесь стоит добавить обработку ошибок
    }
  };

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

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmitAnswers = async () => {
    try {
      await axios.post(
        "/api/s",
        { answers },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      localStorage.removeItem("student");
      // Добавьте здесь логику обработки успешной отправки ответов
    } catch (error) {
      console.error("Ошибка при отправке ответов:", error);
      // Возможно, здесь стоит добавить обработку ошибок
    }
  };

  useEffect(() => {
    if (questions.length > 0) {
      const initialAnswers = {};
      questions.forEach((question) => {
        initialAnswers[question.id] = "";
      });
      setAnswers(initialAnswers);
    }
  }, [questions]);

  return (
    <>
      <WelcomeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitNickname}
      />
      {errMsg && <p>{errMsg}</p>}
      {questions.length === 0 ? (
        <p>Загрузка...</p>
      ) : (
        <>
          {questions.map((question, index) => (
            <div className="question-card" key={question.Id}>
              <div className="question-question">{question.QuestionText}</div>
              <textarea
                className="answer-input"
                placeholder="Your answer..."
                value={answers[question.Id] || ""}
                onChange={(e) =>
                  handleAnswerChange(question.id, e.target.value)
                }
              />
            </div>
          ))}
          <button onClick={handleSubmitAnswers}>Завершить тест</button>
        </>
      )}
    </>
  );
};

export default GetQuestionsToStudent;
