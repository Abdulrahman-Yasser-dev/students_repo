import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Badge,
} from "react-bootstrap";
import NavbarApp from "../components/common/NavBarApp";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState("");
  const [courseType, setCourseType] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/api/courses/${id}`);
        if (!response.ok) throw new Error("حدث خطأ أثناء جلب الدورة");
        const data = await response.json();
        setSelectedCourse(data);
      } catch (error) {
        console.error(error);
        setSelectedCourse(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading)
    return (
      <Container className="py-5 text-center" style={{ minHeight: "60vh" }}>
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">جاري تحميل تفاصيل الدورة...</p>
      </Container>
    );

  if (!selectedCourse)
    return (
      <Container
        className="py-5 text-center text-danger fw-bold"
        style={{ minHeight: "60vh" }}
      >
        <i className="bi bi-exclamation-triangle fs-1 d-block mb-3"></i>
        الدورة غير موجودة
      </Container>
    );

  return (
    <>
      <NavbarApp />
      <Container className="py-5" dir="rtl">
        <h2 className="mb-4 text-center fw-bold text-dark">
          {" "}
          تفاصيل الدورة التدريبية
        </h2>

        <Card
          className="shadow-lg border-0 rounded-4 overflow-hidden mx-auto"
          style={{ maxWidth: "800px" }}
        >
          <Row className="g-0">
            <Col md={5}>
              <Card.Img
                src={`/${selectedCourse.image}`} // يفترض الصورة في مجلد public/images
                alt={selectedCourse.title}
                style={{ height: "100%", objectFit: "cover" }}
              />
            </Col>
            <Col md={7}>
              <Card.Body className="p-4">
                <Card.Title className="fs-4 fw-bold text-primary">
                  {selectedCourse.title}
                </Card.Title>
                <Card.Text
                  className="text-muted mb-3"
                  style={{ lineHeight: "1.8" }}
                >
                  {selectedCourse.description}
                </Card.Text>
                <p className="mb-1">
                  <strong>المدرب:</strong> {selectedCourse.instructor}
                </p>
                <p>
                  <strong>المقاعد المتاحة:</strong>{" "}
                  <Badge
                    bg={
                      selectedCourse.availableSeats < 5 ? "danger" : "success"
                    }
                  >
                    {selectedCourse.availableSeats} مقعد
                  </Badge>
                </p>
              </Card.Body>
            </Col>
          </Row>
        </Card>

        <hr className="my-5" />

        <h4 className="text-center mb-4 text-dark">👤 اختر نوع التسجيل</h4>
        <Row className="g-4 justify-content-center">
          {["طالب", "طالبة"].map((type) => (
            <Col xs={6} md={4} key={type}>
              <div
                className={`p-3 rounded-3 shadow-sm text-center fw-semibold border border-secondary-subtle ${
                  userType === type ? "bg-warning text-dark" : "bg-white"
                }`}
                style={{ cursor: "pointer", transition: "0.3s" }}
                onClick={() => setUserType(type)}
              >
                {type === "طالب" ? "👨‍🎓 طلاب" : "👩‍🎓 طالبات"}
              </div>
            </Col>
          ))}
        </Row>

        {userType && (
          <>
            <h5 className="text-center mt-5 mb-4 text-dark">
              🌐 اختر طريقة الدراسة
            </h5>
            <Row className="g-4 justify-content-center">
              {["حضوري", "أونلاين"].map((type) => (
                <Col xs={6} md={4} key={type}>
                  <div
                    className={`p-3 rounded-3 shadow-sm text-center fw-semibold border border-secondary-subtle ${
                      courseType === type ? "bg-warning text-dark" : "bg-white"
                    }`}
                    style={{ cursor: "pointer", transition: "0.3s" }}
                    onClick={() => setCourseType(type)}
                  >
                    {type === "حضوري"
                      ? userType === "طالب"
                        ? "📍 الظهران (حضوري)"
                        : "📍 القطيف (حضوري)"
                      : "💻 عن بعد (أونلاين)"}
                  </div>
                </Col>
              ))}
            </Row>
          </>
        )}

        <div className="text-center mt-5">
          <Button
            variant="primary"
            size="lg"
            className="px-5 py-2 rounded-pill fw-bold shadow-sm"
            disabled={!(userType && courseType)}
            onClick={() =>
              navigate("/register", {
                state: {
                  course: selectedCourse,
                  userType,
                  courseType,
                },
              })
            }
          >
            سجل الآن
          </Button>
        </div>
      </Container>
    </>
  );
};

export default CourseDetails;
