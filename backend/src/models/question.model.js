import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },

    solutions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Solution",
      },
    ],
  },

  {
    timestamps: true,
  }
);

export const Question = mongoose.model("Question", questionSchema);
