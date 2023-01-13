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
        if(req.query.min && req.query.max && req.query.sort)   
        {
         var filter  = {
           where: {
                price: {
                  [Op.between]: [parseInt(req.query.min),parseInt(req.query.max)]  
                }
              },
              order: [ ['price',req.query.sort ]]
    
            }
        }  
        else if(req.query.min && req.query.sort)   
        {
         var filter  = {
           where: {
                price: {
                  [Op.gte]: req.query.min
                }
              },
              order: [ ['price',req.query.sort ]]
            }
        } 
        else if(req.query.max && req.query.sort)   
        {
         var filter  = {
           where: {
                price: {
                  [Op.lte]: req.query.max
                }
              },
              order: [ ['price',req.query.sort ]]
            }
        }  
            
    }
    
    const productData=await Product.findAll(filter).then(data=>{

        
         
         res.json(new ResponseModel(data));
     })
     
    
     
 }
 

