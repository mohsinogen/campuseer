import asyncHandler from "express-async-handler";
import Attendance from "../models/attendanceModel.js";
import moment from "moment";
import Student from "../models/studentModel.js";

const markAttendance = asyncHandler(async (req, res) => {
  try {
    const already = await Attendance.find({
      student: req.body.student,
      day: moment().format("L"),
    });

    if (already.length === 0) {
      const attendance = new Attendance({
        student: req.body.student,
        admin: req.admin._id,
        day: moment().format("L"),
        isPresent: true,
      });
      await attendance.save();
      const marked = await attendance.save();
      res.status(200).send(marked);
    } else if (already.length > 0) {
      res.status(400).json("Already present");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const attendanceList = asyncHandler(async (req, res) => {
  let filterOpt = { isPresent: true, day: moment().format("L") };
  let popFilter = { path: "student" };
  //console.log(req.body.query);
  try {
    var regex = /^[0-9]+$/;

    if (req.body.query && !req.body.query.match(regex)) {
      popFilter.match = {
        ...popFilter.match,
        fullname: {
          $regex: req.body.query,
          $options: "i",
        },
      };
    }
    if (req.body.query && req.body.query.match(regex)) {
      popFilter.match = { ...popFilter.match, studentId: req.body.query };
    }
    if (req.body.course) {
      popFilter.match = { ...popFilter.match, course: req.body.course };
    }
    if (req.body.year) {
      popFilter.match = { ...popFilter.match, year: req.body.year };
    }
    if (req.body.sem) {
      popFilter.match = { ...popFilter.match, sem: req.body.sem };
    }
    if (req.body.day) {
      filterOpt.day = req.body.day;
    }
    console.log(popFilter);

    const attendance = await Attendance.find({ ...filterOpt })
      .populate(popFilter)
      .exec();
    const data = attendance.filter((att) => att.student !== null);

    const count = data.length;

    res.status(200).json({ attendance: data, count });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const summary = asyncHandler(async (req, res) => {
   const { day } = req.body;
   let popFilter = { path: "student" };

  try {
    const attendanceByDay = await Attendance.find({ day, isPresent: true });
    const studentCount = await Student.countDocuments({ isActive: true });

    const allAttendance = await Attendance.find({day,isPresent:true}).populate(popFilter).exec()
    const data = allAttendance.filter((att)=>  att.student !== null)
    const csStudents = data.filter((item)=> item.student.course== "CS");

    const csYear1 = csStudents.filter((item)=> item.student.year== 1);
    const csYear2 = csStudents.filter((item)=> item.student.year== 2);
    const csYear3 = csStudents.filter((item)=> item.student.year== 3);


    const itStudents = data.filter((item)=> item.student.course== "IT");
    const itYear1 = itStudents.filter((item)=> item.student.year== 1);
    const itYear2 = itStudents.filter((item)=> item.student.year== 2);
    const itYear3 = itStudents.filter((item)=> item.student.year== 3);


    res.json({
      totalPresent: attendanceByDay.length,
      totalStudent: studentCount,
      csStudents:csStudents.length,
      itStudents:itStudents.length,
      cs:[csYear1,csYear2,csYear3],
      it:[itYear1,itYear2,itYear3]
    });
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error(error);
  } 
});

export { markAttendance, attendanceList, summary };
