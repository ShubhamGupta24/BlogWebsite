const jwt = require("jsonwebtoken");
const User = require("../models/user-model");


// Always remember shubham for middleware will be needed 3 parameter: req,res,next and next is needed to go to the authcontroller
const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        // If you attempt to use an expired token, you'll receive a "401 Unauthorized HTTP" response.
        return res
            .status(401)
            .json({ message: "Unauthorized HTTP, Token not provided" });
    }
    console.log("Authoriztion", token);
    // Assuming token is in the format "Bearer <jwtToken>, Removing the "Bearer" prefix"
    const jwtToken = token.replace("Bearer", "").trim();
    console.log("from middleware", jwtToken);

    try {
        // Verifying the token
        const isVerified = jwt.verify(jwtToken, process.env.JWT_ACCESS_KEY);
        console.log("Hi authmiddleware Verified", isVerified);

        // getting the complete user details & also we don't want password to be sent
        const userData = await User.findOne({ email: isVerified.email }).select({
            password: 0,
        });
        // custom properties -->req(request) object that contains information about the request
        req.token = token;
        req.user = userData;
        req.userID = userData._id;

        // Moving on to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ message: `Unauthorized. Invalid token ${error}` });
    }
};


module.exports = authMiddleware;