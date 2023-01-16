const ResponseModel = require("../utilities/responseModel");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_ID);
const { User } = require("../models/models");

module.exports = async (req, res, next) => {
  
  if (req.url.startsWith("/product")) {
    return next();
  }

  let token = req.headers["authorization"];
  token = token ? token.split(" ")[1] : null;

  if (token == "null") {
    return res
      .status(401)
      .json(new ResponseModel(null, null, ["Unauthorized."]));
  }

  if (!token) {
    return res
      .status(401)
      .json(new ResponseModel(null, null, ["Unauthorized."]));
  }
  if (token) {
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_ID,
      });

      const payload = ticket.getPayload();
      let { email, given_name, family_name, picture } = payload;
      req.user = { email };

      const user = await User.findOne({ where: { email } });
      if (user == null) {
        await User.create({
          first_name: given_name,
          last_name: family_name,
          email,
          image: picture,
          token,
        });
      } else {
        await User.update(
          {
            first_name: given_name,
            last_name: family_name,
            image: picture,
            token,
          },
          { where: { email } }
        );
      }
    }

    try {
      await verify();

      return next();
    } catch (err) {
      return res
        .status(401)
        .json(new ResponseModel(null, null, ["Unauthorized."]));
    }
  }
};
