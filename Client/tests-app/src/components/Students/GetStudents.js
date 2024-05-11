// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import { Navigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

// const url = "/api/tests/";

// const GetStudent = () => {
//   const [students, setStudents] = useState([]);
//   const [errMsg, setErrMsg] = useState("");
//   const axios = useAxiosPrivate();
//   const { testId } = useParams();

//   //console.log(test);

//   useEffect(() => {
//     const getStudents = async () => {
//       //console.log(url + testId + "/students");
//       try {
//         const response = await axios.get(url + testId + "/students");
//         console.log(response.data);
//         setStudents(response.data);
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

//     getStudents();
//   }, []);

//   const handleDetails = (studentId) => {
//     const location = useLocation();
//     return (
//       <Navigate
//         to={`/test/${testId}/student/${studentId}/answers`}
//         state={{ from: location }}
//         replace
//       />
//     );
//   };

//   return (
//     <>
//       <div>
//         {errMsg && <p>{errMsg}</p>}
//         <div>
//           {students.map((student, index) => (
//             <div key={index} className="student-card">
//               <h3>{student.name}</h3>
//               <p>Start Time: {student.startTime}</p>
//               <p>End Time: {student.endTime}</p>
//               <button onClick={() => handleDetails(student)}>Подробнее</button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default GetStudent;
// //<button onClick={() => handleDetails(student)}>Подробнее</button>

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

const url = "/api/tests/";

const GetStudents = () => {
  const [students, setStudents] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const axios = useAxiosPrivate();
  const { testId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getStudents = async () => {
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
  }, [axios, testId]);

  const handleDetails = (studentId) => {
    // Replace the line below with your logic for navigating to the student details page
    navigate(`/test/${testId}/student/${studentId}/answers`);
  };

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
              <button onClick={() => handleDetails(student.id)}>
                Подробнее
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GetStudents;
