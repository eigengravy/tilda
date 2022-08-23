import mongoose from "mongoose";

const GistSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String },
    url: { type: String, required: true },
    public: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Gist", GistSchema);
