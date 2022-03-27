import mongoose from "mongoose";

const attendanceSchema = mongoose.Schema(
  {
    isPresent: {
      type: Boolean,
      required: true,
      default: false,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Admin",
    },
    day:{
      type:String,
      require:true
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Student",
    },
   
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
