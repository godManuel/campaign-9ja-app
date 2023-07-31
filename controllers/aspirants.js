import path from "path";
import asyncHandler from "../middlewares/async.js";
import Aspirant from "../models/Aspirant.js";
import ErrorResponse from "../utils/errorResponse.js";

const createAspirant = asyncHandler(async (req, res, next) => {
  const aspirant = await Aspirant.create(req.body);
  res.status(200).json({ success: true, data: aspirant });
});

const addAspirantAvatar = asyncHandler(async (req, res, next) => {
  let aspirant = await Aspirant.findById(req.params.id);
  if (!aspirant) return next(new ErrorResponse("Aspirant not found!", 404));

  if (!req.files) {
    return next(new ErrorResponse("Please upload a file", 400));
  }

  const file = req.files.file;

  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse("Please upload an image", 400));
  }

  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  file.name = `photo_${aspirant.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse("Error uploading image", 500));
    }

    aspirant = await Aspirant.findByIdAndUpdate(req.params.id, {
      avatar: file.name,
    });

    res.status(200).json({
      success: true,
      data: aspirant,
    });
  });
});

const getAspirants = asyncHandler(async (req, res, next) => {
  const aspirants = await Aspirant.find();
  res.status(200).json({ success: true, data: aspirants });
});

const getAspirant = asyncHandler(async (req, res, next) => {
  const aspirant = await Aspirant.findById(req.params.id).populate(
    "previous_achievements"
  );
  if (!aspirant) return next(new ErrorResponse("Aspirant not found", 404));

  res.status(200).json({ success: true, data: aspirant });
});

export { createAspirant, getAspirants, getAspirant, addAspirantAvatar };
