import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

export const encryption = async (textToEncrypt: string, password: string) => {
  const iv = randomBytes(16);
  const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
  const cipher = createCipheriv('aes-256-ctr', key, iv);

  const encryptedText = Buffer.concat([
    cipher.update(textToEncrypt, 'utf8'),
    cipher.final(),
  ]);

  return Buffer.concat([iv, encryptedText]).toString('hex');
};

export const decrypted = async (encryptedHex: string, password: string) => {
  const encryptedBuffer = Buffer.from(encryptedHex, 'hex');
  const iv = encryptedBuffer.subarray(0, 16);
  const encryptedText = encryptedBuffer.subarray(16);
  const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
  const decipher = createDecipheriv('aes-256-ctr', key, iv);

  const decryptedText = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);

  return decryptedText.toString('utf8');
};
