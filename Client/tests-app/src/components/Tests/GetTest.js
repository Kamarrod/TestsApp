import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const TESTS_URL = "/api/tests";

const GetTest = async (testId) => {
  const axios = useAxiosPrivate();
  const test = null;

  const url = TESTS_URL + "/" + testId;
  try {
    const response = await axios.get(url, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching test:", err);
    return null;
  }
};

export default GetTest;
