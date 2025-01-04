import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageTitle: {
      type: String,
    },
    imageDescription: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Image", ImageSchema);
