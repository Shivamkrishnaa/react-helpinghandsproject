// to authenticcate user
const router = require("express").Router();
//@route     GET api/user/test
//@desc     Test user route
//@acess    public
router.get("/test", (req, res) => {
  res.json({ msg: "user route" });
});
module.exports = router;
