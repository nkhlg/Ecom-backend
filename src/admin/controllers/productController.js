const { Product } = require('../../models/models');
const ResponseModel = require('../../utilities/responseModel');



module.exports.add = async (req, res) => {


   const val=await Product.create({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
      

    }).then(data=>{
        console.log(data)
        res.json(new ResponseModel('Success'));
    })
   
    
}
module.exports.view = async (req, res) => {


    const productData=await Product.findAll({
     }).then(data=>{
         console.log(data)
         res.json(new ResponseModel(data));
     })
    
     
 }
 

