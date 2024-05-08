import { useState, useEffect } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import GetQuestionsToAuthor from "./GetQuestionsToAuthor";
import GetQuestionsToStudent from "./GetQuestionToStudent";

const TESTS_URL = "/api/tests";

const GetQuestions = () => {
  const axios = useAxiosPrivate();
  const [test, setTest] = useState();
  const { testId } = useParams();
  const { auth } = useAuth();
  const [errMsg, setErrMsg] = useState("");

  const url = TESTS_URL + "/" + testId;
  //console.log(url);

  useEffect(() => {
    //console.log(testId);
    const fetchTest = async () => {
      try {
        const response = await axios.get(url, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setTest(response.data);
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

    fetchTest();
  }, []);

  if (!test) {
    return <div>Loading...</div>;
  }

  if (test.authorId === auth.id) {
    return <GetQuestionsToAuthor state={test} />;
  } else {
    return <GetQuestionsToStudent state={test} />;
  }
};

export default GetQuestions;

// import { Navigate, useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import React from "react";
// import useAuth from "../../hooks/useAuth";
// import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import GetQuestionsToAuthor from "./GetQuestionsToAuthor";
// import GetQuestionsToStudent from "./GetQuestionToStudent";

// const TESTS_URL = "/api/tests";

// const GetQuestions = () => {
//   const axios = useAxiosPrivate();
//   const [test, setTest] = useState(null);
//   const { testId } = useParams();
//   const { auth } = useAuth();
//   const [errMsg, setErrMsg] = useState("");
//   const url = TESTS_URL + "/" + testId;
//   console.log("Start");
//   //useEffect(() => {
//   //console.log("UseEffect");
//   const fetchTest = async () => {
//     try {
//       const response = await axios.get(url, {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       });
//       setTest(response.data);
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

//   fetchTest();
//   //}, [testId]);
//   console.log("test");
//   console.log(test);

//   if (test.AuthorId === auth.id) {
//     return <GetQuestionsToAuthor state={test} />;
//   } else {
//     return <GetQuestionsToStudent state={test} />;
//   }
// };

// export default GetQuestions;
