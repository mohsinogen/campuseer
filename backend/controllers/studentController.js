import asyncHandler from "express-async-handler";
import Student from "../models/studentModel.js";
import QRCode from "qrcode";
import path from "path";
import firebaseAdmin from "firebase-admin";
import { createRequire } from "module";
const require = createRequire(import.meta.url); // construct the require method
const serviceAccount = require("../../serviceAccountKey.json");

const fireAdmin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  storageBucket: "gs://my-bucket-a9016.appspot.com",
});
const storageRef = fireAdmin
  .storage()
  .bucket(`gs://my-bucket-a9016.appspot.com`);
const __dirname = path.resolve();

async function uploadFile(path, filename) {
  console.log('file',path)
  return storageRef.upload(path, {
    public: true,
    destination: `campuseer/${filename}`,
  });
}

const addStudent = asyncHandler(async (req, res) => {
  const {
    fullname,
    firstname,
    lastname,
    course,
    year,
    sem,
    address,
    pincode,
    nearstation,
    gender,
  } = req.body;

  if (
    fullname === "" ||
    firstname === "" ||
    lastname === "" ||
    course === "" ||
    year === "" ||
    sem === "" ||
    address === "" ||
    pincode === "" ||
    nearstation === "" ||
    gender === ""
  ) {
    res.status(400);
    throw new Error("Fields can't be empty");
  } else {
    try {
      const count = await Student.countDocuments({});

      const student = await new Student({
        admin: req.admin._id,
        fullname,
        firstname,
        lastname,
        course: course.toUpperCase(),
        year,
        sem: sem.toUpperCase(),
        address,
        studentId: count + 1,
        pinCode: pincode,
        nearestStation: nearstation.toLowerCase(),
        isMale: gender === "male" ? true : false,
      });

      QRCode.toFile(
        `./qrcodes/${student._id}.png`,
        JSON.stringify(student).toString(),
        {
          color: {
            dark: "#000000ff", // Blue dots
            light: "#ffffffff", // Transparent background
          },
        },
        function (err) {
          if (err) {
            console.log("err", err);
            throw err;
          }
        }
      );

      const file = await uploadFile(
        path.join(__dirname, `./qrcodes/${student._id}.png`),
        `${student._id}.png`
      );
   
      student.qrcode = file[0].metadata.mediaLink;
      await student.save();

      res.status(201).json(student);
    } catch (error) {
      console.log(error);
      res.status(400);
      throw new Error("Something went wrong");
    }
  }
});

const getStudent = asyncHandler(async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(400);
      throw new Error("No student found with given id");
    }
  } catch (error) {
    res.status(400);
    throw new Error("No student found with given id");
  }
});

const studentList = asyncHandler(async (req, res) => {
  let filterOpt = { isActive: true };
  //console.log(req.body.query);
  try {
    var regex = /^[0-9]+$/;

    if (req.body.query && !req.body.query.match(regex)) {
      filterOpt.$or = [
        {
          fullname: {
            $regex: req.body.query,
            $options: "i",
          },
        },
      ];
    }
    if (req.body.query && req.body.query.match(regex)) {
      filterOpt.studentId = req.body.query;
    }
    if (req.body.course) {
      filterOpt.course = req.body.course;
    }
    if (req.body.year) {
      filterOpt.year = req.body.year;
    }
    if (req.body.sem) {
      filterOpt.sem = req.body.sem;
    }
    if (req.body.gender) {
      filterOpt.isMale = req.body.gender === "male" ? true : false;
    }
    if (req.body.suspend) {
      filterOpt.isSuspend = req.body.suspend;
    }

    const count = await Student.countDocuments({ ...filterOpt });

    const students = await Student.find({ ...filterOpt });

    res.status(200).json({ students, count });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const deleteStudent = asyncHandler(async (req, res) => {
  try {
    const student = await Student.findById(req.body.student);
    if (student) {
      student.isActive = false;
      await student.save();
      res.status(200).send("Student deleted");
    } else {
      res.status(400);
      throw new Error(`No student found with given id`);
    }
  } catch (error) {
    res.status(400);
    throw new Error(`Failed to delete student`);
  }

  if (students) {
    res.status(200).json(students);
  } else {
  }
});

const updateStudent = asyncHandler(async (req, res) => {
  const {
    fullname,
    firstname,
    lastname,
    course,
    year,
    sem,
    address,
    pincode,
    nearstation,
    gender,
    isSuspend,
  } = req.body;

  try {
    const student = await Student.findById(req.params.id);

    if (student) {
      student.fullname = fullname;
      student.firstname = firstname;
      student.lastname = lastname;
      student.course = course;
      student.year = year;
      student.sem = sem;
      student.address = address;
      student.pinCode = pincode;
      student.nearestStation = nearstation;
      if (gender === "male") {
        student.isMale = true;
      } else if (gender === "female") {
        student.isMale = false;
      }
      student.isSuspend = isSuspend;

      const updatedStudent = await student.save();
      res.status(200).json(updatedStudent);
    } else {
      res.status(404);
      throw new Error("Student not found");
    }
  } catch (error) {
    console.log(error);
  }
});

export { addStudent, getStudent, studentList, deleteStudent, updateStudent };
