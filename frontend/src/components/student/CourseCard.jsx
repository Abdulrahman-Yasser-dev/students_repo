import React from "react";
import { Card, Button, Badge, ProgressBar } from "react-bootstrap";
import { Calendar, Clock, MapPin, Star, Users } from "lucide-react";

const CourseCard = ({ course, onRegister }) => {
  const seatPercentage = ((course.totalSeats - course.availableSeats) / course.totalSeats) * 100;
  const isPopular = course.availableSeats <= 5;
  const hasDiscount = course.originalPrice && course.originalPrice > course.price;

  return (
    <Card
      className="mb-4 shadow border-0 hover-shadow-lg transition position-relative "
      dir="rtl"
      style={{ borderRadius: "0.75rem", overflow: "hidden" }}
    >
      {/* الشارات العلوية */}
      {isPopular && (
        <Badge
          bg="warning"
          className="position-absolute top-0 end-0 m-2 text-dark"
        >
          مقاعد محدودة
        </Badge>
      )}
      {hasDiscount && (
        <Badge
          bg="danger"
          className="position-absolute top-0 start-0 m-2"
        >
          خصم {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}%
        </Badge>
      )}

      {/* الصورة */}
      <div style={{ height: "230px", overflow: "hidden" }}>
        <Card.Img
          variant="top"
          src={course.image}
          alt={course.title}
          className="object-fit-cover w-100 h-100"
        />
      </div>

      {/* محتوى الكارت */}
      <Card.Body className="bg-light text-dark d-flex flex-column justify-content-between">
        <div>
          {/* العنوان + التقييم */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Card.Title className="fw-bold fs-5 text-dark mb-0">
              {course.title}
            </Card.Title>
          </div>

          <Card.Text className="text-muted small mb-3">
            {course.description}
          </Card.Text>

          {/* تفاصيل الدورة */}
          <div className="d-flex flex-column gap-1 text-muted small">
            <div className="d-flex align-items-center gap-2">
              <Users size={16} />
              <span>المدرب: {course.instructor}</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <MapPin size={16} />
              <span>{course.location}</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Clock size={16} />
              <span>{course.duration}</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Calendar size={16} />
              <span>{course.start_at} - {course.end_at}</span>
            </div>
          </div>

          {/* المقاعد */}
          <div className="mt-3">
            <div className="d-flex justify-content-between small text-muted mb-1">
              <span>المقاعد المتبقية</span>
              <span className={course.availableSeats <= 5 ? 'text-danger fw-bold' : 'text-success'}>
                {course.availableSeats} من {course.totalSeats}
              </span>
            </div>
            <ProgressBar
              now={seatPercentage}
              variant={
                seatPercentage >= 80 ? "danger" :
                seatPercentage >= 60 ? "warning" :
                "success"
              }
              style={{ height: "6px", borderRadius: "999px" }}
            />
          </div>
        </div>

        {/* السعر والزرار */}
        <div className="d-flex justify-content-between align-items-end mt-4">
          <div>
            {hasDiscount && (
              <div className="text-muted small text-decoration-line-through">
                ${course.originalPrice}
              </div>
            )}
            <div className="text-primary fs-4 fw-bold">
              SAR{course.price}
            </div>
          </div>

          <Button
            variant="primary"
            onClick={() => onRegister(course.id)}
            className="fw-semibold px-4"
            disabled={course.availableSeats === 0}
          >
            {course.availableSeats === 0 ? "مكتملة" : "احجز الآن"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
