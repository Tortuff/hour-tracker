import { pbkdf2, randomBytes } from 'crypto';

class Service {
  length = +process.env.CRYPTO_LENGTH;
  digest = process.env.CRYPTO_DIGEST;
  iterations = process.env.NODE_ENV === 'production' ? 11_632 : 1;

  constructor() {
    if (typeof this.length !== 'number' || isNaN(this.length) || !this.digest) {
      console.error('"CRYPTO_LENGTH" or "CRYPTO_DIGEST" does not exsit in the dotenv file');
      process.abort();
    }
  }

  generateSalt() {
    return new Promise((resolve, reject) => {
      randomBytes(this.length, (err, buffer) => {
        if (err) return reject(err);
        resolve(buffer.toString('hex'));
      });
    });
  }

  generatePassword(salt, password) {
    return new Promise((resolve, reject) => {
      pbkdf2(password, salt, this.iterations, this.length, this.digest, (err, key) => {
        if (err) return reject(err);
        resolve(key.toString('hex'));
      });
    });
  }

  async hasEqualPasswords(input, passwordToCompare) {
    if (!(input.password && input.salt)) {
      this.logger.warn(`The input does not have password or salt`);
      return false;
    }

    return (await this.generatePassword(input.salt, passwordToCompare)) === input.password;
  }
}

export const CryptoService = new Service();
