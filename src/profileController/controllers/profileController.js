let { User } = require("../../models/models");
let ResponseModel = require("../../utilities/responseModel");

module.exports.profile = async (req, res) => {
  let {email}=req.user
  let userData = await User.findOne({
    where: {
      email
    },
  });

  res.json(new ResponseModel(userData));
};
