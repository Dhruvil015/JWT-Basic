const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");


const authenticationMiddlware = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new ApiError(httpStatus.UNAUTHORIZED, 'no token provided.')
    }
    token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {id, username} = decoded
        req.user = {id, username}
        next()
    } catch (error) {
        res.status(401).json({msg : 'Not authorized to access this route.'})
        // throw new ApiError(httpStatus.UNAUTHORIZED, 'Not authorized to access this route.')      
    }
    
}


module.exports = authenticationMiddlware