import React, { useRef, useState } from "react";
//import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

const CREATETEST_URL = "/api/tests";

const TestCreation = () => {
  //const { auth } = useAuth();

  const axios = useAxiosPrivate();

  const navigate = useNavigate();
  const nameRef = useRef();
  const createTimeRef = useRef();
  const closeTimeRef = useRef();
  const haveTimeLimitRef = useRef();
  const timeLimitRef = useRef();

  const [name, setName] = useState("");
  const [createTime, setCreateTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [haveTimeLimit, setHaveTimeLimit] = useState(false);
  const [timeLimit, setTimeLimit] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    //const closeTimeUtc = closeTime
    const createTimeUtc =
      new Date(createTime).toISOString().split(".")[0] + "Z";
    const closeTimeUtc = new Date(closeTime).toISOString().split(".")[0] + "Z";
    console.log(createTimeUtc);
    console.log(closeTimeUtc);
    //authorId = auth?.id;

    try {
      const response = await axios.post(
        CREATETEST_URL,
        JSON.stringify({
          name,
          createTime: createTimeUtc,
          closeTime: closeTimeUtc,
          haveTimeLimit,
          timeLimit,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      navigate("/tests", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <h1>Create Test</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          ref={nameRef}
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />

        <label htmlFor="createTime">Create Time:</label>
        <input
          type="datetime-local"
          id="createTime"
          ref={createTimeRef}
          onChange={(e) => setCreateTime(e.target.value)}
          value={createTime}
          required
        />

        <label htmlFor="closeTime">Close Time:</label>
        <input
          type="datetime-local"
          id="closeTime"
          ref={closeTimeRef}
          onChange={(e) => setCloseTime(e.target.value)}
          value={closeTime}
          required
        />

        <div>
          <input
            type="checkbox"
            id="haveTimeLimit"
            ref={haveTimeLimitRef}
            onChange={(e) => setHaveTimeLimit(e.target.checked)}
            checked={haveTimeLimit}
          />
          <label htmlFor="haveTimeLimit">Have Time Limit</label>
        </div>

        {haveTimeLimit && (
          <div>
            <label htmlFor="timeLimit">Time Limit:</label>
            <input
              type="text"
              id="timeLimit"
              ref={timeLimitRef}
              onChange={(e) => setTimeLimit(e.target.value)}
              value={timeLimit}
              required
            />
          </div>
        )}

        <button>Create Test</button>
      </form>
    </section>
  );
};

export default TestCreation;
