import mongoose from 'mongoose'
import {generateFourDigitOtp} from "../config/helper.js"

const otpSchema = mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Admin',
    },
    otp: {
      type: Number,
      required: true,
      default: generateFourDigitOtp(),
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    verifiedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

const Otp = mongoose.model('Otp', otpSchema)

export default Otp
