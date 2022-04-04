import React, { useState, useEffect } from "react";
import { CCol, CContainer, CImage, CRow } from "@coreui/react";
import moment from "moment";
import axios from "axios";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { CChart } from "@coreui/react-chartjs";

const Home = () => {
  const [date, setDate] = useState(new Date().getTime());
  const [loading, setLoading] = useState();
  const [error, setError] = useState(false);
  const [data, setData] = useState();
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const initHandler = () => {
    setLoading(true);

    const url = "/api/attendance/summary";
    axios
      .post(url, JSON.stringify({ day: moment(date).format("L") }), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminInfo.token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setData(res.data);
        console.log(res.data);
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
  }, [date]);

  return (
    <CContainer className="justify-content-center">
      <CRow>
        <CCol md="2">
          <DatePicker
            maxDate={new Date().getTime()}
            className="form-control d-flex"
            value={date}
            selected={date}
            onChange={(date) => setDate(date)}
          />
        </CCol>
        <CCol>
          {" "}
          <h2>
            Summary for{" "}
            {moment(date).format("L") !== moment().format("L")
              ? moment(date).format("ll")
              : "Today"}
          </h2>
        </CCol>
      </CRow>

      <h4 className="text-center mt-2">
        {data?.totalPresent} student{data?.totalPresent > 1? "s":""} present out of {data?.totalStudent}
      </h4>

      
     {/*  <CRow>
        <CCol>
          <CChart
            type="line"
            data={{
              labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
              ],
              datasets: [
                {
                  label: "My First dataset",
                  backgroundColor: "rgba(220, 220, 220, 0.2)",
                  borderColor: "rgba(220, 220, 220, 1)",
                  pointBackgroundColor: "rgba(220, 220, 220, 1)",
                  pointBorderColor: "#fff",
                  data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                },
                {
                  label: "My Second dataset",
                  backgroundColor: "rgba(151, 187, 205, 0.2)",
                  borderColor: "rgba(151, 187, 205, 1)",
                  pointBackgroundColor: "rgba(151, 187, 205, 1)",
                  pointBorderColor: "#fff",
                  data: [50, 12, 28, 29, 7, 25, 12, 70, 60],
                },
              ],
            }}
          />
        </CCol>
      </CRow> */}
    </CContainer>
  );
};

export default Home;
