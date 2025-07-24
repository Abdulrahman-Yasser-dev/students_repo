import React, { useEffect, useState } from "react";
import axios from "axios";
import AppNavbar from "../components/common/NavBarApp";
import AnimatedBanner from "../components/AnimatedBanner";
import CourseCard from "../components/student/CourseCard";
import { Container, Spinner } from "react-bootstrap";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleRegister = (course) => {
    window.location.href = `/course/${course.id}`;
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/courses")
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("فشل في تحميل الكورسات:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <AnimatedBanner />
      <AppNavbar />

      <section id="courses" className="py-5 bg-light" dir="rtl">
        <Container>
          <div className="text-center mb-5">
            <span className="badge rounded-pill text-primary bg-primary bg-opacity-10 px-3 py-2 fw-semibold fs-6 mb-3">
              الدورات المتاحة
            </span>
            <h2 className="fw-bold display-5 text-dark mb-3">
              اختر الدورة المناسبة لك
            </h2>
            <p
              className="text-muted fs-5 mx-auto"
              style={{ maxWidth: "720px" }}
            >
              اختر دورتك وابدأ التعلم معنا الآن!
            </p>
          </div>

          {/* عرض تحميل أثناء جلب البيانات */}
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">جاري تحميل الدورات...</p>
            </div>
          ) : (
            <div className="row g-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch"
                >
                  <CourseCard
                    course={course}
                    onRegister={() => handleRegister(course)}
                  />
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default Home;
