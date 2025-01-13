import { useContext } from "react";
import NotificationContext from "./NotificationContext";

const Notification = () => {
  // I tell the component i need the NotificationContext, to manage the state of the Notification
  const [notification] = useContext(NotificationContext);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (notification === "") return null;

  return <div style={style}>{notification}</div>;
};

export default Notification;
