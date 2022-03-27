import {
  CButton,
  CCard,
  CCol,
  CContainer,
  CImage,
  CListGroup,
  CListGroupItem,
  CSpinner,
  CRow,
  CAlert,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import jsPDF from "jspdf";

function Student() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const initHandler = () => {
    setLoading(true);

    const url = `/api/student/${params.id}`;
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminInfo.token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((error) => {
        setLoading(false);

        const msg =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        setError(msg);
      });
  };
  useEffect(() => {
    initHandler();
  }, []);

  const generatePDF = () => {
    var doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [315, 530],
    });
    doc.html(document.querySelector("#studentcard"), {
      callback: (pdf) => {
        pdf.save(`campuseerStudent${data?.studentId}.pdf`);
      },
    });
  };

  return (
    <div>
      <CContainer>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CSpinner
              role="status"
              style={{
                width: "100px",
                height: "100px",
                margin: "auto",
                display: "block",
              }}
              color="primary"
            />
          </div>
        ) : error ? (
          <CAlert color="danger">{error}</CAlert>
        ) : (
          <CRow>
            <CCol md="3">
              <div style={{ border: "1px solid grey" }}>
                {" "}
                <CCard className="border-0" id="studentcard">
                  <div className="text-center fw-bold mt-3 h4">
                    <CImage
                      src={require("../../assets/campuseerWhite.png")}
                      height={48}
                    />
                    Campuseer
                  </div>
                  <div className="text-center">
                    {" "}
                    <CImage
                      className="mt-0"
                      height={240}
                      width={240}
                      src={data?.qrcode}
                      alt={data?.fullname}
                    />
                  </div>
                  <div>
                    <CListGroup className="border-0" variant="flush">
                      <CListGroupItem className="border-0">
                        Name : {data?.fullname}
                      </CListGroupItem>
                      <CListGroupItem className="border-0">
                        <CRow>
                          <CCol>Student Id : {data?.studentId}</CCol>{" "}
                          <CCol md="7">
                            Enrol :{" "}
                            {moment(data?.createdAt).format("MMM Do YY")}
                          </CCol>
                        </CRow>
                      </CListGroupItem>
                      <CListGroupItem className="border-0">
                        <CRow>
                          <CCol> Course : {data?.course}</CCol>{" "}
                          <CCol> Sem : {data?.sem}</CCol>
                        </CRow>
                      </CListGroupItem>
                      <CListGroupItem className="border-0">
                        Address : {data?.address}
                      </CListGroupItem>
                    </CListGroup>
                  </div>
                </CCard>
              </div>

              <div className="text-center mt-2">
                <CButton color="secondary" size="lg" onClick={generatePDF}>
                  Download ID
                </CButton>
              </div>
            </CCol>
            <CCol md="7">
              <CListGroup className="border-0">
                <CListGroupItem className="border-0">
              <CRow>  <CCol>
                Fullname : <div className="fw-bold h3">{data?.fullname}</div>
                    </CCol> <CCol>
                Status : <div className="fw-bold h3"><span class={`badge h3 ${data?.isSuspend ? "bg-danger":"bg-success"}`}>{data?.isSuspend ? "Suspended":"Active"}</span></div>
                    </CCol></CRow>
                 
                </CListGroupItem>
                <CListGroupItem className="border-0">
                  <CRow>
                    <CCol>
                      Firstname :{" "}
                      <div className="fw-bold h3">{data?.firstname}</div>
                    </CCol>
                    <CCol md="7">
                      <CCol>
                        Lastname :{" "}
                        <div className="fw-bold h3">{data?.lastname}</div>
                      </CCol>
                    </CCol>
                  </CRow>
                </CListGroupItem>
                <CListGroupItem className="border-0">
                  <CRow>
                    <CCol>
                      <CCol>
                        Admitted On :
                        <div className="fw-bold h4">
                          {" "}
                          {moment(data?.createdAt).format("LLLL")}
                        </div>
                      </CCol>
                    </CCol>
                  </CRow>
                </CListGroupItem>
                <CListGroupItem className="border-0">
                  <CRow>
                    <CCol>
                      Student Id :{" "}
                      <div className="fw-bold h3"> {data?.studentId}</div>
                    </CCol>
                    <CCol>
                      Course :<div className="fw-bold h3">{data?.course}</div>
                    </CCol>
                    <CCol>
                      <CCol>
                        {" "}
                        Sem :<div className="fw-bold h4"> {data?.sem}</div>
                      </CCol>
                    </CCol>
                  </CRow>
                </CListGroupItem>
                <CListGroupItem className="border-0">
                  <CRow>
                    <CCol>
                      Address :<div className="fw-bold h3">{data?.address}</div>
                    </CCol>
                  </CRow>
                </CListGroupItem>
                <CListGroupItem className="border-0">
                  <CRow>
                    <CCol>
                      Pincode :<div className="fw-bold h3">{data?.pinCode}</div>
                    </CCol>
                    <CCol>
                      Nearest Station :<div className="fw-bold h3">{data?.nearestStation}</div>
                    </CCol>
                  </CRow>
                </CListGroupItem>
              </CListGroup>
            </CCol>
          </CRow>
        )}
      </CContainer>
    </div>
  );
}

export default Student;
