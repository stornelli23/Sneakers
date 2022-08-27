

let number = Number(document.querySelector("p.preciouno").innerText)
let cantidad = document.querySelector("#quantity").addEventListener("change", function(){
    let cantidad2 = document.querySelector("#quantity").value
    const subtotal = cantidad2*number
    document.querySelector("p.subtotal").innerText = subtotal
})



console.log(cantidad)



