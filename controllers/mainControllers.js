const { error } = require('console');
const fs = require('fs')
const path = require('path');

const productFilePath = path.join(__dirname,'../data/products.json')
const productsJson = JSON.parse(fs.readFileSync(productFilePath, 'utf-8'))
const db = require('../database/models');
const Op = db.Sequelize.Op;

const mainControllers = {

    index: async (req, res) => {
        let logueado = req.session.userLogged ;
        let descuentos = await db.Product.findAll({
            where: {
               discount: {[Op.gt] : 0}
            }})
             
        let destacados =  await db.Product.findAll({
                where: {
                   discount: {[Op.lte] : 0}
                }})

           
        res.render('index', {descuentos, destacados, logueado})  
        
    },
    
    productCart: async (req, res) => {
        let logueado = req.session.userLogged ;
        let arrayCarrito = [];
        let carrito = req.session.arrayCarrito;
        let destacados =  await db.Product.findAll({
            where: {
               discount: {[Op.lte] : 0}
            }})
       
        if (carrito) {
          arrayCarrito = carrito
        } 

        let indice =  await db.Product.findByPk(req.params.id)
      
            if(indice){
                arrayCarrito.push(indice);
                req.session.arrayCarrito = arrayCarrito;
            }

            res.render('productCart', {arrayCarrito, destacados, carrito, logueado}) 
    },

    productCartDelete: async (req, res) => {
        let logueado = req.session.userLogged ;
        let id = req.params.id;
        let arrayCarrito = [];
        let carrito = req.session.arrayCarrito;
        let destacados =  await db.Product.findAll({
            where: {
               discount: {[Op.lte] : 0}
            }})
        
        if (carrito) {
            arrayCarrito = carrito
        }
        
        const indiceAEliminar = arrayCarrito.findIndex(elemento=>{ return elemento.id == id})
        if (indiceAEliminar != -1){
        arrayCarrito.splice(indiceAEliminar,1);
        req.session.arrayCarrito = arrayCarrito;
    }
        
        
        res.render('productCart', {arrayCarrito, destacados,carrito,logueado}) 
    },
    
    productDetail: async (req, res) => {
        let logueado = req.session.userLogged ;
        
        let destacados =  await db.Product.findAll({
            where: {
               discount: {[Op.lte] : 0}
            }})
        let productosFiltrados = await db.Product.findByPk(req.params.id);

            if(!productosFiltrados){
                res.send("Algo salió mal...")
            }else{

                res.render('productDetail', {productosFiltrados, destacados, logueado})
            }
    },
        
    createProduct: (req, res) => {
        let logueado = req.session.userLogged ;

        res.render('createProduct',{logueado})
    },

    store: async (req, res) => {

    let productos =  await db.Product.findAll();

        await db.Product.create({
            id: productos.length + 1,
            name: req.body.name,
            price: req.body.price ,
            discount: req.body.discount,
            description: req.body.description,
            brand_id: req.body.brand_id,
            image: req.body.image,
            category_id: req.body.category_id,
        })
        
        res.redirect('/')
        },

    editProduct: async (req, res) => {

        let logueado = req.session.userLogged ;

        let productToEdit =  await db.Product.findByPk(req.params.id)

        res.render('editProduct', {productToEdit, logueado})
        
    },
    editProductStore: async (req, res) => {

        await db.Product.update({
            
            name: req.body.name,
            price: req.body.price ,
            discount: req.body.discount,
            description: req.body.description,
            brand_id: req.body.brand_id,
            image: req.body.image,
            category_id: req.body.category_id,

        }, {
            where: {id: req.params.id}
        })

        res.redirect('/')
        
        // let image
        // if(req.files[0] != undefined){
        //     image = req.files[0].filename
        // } else {
        //     image = 'default-image.jpeg'
        // }
        // let id = req.params.id;
        // const indiceObjeto = productsJson.findIndex(elemento=>{ return elemento.product_id == id})
        
        // let editedProduct = {
            
        //     product_id : productsJson[indiceObjeto].product_id ,
        //     ...req.body,
        //     product_image : image ,
        //     product_discount : productsJson[indiceObjeto].product_discount
        // }
        
        
        // productsJson.splice(indiceObjeto, 1, editedProduct) ; 
        
        // fs.writeFileSync(productFilePath, JSON.stringify(productsJson));
   
        
        // res.redirect('/')
    },

    products: async (req, res) => {
        let logueado = req.session.userLogged ;
        let productos =  await db.Product.findAll();
        res.render('products', {productos, logueado})
    },

    delete: async (req,res) => {
        // let logueado = req.session.userLogged ;
        // let id = req.params.id
        // const indiceObjeto = productsJson.findIndex(elemento=>{ return elemento.product_id == id})
        // let productDelete = productsJson.splice(indiceObjeto, 1)
        await db.Product.destroy({
            where: { id: req.params.id}
        })
        
        // fs.writeFileSync(productFilePath, JSON.stringify(productsJson));
     
        res.redirect('/products')
    }
     
 
}

module.exports = mainControllers;