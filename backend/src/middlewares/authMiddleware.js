import { connectRedis, redisClient } from '../config/redis.js';
import jwt from 'jsonwebtoken';

// Middleware to authenticate requests using JWT (JSON Web Token)
const authMiddleware = async (req, res, next) => {
  // Retrieve the 'Authorization' header from the request
  const authHeader = req.headers['authorization'];

  // Check if the 'Authorization' header is present
  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' }); // Respond with 401 if no token is provided
  }

  // Extract the token from the 'Authorization' header
  const token = authHeader.split(' ')[1];
  // Ensure the token is not malformed or missing
  if (!token) {
    return res.status(401).json({ message: 'Token malformado' }); // Respond with 401 if the token is malformed
  }
  
  try {
    connectRedis();
    const isBlacklisted = await redisClient.get(`blacklist:${token}`);
    if (isBlacklisted) {
      return res
      .status(401)
      .json({ message: 'Expired Token'});
    }
    

    // Verify the token using the secret key from the environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Pass control to the next middleware or route handler
    next();
  } catch (error) {
    // Respond with 401 if the token is invalid or verification fails
    res.status(401).json({ message: 'Token inválido', error: error.message });
  }
};

export default authMiddleware;
