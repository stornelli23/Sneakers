// if(localStorage.precioTotal){
//     document.querySelector("p.total-precio").innerText = localStorage.precioTotal
    
// }
//INCONCLUSO AL 28/08 SOLO LEVANTA EL DATO DEL PRECIO TOTAL DEL BACK
let precioTotal = Number(document.querySelector("p.total-precio").innerText)

    localStorage.setItem("precioTotal", precioTotal)
   
    
   
    console.log(precioTotal)




