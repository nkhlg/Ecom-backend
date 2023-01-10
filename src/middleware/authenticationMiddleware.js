const ResponseModel = require('../utilities/responseModel');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client("22805011057-sfgcohpdbgp7a0gaq229o0coqlcofrhq.apps.googleusercontent.com");
const { User } =require('../models/models');

module.exports = (req, res, next) => {
    if(req.url=='/home'){
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
            req.user=payload
            
            const user=await User.findOne({where:{email:payload.email}})
            if (user==null){
             const user = await User.create({
              first_name: payload.given_name,
              last_name: payload.family_name,
              email: payload.email,
              image:payload.picture,
              token:token
             })
            }
            else{
              const user = await User.update({
                first_name: payload.given_name,
                last_name: payload.family_name,
                email: payload.email,
                image:payload.picture,
                token:token
               },
               { where: { email: payload.email } })
               

            }
           
          }
         
          try{
            verify()
          
         

            return next()
          }
          catch(err){
            return res.status(401).json(new ResponseModel(null, null, ['Unauthorized.']))
          }
        }

   
}