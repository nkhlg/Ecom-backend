const ResponseModel = require('../utilities/responseModel');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client("22805011057-sfgcohpdbgp7a0gaq229o0coqlcofrhq.apps.googleusercontent.com");
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
    if(token){
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: "22805011057-sfgcohpdbgp7a0gaq229o0coqlcofrhq.apps.googleusercontent.com", 
          
            });
            const payload = ticket.getPayload();
            console.log(payload)
           
           
          }
          try{
            verify()
            return next()
          }
          catch(e){
            return res.status(401).json(new ResponseModel(null, null, ['Unauthorized.']))
          }
        }

   
}