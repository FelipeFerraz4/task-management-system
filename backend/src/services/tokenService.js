import jwt from 'jsonwebtoken';
import redisClient from '../config/redis.js';

export const addToBlockList = async (token) => {
    try {
        const decoded =jwt.decode(token);
        const expiration = decoded.exp;

        const timeToExpire = expiration - Math.floor(Date.now() / 1000);

        if (timeToExpire > 0) {
            await redisClient.set(`blacklist:${token}`, 'true', {
                EX: timeToExpire,
            });
        }
    } catch (error) {
        console.error('Erro ao adicionar token à blacklist: ', error);
    }
}