const path = require('path');
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
        res.render('productDetail', {recomendados:productosRecomendados})
    },
    
    login: (req, res) => {
        res.render('login')
    },
    
    register: (req, res) => {
        res.render('register')
    },
    
    createProduct: (req, res) => {
        res.render('createProduct')
    }

}

module.exports = mainControllers;