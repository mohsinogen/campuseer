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
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import BASE_URL  from "react-dotenv";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Otp = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const adminOtp = useSelector((state) => state.adminOtp);
  const { data } = adminOtp;


  const config = {
    headers: {
      'Content-Type': 'application/json',
      
    },
  }
  const url = `api/admin/otp`

  useEffect(() => {
    if (!data?.email) {
      navigate("/login")
    }
  }, [adminOtp]);

  useEffect(() => {
    setMessage("")
    if (otp.length === 4) {
     
      setLoading(true)
      axios.put(url,{email:data.email, userOtp: otp},config).then((res)=>{
        setLoading(false)
        navigate("/login")
        console.log(res)
      }).catch((error)=>{
       console.log(error.response.data.message)
       setMessage(error.response.data.message)
       setLoading(false)
      })
     
    }
  }, [otp]);

  const newOtpHandler = () =>{
    setOtp('')
    setLoading(true)
    setMessage('')
    axios.post('/api/admin/otp',{email:data.email},{
      
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res)=>{
      console.log(res.data)
      setLoading(false)
      setMessage("New otp generated")
    }).catch((err)=>{
      setLoading(false)
      setMessage(err?.response?.data?.message)
    })
  }
  

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
                  
                    <CContainer>
                    {message && <CAlert color="danger">{message}{" "}{message === 'Otp has been verified' && (<CButton onClick={()=>navigate('/login')} color="link" className="px-0">
                         login
                        </CButton>)}</CAlert>}
                      <OtpInput
                      isDisabled={loading}
                        isInputNum={true}
                        value={otp}
                        onChange={(val) => setOtp(val)}
                        numInputs={4}
                        separator={<span>-</span>}
                        inputStyle={{
                          border: "3px solid black",
                          color: "black",
                          fontSize: "2rem",
                          borderRadius: "0.5rem",
                          width: "4rem",
                          height: "4rem",
                        }}
                        focusStyle={{
                          border: "6px solid #0d6efd",
                          color: "#0d6efd",
                        }}
                        containerStyle={{
                          margin: "1rem",
                          justifyContent: "center",
                        }}
                      />
                      <p className="text-center text-primary">
                        Enter a four digit One time password sent to your
                        registered email starting with <span className="fw-bold">{data?.email?.slice(0,6)}</span>
                      </p>
                      
                    </CContainer>
                  
                 
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  );
};

export default Otp;
