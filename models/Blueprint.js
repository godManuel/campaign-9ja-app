import mongoose from "mongoose";

const Blueprint = mongoose.model(
  "Blueprint",
  mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      image: String,
    },
    { timestamps: true }
  )
);

export default Blueprint;
