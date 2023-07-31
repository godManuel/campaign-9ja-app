import mongoose from "mongoose";

const PreviousAchievement = mongoose.model(
  "PreviousAchievement",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
      date_completed: String,
      aspirant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Aspirant",
      },
    },
    { timestamps: true }
  )
);

export default PreviousAchievement;
