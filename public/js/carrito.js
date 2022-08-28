//window.addEventListener("load", function () {
  //  let form = document.querySelector(".form-principal.createProduct");
if(localStorage.subtotal1){
    document.querySelector("p.subtotal").innerText = localStorage.subtotal1
    document.querySelector("#quantity").value = localStorage.cantidad1
}


//document.querySelector("formulario-boton").addEventListener("submit", function(e){
  //  (e).preventDefault();


//})







let number = Number(document.querySelector("p.preciouno").innerText)
let cantidad = document.querySelector("#quantity").addEventListener("change", function(){
    let cantidad1 = document.querySelector("#quantity").value
    localStorage.setItem("cantidad1", cantidad1)
    const subtotal = cantidad1*number
    document.querySelector("p.subtotal").innerText = subtotal
    localStorage.setItem("subtotal1", subtotal)
    console.log(localStorage)
})


//}


