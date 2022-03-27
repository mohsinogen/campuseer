import express from "express";
const router = express.Router();
import {
 addStudent, deleteStudent, getStudent, studentList, updateStudent
} from "../controllers/studentController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, admin, addStudent);
router.route("/:id").get(protect, admin, getStudent).put(protect, admin, updateStudent);;
router.route("/filter").post(protect, admin, studentList)
router.route("/delete").post(protect,admin,deleteStudent);

  



export default router;
