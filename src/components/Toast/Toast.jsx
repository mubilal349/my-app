import React, { useEffect } from "react";
import "./Toast.css";

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    // Automatically hide after 3 seconds
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-container">
      <div className="toast-message">{message}</div>
    </div>
  );
};

export default Toast;
