import React from "react";
import { Route, Navigate } from "react-router-dom";
function ProtectedRoutes({ children, data, ...rest }) {
  return data ? children : <Navigate to="/login" />
  
  
}

export default ProtectedRoutes;
