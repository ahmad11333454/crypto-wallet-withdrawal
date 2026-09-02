const crypto = require('crypto');

const ENCRYPTION_KEY = process.env.PRIVATE_KEY_ENCRYPTION_KEY || 'default-secret-key-change-this';

// Encrypt private key
exports.encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  const key = crypto.scryptSync(ENCRYPTION_KEY, 'salt', 32);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return iv.toString('hex') + ':' + encrypted;
};

// Decrypt private key
exports.decrypt = (encrypted) => {
  const parts = encrypted.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const key = crypto.scryptSync(ENCRYPTION_KEY, 'salt', 32);
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  
  let decrypted = decipher.update(parts[1], 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
};
