const wrapAsync = (fn) => {
    return (req, res, next) => {
      fn(req, res, next).catch(next);
    };
  };

const jwt = require('jsonwebtoken');
const AppError = require('./AppError'); 


const authenticate = wrapAsync(async (req, res, next) => {
    if (!req.cookies || !req.cookies.jwttoken) {
      return next(new AppError('Login first to access this resource.', 401));
    }
  
    const { jwttoken } = req.cookies;
  
    try {
      const verifytoken = jwt.verify(jwttoken, process.env.JWT_SECRET);
  
      const rootUser = await User.findById(verifytoken.id);
  
      if (!rootUser) {
        return next(new AppError('Invalid user', 403));
      }
  
      console.log('Token verified');
      req.rootUser = rootUser;
  
      next();
    } catch (err) {
      return next(new AppError('Invalid token', 403));
    }
  });
  
  module.exports.authenticate = authenticate;