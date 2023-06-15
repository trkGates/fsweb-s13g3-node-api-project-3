const Users = require("../users/users-model");

function logger(req, res, next) {}

async function validateUserId(req, res, next) {
  try {
    const user_id = await Users.getById(req.params.id);
    if (!user_id) {
      res.status(404).json({ message: "user not found" });
    } else {
      req.currentUser = user_id;
      next();
    }
  } catch (err) {
    next(err);
  }
}

function validateUser(req, res, next) {
  try {
    let { name } = req.body;
    if (!name) {
      res.status(400).json({ message: "gerekli name alanı eksik" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

function validatePost(req, res, next) {
  try {
    const user_post = req.body.text;
    if (!user_post) {
      res.status(400).json({ message: "gerekli text alanı eksik" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

// bu işlevleri diğer modüllere değdirmeyi unutmayın
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
