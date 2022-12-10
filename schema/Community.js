const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommunitySchema = new Schema(
  {
    owner: { type: String, required: true },
    postsId: { type: [String], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Community", CommunitySchema);
