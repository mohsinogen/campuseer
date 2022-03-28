import express from 'express'
const router = express.Router()
import {
  attendanceList,
  markAttendance
} from '../controllers/attendanceController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, admin, markAttendance);
router.route('/list').post(protect,admin,attendanceList);



export default router
