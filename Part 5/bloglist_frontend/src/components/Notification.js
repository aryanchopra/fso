import React from "react";

const Notification = ({ notificationmsg }) => {
  if (!notificationmsg) {
    return null;
  } else return <div>{notificationmsg}</div>;
};
export default Notification;
