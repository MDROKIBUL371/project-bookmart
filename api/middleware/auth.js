const jwt = require('jsonwebtoken');
const config = require('../../config');

const { JWT_SECRET } = config;

module.exports = (req, res, next) => {
   const token = req.header('Authorization');

   // Token check
   if (!token) {
      return res.status(401).json({
         msg: 'Authorization required',
      });
   }

   try {
      // Token verification
      const decoded = jwt.verify(token, JWT_SECRET);

      // Attach decoded data to the request
      req.user = decoded;
      next();
   } catch (error) {
      res.status(400).json({
         msg: 'Token is not valid',
         error,
      });
   }
};
