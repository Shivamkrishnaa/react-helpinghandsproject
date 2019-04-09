// to maintain user bio data pervious orders
const router = require("express").Router();

//@route     GET api/profile/test
//@desc     Test profile route
//@acess    public
router.get("/test", (req, res) => {
  res.json({ msg: "profile route" });
});
module.exports = router;
