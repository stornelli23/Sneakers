const db = require("../database/models");
const Op = db.Sequelize.Op;

const mainControllers = {
    index: async (req, res) => {
        let logueado = req.session.userLogged;
        
        let descuentos = await db.Product.findAll({
            where: {
                discount: {
                    [Op.gt]: 0,
                },
            },
        });

        let destacados = await db.Product.findAll({
            where: {
                discount: {
                    [Op.lte]: 0,
                },
            },
        });
           
        res.render('index', {descuentos, destacados, logueado})  
        
    },
   
 
}

module.exports = mainControllers;