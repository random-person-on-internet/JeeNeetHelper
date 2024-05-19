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

    options: {
      type: [String],
      required: true,
      validator: {
        validator: options.length === 4,
        message: "Question must have exactly 4 options",
      },
    },

    answerIndex: {
      type: Number,
      required: true,
      validaor: (value) => value >= 0 && value < 4,
      message: "answerIndex must be between 0 and 3 (inclusive)",
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
