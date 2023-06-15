const express = require("express");

// `users-model.js` ve `posts-model.js` sayfalarına ihtiyacınız var
// ara yazılım fonksiyonları da gereklidir
const Users = require("./users-model");
const Posts = require("../posts/posts-model");
const middleware = require("../middleware/middleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  // TÜM KULLANICILARI İÇEREN DİZİYİ DÖNDÜRÜN
  try {
    const allUsers = await Users.get();
    res.json(allUsers);
    next();
  } catch (error) {
    next(error);
  }
});

router.get("/:id", middleware.validateUserId, (req, res, next) => {
  try {
    res.json(req.currentUser);
  } catch (error) {
    next(error);
  }
});

router.post("/", middleware.validateUser, async (req, res, next) => {
  try {
    const newUser = await Users.insert({ name: req.body.name });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  middleware.validateUserId,
  middleware.validateUser,
  async (req, res, next) => {
    try {
      const updatedUser = await Users.update(req.params.id, {
        name: req.body.name,
      });
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", middleware.validateUserId, async (req, res, next) => {
  try {
    await Users.remove(req.params.id);
    res.json(req.currentUser);
    next();
  } catch (error) {
    next(error);
  }
});

router.get("/:id/posts", middleware.validateUserId, async (req, res, next) => {
  try {
    res.json(await Users.getUserPosts(req.params.id));
    next();
  } catch (error) {
    next(error);
  }
});

router.post(
  "/:id/posts",
  middleware.validateUserId,
  middleware.validatePost,
  async (req, res, next) => {
    try {
      res
        .status(201)
        .json(
          await Posts.insert({ user_id: req.params.id, text: req.body.text })
        );
      next();
    } catch (error) {
      next(error);
    }
  }
);

// routerı dışa aktarmayı unutmayın

module.exports = router;
