const jwt = require('jsonwebtoken');
const cryptoService = require('../crypto/Crypto');

class JwtAuth {
    constructor() {
        this.accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
        this.refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
        this.tokenLife = process.env.JWT_TOKEN_LIFE;
    }

    generateAccessToken(payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const encryptedUserData = await cryptoService.encrypt(JSON.stringify(payload));

                jwt.sign(
                    encryptedUserData,
                    this.accessTokenSecret,
                    {
                        algorithm: 'HS256',
                        // expiresIn: this.tokenLife
                    },
                    (err, token) => {
                        if (err) reject(err);
                        else resolve(token);
                    }
                );
            } catch (err) {
                reject(err);
            }
        });
    }

    generateRefreshToken(user) {
        return new Promise((resolve, reject) => {
            jwt.sign(
                { _id: user._id },
                this.refreshTokenSecret,
                { algorithm: 'HS256' },
                (err, token) => {
                    if (err) reject(err);
                    else resolve(token);
                }
            );
        });
    }

    verify(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.accessTokenSecret, async (err, encryptedUser) => {
                try {
                    if (err) return reject(err);

                    const user = await cryptoService.decrypt(encryptedUser);
                    resolve(JSON.parse(user));
                } catch (err) {
                    reject(err);
                }
            });
        })
    }

    generateExpiredAccessToken(user) {
        return new Promise((resolve, reject) => {
            jwt.sign(
                user,
                this.accessTokenSecret,
                { expiresIn: '-10s' },
                (err, token) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(token);
                    }
                });
        })
    }

}

module.exports = new JwtAuth;