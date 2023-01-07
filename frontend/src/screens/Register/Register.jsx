import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "react-dotenv";
import { register } from "../../redux/actions/adminActions";
import { useLocation, useNavigate } from "react-router-dom";
import { ADMIN_SET_OTPDATA } from "../../redux/constants/adminConstants";

const Register = ( ) => {
  let location = useLocation();
  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState(  "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const adminRegister = useSelector((state) => state.adminRegister);
  const { loading, error, registerInfo } = adminRegister;

  useEffect(() => {
    if(registerInfo){
      dispatch({type:ADMIN_SET_OTPDATA,payload:{email}})
      navigate("/login")
    }
  }, [registerInfo]);

  const submitHandler = (e) => {
    setMessage("");

    e.preventDefault();
    if(name === "" || email === "" || password === "" || confirmPassword === ""){
      alert("Fields can not be empty")
    }else{
      if (password !== confirmPassword) {
        setMessage("Passwords do not match");
      } else {
        dispatch(register(name, email, password));
      }
    }
  };

  return (
    <>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CContainer
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#fff",
                      padding: "1rem",
                      marginBottom: "0.5rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    <CImage
                      height={40}
                      width={40}
                      src={require("../../assets/campuseerWhite.png")}
                    />
                    <h2>Campuseer</h2>
                  </CContainer>
                  
                 
                    <CForm>
                      <h1>Register</h1>
                      <p className="text-medium-emphasis">
                        Create your account
                      </p>{" "}
                      {message && <CAlert color="danger">{message}</CAlert>}
                      {error && <CAlert color="danger">{error}</CAlert>}
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          value={name}
                          name="name"
                          placeholder="Name"
                          autoComplete="name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>@</CInputGroupText>
                        <CFormInput
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email"
                          value={email}
                          autoComplete="email"
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          value={password}
                          name="password"
                          autoComplete="new-password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          name="confirm-password"
                          placeholder="Repeat password"
                          autoComplete="new-password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </CInputGroup>
                      <div className="d-grid">
                        <CButton onClick={submitHandler} color="primary">
                          Create Account
                        </CButton>
                      </div>
                    </CForm>
                  
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  );
};

export default Register;
