const fs = require('fs')
const path = require('path');

const productFilePath = path.join(__dirname,'../data/products.json')
const productsJson = JSON.parse(fs.readFileSync(productFilePath, 'utf-8'))




const mainControllers = {

    index: (req, res) => {

        let descuentos = productsJson.filter(product => product.product_discount > 0)
        let destacados = productsJson.filter(product => product.product_discount <= 0)


        res.render('index', {destacados, descuentos})  
    },
    
    productCart: (req, res) => {
        res.render('productCart', {productosRecomendados:productosRecomendados}) 
    },
    
    productDetail: (req, res) => {
        let id = req.params.id;
        let productosFiltrados = productsJson.find(products => products.product_id == id)
        res.render('productDetail', {productosFiltrados})
    },
    
    login: (req, res) => {
        res.render('login')
    },
    
    register: (req, res) => {
        res.render('register')
    },
    
    createProduct: (req, res) => {
        res.render('createProduct')
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
        console.log(productsJson);
        fs.writeFileSync(productFilePath, JSON.stringify(productsJson));
        console.log("producto guardado")
        res.redirect('/')
        },

    editProduct: (req, res) => {
        let id = req.params.id;
        let productEdit = productsJson[id-1]
        res.render('editProduct', {productEdit})
    },

    products: (req, res) => {
        res.render('products', {productsJson})
    },

    delete: (req,res) => {
        let id = req.params.id
        let productDelete = productsJson.splice(id, 1)
        res.render('/products', products)
    }
     
 
}

module.exports = mainControllers;