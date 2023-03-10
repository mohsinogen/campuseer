import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Admin from "../models/adminModel.js";
import Otp from "../models/otpModel.js";
import nodemailer from "nodemailer";
import { generateFourDigitOtp, mailOptions } from "../config/helper.js";
import moment from "moment";

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {

        res.status(201).json({
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          isSuperAdmin: admin.isSuperAdmin,
          token: generateToken(admin._id),
          //otp: otp._id,
        });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error(error);
  }
});

// @desc    Register a new user
// @route   POST /api/admin/register
// @access  Public
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const admin = await Admin.create({
    name,
    email,
    password,
  });

  await admin.save();

  if (admin) {
    res.status(201).json({});
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { email, userOtp } = req.body;
  const admin = await Admin.findOne({ email });
  const otp = await Otp.findOne({ admin: admin._id });
  console.log("otp", otp.otp, userOtp);
  const twoMinutesAgo = moment().subtract(2, "minutes");

  if (otp.isVerified) {
    res.status(400);
    throw new Error("Otp has been verified");
  } else {
    if (otp.otp == userOtp) {
      otp.isVerified = true;
      await otp.save();
      res.status(200).json("otp is correct");
    } else {
      res.status(400);
      throw new Error("Otp is not correct");
    }
  }
});

const generateOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const admin = await Admin.findOne({ email });
  const otp = await Otp.findOne({ admin: admin._id });

  const twoMinutesAgo = moment().subtract(2, "minutes");
  if (otp?.isVerified) {
    res.status(400);
    throw new Error("Otp has been verified");
  } else if (
    moment(moment(otp.updatedAt), "M/D/YYYY, H:mm:ss A").isBefore(twoMinutesAgo)
  ) {
    res.status(400);
    throw new Error("Otp has been already sent");
  } else {
    console.log(generateFourDigitOtp());
    otp.otp = generateFourDigitOtp();
    await otp.save();

    res.status(201).json("New Otp has been generated");
  }
});

export { authAdmin, registerAdmin, verifyOtp, generateOtp };
