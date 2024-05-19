import mongoose, { Schema } from "mongoose";
import { Question } from "./question.model";

const solutionSchema = new Schema(
  {
    content: {
      content: {
        type: String, // Explanation text
        or: [{ type: String }], // Cloudinary URL (optional)
      },
    },

    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },

    upvotes: {
      type: Number,
      required: true,
      default: 0,
    },

    downvotes: {
      type: Number,
      required: true,
      default: 0,
    },
  },

  {
    timestamps: true,
  }
);

export const Solution = mongoose.model("Solution", solutionSchema);
