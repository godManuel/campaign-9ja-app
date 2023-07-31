import path from "path";
import { v4 as uuidv4 } from "uuid";
import asyncHandler from "../middlewares/async.js";
import Feed from "../models/Feed.js";
import ErrorResponse from "../utils/errorResponse.js";

const createFeed = asyncHandler(async (req, res, next) => {
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

    const feeds = await Feed.create({
      headline: req.body.headline,
      description: req.body.description,
      tagline: req.body.tagline,
      image: file.name,
    });

    res.status(200).json({
      success: true,
      data: feeds,
    });
  });
});

const getFeeds = asyncHandler(async (req, res, next) => {
  const feeds = await Feed.find();
  if (!feeds) return next(new ErrorResponse("Feeds not found!", 404));

  res.status(200).json({ success: true, data: feeds });
});

export { createFeed, getFeeds };
