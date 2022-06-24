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
        
        console.log("-----------------------------------------------------------------------")
        console.log("CARRITO")
        console.log(carrito)
        console.log("-----------------------------------------------------------------------")
        console.log("arrayCarrito")
        console.log(arrayCarrito)
        console.log("-----------------------------------------------------------------------")
        console.log("LENTGH arrayCarrito")
        console.log(arrayCarrito.length)
        console.log("-----------------------------------------------------------------------")

        res.render('productCart', {arrayCarrito, destacados,carrito}) 
    },
    
    productDetail: (req, res) => {
        let id = req.params.id;
        let productosFiltrados = productsJson.find(products => products.product_id == id)
        let destacados = productsJson.filter(product => product.product_discount <= 0)
    
        res.render('productDetail', {productosFiltrados, destacados})
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
        fs.writeFileSync(productFilePath, JSON.stringify(productsJson));
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