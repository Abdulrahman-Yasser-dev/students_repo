import React from "react";
import { Volume2 } from "lucide-react";
import "../styles/AnimatedBanner.css";

const AnimatedBanner = () => {
  return (
    <>
      {/* Animated Bootstrap Banner */}
      <div
        className="position-relative overflow-hidden py-2"
        style={{
          background: "linear-gradient(90deg, #f0c040, #0070f3, #f0c040)",
          backgroundSize: "200% 100%",
          animation: "gradientMove 6s ease-in-out infinite",
          color: "#fff",
          fontWeight: 600,
          fontSize: "0.95rem",
        }}
      >
        <div className="container text-center">
          <div
            className="d-inline-block whitespace-nowrap"
            style={{
              animation: "marqueeScroll 20s linear infinite",
              whiteSpace: "nowrap",
            }}
          >
            🎉 عرض خاص: خصم 30% على جميع الدورات حتى نهاية الشهر - سجل الآن
            واحصل على شهادة معتمدة مجاناً! 🎉
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimatedBanner;
