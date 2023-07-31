import mongoose from "mongoose";

const Aspirant = mongoose.model(
  "Aspirant",
  mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    handle: String,
    party: {
      type: String,
      required: true,
    },
    aspiring_position: String,
    current_position: String,
    avatar: {
      type: String,
    },
    biography: String,
    previous_achievements: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PreviousAchievement",
      },
    ],
  })
);

export default Aspirant;
