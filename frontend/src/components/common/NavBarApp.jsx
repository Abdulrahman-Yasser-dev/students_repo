import React from "react";
import { Container, Image, Navbar, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NavbarApp = () => {
  const navigate = useNavigate();

  return (
    <Navbar
      expand="lg"
      className="shadow-sm py-3"
      dir="rtl"
      style={{
        backgroundColor: "#003366",
        borderBottom: "2px solid #f0c040",
      }}
    >
      <Container
        className="d-flex align-items-center justify-content-between"
        style={{ position: "relative" }}
      >
        {/* زر الرجوع للصفحة الرئيسية */}
        <Button
          style={{
            backgroundColor: "#ffffff",
            color: "#003366",
            border: "1px solid black",
            fontWeight: "bold",
            padding: "6px 16px",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease-in-out",
            zIndex: 2,
          }}
          onClick={() => navigate("/")}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#f0c040";
            e.target.style.color = "#003366";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#ffffff";
            e.target.style.color = "#003366";
          }}
        >
          الرئيسية
        </Button>

        {/* اللوجو في المنتصف فعليًا */}
        <div className="flex-grow-1 text-center">
          <Navbar.Brand className="fw-bold fs-4 text-white m-0">
            <Image src="/logo.PNG" height="50" width="80" alt="لوجو" />
          </Navbar.Brand>
        </div>

        {/* عنصر فارغ يعادل الزر من الجهة اليسرى ليحافظ على تمركز اللوجو */}
        <div style={{ width: "113px" }} /> {/* نفس عرض الزر تقريبًا */}
      </Container>
    </Navbar>
  );
};

export default NavbarApp;
