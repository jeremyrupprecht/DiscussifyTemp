const mongoose = require("mongoose");
const User = require("./schemas/User");
const Post = require("./schemas/Post");

const COLLECTION_NAME = "dev";
const DB_USERNAME = "seng513g26dev";
const DB_PASSWORD = "seng513g26dev";

mongoose.set("strictQuery", true);
const db = mongoose
  .connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.x0oyajv.mongodb.net/${COLLECTION_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .catch((error) => console.log(error));

// Test code to save a user
const user = new User({
  email: "email",
  password: "password",
});
user.save();

// TODO: Create functions for CRUD operations of the different models
