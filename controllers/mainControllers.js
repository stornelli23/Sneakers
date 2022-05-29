const path = require('path');
const productos = require('./productos')
const productosRebajas = require('./productosRebajas')
const productosRecomendados = require('./productosRecomendados')
const fs = require('fs')
const productFilePath = path.join(__dirname,'../data/products.json')
const productsJson = JSON.parse(fs.readFileSync(productFilePath, 'utf-8'))


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
            id: productsJson[productsJson.length-1].id+1,
            ...req.body,
            image : image
        }
  
        productsJson.push(newProduct) ; 
        fs.writeFileSync(productsFilePath, JSON.stringify(productsJson));
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