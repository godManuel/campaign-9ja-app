import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middlewares/async.js";
import User from "../models/User.js";

const register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(200).json({ success: true, data: user });
});

const login = asyncHandler(async (req, res, next) => {
  if (!req.body.handle || !req.body.password) {
    return next(
      new ErrorResponse("Please enter your handle and password", 400)
    );
  }

  const user = await User.findOne({ handle: req.body.handle });
  if (!user) return next(new ErrorResponse("Credentials invalid", 401));

  const isMatch = await user.matchPassword(req.body.password);
  if (!isMatch) return next(new ErrorResponse("Credentials invalid", 401));

  const token = user.getSignedToken();
  await user.save();

  res.status(200).json({
    success: true,
    data: token,
  });
});

export { register, login };
