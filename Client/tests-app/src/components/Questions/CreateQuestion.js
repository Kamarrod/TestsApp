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
    // Здесь вы можете отправить данные на сервер
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

    // Пример отправки данных на сервер
    // const response = await axios
    //   .post({})
    //   .then((response) => {
    //     setQuestionText("");
    //     setAnswerText("");
    //     setQuestionCost(0);
    //     setModalIsOpen(false);
    //   })
    //   .catch((error) => {
    //     // Обработка ошибки
    //     console.error("Ошибка отправки данных на сервер:", error);
    //   });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "questionText") {
      setQuestionText(value);
    } else if (name === "answerText") {
      setAnswerText(value);
    } else if (name === "questionCost") {
      setQuestionCost(parseFloat(value));
    }
  };

  const modalContent = (
    <div>
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
      <button onClick={openModal}>Открыть модальное окно</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default CreateQuestion;
