const generateFourDigitOtp = () => {
  let val = Math.floor(1000 + Math.random() * 9000);
  console.log(`OTP generated ${val}`.yellow);
  return val;
};

const mailOptions = {
  from: "mohsinogen@gmail.com",
  subject: "Campuseer OTP verification Email",
};

const firbaseConfig = {
  apiKey: "AIzaSyC2_5wC6Lrg0-kEXASunAgjajUgX90PVrI",
  authDomain: "my-bucket-a9016.firebaseapp.com",
  projectId: "my-bucket-a9016",
  storageBucket: "my-bucket-a9016.appspot.com",
  messagingSenderId: "647323027699",
  appId: "1:647323027699:web:96ccd6477202d3f7b34f86"
};

export  { generateFourDigitOtp, mailOptions, firbaseConfig };
