import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CourseDetails from "./pages/CourseDetails";
import StudentInfo from "./pages/RegisterPage";
import StudentRegister from "./pages/StudentRegister";

function App() {
  const [student, setStudent] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route
          path="/register"
          element={<StudentInfo setStudent={setStudent}></StudentInfo>}
        />
        <Route path="/register/form" element={<StudentRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
