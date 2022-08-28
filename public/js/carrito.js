window.addEventListener("load", function () {
    let formsumar = document.querySelector(".formulario-boton-sumar");
    let formrestar= document.querySelector(".formulario-boton-restar");

    let precioUnidad = Number(document.querySelector("p.preciouno").innerText)  

    if(sessionStorage.subtotalElemento){                                                    //recupera de sessionStorage el subtotal anterior si existe
        document.querySelector("p.subtotal").innerText = sessionStorage.subtotalElemento        
    }
    if(sessionStorage.inputValue){                                                          //recupera de sessionStorga la cantidad anterior si existe
        console.log("🚀 ~ file: carrito.js ~ line 11 ~ sessionStorage", sessionStorage)
        let valorInputNum = Number(sessionStorage.inputValue)
        console.log("🚀 ~ file: carrito.js ~ line 13 ~ valorInputNum", valorInputNum)
        console.log( document.getElementById("quantity"))
        document.getElementById("quantity").value = valorInputNum
    }



    formsumar.addEventListener("submit", function(e){                   //BOTON SUMAR
        (e).preventDefault();
        let cantidadAnterior = document.querySelector("#quantity").value
        let nuevaCantidad = Number(cantidadAnterior)+1
        console.log("precioUnidad", precioUnidad)
        console.log("nuevaCantidad", nuevaCantidad)

        let subtotalElemento = precioUnidad*nuevaCantidad               //calcula el nuevo subtotal del elemento
        console.log("🚀 ~  subtotalElemento", subtotalElemento)         
        document.querySelector("p.subtotal").innerText = subtotalElemento //modifica el subtotal del elemento
        let inputValue = Number(document.querySelector("#quantity").value) //declara el valor del input previo
        let newInputValue = inputValue+1                                    //declara el nuevo valor del input
        document.querySelector("#quantity").value = newInputValue           //actualiza el input de la cantidad
        console.log("inputCantidad", newInputValue)

        sessionStorage.setItem("subtotalElemento", subtotalElemento) //guarda subtotal del elemento en sessionStorage
        sessionStorage.setItem("inputValue", newInputValue) //guarda el nuevo value del input en Storagge

        }
        )

    formrestar.addEventListener("submit", function(e){                  //BOTON RESTAR
        (e).preventDefault();
        let cantidadAnterior = document.querySelector("#quantity").value
        let nuevaCantidad = Number(cantidadAnterior)-1
        console.log("precioUnidad", precioUnidad)
        console.log("nuevaCantidad", nuevaCantidad)

        let subtotalElemento = precioUnidad*nuevaCantidad               //calcula el nuevo subtotal del elemento
        console.log("🚀 ~  subtotalElemento", subtotalElemento)         
        document.querySelector("p.subtotal").innerText = subtotalElemento //modifica el subtotal del elemento
        let inputValue = Number(document.querySelector("#quantity").value) //declara el valor del input previo
        let newInputValue = inputValue-1                                    //declara el nuevo valor del input
        document.querySelector("#quantity").value = newInputValue           //actualiza el input de la cantidad
        console.log("inputCantidad", newInputValue)
        
        sessionStorage.setItem("subtotalElemento", subtotalElemento) //guarda subtotal del elemento en sessionStorage
        sessionStorage.setItem("inputValue", newInputValue) //guarda el nuevo value del input en Storagge
    
        }
        )
      
        
}
)

    
    
//  if(sessionStorage.subtotal1){
//      document.querySelector("p.subtotal").innerText = sessionStorage.subtotal1
//      console.log(sessionStorage)
//      document.querySelector("#quantity").value = Number(sessionStorage.cantidad1)
//     // console.log(sessionStorage.cantidad1)
//  }


// form.addEventListener("submit", function(e){
//     (e).preventDefault();



// })







// let number = Number(document.querySelector("p.preciouno").innerText)
//     let cantidad1 = Number(sessionStorage.cantidad1)+1
//     sessionStorage.setItem("cantidad1", cantidad1)
//     const subtotal = cantidad1*number
    
//    // console.log("number", number)

//     document.querySelector("p.subtotal").innerText = subtotal
//     sessionStorage.setItem("subtotal1", subtotal)
//    // console.log(sessionStorage)
// }
// )




