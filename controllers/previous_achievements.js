import path from "path";
import { v4 as uuidv4 } from "uuid";
import asyncHandler from "../middlewares/async.js";
import ErrorResponse from "../utils/errorResponse.js";
import PreviousAchievement from "../models/PreviousAchievement.js";
import Aspirant from "../models/Aspirant.js";

const createProject = asyncHandler(async (req, res, next) => {
  let aspirant = await Aspirant.findById(req.body.aspirant);
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

  file.name = `${uuidv4()}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse("Error uploading image", 500));
    }

    const project = await PreviousAchievement.create({
      name: req.body.name,
      location: req.body.location,
      image: file.name,
      dateCompleted: req.body.dateCompleted,
      aspirant: req.body.aspirant,
    });

    aspirant.previous_achievements.unshift(project);
    await aspirant.save();

    res.status(200).json({
      success: true,
      data: project,
    });
  });

  // const project = await PreviousAchievements.create(req.body);
  // res.status(200).json({ success: true, data: project });
});

const getProjects = asyncHandler(async (req, res, next) => {
  const projects = await PreviousAchievement.findOne({
    aspirant: req.params.aspirantId,
  });
  if (!projects)
    return next(
      new ErrorResponse("Aspirant has no previous project uploaded!", 404)
    );
  res.status(200).json({ success: true, data: projects });
});

export { createProject, getProjects };
