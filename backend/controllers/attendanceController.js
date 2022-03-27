import asyncHandler from "express-async-handler";
import Attendance from "../models/attendanceModel.js";
import moment from "moment";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const markAttendance = asyncHandler(async (req, res) => {
  try {
    const studentId = req.body.student;

    const already = await Attendance.find({
      student: studentId,
      day: moment().format("L"),
    });

    if (already.length === 0) {
      const attendance = new Attendance({
        student: studentId,
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
    throw new Error("Something went wrong");
  }
});

export { markAttendance };
