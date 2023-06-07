//Generates OTP
let otp = ''
export const generateOTP = () => {
  for (let i = 0; i <= 3; i++) {
    const randomValue = Math.round(Math.random() * 9)
    otp = otp + randomValue
  }
  return otp;
}
