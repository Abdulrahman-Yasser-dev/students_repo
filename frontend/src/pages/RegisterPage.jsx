import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarApp from "../components/common/NavBarApp";

function StudentInfo({ setStudent }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email] = useState("mansuor1396@gmail.com");
  const [code, setCode] = useState(["", "", "", ""]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [verifying, setVerifying] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const phoneRef = useRef(null);
  const codeRef = useRef(null);
  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const codeInputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const { course, userType, courseType } = location.state || {};

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setStep(2);
      setTimeout(
        () => phoneRef.current?.scrollIntoView({ behavior: "smooth" }),
        100
      );
    }
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://api.alamthal.org/api/email/send-code", {
        email,
        name,
      });
      setStep(3);
      setTimeout(
        () => codeRef.current?.scrollIntoView({ behavior: "smooth" }),
        100
      );
    } catch (err) {
      console.error(err);
      setMessage("❌ فشل إرسال رمز التحقق على الإيميل.");
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");
    if (pastedData.length === 4) setCode(pastedData.split(""));
  };

  // const handleVerifyCode = async (e) => {
  //   if (e) e.preventDefault();
  //   setVerifying(true);
  //   try {
  //     await axios.post("https://api.alamthal.org/api/email/verify-code", {
  //       email,
  //       code: code.join(""),
  //     });
  //     setStudent({ name, phone, email });
  //     navigate("/register", {
  //       state: { student: { name, phone, email } },
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     setMessage("❌ رمز التحقق غير صحيح أو منتهي الصلاحية.");
  //     setIsSubmitted(false);
  //   } finally {
  //     setVerifying(false);
  //   }
  // };

  const handleVerifyCode = async (e) => {
    if (e) e.preventDefault();
    setVerifying(true);

    // الكود الثابت للتجربة فقط
    const enteredCode = code.join("");
    const testCode = "0000";

    try {
      if (enteredCode === testCode) {
        // تخطي API والتحقق الوهمي
        setStudent({ name, phone, email });
        navigate("/register/form", {
          state: {
            student: { name, phone, email },
            course,
            userType,
            courseType,
          },
        });
      } else {
        // simulate failure
        throw new Error("Invalid test code");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ رمز التحقق غير صحيح.");
      setIsSubmitted(false);
    } finally {
      setVerifying(false);
    }
  };

  const handleCodeInput = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    let newCode = [...code];
    if (value.length > 1) {
      const values = value.slice(0, 4).split("");
      values.forEach((val, idx) => {
        if (index + idx < 4) newCode[index + idx] = val;
      });
    } else {
      newCode[index] = value;
      if (value && index < 3) e.target.nextSibling?.focus();
    }
    setCode(newCode);
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace") {
      const newCode = [...code];
      if (code[index]) {
        newCode[index] = "";
      } else if (index > 0) {
        newCode[index - 1] = "";
        e.target.previousSibling?.focus();
      }
      setCode(newCode);
    }
  };

  const convertArabicToEnglishNumbers = (input) => {
    return input.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (code.length === 4 && code.every((c) => c !== "") && !isSubmitted) {
      setIsSubmitted(true);
      handleVerifyCode();
    }
  }, [code]);

  // التركيز التلقائي عند كل خطوة عند الانتقال
  useEffect(() => {
    if (step === 1) {
      nameInputRef.current?.focus();
    } else if (step === 2) {
      phoneInputRef.current?.focus();
    } else if (step === 3) {
      codeInputRefs[0].current?.focus();
    }
  }, [step]);

  // التركيز التلقائي لو المستخدم نزل يدويًا للقسم
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && step === 2) {
          phoneInputRef.current?.focus();
        }
      },
      { threshold: 0.6 }
    );

    if (phoneRef.current) observer.observe(phoneRef.current);

    return () => {
      if (phoneRef.current) observer.unobserve(phoneRef.current);
    };
  }, [step]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && step === 3) {
          codeInputRefs[0].current?.focus();
        }
      },
      { threshold: 0.6 }
    );

    if (codeRef.current) observer.observe(codeRef.current);

    return () => {
      if (codeRef.current) observer.unobserve(codeRef.current);
    };
  }, [step]);

  const inputStyle = {
    border: "2px solid #ccc",
    borderRadius: "12px",
    backgroundColor: "#f9f9f9",
    color: "#000",
    outline: "none",
    boxShadow: "none",
  };

  const inputFocusStyle = {
    outline: "none",
    borderColor: "#aaa",
    boxShadow: "none",
  };

  return (
    <>
      <NavbarApp />
      <div className="text-center text-dark" style={{ fontFamily: "Tajawal" }}>
        {/* Step 1 */}
        <section className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-white p-4">
          <form
            onSubmit={handleNameSubmit}
            className="w-100 border p-4 rounded-4 shadow-sm"
            style={{ maxWidth: "500px", background: "#f8f9fa" }}
          >
            <h2 className="mb-4 fs-3 text-black fw-bold">
              يسعدني وجودك! 🙋‍♂️ شرفني باسمك؟
            </h2>
            <input
              type="text"
              ref={nameInputRef}
              className="form-control text-center fs-5 mb-3"
              placeholder="ممكن كتابة الاسم بالعربي"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            />
            <button
              type="submit"
              className="btn btn-warning w-100 fs-5 rounded-pill shadow"
            >
              نكمل! 🚀
            </button>
          </form>
        </section>

        {/* Step 2 */}
        {step >= 2 && (
          <section
            ref={phoneRef}
            className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light p-4"
          >
            <form
              onSubmit={handlePhoneSubmit}
              className="w-100 border p-4 rounded-4 shadow-sm"
              style={{ maxWidth: "500px", background: "#fff" }}
            >
              <h2 className="mb-4 fs-3 fw-bold text-dark">
                حياك الله، {name} 🌷، رقم الواتساب لإرسال كود الدخول:
              </h2>
              <input
                type="tel"
                ref={phoneInputRef}
                className="form-control text-center fs-5 mb-3"
                placeholder="05xxxxxxxx"
                value={phone}
                onChange={(e) =>
                  setPhone(convertArabicToEnglishNumbers(e.target.value))
                }
                pattern="05\d{8}"
                title="رقم الجوال يبدأ بـ 05 ويتكون من 10 أرقام"
                required
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
              <button
                type="submit"
                className="btn btn-warning w-100 fs-5 rounded-pill shadow"
              >
                إرسال الكود 🔐
              </button>
              {message && (
                <div className="text-danger mt-3 fw-bold">{message}</div>
              )}
            </form>
          </section>
        )}

        {/* Step 3 */}
        {step >= 3 && (
          <section
            ref={codeRef}
            className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-white p-4"
          >
            <form
              onSubmit={handleVerifyCode}
              className="w-100 border p-4 rounded-4 shadow-sm"
              style={{ maxWidth: "500px", background: "#f8f9fa" }}
            >
              <h2 className="mb-4 fs-4 text-dark fw-bold">
                أدخل الكود اللي وصلك على الواتساب 💬
              </h2>
              <div
                className="d-flex justify-content-center gap-3 mb-4"
                dir="ltr"
              >
                {code.map((num, index) => (
                  <input
                    key={index}
                    ref={codeInputRefs[index]}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    className="form-control text-center fs-4 fw-bold"
                    style={{
                      width: "60px",
                      height: "60px",
                      border: "2px solid #ccc",
                      borderRadius: "15px",
                      backgroundColor: "#fff",
                      color: "#000",
                      outline: "none",
                      boxShadow: "none",
                    }}
                    onChange={(e) => handleCodeInput(e, index)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                    onPaste={handlePaste}
                    value={num}
                  />
                ))}
              </div>
              {message && (
                <div className="text-danger mb-3 fw-bold">{message}</div>
              )}
              <button
                type="submit"
                className="btn btn-warning w-100 fs-5 rounded-pill shadow"
                disabled={verifying}
              >
                {verifying ? "⏳ جاري التحقق..." : "انطلق للاختبار 🚀"}
              </button>
            </form>
          </section>
        )}
      </div>
    </>
  );
}

export default StudentInfo;
