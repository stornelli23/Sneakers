const fs = require('fs')
const path = require('path');

const productFilePath = path.join(__dirname,'../data/products.json')
const productsJson = JSON.parse(fs.readFileSync(productFilePath, 'utf-8'))

const productos = require('./productos')
const productosRebajas = require('./productosRebajas')
const productosRecomendados = require('./productosRecomendados')



const mainControllers = {

    index: (req, res) => {
        res.render('index', {productosDestacados:productos, descuentos:productosRebajas})  
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
            
            id: productsJson[productsJson.length-1].product_id+1,
            ...req.body,
            image : image
        }
        
        productsJson.push(newProduct) ; 
        console.log(productsJson);
        fs.writeFileSync(productFilePath, JSON.stringify(productsJson));
        console.log("producto guardado")
        res.redirect('/')
        },

    editProduct: (req, res) => {
        let id = req.params.id;
        let productosFiltrados = productsJson.find(products => products.product_id == id)
        res.render('editProduct', {productosFiltrados})
    },

    products: (req, res) => {
        res.render('products', {productsJson})
    },



}

module.exports = mainControllers;