import React from "react";

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-dialog">
      <p>{message}</p>
      <button onClick={onConfirm}>نعم</button>
      <button onClick={onCancel}>لا</button>
    </div>
  );
};

export default ConfirmationDialog;
