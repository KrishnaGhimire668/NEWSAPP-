import { createContext, useReducer, useEffect } from "react";

export const UserContext = createContext();

const initialState = {
  isLoggedIn: false,
  newsList: [], // added global news state
};

const reducer = (state, action) => {
  switch (action.type) {
    case "USER":
      return { ...state, isLoggedIn: action.payload };
    case "SET_NEWS":
      return { ...state, newsList: action.payload };
    case "ADD_NEWS":
      return { ...state, newsList: [action.payload, ...state.newsList] };
    case "UPDATE_NEWS":
      return {
        ...state,
        newsList: state.newsList.map((n) =>
          n._id === action.payload._id ? action.payload : n
        ),
      };
    case "DELETE_NEWS":
      return {
        ...state,
        newsList: state.newsList.filter((n) => n._id !== action.payload),
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("/api/auth/check", { credentials: "include" });
        if (res.status === 200) {
          dispatch({ type: "USER", payload: true });
        } else {
          dispatch({ type: "USER", payload: false });
        }
      } catch (err) {
        dispatch({ type: "USER", payload: false });
      }
    };

    checkUser();
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
