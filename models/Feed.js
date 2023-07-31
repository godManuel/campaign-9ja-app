import mongoose from "mongoose";

const Feed = mongoose.model(
  "Feed",
  mongoose.Schema({
    headline: String,
    description: String,
    tagline: String,
    datePosted: {
      type: Date,
      default: Date.now(),
    },
    image: String,
  })
);

export default Feed;
