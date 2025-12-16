import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    media: {
      type: String, // file path: image or video
    },

    mediaType: {
      type: String,
      enum: ["image", "video"],
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // links to User model
      required: true,
    },
  },
  { timestamps: true }
);

const News = mongoose.model("News", newsSchema);
export default News;
