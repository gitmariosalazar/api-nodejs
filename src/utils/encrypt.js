import crypto from 'crypto';
const algorithm = 'aes-256-cbc'; //Using AES encryption
const key = crypto.randomBytes(32);
console.log(key)
const iv = crypto.randomBytes(16);

//Encrypting text
function Encrypt (password) {
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(password);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return {iv: iv.toString('hex'), encryptedData: encrypted.toString('hex')};
}

// Decrypting text
function Decrypt (password) {
  let iv = Buffer.from(password.iv, 'hex');
  let encryptedText = Buffer.from(password.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

function ComparePasswords (inputPassword, storedPassword, storedIV) {
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(storedIV, 'hex'));
  let encrypted = cipher.update(inputPassword);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex') === storedPassword;
}

export {
  Encrypt,
  ComparePasswords,
  Decrypt
}