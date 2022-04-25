const express = require ('express');

const app = express();

const path = require ('path')

const port = 3000

//////////////////////////////////////////////////////////////////


app.listen(port, () => console.log("Servidor corriendo en el puerto 3000"))

app.use(express.static('public'))

//////////////////////////////////////////////////////////////////


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './views/index.html'))   
})

app.get("/views/productCart.html", (req, res) => {
    res.sendFile(path.join(__dirname, '/views/productCart.html'))  //ESTO SE ESCRIBE ASÍ???
})

app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, './views/'))
})

app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, './views/'))
})

app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, './views/'))
})

app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, './views/'))
})

app.get('', (req, res) => {
	res.sendFile(path.join(__dirname, './views/'))
})

app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, './views/'))
})

app.get('*', (req, res) => {
    
    res.status(404).send("Not found 404")
    
})