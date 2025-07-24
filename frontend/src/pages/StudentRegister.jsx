import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Card,
} from "react-bootstrap";
import {
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import NavbarApp from "../components/common/NavBarApp";

export function StudentRegister() {
  const location = useLocation();
  const navigate = useNavigate();
  const { student, userType, courseType, course } = location.state || {};
  const [formData, setFormData] = useState({
    city: "",
    birthDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullData = {
      ...student,
      ...formData,
      userType,
      courseType,
      courseId: course?.id,
    };

    console.log("تم التسجيل:", fullData);

    navigate("/Questions", { state: fullData });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!student) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="w-100 max-w-md p-4 shadow">
          <Alert variant="danger" className="text-end">
            <AlertCircle size={16} className="ms-2" />
            لا توجد بيانات، أعد المحاولة من البداية
          </Alert>
        </Card>
      </Container>
    );
  }

  return (
    <>
      <NavbarApp />
      <Container className="py-5">
        <style>{`
          input:focus {
            box-shadow: none !important;
            outline: none !important;
            border-color: #ced4da !important;
          }
        `}</style>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="text-center mb-4">
              <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle p-3 mb-3">
                <User size={32} className="text-primary" />
              </div>
              <h1 className="h3 fw-bold">إكمال بيانات التسجيل</h1>
              <p className="text-muted">
                قم بإكمال بياناتك الشخصية لإتمام عملية التسجيل في الدورة
              </p>
            </div>

            <Card className="shadow border-0 p-4">
              <h5 className="text-end mb-3">بياناتك الشخصية</h5>
              <p className="text-end text-muted">
                يرجى مراجعة المعلومات وإكمال البيانات المطلوبة
              </p>

              <Form onSubmit={handleSubmit} dir="rtl">
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Label className="text-end w-100">
                      <span className="ms-2">الاسم الكامل</span>
                      <User size={16} />
                    </Form.Label>
                    <Form.Control
                      type="text"
                      readOnly
                      value={student.name}
                      className="text-end bg-light"
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Label className="text-end w-100">
                      <span className="ms-2">رقم الجوال</span>
                      <Phone size={16} />
                    </Form.Label>
                    <Form.Control
                      type="text"
                      readOnly
                      value={student.phone}
                      className="text-end bg-light"
                    />
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="text-end w-100">
                    <span className="ms-2">البريد الإلكتروني</span>
                    <Mail size={16} />
                  </Form.Label>
                  <Form.Control
                    type="email"
                    readOnly
                    value={student.email}
                    className="text-end bg-light"
                  />
                </Form.Group>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Label className="text-end w-100">
                      <span className="ms-2">المدينة *</span>
                      <MapPin size={16} />
                    </Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="مثال: الرياض"
                      className="text-end"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Label className="text-end w-100">
                      <span className="ms-2">تاريخ الميلاد *</span>
                      <Calendar size={16} />
                    </Form.Label>
                    <Form.Control
                      type="date"
                      required
                      className="text-end"
                      value={formData.birthDate}
                      onChange={(e) =>
                        handleInputChange("birthDate", e.target.value)
                      }
                    />
                  </Col>
                </Row>

                <Alert variant="primary" className="text-end">
                  <CheckCircle size={16} className="ms-2" />
                  سيتم حفظ بياناتك بشكل آمن ولن نشاركها مع أي جهة خارجية
                </Alert>

                <Button
                  type="submit"
                  className="w-100 py-2 fs-5 fw-semibold bg-primary text-white"
                  disabled={!formData.city || !formData.birthDate}
                >
                  حفظ البيانات ومتابعة التسجيل 🚀
                </Button>
              </Form>

              <div className="text-center mt-4">
                <p className="text-muted">
                  بالضغط على "حفظ البيانات" فإنك توافق على{" "}
                  <span className="text-primary ms-1">شروط الاستخدام </span> و
                  <span className="text-primary ms-1">سياسة الخصوصية</span>
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default StudentRegister;
