const { User } = require('../../models/models');
const ResponseModel = require('../../utilities/responseModel');



module.exports.profile = async (req, res) => {


    console.log(req.user);
    const userData = await User.findOne(
        {
            where: {
    
               email:req.user.email
            }
        }
    )
   
    res.json(new ResponseModel(userData));
}


