// import React, { useState } from "react";
// import Modal from "react-modal";
// import "./question.css";
// import useAxiosPrivate from "../../hooks/useAxiosPrivate";

// const QUESTIONS_URL = "/api/tests/";

// const CreateQuestion = (props) => {
//   const [errMsg, setErrMsg] = useState("");
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [questionText, setQuestionText] = useState("");
//   const [answerText, setAnswerText] = useState("");
//   const [questionCost, setQuestionCost] = useState(0);
//   const [description, setDescription] = useState("");
//   const [count, setCount] = useState(0);
//   const { state } = props;
//   const testId = state;

//   const url = QUESTIONS_URL + testId + "/questions";

//   const axios = useAxiosPrivate();

//   const openModal = () => {
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//   };

//   const handleSave = async () => {
//     try {
//       await axios.post(
//         url,
//         JSON.stringify({
//           answer: answerText,
//           questionText: questionText,
//           cost: questionCost,
//           numberQuestion: 1,
//         }),
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         }
//       );
//       setModalIsOpen(false);
//       window.location.reload();
//     } catch (err) {
//       if (!err.response) {
//         setErrMsg("No Server Response");
//       } else if (err.response.status === 401) {
//         setErrMsg("Unauthorized");
//       } else {
//         setErrMsg("Failed");
//       }
//     }
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     if (name === "questionText") {
//       setQuestionText(value);
//     } else if (name === "answerText") {
//       setAnswerText(value);
//     } else if (name === "questionCost") {
//       setQuestionCost(parseFloat(value));
//     } else if (name === "description") {
//       setDescription(value);
//     } else if (name === "count") {
//       setCount(parseInt(value));
//     }
//   };

//   const generateQuestions = async () => {
//     try {
//       await axios.post(
//         url + "/generate",
//         JSON.stringify({
//           Description: description,
//           Count: count,
//         }),
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         }
//       );
//       setModalIsOpen(false);
//       window.location.reload();
//     } catch (err) {
//       console.error("Failed to generate questions:", err);
//     }
//   };

//   return (
//     <div>
//       <button onClick={openModal} className="open-modal-button">
//         Добавить вопрос
//       </button>
//       <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
//         <div className="modal-content">
//           <div className="left-section">
//             <p>
//               <label className="create-label">Описание:</label>
//               <input
//                 type="text"
//                 name="description"
//                 value={description}
//                 onChange={handleChange}
//                 className="input-field"
//               />
//             </p>
//             <p>
//               <label className="create-label">Количество вопросов:</label>
//               <input
//                 type="number"
//                 name="count"
//                 value={count}
//                 onChange={handleChange}
//                 className="input-field"
//               />
//             </p>
//             <button onClick={generateQuestions} className="generate-button">
//               Сгенерировать вопросы
//             </button>
//           </div>
//           <div className="right-section">
//             <p>
//               <label className="create-label">Текст вопроса:</label>
//               <input
//                 type="text"
//                 name="questionText"
//                 value={questionText}
//                 onChange={handleChange}
//                 className="input-field"
//               />
//             </p>
//             <p>
//               <label className="create-label">Ответ на вопрос:</label>
//               <input
//                 type="text"
//                 name="answerText"
//                 value={answerText}
//                 onChange={handleChange}
//                 className="input-field"
//               />
//             </p>
//             <p>
//               <label className="create-label">Стоимость вопроса:</label>
//               <input
//                 type="number"
//                 name="questionCost"
//                 value={questionCost}
//                 onChange={handleChange}
//                 className="input-field"
//               />
//             </p>
//             <button onClick={handleSave} className="save-button">
//               Сохранить
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default CreateQuestion;

import React, { useState } from "react";
import Modal from "react-modal";
import "./question.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const QUESTIONS_URL = "/api/tests/";

const CreateQuestion = (props) => {
  const [errMsg, setErrMsg] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [questionCost, setQuestionCost] = useState(0);
  const [description, setDescription] = useState("");
  const [count, setCount] = useState(0);
  const { state } = props;
  const testId = state;

  const url = QUESTIONS_URL + testId + "/questions";

  const axios = useAxiosPrivate();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSave = async () => {
    try {
      await axios.post(
        url,
        JSON.stringify({
          answer: answerText,
          questionText: questionText,
          cost: questionCost,
          numberQuestion: 1,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setModalIsOpen(false);
      window.location.reload();
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "questionText") {
      setQuestionText(value);
    } else if (name === "answerText") {
      setAnswerText(value);
    } else if (name === "questionCost") {
      setQuestionCost(parseFloat(value));
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "count") {
      setCount(parseInt(value));
    }
  };

  const generateQuestions = async () => {
    try {
      await axios.post(
        url + "/generate",
        JSON.stringify({
          Description: description,
          Count: count,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setModalIsOpen(false);
      window.location.reload();
    } catch (err) {
      console.error("Failed to generate questions:", err);
    }
  };

  return (
    <div>
      <button onClick={openModal} className="open-modal-button">
        Добавить вопрос
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div className="modal-content-questoin-create">
          <div className="left-section">
            <p>
              <label className="create-label">Описание:</label>
              <textarea
                type="text"
                name="description"
                value={description}
                onChange={handleChange}
                className="input-field-descr"
              />
            </p>
            <p>
              <label className="create-label">Количество вопросов:</label>
              <input
                type="number"
                name="count"
                value={count}
                onChange={handleChange}
                className="input-field"
              />
            </p>
            <button onClick={generateQuestions} className="generate-button">
              Сгенерировать вопросы
            </button>
          </div>
          <div className="right-section">
            <p>
              <label className="create-label">Текст вопроса:</label>
              <input
                type="text"
                name="questionText"
                value={questionText}
                onChange={handleChange}
                className="input-field"
              />
            </p>
            <p>
              <label className="create-label">Ответ на вопрос:</label>
              <input
                type="text"
                name="answerText"
                value={answerText}
                onChange={handleChange}
                className="input-field"
              />
            </p>
            <p>
              <label className="create-label">Стоимость вопроса:</label>
              <input
                type="number"
                name="questionCost"
                value={questionCost}
                onChange={handleChange}
                className="input-field"
              />
            </p>
            <button onClick={handleSave} className="save-button">
              Сохранить
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateQuestion;
