import mongoose from "mongoose";

// Define the schema for comments (embedded within the blog schema)
const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Define the schema for the blog
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tags: { type: [String], default: [] },
  category: { type: String, required: true },
  images: { type: [String], default: [] }, // URLs of the images
  status: { type: String, enum: ["draft", "published"], default: "draft" },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  views: { type: Number, default: 0 },
  comments: { type: [commentSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Add a pre-save middleware to update the `updatedAt` field
blogSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the model
const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
