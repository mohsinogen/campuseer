import express from 'express'
const router = express.Router()
import {
  markAttendance
} from '../controllers/attendanceController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, admin, markAttendance);


export default router
