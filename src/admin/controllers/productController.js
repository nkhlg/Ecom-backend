const { Product } = require('../../models/models');
const ResponseModel = require('../../utilities/responseModel');
const { Op, Sequelize } = require("sequelize");



module.exports.add = async (req, res) => {


   const val=await Product.create({
        name: req.body.name,
        price: parseInt(req.body.price),
        image: req.body.image,
      

    }).then(data=>{
        console.log(data)
        res.json(new ResponseModel('Success'));
    })
   
    
}
module.exports.view = async (req, res) => {

    if(req.query)
    {
        if(req.query.sort=='asc')
        {
        var filter={order: [ ['price','ASC' ]]}
        }
        else if(req.query.sort=='desc')
        {
            var filter={order: [ ['price','DESC' ]]} 
            
        }
        else if(req.query.min && req.query.max)   
        {
         var filter  = {
           where: {
                price: {
                  [Op.between]: [parseInt(req.query.min),parseInt(req.query.max)]
                
                }
              }
            }
        }  
        else if(req.query.min)   
        {
         var filter  = {
           where: {
                price: {
                  [Op.gte]: req.query.min
                }
              }
            }
        } 
        else if(req.query.max)   
        {
         var filter  = {
           where: {
                price: {
                  [Op.lte]: req.query.max
                }
              }
            }
        }  
            
    }
    
    const productData=await Product.findAll(filter).then(data=>{

        
         
         res.json(new ResponseModel(data));
     })
     
    
     
 }
 

