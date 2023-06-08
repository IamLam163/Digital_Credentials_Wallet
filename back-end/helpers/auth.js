import bcrypt from 'bcrypt';

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

