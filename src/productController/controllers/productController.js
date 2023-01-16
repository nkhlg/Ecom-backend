const { Product } = require('../../models/models');
const ResponseModel = require('../../utilities/responseModel');
const { Op, Sequelize } = require("sequelize");



module.exports.add = async (req, res) => {
let {name,price,image}=req.body

  await Product.create({
        name,
        price: parseInt(req.body.price),
        image
      

    }).then(data=>{
        console.log(data)
        res.json(new ResponseModel('Success'));
    })
   
    
}
module.exports.view = async (req, res) => {
     let filter
     let {min,max,sort}=req.query
    if(req.query)
    {
        if(sort=='asc')
        {
        filter={order: [ ['price','ASC' ]]}
        }
        else if(sort=='desc')
        {
            filter={order: [ ['price','DESC' ]]} 
            
        }
        if(min && max && sort)   
        {
         filter  = {
           where: {
                price: {
                  [Op.between]: [parseInt(min),parseInt(max)]  
                }
              },
              order: [ ['price',sort ]]
    
            }
        }  
        else if(min && sort)   
        {
         filter  = {
           where: {
                price: {
                  [Op.gte]: min
                }
              },
              order: [ ['price',sort ]]
            }
        } 
        else if(max && sort)   
        {
         filter  = {
           where: {
                price: {
                  [Op.lte]: max
                }
              },
              order: [ ['price',sort ]]
            }
        }  
            
    }
    
    const productData=await Product.findAll(filter).then(data=>{

        
         
         res.json(new ResponseModel(data));
     })
     
    
     
 }
 

