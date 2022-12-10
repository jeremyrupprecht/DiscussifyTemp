const mongoose = require("mongoose");
const User = require("./schemas/User");
const Post = require("./schemas/Post");

const COLLECTION_NAME = "dev";
const DB_USERNAME = "seng513g26dev";
const DB_PASSWORD = "seng513g26dev";

// Initializing database connection
mongoose.set("strictQuery", true);
const db = mongoose
  .connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.x0oyajv.mongodb.net/${COLLECTION_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .catch((err) => console.log(err));

// Success: Returns true
// Failure: Returns false
async function createUser(user) {
  try {
    await user.save();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Success: Returns user object, could also be null if no user
// Failure: Returns null
async function getUser(username) {
  try {
    return await User.findOne({ username: username });
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Success: Returns true
// Failure: Returns false
async function updateUser(username, newUser) {
  try {
    let user = await getUser(username);
    if (user) {
      user.username = newUser.username;
      user.password = newUser.password;
      await user.save();
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Success: Returns true
// Failure: Returns false
async function deleteUser(username) {
  try {
    const result = await User.deleteOne({ username: username });
    if (result.deletedCount > 0) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}
