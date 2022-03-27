import React from "react";
import {
  CButton,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilArrowLeft } from "@coreui/icons";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">404</h1>
              <h4 className="pt-3">Oops! You{"'"}re lost.</h4>
              <p className="text-medium-emphasis float-start">
                The page you are looking for was not found.
              </p>
            </div>
          </CCol>
        </CRow>
        <CRow className="text-center">
          <CCol>
            <CButton color="info" onClick={()=> navigate("/",{replace:true})}>
              <CIcon className="me-2" icon={cilArrowLeft} />
              Go Back to Home
            </CButton>
          </CCol>{" "}
        </CRow>
      </CContainer>
    </div>
  );
};

export default NotFound;
