import mongoose, { Schema } from "mongoose";
import { models } from "mongoose";
const PostSchema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    linkedin: { type: String },
    email: { type: String, required: true },
    src: { type: String },
    type: { type: String, enum: ["Mentor", "Ekip Arkadaşı"], required: true },
    // TODO: KONUM VE EĞİTİM SEVİYESİ
    loggedEmail: { type: String, required: true },
    location: { type: String, required: false },
    educationLevels: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export default models.Post || mongoose.model("Post", PostSchema);
