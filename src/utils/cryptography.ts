import bcrypt from 'bcryptjs';

export async function hashToken(token: string) {
    return await bcrypt.hash(token, 10);
}

export async function compareToken(token: string, hash: string) {
    return await bcrypt.compare(token, hash);
}

// aes.ts
import { randomBytes, createCipheriv, createDecipheriv, pbkdf2Sync } from "node:crypto";

const ALGO = "aes-256-gcm";
const IV_LEN = 12;           // GCM standard
const SALT_LEN = 16;         // good default
const KEY_LEN = 32;          // 256-bit
const PBKDF2_ITERS = 210_000;
const PBKDF2_DIGEST = "sha256";

/**
 * Encrypts UTF-8 text with a passphrase. Returns a compact token string.
 * Format: v1.<saltB64>.<ivB64>.<ciphertextB64>.<tagB64>
 */
export function encrypt(plaintext: string, passphrase: string): string {
  const salt = randomBytes(SALT_LEN);
  const key = pbkdf2Sync(passphrase, salt, PBKDF2_ITERS, KEY_LEN, PBKDF2_DIGEST);
  const iv = randomBytes(IV_LEN);

  const cipher = createCipheriv(ALGO, key, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return [
    "v1",
    salt.toString("base64"),
    iv.toString("base64"),
    ciphertext.toString("base64"),
    tag.toString("base64"),
  ].join(".");
}

/**
 * Decrypts a token produced by encrypt().
 * Throws if the passphrase is wrong or data was tampered with.
 */
export function decrypt(token: string, passphrase: string): string {
  const [ver, saltB64, ivB64, ctB64, tagB64] = token.split(".");
  if (ver !== "v1") throw new Error("Unsupported token version");

  const salt = Buffer.from(saltB64, "base64");
  const iv = Buffer.from(ivB64, "base64");
  const ciphertext = Buffer.from(ctB64, "base64");
  const tag = Buffer.from(tagB64, "base64");

  const key = pbkdf2Sync(passphrase, salt, PBKDF2_ITERS, KEY_LEN, PBKDF2_DIGEST);
  const decipher = createDecipheriv(ALGO, key, iv);
  decipher.setAuthTag(tag);

  const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
  return plaintext;
}

// Example usage:
// const token = encrypt("hello world", "my strong passphrase");
// const text = decrypt(token, "my strong passphrase"); // -> "hello world"