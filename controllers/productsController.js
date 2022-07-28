const fs = require('fs')
const path = require('path');

const productFilePath = path.join(__dirname,'../data/products.json')
const productsJson = JSON.parse(fs.readFileSync(productFilePath, 'utf-8'))
const db = require('../database/models');
const Op = db.Sequelize.Op;

const productsController = {

    productCart: (req, res) => {
        let logueado = req.session.userLogged ;
        let id = req.params.id;
        let arrayCarrito = [];
        let carrito = req.session.arrayCarrito;

        if (carrito) {
          arrayCarrito = carrito
        } 
        const indiceObjeto = productsJson.findIndex(elemento=>{ return elemento.product_id == id})
        console.log("------Indice Objeto--------")
        console.log(indiceObjeto)
        if (indiceObjeto != -1){
        arrayCarrito.push(productsJson[indiceObjeto]);
        req.session.arrayCarrito = arrayCarrito;
        }
        let destacados = productsJson.filter(product => product.product_discount <= 0);
        
        res.render('productCart', {arrayCarrito, destacados,carrito, logueado}); 
    },


    productCartDelete: (req, res) => {
        let logueado = req.session.userLogged ;
        let id = req.params.id;
        let arrayCarrito = [];
        let carrito = req.session.arrayCarrito;
        
        if (carrito) {
            arrayCarrito = carrito
        }
                
        const indiceAEliminar = arrayCarrito.findIndex(elemento=>{ return elemento.product_id == id})
        if (indiceAEliminar != -1){
        
        arrayCarrito.splice(indiceAEliminar,1);
       
        req.session.arrayCarrito = arrayCarrito;
        
    }
    let destacados = productsJson.filter(product => product.product_discount <= 0);
    
    res.render('productCart', {arrayCarrito, destacados,carrito,logueado});
    },


    productDetail: async (req, res) => {
        let logueado = req.session.userLogged ;
        let id = req.params.id;

        let destacados = await db.Product.findAll({
            where: {
                discount: {
                    [Op.lte]: 0,
                },
            },
        });

        await db.Product.findByPk(req.params.id)
        .then(producto => {
            res.render('productDetail', {productosFiltrados: producto, destacados, logueado})
        })
            
     
        //let productosFiltrados = productsJson.find(products => products.product_id == id)
        //let destacados = productsJson.filter(product => product.product_discount <= 0)
    },


    createProduct: (req, res) => {
        let logueado = req.session.userLogged ;
        res.render('createProduct',{logueado});
    },


    store: (req, res) => {
        let image
        if(req.files[0] != undefined){
        image = req.files[0].filename
        } else {
         image = 'default-image.jpeg'
        }

    let newProduct = {
        
        product_id: productsJson[productsJson.length-1].product_id+1,
        ...req.body,
        product_image : image
    }
    
    productsJson.push(newProduct) ;      
    fs.writeFileSync(productFilePath, JSON.stringify(productsJson));
    res.redirect('/');
    },



    editProduct: (req, res) => {
        let logueado = req.session.userLogged ;
        let id = req.params.id;
        let indiceObjeto = productsJson.findIndex(elemento=>{ return elemento.product_id == id})
        let productEdit = productsJson[indiceObjeto]
        
        console.log("--Objeto a editar--")
        console.log(productEdit)
        res.render('editProduct', {productEdit : productEdit, logueado});
        
    },
    editProductStore: (req, res) => {
        let image
        if(req.files[0] != undefined){
            image = req.files[0].filename
        } else {
            image = 'default-image.jpeg'
        }
        let id = req.params.id;
        const indiceObjeto = productsJson.findIndex(elemento=>{ return elemento.product_id == id})
        
        let editedProduct = {
            
            product_id : productsJson[indiceObjeto].product_id ,
            ...req.body,
            product_image : image ,
            product_discount : productsJson[indiceObjeto].product_discount
        }
        
        
        productsJson.splice(indiceObjeto, 1, editedProduct) ; 
        
        fs.writeFileSync(productFilePath, JSON.stringify(productsJson));
        console.log("producto modificado")
        console.log("--Objeto editado--")
        console.log(productsJson[indiceObjeto])
        
        res.redirect('/');
    },

    products: (req, res) => {
        let logueado = req.session.userLogged ;
        res.render('products', {productsJson, logueado});
    },

    delete: (req,res) => {
        let logueado = req.session.userLogged ;
        let id = req.params.id
        const indiceObjeto = productsJson.findIndex(elemento=>{ return elemento.product_id == id})
        let productDelete = productsJson.splice(indiceObjeto, 1)
        
        
        fs.writeFileSync(productFilePath, JSON.stringify(productsJson));
        
        console.log("producto eliminado")
        res.render('products',{productsJson, logueado});
    },
     
 





};



module.exports = productsController;