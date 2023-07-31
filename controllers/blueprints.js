import path from "path";
import { v4 as uuidv4 } from "uuid";
import asyncHandler from "../middlewares/async.js";
import Blueprint from "../models/Blueprint.js";

const createBlueprint = asyncHandler(async (req, res, next) => {
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

  file.name = `${uuidv4()}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse("Error uploading image", 500));
    }

    const blueprint = await Blueprint.create({
      name: req.body.name,
      description: req.body.description,
      image: file.name,
    });

    res.status(200).json({
      success: true,
      data: blueprint,
    });
  });
});

const getBlueprints = asyncHandler(async (req, res, next) => {
  const blueprints = await Blueprint.find();
  if (!blueprints) return next(new ErrorResponse("Blueprints not found", 404));

  res.status(200).json({ success: true, data: blueprints });
});

export { createBlueprint, getBlueprints };
