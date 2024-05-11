import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const url = "/api/tests/";

const GetStudent = () => {
  const [students, setStudents] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const axios = useAxiosPrivate();
  const { testId } = useParams();

  //console.log(test);

  useEffect(() => {
    const getStudents = async () => {
      console.log(url + testId + "/students");
      try {
        const response = await axios.get(url + testId + "/students");
        console.log(response.data);
        setStudents(response.data);
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

    getStudents();
  }, []);

  return (
    <>
      <div>
        {errMsg && <p>{errMsg}</p>}
        <div>
          {students.map((student, index) => (
            <div key={index} className="student-card">
              <h3>{student.name}</h3>
              <p>Start Time: {student.startTime}</p>
              <p>End Time: {student.endTime}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GetStudent;
//<button onClick={() => handleDetails(student)}>Подробнее</button>
