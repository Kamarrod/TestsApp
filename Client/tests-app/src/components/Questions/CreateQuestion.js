// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
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

//   //const location = useLocation();
//   const { state } = props;
//   console.log(state);
//   const testId = state;

//   const url = QUESTIONS_URL + testId + "/questions";

//   const axios = useAxiosPrivate();

//   const openModal = () => {
//     setModalIsOpen(true);
//   };

//   const closeModal = async () => {
//     const questionData = {
//       questionText: questionText,
//       answerText: answerText,
//       questionCost: questionCost,
//     };

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
//     } catch (err) {
//       if (!err.response) {
//         setErrMsg("No Server Response");
//       } else if (err.response.status === 401) {
//         setErrMsg("Unauthorized");
//       } else {
//         setErrMsg("Failed");
//       }
//     }

//     setModalIsOpen(false);
//     window.location.reload();
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     if (name === "questionText") {
//       setQuestionText(value);
//     } else if (name === "answerText") {
//       setAnswerText(value);
//     } else if (name === "questionCost") {
//       setQuestionCost(parseFloat(value));
//     }
//   };

//   const modalContent = (
//     <div>
//       <p>
//         <label className="create-label">Текст вопроса:</label>
//         <input
//           type="text"
//           name="questionText"
//           value={questionText}
//           onChange={handleChange}
//         />
//       </p>
//       <p>
//         <label className="create-label">Ответ на вопрос:</label>
//         <input
//           type="text"
//           name="answerText"
//           value={answerText}
//           onChange={handleChange}
//         />
//       </p>
//       <p>
//         <label className="create-label">Стоимость вопроса:</label>
//         <input
//           type="number"
//           name="questionCost"
//           value={questionCost}
//           onChange={handleChange}
//         />
//       </p>
//       <button onClick={closeModal}>Сохранить</button>
//     </div>
//   );

//   return (
//     <div>
//       <button onClick={openModal}>Добавить вопрос</button>
//       <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
//         {modalContent}
//       </Modal>
//     </div>
//   );
// };

// export default CreateQuestion;
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
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

  //const location = useLocation();
  const { state } = props;
  //console.log(state);
  const testId = state;

  const url = QUESTIONS_URL + testId + "/questions";

  const axios = useAxiosPrivate();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = async () => {
    const questionData = {
      questionText: questionText,
      answerText: answerText,
      questionCost: questionCost,
    };

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
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Failed");
      }
    }

    setModalIsOpen(false);
    window.location.reload();
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
    console.log(description);
    console.log(count);
    try {
      const generatedQuestions = await axios.post(
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
      console.log(generatedQuestions.data);
    } catch (err) {
      console.error("Failed to generate questions:", err);
    }
  };

  const modalContent = (
    <div>
      <p>
        <label className="create-label">Описание:</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={handleChange}
        />
      </p>
      <p>
        <label className="create-label">Количество вопросов:</label>
        <input
          type="number"
          name="count"
          value={count}
          onChange={handleChange}
        />
      </p>
      <p>
        <label className="create-label">Текст вопроса:</label>
        <input
          type="text"
          name="questionText"
          value={questionText}
          onChange={handleChange}
        />
      </p>
      <p>
        <label className="create-label">Ответ на вопрос:</label>
        <input
          type="text"
          name="answerText"
          value={answerText}
          onChange={handleChange}
        />
      </p>
      <p>
        <label className="create-label">Стоимость вопроса:</label>
        <input
          type="number"
          name="questionCost"
          value={questionCost}
          onChange={handleChange}
        />
      </p>
      <button onClick={closeModal}>Сохранить</button>
    </div>
  );

  return (
    <div>
      <button onClick={openModal}>Добавить вопрос</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        {modalContent}
        <button onClick={generateQuestions}>Сгенерировать вопросы</button>
      </Modal>
    </div>
  );
};

export default CreateQuestion;
