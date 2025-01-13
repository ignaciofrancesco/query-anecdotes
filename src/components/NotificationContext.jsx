import { createContext, useReducer } from "react";

// Manages the changes in the state of the Notification
const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "UNSET":
      return "";
    default:
      return state;
  }
};

/* CREATE THE CONTEXT */

// Create a context for the Notification --> this is going to be used with useContext(), in the component that needs it
const NotificationContext = createContext();

/* CREATE THE PROVIDER */

// Create and export a context provider Component (it's a react component, that's why it's capitalized)
// --> this will wrap up the necessary components
export const NotificationContextProvider = (props) => {
  // Define the state using useReducer
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
