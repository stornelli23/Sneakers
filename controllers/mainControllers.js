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
        let indiceObjeto = productsJson.findIndex(elemento=>{ return elemento.product_id == id})
        let productEdit = productsJson[indiceObjeto]
        
        console.log("--Objeto a editar--")
        console.log(productEdit)
        res.render('editProduct', {productEdit : productEdit})
        
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
        
        res.redirect('/')
    },

    products: (req, res) => {
        res.render('products', {productsJson})
    },

    delete: (req,res) => {
        let id = req.params.id
        const indiceObjeto = productsJson.findIndex(elemento=>{ return elemento.product_id == id})
        let productDelete = productsJson.splice(indiceObjeto, 1)
        
        
        fs.writeFileSync(productFilePath, JSON.stringify(productsJson));
        
        console.log("producto eliminado")
        res.render('products',{productsJson})
    }
     
 
}

module.exports = mainControllers;