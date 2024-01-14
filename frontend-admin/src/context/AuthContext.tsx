import React, { useEffect, useState } from "react";
import { createContext, useReducer } from "react";

export interface User {
  email: string;
  token: string;
}

interface InitialStateType {
  user: User;
  loading: boolean;
}

const initialState = {
  user: { email: "", token: "" },
  loading: true,
};

export const AuthContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const authReducer = (state: typeof initialState, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload, loading: false };
    case "LOGOUT":
      return { user: null, loading: false };
    default:
      return state;
  }
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user.token != "") {
      dispatch({ type: "LOGIN", payload: user });
    } else {
      dispatch({ type: "LOGOUT" });
    }

    setLoading(false);
  }, []);

  console.log("AuthContext state", state);

  if (loading) {
    return <div></div>;
  }

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
