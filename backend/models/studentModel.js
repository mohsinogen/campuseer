import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Admin",
    },
    fullname: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    qrcode: {
      type: String,
      //required: true,
    },
    course: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    sem: {
      type: Number,
      required: true,
    },
    studentId:{
      type: Number,
      required: true,
    },
    address: { type: String, required: true },
    pinCode: { type: String, required: true },
    nearestStation: { type: String },
    isSuspend: {
      type: Boolean,
      required: true,
      default: false,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    isMale:{
      type:Boolean,
      required:true
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
