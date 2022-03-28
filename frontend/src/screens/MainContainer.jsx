import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import NotFound from "./NotFound/NotFound";
import Otp from "./Otp/Otp";
import ProtectedRoutes from "./ProtectedRoutes";
import Register from "./Register/Register";
import AddRecord from "./AddRecord/AddRecord";
import StudentList from "./StudentList/StudentList";
import Student from "./Student/Student";
import EditRecord from "./EditRecord/EditRecord";
import AttendanceList from "./AttendanceList/AttendanceList";

const MainContainer = () => {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  useEffect(() => {}, [adminLogin]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoutes data={adminInfo}>
            <Home />
          </ProtectedRoutes>
        }
      />
       <Route
        path="/addrecord"
        element={
          <ProtectedRoutes data={adminInfo}>
            <AddRecord />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/studentlist"
        element={
          <ProtectedRoutes data={adminInfo}>
            <StudentList />
          </ProtectedRoutes>
        }
      />
       <Route
        path="/student/:id"
        element={
          <ProtectedRoutes data={adminInfo}>
            <Student />
          </ProtectedRoutes>
        }
      />
       <Route
        path="/editrecord/:id"
        element={
          <ProtectedRoutes data={adminInfo}>
            <EditRecord />
          </ProtectedRoutes>
        }
      />
       <Route
        path="/attendance"
        element={
          <ProtectedRoutes data={adminInfo}>
            <AttendanceList />
          </ProtectedRoutes>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/notfound" element={<NotFound />} />
      <Route path="*" exact={true} element={<Navigate to={"/notfound"} />} />
    </Routes>
  );
};

export default MainContainer;
