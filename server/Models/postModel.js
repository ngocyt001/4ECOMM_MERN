import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: "string", required: true },
    desc: String,
    likes: [],
    image: String,
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Posts", postSchema);
export default PostModel;
