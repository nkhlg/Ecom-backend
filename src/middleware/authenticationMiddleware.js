const ResponseModel = require('../utilities/responseModel');


module.exports = (req, res, next) => {
    if(req.url=='/'){
        return next();
    }

    let token = req.headers['authorization'];
    token = token ? token.split(' ')[1] : null;

    if(!token){
        return res.status(401)
            .json(new ResponseModel(null, null, ['Unauthorized.']));
    }

   
}