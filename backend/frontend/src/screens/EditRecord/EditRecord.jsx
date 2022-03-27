import {
  CContainer,
  CForm,
  CRow,
  CCol,
  CFormInput,
  CButton,
  CFormCheck,
  CFormSelect,
  CFormLabel,
  CFormTextarea,
} from "@coreui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function EditRecord() {
    const navigate = useNavigate()
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const [formData, setFormData] = useState({
    fullname: "",
    firstname: "",
    lastname: "",
    course: "",
    year: "",
    sem: "",
    address: "",
    pincode: "",
    nearstation: "",
    gender: "",
    isSuspend:""
  });

  const submitHandler = () => {
    console.log(formData);
    if (Object.values(formData).includes("")) {
      alert("Fields can't be empty");
      return;
    } else {
      axios
        .put(`/api/student/${params.id}`, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminInfo.token}`,
          },
        })
        .then((res) => {})
        setLoading(false)
        alert("Record updated")
        navigate("/studentlist")

        .catch((err) => {
            setLoading(false)
          alert("Something went wrong!")
        });
    }
  };

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
        console.log(res.data);
        setFormData({
          fullname: res.data.fullname,
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          course: res.data.course,
          year: res.data.year,
          sem: res.data.sem,
          address: res.data.address,
          pincode: res.data.pinCode,
          nearstation: res.data.nearestStation,
          isSuspend: res.data.isSuspend,
          gender: res.data.isMale ? "male" : "female",
        });
      })
      .catch((error) => {
        setLoading(false);

        const msg =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      });
  };
  useEffect(() => {
    initHandler();
  }, []);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div>
      <CContainer className="mt-2">
        <CForm>
          {" "}
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="fullname">Full Name</CFormLabel>
              <CFormInput
                onChange={(e) =>
                  setFormData({ ...formData, fullname: e.target.value })
                }
                value={formData.fullname}
                id="fullname"
                placeholder=""
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol xs={4}>
              <CFormLabel htmlFor="firstname">First Name</CFormLabel>
              <CFormInput
                value={formData.firstname}
                onChange={(e) =>
                  setFormData({ ...formData, firstname: e.target.value })
                }
                id="firstname"
                placeholder=""
              />
            </CCol>
            <CCol xs={4}>
              <CFormLabel htmlFor="lastname">Last Name</CFormLabel>
              <CFormInput
                value={formData.lastname}
                onChange={(e) =>
                  setFormData({ ...formData, lastname: e.target.value })
                }
                id="lastname"
                placeholder=""
              />
            </CCol>
          </CRow>
          <CRow className="mb-3 g-3">
            <CCol md={4}>
              <CFormLabel htmlFor="inputState">Course</CFormLabel>
              <CFormSelect
                value={formData.course}
                onChange={(e) =>
                  setFormData({ ...formData, course: e.target.value })
                }
              >
                <option value="">Choose course</option>
                <option value="IT">Information Technology</option>
                <option value="CS">Computer Science</option>
              </CFormSelect>
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="inputState">Year</CFormLabel>
              <CFormSelect
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
              >
                <option value="">Choose year</option>
                <option value="1">First year</option>
                <option value="2">Second year</option>
                <option value="3">Third year</option>
              </CFormSelect>
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="inputState">Sem</CFormLabel>
              <CFormSelect
                value={formData.sem}
                onChange={(e) =>
                  setFormData({ ...formData, sem: e.target.value })
                }
                id="inputState"
              >
                <option value="">Choose Sem</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol xs={12}>
              <CFormLabel htmlFor="inputAddress">Address</CFormLabel>
              <CFormTextarea
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                id="inputAddress"
                placeholder="1234 Main St"
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md={4}>
              <CFormLabel htmlFor="inputCity">Pin</CFormLabel>
              <CFormInput
                value={formData.pincode}
                onChange={(e) =>
                  setFormData({ ...formData, pincode: e.target.value })
                }
                id="inputCity"
              />
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="nearby">Near Station</CFormLabel>
              <CFormInput
                value={formData.nearstation}
                onChange={(e) =>
                  setFormData({ ...formData, nearstation: e.target.value })
                }
                id="nearby"
              />
            </CCol>
          </CRow>
          <CRow>
            <fieldset className="row mt-2">
              <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
              <CCol sm={10}>
                <CFormCheck
                  type="radio"
                  name="gridRadios"
                  id="gridRadios1"
                  value={"male"}
                  checked={formData.gender === "male" ? true : false}
                  label="male"
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                />
                <CFormCheck
                  checked={formData.gender === "female" ? true : false}
                  type="radio"
                  name="gridRadios"
                  id="gridRadios2"
                  value="female"
                  label="female"
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                />
              </CCol>
            </fieldset>
          </CRow>{" "}
          <CRow className="mb-3">
            <CFormCheck invalid checked={formData.isSuspend ? true : false} onChange={(e)=> setFormData({...formData,isSuspend: e.target.checked})} type="checkbox" label="Suspend student" />
          </CRow>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <CButton onClick={submitHandler} disabled={loading}>
              Save
            </CButton>
          </div>
        </CForm>
      </CContainer>
    </div>
  );
}

export default EditRecord;
