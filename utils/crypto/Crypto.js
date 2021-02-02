const crypto = require("crypto");

/**
 * PasswordEncoderDecoder class
 * Encoder function Encrypt password using security key and aes-256-cbc alogorithm.
 * Decoder function Decrypt password by using security key
 */
class Crypto {
    constructor() {
        this.CRYPTO_PASSWORD = process.env.CRYPTO_PASSWORD;
        this.CRYPTO_PASSWORD_2 = process.env.CRYPTO_PASSWORD_2;
    }

    /**
     * Encrypts Password using Securities Key and aes-256-cbc Alogorithm.
     *
     * @param {String} text to be encrypted.
     * @param {String} key Securities Key.
     * @returns {Object} - error and encoded value.
     * @default error
     * @memberof PasswordEncoderDecoder
     */
    encrypt(text) {
        try {
            const IV_LENGTH = 16 // For AES, this is always 16
            let iv = crypto.randomBytes(IV_LENGTH)
            let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(this.CRYPTO_PASSWORD), iv)
            let encrypted = cipher.update(text)

            encrypted = Buffer.concat([encrypted, cipher.final()])
            return Promise.resolve(iv.toString('hex') + ':' + encrypted.toString('hex'));
        } catch (err) {
            return Promise.reject(err);
        }
    }

    /**
     * Decrypts password using security key.
     *
     * @param {String} text to be decrypted.
     * @param {String} key Securities Key.
     * @returns {Object} - error and decoded value.
     * @default error
     * @memberof PasswordEncoderDecoder
     */
    decrypt(text) {
        try {
            let textParts = text.split(':')
            let iv = Buffer.from(textParts.shift(), 'hex')
            let encryptedText = Buffer.from(textParts.join(':'), 'hex')
            let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.CRYPTO_PASSWORD), iv)
            let decrypted = decipher.update(encryptedText)

            decrypted = Buffer.concat([decrypted, decipher.final()])

            return Promise.resolve(decrypted.toString());
        } catch (err) {
            return Promise.reject(err);
        }
    }

    staticEncrypter(text) {
        try {
            const iv = Buffer.alloc(16, 0);
            const algorithm = "aes-192-cbc"; //algorithm to use
            const key = crypto.scryptSync(this.CRYPTO_PASSWORD, 'salt', 24); //create key

            const cipher = crypto.createCipheriv(algorithm, key, iv);
            const encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex'); // encrypted text

            return Promise.resolve(encrypted);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    staticDecrypter(encryptedText) {
        try {
            const iv = Buffer.alloc(16, 0);
            const algorithm = "aes-192-cbc"; //algorithm to use
            const key = crypto.scryptSync(this.CRYPTO_PASSWORD, 'salt', 24); //create key

            const decipher = crypto.createDecipheriv(algorithm, key, iv);
            const decrypted = decipher.update(encryptedText, 'hex', 'utf8') + decipher.final('utf8'); //deciphered text

            return Promise.resolve(decrypted);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    doubleStaticEncrypter(text) {
        try {
            const iv = Buffer.alloc(16, 0);
            const algorithm = "aes-192-cbc"; //algorithm to use
            const key1 = crypto.scryptSync(process.env.CRYPTO_PASSWORD, 'salt', 24);
            const key2 = crypto.scryptSync(process.env.CRYPTO_PASSWORD_2, 'salt', 24);

            const cipher1 = crypto.createCipheriv(algorithm, key1, iv);
            const encrypted1 = cipher1.update(text, 'utf8', 'hex') + cipher1.final('hex');

            const cipher2 = crypto.createCipheriv(algorithm, key2, iv);
            const encrypted2 = cipher2.update(encrypted1, 'utf8', 'hex') + cipher2.final('hex');

            return Promise.resolve(encrypted2);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    doubleStaticDecrypter(doubleEncryptedText) {
        try {
            const iv = Buffer.alloc(16, 0);
            const algorithm = "aes-192-cbc"; //algorithm to use
            const key1 = crypto.scryptSync(process.env.CRYPTO_PASSWORD, 'salt', 24);
            const key2 = crypto.scryptSync(process.env.CRYPTO_PASSWORD_2, 'salt', 24);

            const decipher1 = crypto.createDecipheriv(algorithm, key1, iv);
            const decrypted1 = decipher1.update(doubleEncryptedText, 'hex', 'utf8') + decipher1.final('utf8');

            const decipher2 = crypto.createDecipheriv(algorithm, key2, iv);
            const decrypted2 = decipher2.update(decrypted1, 'hex', 'utf8') + decipher2.final('utf8');

            return Promise.resolve(decrypted2);
        } catch (err) {
            return Promise.reject(err);
        }
    }
}

module.exports = new Crypto;


let staticEncrypter = (text) => {
    try {
        const iv = Buffer.alloc(16, 0);
        const algorithm = "aes-192-cbc"; //algorithm to use
        const key = crypto.scryptSync(process.env.CRYPTO_PASSWORD, 'salt', 24); //create key

        const cipher = crypto.createCipheriv(algorithm, key, iv);
        const encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex'); // encrypted text

        return Promise.resolve(encrypted);
    } catch (err) {
        return Promise.reject(err);
    }
}

let staticDecrypter = (encryptedText) => {
    try {
        const iv = Buffer.alloc(16, 0);
        const algorithm = "aes-192-cbc"; //algorithm to use
        const key = crypto.scryptSync(process.env.CRYPTO_PASSWORD, 'salt', 24); //create key

        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        const decrypted = decipher.update(encryptedText, 'hex', 'utf8') + decipher.final('utf8'); //deciphered text

        return Promise.resolve(decrypted);
    } catch (err) {
        return Promise.reject(err);
    }
}


// (async()=>{
// console.log(await staticEncrypter('6261036039'),'===========================');
// })()


// (async () => {
//     console.log(await staticDecrypter('96516f504d9f5b86dabd3238fdb4ac5b25cf6dd892144b9e3f6c4e679e628626'), '===========================');
// })()