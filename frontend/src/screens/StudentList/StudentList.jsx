import {
  CContainer,
  CTable,
  CTableBody,
  CTableHead,
  CTableDataCell,
  CTableRow,
  CTableHeaderCell,
  CButton,
  CRow,
  CCol,
  CSpinner,
  CFormSelect,
  CFormInput,
} from "@coreui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function StudentList() {
  const [students, setStudents] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate()
  const [loading, setLoading] = useState();
  const [count, setCount] = useState();

  const [filter, setFilter] = useState({
    query: "",
    course: "",
    year: "",
    sem: "",
    nearstation: "",
    gender: "",
    suspend: "",
  });

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const initHandler = () => {
    setLoading(true);

    const url = "/api/student/filter";
    axios
      .post(url, JSON.stringify(filter), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminInfo.token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setCount(res.data.count)
        setStudents(res.data.students);
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
  }, [filter]);

  const deleteHandler = (data) => {
    const permission = window
      .confirm(`Confirm to delete student ${data.fullname}`)
      .valueOf();
    if (permission) {
      axios
        .post(
          "/api/student/delete",
          { student: data._id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${adminInfo.token}`,
            },
          }
        )
        .then((res) => {
          initHandler();
        })
        .catch((error) => {
          const msg =
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message;
          setError(msg);
        });
    }
  };

  return (
    <div>
      <CContainer>
        <h2>Student List</h2>
        <CRow className="mb-2 justify-content-center">
          <CFormInput
            onChange={(e) => setFilter({ ...filter, query: e.target.value })}
           
            type="query"
            value={filter.query}
            placeholder="Enter student name or id to search"
            aria-describedby="query"
          />
        </CRow>
        <CRow className="mb-4 justify-content-end">
          <CCol>
            <CFormSelect
              value={filter.course}
              onChange={(e) => setFilter({ ...filter, course: e.target.value })}
            >
              <option value="">Select course</option>
              <option value="CS">Computer Science</option>
              <option value="IT">Information Technology</option>
            </CFormSelect>
          </CCol>
          <CCol>
            <CFormSelect
              value={filter.year}
              onChange={(e) => setFilter({ ...filter, year: e.target.value })}
            >
              <option value="">Select year</option>
              <option value="1">First year</option>
              <option value="2">Second year</option>
              <option value="3">Third year</option>
            </CFormSelect>
          </CCol>
          <CCol>
            <CFormSelect
              value={filter.sem}
              onChange={(e) => setFilter({ ...filter, sem: e.target.value })}
           
            >
              <option value="">Select Sem</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </CFormSelect>
          </CCol>
          <CCol>
            <CFormSelect
              value={filter.gender}
              onChange={(e) => setFilter({ ...filter, gender: e.target.value })}
             
            >
              <option value="">Select gender</option>
              <option value="male">male</option>
              <option value="female">female</option>
            </CFormSelect>
          </CCol>
          <CCol>
            <CFormSelect
              value={filter.suspend}
              onChange={(e) => setFilter({ ...filter, suspend: e.target.value })}
            >
              <option value="">Select suspended</option>
              <option value="true">suspended</option>
              <option value="false">not suspended</option>
            </CFormSelect>
          </CCol>
          <CCol>
            <CButton
              color="primary"
              onClick={() =>
                setFilter({
                  query: "",
                  course: "",
                  year: "",
                  sem: "",
                  nearstation: "",
                  gender: "",
                  suspend: "",
                })
              }
            >
              Clear filter
            </CButton>
          </CCol>
        </CRow>
       {students && <p>{`Showing ${count} records`}</p>}
        <div>
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
          ) : (
            <CTable hover bordered>
              <CTableHead>
                <CTableRow>
                  {[
                    "ID",
                    "Name",
                    "Course",
                    "Year",
                    "Sem",
                    "Gender",
                    "Admit date",
                    "Suspended",
                  ].map((item, i) => (
                    <CTableHeaderCell key={i}>{item}</CTableHeaderCell>
                  ))}{" "}
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {students?.map((student, i) => (
                  <CTableRow
                    color={student?.isSuspend ? "danger" : "success"}
                    key={i}
                  >
                    <CTableDataCell className="fw-bold">{student.studentId}</CTableDataCell>
                    <CTableDataCell className="fw-bold">
                     <Link to={`/student/${student._id}`}> {student?.fullname}</Link>
                    </CTableDataCell>
                    <CTableDataCell className="fw-bold">
                      {student?.course}
                    </CTableDataCell>
                    <CTableDataCell className="fw-bold">
                      {student?.year}
                    </CTableDataCell>
                    <CTableDataCell className="fw-bold">
                      {student?.sem}
                    </CTableDataCell>
                    <CTableDataCell className="fw-bold">
                      {student?.isMale ? "Male" : "Female"}
                    </CTableDataCell>
                    <CTableDataCell className="fw-bold">
                      {student?.createdAt.slice(0,10)}
                    </CTableDataCell>
                    <CTableDataCell className="fw-bold">
                      {student?.isSuspend ? (
                        <i className="fw-bold fas fa-check text-danger" />
                      ) : (
                        <i className="fw-bold fas fa-check text-success" />
                      )}
                    </CTableDataCell>
                    <CTableDataCell className="fw-bold">
                      {" "}
                      <CButton color="warning" onClick={()=> navigate(`/editrecord/${student._id}`)}>
                        <i className="fas fa-edit" />
                      </CButton>{" "}
                      <CButton
                        color="danger"
                        onClick={() => deleteHandler(student)}
                      >
                        <i className="fas fa-trash" />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          )}
        </div>
      </CContainer>
    </div>
  );
}

export default StudentList;
