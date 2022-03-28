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
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";


function AttendanceList() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [count, setCount] = useState();

  const [filter, setFilter] = useState({
    query: "",
    course: "",
    year: "",
    sem: "",
    day: new Date().getTime(),
  });

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const initHandler = () => {
    setLoading(true);

    const url = "/api/attendance/list";
    axios
      .post(url, JSON.stringify({...filter,day:moment(filter.day).format("L")}), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminInfo.token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setCount(res.data.count);
        setData(res.data.attendance);
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

  return (
    <div>
      <CContainer>
        <h2>Attendance List</h2>
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
          <DatePicker className="form-control d-flex" value={filter.day} selected={filter.day} onChange={(date) => setFilter({...filter,day:date})} />
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
        {data && <p>{`Showing ${count} records`}</p>}
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
                  {["Sr No", "Name", "Course", "Year", "Sem", "Day"].map(
                    (item, i) => (
                      <CTableHeaderCell key={i}>{item}</CTableHeaderCell>
                    )
                  )}
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {data?.map((student, i) => (
                  <CTableRow key={i}>
                    <CTableDataCell className="fw-bold">{i + 1}</CTableDataCell>
                    <CTableDataCell className="fw-bold">
                      <Link to={`/student/${student._id}`}>
                        {" "}
                        {student?.student?.fullname}
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell className="fw-bold">
                      {student?.student?.course}
                    </CTableDataCell>
                    <CTableDataCell className="fw-bold">
                      {student?.student?.year}
                    </CTableDataCell>
                    <CTableDataCell className="fw-bold">
                      {student?.student?.sem}
                    </CTableDataCell>

                    <CTableDataCell className="fw-bold">
                      {student?.day}
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

export default AttendanceList;
