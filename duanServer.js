const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("./database");
const User = require("./schemas/User");
const Community = require("./schemas/Community");
const Post = require("./schemas/Post");
const Comment = require("./schemas/Comment");

// This is for demo purposes, should be stored in .env file
const SESSION_SECRET = "secret";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.initDBConnection();

passport.use(
  new LocalStrategy(async (username, password, cb) => {
    //console.log("CHECKING")
    const user = await db.getUser(username);
    if (user && password === user.password) {
      return cb(null, user);
    } else {
      return cb(null, false);
    }
  })
);

passport.serializeUser((user, cb) => {
  //console.log("Seralize!")
  cb(null, user.username);
});

passport.deserializeUser(async (username, cb) => {
  const user = await db.getUser(username);
  if (user) {
    return cb(null, user);
  } else {
    return cb(null, false);
  }
});

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create(mongoose.connection),
    cookie: {
      maxAge: 86400000, // 24 hrs
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Debug
// app.use((req, res, next) => {
//   console.log(req.session);
//   console.log(req.user);
//   next();
// });


// endpoints from old server file

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/index.html');
})

app.get('/style.css', (req, res) => {
  res.sendFile(__dirname + '/style.css');
})

app.get('/style2.css', (req, res) => {
  res.sendFile(__dirname + '/style2.css');
})

app.get('/style3.css', (req, res) => {
  res.sendFile(__dirname + '/style3.css');
})

app.get('/mainPage.html', (req, res) => {
  res.sendFile(__dirname + '/mainPage.html');
})

app.get('/mainPage.js', (req, res) => {
  res.sendFile(__dirname + '/mainPage.js');
})

app.get('/loged_in.js', (req, res) => {
  res.sendFile(__dirname + '/loged_in.js');
})

app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.get('/signup.html', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
})

app.get('/communScript.js', (req, res) => {
  res.sendFile(__dirname + '/communScript.js');
})

app.get('/Coding-Tips', (req, res) => {
  res.sendFile(__dirname + '/community.html');
})

app.get('/Study-Room', (req, res) => {
  res.sendFile(__dirname + '/community.html');
})

app.get('/UofC', (req, res) => {
  res.sendFile(__dirname + '/community.html');
})

app.get('/SENG513', (req, res) => {
  res.sendFile(__dirname + '/community.html');
})

app.get('/SENG-Courses', (req, res) => {
  res.sendFile(__dirname + '/community.html');
})

app.get('/UserProfile.html', (req, res) => {
  res.sendFile(__dirname + '/UserProfile.html');
})
app.get('/forgotpw.html', (req, res) => {
  res.sendFile(__dirname + '/forgotpw.html');
})

// ----- User related endpoints ------

app.post("/signup", async (req, res, next) => {
  const user = await db.getUser(req.body.username);
  if (user) {
    return res.status(409).send({ msg: "Username is already taken." });
  }

  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    communitiesOwned: [],
    communitiesFollowed: [],
  });

  console.log("User created: " + req.body.username + " password: " + req.body.password)

  const userCreated = await db.createUser(newUser);
  if (userCreated) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ msg: "success!" }));
    //res.send()
  } else {
    res.redirect("/server-error");
  }
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
    successRedirect: "/login-success",
  }),
  (err, req, res, next) => {
    if (err) {
      next(err);
    }
  }
);

app.use("/login-success", (req, res, next) => {
  
  // redirect user to main page
  
  //res.sendFile(__dirname + '/mainPage.html');
  res.send();
  console.log('LOGIN SUCCESS')
});

app.use("/login-failure", (req, res, next) => {
  res.status(401).send()
  console.log('LOGIN FAILURE')
});

app.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.send();
  });
});

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send({ msg: "You are not authenticated. Please log in." });
  }
};

const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin) {
    next();
  } else {
    res
      .status(401)
      .send({ msg: "You are not authorized because you are not an admin." });
  }
};

app.get("/get-account", isAuthenticated, async (req, res, next) => {
  const user = await db.getUser(req.user.username);
  res.send(user);
});

app.post("/update-account", isAuthenticated, async (req, res, next) => {
  const update = {};
  if (req.body.password) update.password = req.body.password;
  if (req.body.communitiesOwned)
    update.communitiesOwned = req.body.communitiesOwned;
  if (req.body.communitiesFollowed)
    update.communitiesFollowed = req.body.communitiesFollowed;

  const userUpdated = await db.updateUser(req.user.username, update);
  if (userUpdated) {
    const user = await db.getUser(req.user.username);
    res.send(user);
  } else {
    res.redirect("/server-error");
  }
});

app.delete("/delete-account", isAuthenticated, async (req, res, next) => {
  const userDeleted = await db.deleteUser(req.user.username);
  if (userDeleted) {
    res.send();
  } else {
    res.redirect("/server-error");
  }
});

// ----- Community related endpoints ------

app.post("/create-community", isAdmin, async (req, res, next) => {
  const community = await db.getCommunity(req.body.name);
  if (community) {
    return res.status(409).send({ msg: "Community already exists." });
  }

  const newCommunity = new Community({
    name: req.body.name,
    owner: req.user.username,
  });

  const communityCreated = await db.createCommunity(newCommunity);
  if (communityCreated) {
    res.send();
  } else {
    res.redirect("/server-error");
  }
});

app.get("get-community", async (req, res, next) => {
  const community = await db.getCommunity(req.body.name);
  res.send(community);
});

app.delete("/delete-community", isAdmin, async (req, res, next) => {
  const communityDeleted = await db.deleteCommunity(req.body.name);
  // TODO: Need to delete all posts and comments under the community too
  if (communityDeleted) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.send();
    });
  } else {
    res.redirect("/server-error");
  }
});

// ----- Post related endpoints ------

app.post("/create-post", isAuthenticated, async (req, res, next) => {
  const newPost = new Post({
    author: req.user.username,
    community: req.body.community,
    title: req.body.title,
    body: req.body.body,
    rating: 0,
  });

  const postCreated = await db.createPost(newPost);
  if (postCreated) {
    res.send();
  } else {
    res.redirect("/server-error");
  }
});

app.get("get-user-posts", isAuthenticated, async (req, res, next) => {
  const userPosts = await db.getUserPosts(req.user.username);
  res.send(userPosts);
});

app.get("get-community-posts", async (req, res, next) => {
  const communityPosts = await db.getCommunityPosts(req.body.community);
  res.send(communityPosts);
});

app.delete("/delete-post", isAuthenticated, async (req, res, next) => {
  const post = await db.getPost(req.body.postId);
  if (post & (post.author !== req.user.username)) {
    return res
      .status(403)
      .send({
        msg: "You do not have permission to delete a post that you don't own.",
      });
  }

  const postDeleted = await db.deletePost(req.body.postId);
  // TODO: Need to delete all comments under the posts too
  if (postDeleted) {
    res.send();
  } else {
    res.redirect("/server-error");
  }
});

// ----- Error related endpoints ------

app.use("/server-error", (req, res, next) => {
  res.status(500).send({ msg: "An error has occurred. Please try again." });
});

app.listen(3000);
