import { IoIosLogOut } from "react-icons/io";
import "../style/header.css";
function Header() {
  return (
    <>
      <div className="header_content">
        <div className="container">
          <div className="logo">
            <img
              className="logo_img"
              src="/images/الجامعة1.jpeg"
              alt="جامعة الأزهر"
            />
            <p>جامعة الأزهر</p>
          </div>
          <div className="logo">
            <img
              className="logo_img"
              src="/images/الكلية.jpeg"
              alt="كلية الدراسات الإسلامية والعربية بنين بدمياط الجديدة"
            />
            <p>
              كلية الدراسات الاإسلامية والعربية <br /> بنين بدمياط الجديدة
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
