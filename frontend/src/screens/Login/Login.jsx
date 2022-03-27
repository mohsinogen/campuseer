import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CImage,
  CInputGroup,
  CInputGroupText,
  CAlert,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { login } from "../../redux/actions/adminActions";
import { useDispatch, useSelector } from "react-redux";
import { ADMIN_SET_OTPDATA } from "../../redux/constants/adminConstants";
import axios from "axios";

const Login = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const adminLogin = useSelector((state) => state.adminLogin);
  const { loading, error, adminInfo } = adminLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (adminInfo) {
      navigate("/");
    }
  }, [adminInfo]);

  const loginHandler = (e) => {
    setMessage("");

    e.preventDefault();
    if (!password || !email) {
      setMessage("Fields can't be empty");
    } else {
      dispatch(login(email, password));
    }
  };

  const verifyHandler = () => {
    setMessage("");
    axios
      .post(
        "/api/admin/otp",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (adminInfo) {
          dispatch({ type: ADMIN_SET_OTPDATA, payload: { email } });
          navigate("/otp");
        }
      })
      .catch((err) => {
        setMessage(err?.response?.data?.message);
      });
  };

  return (
    <div className="bg-light  min-vh-100 d-flex flex-row align-items-center justify-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCardGroup className="shadow">
              <CContainer
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#fff",
                  padding: "1rem",
                }}
              >
                <CImage
                  height={40}
                  width={40}
                  src={require("../../assets/campuseerWhite.png")}
                />
                <h2>Campuseer</h2>
              </CContainer>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">
                      Sign In to your account
                    </p>{" "}
                    {message && <CAlert color="danger">{message}</CAlert>}
                    {error && <CAlert color="danger">{error}</CAlert>}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        autoComplete="email"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        required
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        autoComplete="password"
                        type="password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          onClick={loginHandler}
                          color="primary"
                          className="px-4"
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton
                          onClick={verifyHandler}
                          color="link"
                          className="px-0"
                        >
                          verify your account
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                  <CRow>
                    <CCol xs={6} className="text-right">
                      <CButton
                        onClick={() => navigate("/register")}
                        variant="ghost"
                        color="light"
                        className="mt-2 "
                      >
                        New user? Register here
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
