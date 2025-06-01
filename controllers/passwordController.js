const zxcvbn = require('zxcvbn');
const crypto = require('crypto');

const generateRandomPassword = (length = 12) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, charset.length);
    password += charset.charAt(randomIndex);
  }
  return password;
};

exports.checkStrength = (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }
  const result = zxcvbn(password);
  res.json(result);
};

exports.suggestPassword = (req, res) => {
  const suggestedPassword = generateRandomPassword(16); // You can add more sophisticated logic here
  res.json({ suggestion: suggestedPassword });
};