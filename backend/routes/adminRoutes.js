import express from 'express'
const router = express.Router()
import {
 authAdmin,generateOtp,registerAdmin, verifyOtp
} from '../controllers/adminController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/register').post(registerAdmin)
router.post('/login', authAdmin)
router.route('/otp').put(verifyOtp).post(generateOtp)
/* router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)*/

export default router
