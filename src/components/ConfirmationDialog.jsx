import React from "react";
import "../style/conformation.css";

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <>
      <div className="overlay">
        <div className="confirmation-dialog">
          <p>{message}</p>
          <button className="yes" onClick={onConfirm}>
            نعم
          </button>
          <button className="no" onClick={onCancel}>
            لا
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmationDialog;
