import React from "react";
import { useSelector } from "react-redux";
const Notification = () => {
  const notificationmsg = useSelector((state) => state.notification);
  if (!notificationmsg) {
    return null;
  } else return <div>{notificationmsg}</div>;
};
export default Notification;
