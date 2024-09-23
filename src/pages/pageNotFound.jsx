import React from "react";
import { Link } from "react-router-dom";
import "../style/notFound.css";
import { MdErrorOutline } from "react-icons/md";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>
        <MdErrorOutline />
      </h1>
      <h2>للاسف ، الصفحة غير موجودة !</h2>
      <Link to="/" className="go-home">
        العودة للرئيسية
      </Link>
    </div>
  );
};

export default NotFound;
