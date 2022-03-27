import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    
    title: {
      type: String,
      required: true,
    },
    
    courseid: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
