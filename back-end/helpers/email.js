import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()
//Generates OTP
let otp = ''
export const generateOTP = () => {
  for (let i = 0; i <= 3; i++) {
    const randomValue = Math.round(Math.random() * 9)
    otp = otp + randomValue
  }
  return otp;
}

//send otp via mail
export const mailTransport = () => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD
    }
  });
  return transport;
}

export const generateEmailTemplate = (otp) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE-edge">
      <style>
      @media only screen and (max-width: 620px){
      h1{
        font-size: 20px;
        padding: 5px;
      }
    }
    </style>
  </head>
  <body>
  <div>
    <div style="max-width: 620px; margin: 0 auto; font-family:
    sans-serif; color: #272727;">
      <h1 style="background: #f6f6f6; padding: 10px; text-align:
      center; color: #272727;">We are delighted to welcome you to Digital Credentials Wallet!</h1>
      <p>Please Verify Your Email To Continue. Your verification code is:</p>
      <p style="width: 80px; margin 0 auto; font-weight: bold; text-align: center;
      background: #f6f6f6; border-radius: 5px; font-size: 25px;">${otp}</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

export const plainEmailTemplate = (heading, message) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE-edge">
      <style>
      @media only screen and (max-width: 620px){
      h1{
        font-size: 20px;
        padding: 5px;
      }
    }
    </style>
  </head>
  <body>
  <div>
    <div style="max-width: 620px; margin: 0 auto; font-family:
    sans-serif; color: #272727;">
      <h1 style="background: #f6f6f6; padding: 10px; text-align:
      center; color: #272727;">${heading}</h1>
      <p style="width: 20px; margin 0 auto; font-weight: bold; text-align: center;
      background: #f6f6f6; border-radius: 5px; font-size: 15px;">${message}</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

export const generatePasswordResetTemplate = (url) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE-edge">
      <style>
      @media only screen and (max-width: 620px){
      h1{
        font-size: 20px;
        padding: 5px;
      }
    }
    </style>
  </head>
  <body>
  <div>
    <div style="max-width: 620px; margin: 0 auto; font-family:
    sans-serif; color: #272727;">
      <h1 style="background: #f6f6f6; padding: 10px; text-align:
      center; color: #272727;">Quick Action: Password Reset Request</h1>
      <p>Please Follow the Link Below to Reset Password</p>
      <div style="text-align: center;">
      <a href="${url}" style="font-family: sans-serif; margin: 0 auto; padding: 20px;
      text-align: center; background: #e63946; border-radius: 5px; font-size: 20px 10px;
      color #fff; cursor: pointer; text-decoration: none; display: inline-block;">
      Reset Password</a>
      </div>
      </div>
    </div>
  </body>
  </html>
  `;
};


export const resetSuccessfulTemplate = (heading, message) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE-edge">
      <style>
      @media only screen and (max-width: 620px){
      h1{
        font-size: 20px;
        padding: 5px;
      }
    }
    </style>
  </head>
  <body>
  <div>
    <div style="max-width: 620px; margin: 0 auto; font-family:
    sans-serif; color: #272727;">
      <h1 style="background: #f6f6f6; padding: 10px; text-align:
      center; color: #272727;">${heading}</h1>
      <p style="width: 20px; margin 0 auto; font-weight: bold; text-align: center;
      background: #f6f6f6; border-radius: 5px; font-size: 15px;">${message}</p>
      </div>
    </div>
  </body>
  </html>
  `;
};
