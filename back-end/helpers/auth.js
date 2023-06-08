import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { isValidObjectId } from 'mongoose';
import User from '../models/user.js';
import resetToken from '../models/resetToken.js';

export const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err)
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err)
        }
        resolve(hash)
      });
    });
  });
}

export const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
}

export const hashToken = (token) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err)
      }
      bcrypt.hash(token, salt, (err, hash) => {
        if (err) {
          reject(err)
        }
        resolve(hash)
      });
    });
  });
}

export const compareToken = async (token, hashed) => {
  try {
    const match = await bcrypt.compare(token, hashed);
    return match;
  } catch (error) {
    console.log(error.toString());
    return false;
  }
};



//generate token for password reset
export const createRandomBytes = () => new Promise((resolve, reject) => {
  crypto.randomBytes(30, (err, buf) => {
    if (err) {
      reject(err);
    }
    const token = buf.toString('hex');
    hashToken(token);
    resolve(token);
  });
});


//check if reset token is valid
export const isResetTokenValid = async (req, res, next) => {
  const { token, id } = req.query; //accepts a url
  if (!token || !id) {
    return res.json({
      error: 'Invalid Request'
    })
  }
  if (!isValidObjectId(id)) {
    return res.json({
      error: 'Invalid User!'
    });
  }

  const user = await User.findById(id)
  if (!user) {
    return res.json({
      error: 'User Not Found!'
    });
  }
  const findmyToken = await resetToken.findOne({ owner: user._id })
  if (!findmyToken) {
    return res.json({
      error: 'Token Not Found!'
    })
  }
  console.log(token)
  console.log(findmyToken.token)

  const isValid = await compareToken(token.trim(), findmyToken.token.trim())
  if (!isValid) {
    return res.json({
      error: 'Reset Token is not valid!'
    })
  }
  req.user = user
  next()
}
