import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    console.log("Logging in");

    // let response = false;

    // await fetch("http://localhost:4000/api/user/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password }),
    // })
    //   .then(async (response) => await response.json())
    //   .then((json) => {
    //     localStorage.setItem("user", JSON.stringify(json));

    //     // update the authContext
    //     dispatch({ type: "LOGIN", payload: json });

    //     setIsLoading(false);

    //     response = true;
    //   })
    //   .catch((error) => {
    //     setIsLoading(false);
    //     setError(error.message);

    //     response = false;
    //   });

    // return response;

    let flag = false;

    const response = await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    console.log(json);

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the authContext
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);

      flag = true;
    }

    return flag;
  };

  return { login, isLoading, error };
};
