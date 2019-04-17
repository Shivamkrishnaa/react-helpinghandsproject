// to authenticcate users
const passport = require("passport");
const secret = require("../../config/keys").secret;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = require("express").Router();
const gravatar = require("gravatar");
//load user model
const User = require("../../models/User");
//@route     GET api/users/test
//@desc     Test user route
//@acess    public
router.get("/test", (req, res) => {
  res.json({ msg: "user route" });
});
//@route  post api/users/register
//@desc   register user
//@acess  public
router.post("/register", (req, res) => {
  console.log(req.body.name);
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "email already exist" });
    }
    const avatar = gravatar.url(req.body.email, {
      s: "200", //size
      r: "pg", //rating
      d: "mm" //avatar
    });
    const newUser = new User({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      avatar,
      password: req.body.password
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        else {
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => {
              console.log(err);
            });
        }
      });
    });
  });
});
//@route  post api/users/login
//@desc   login user/returning token
//@acess  public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const phone = req.body.phone;

  const password = req.body.password;
  //find user by email
  User.findOne({ phone }).then(user => {
    //check for user
    if (!user) {
      res.status(400).json({ phone: "email not found" });
    }
    //check password
    bcrypt.compare(password, user.password).then(ismatch => {
      if (ismatch) {
        // res.json({ msg: "success" });
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; //create token using jwt
        //user matched
        //sign token
        jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
          res.json({ sucess: "token gen", token: "bearer " + token });
        });
      } else {
        res.status(400).json({ password: "wrong /invalid password" });
      }
    });
  });
});
//@route  Get api/users/current
//@desc   return current user
//@acess  protected
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ msg: "sucess" });
  }
);
module.exports = router;
