// to maintian  user posts
const router = require("express").Router();
//@route     GET api/post/test
//@desc     Test post route
//@acess    public
router.get("/test", (req, res) => {
  res.json({ msg: "pose route" });
});
module.exports = router;
