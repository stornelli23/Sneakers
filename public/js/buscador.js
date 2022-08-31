window.addEventListener("load", function () {

  const formulario = document.querySelector("#formulario")
  const resultado = document.querySelector(".resultadoBusqueda")

  fetch('/api/products')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log('Request succeeded with JSON response', data);
      // data = products
      let filtrar = () => {

        resultado.innerHTML = "";
        // console.log(formulario.value)

        // console.log(data)

        const texto = formulario.value.toLowerCase();

        for (let i = 0; i < data.products.length; i++) {
          let name = data.products[i].name;



          if (name.indexOf(texto) !== -1) {
            resultado.innerHTML += `
        <div class="resultadoBusqueda"> <a href="/productDetail/${data.products[i].id}" target="_blank">${data.products[i].name} </a> </div>
        `
          }

        }
        if (resultado.innerHTML === "") {
          resultado.innerHTML += `
        <div class="resultadoBusqueda"> <p>Producto no encontrado...</p> </div>
        `
        }

      }



      document.querySelector('#formulario').addEventListener('keypress', function (e) {
        if (e.which === 13) {
          filtrar()
          let div = document.querySelector(".divBuscador");
          div.style.display = "block"
          let divResultado = document.querySelector(".resultadoBusqueda");
          divResultado.style.display = "block"

        }
      })

      document.querySelector('#formulario').addEventListener('mouseout', function (e) {
        let divResultado = document.querySelector(".resultadoBusqueda");
        divResultado.style.display = "none"
        // let resultadoBusqueda = div.querySelector(".resultadoBusqueda");
        // resultadoBusqueda.style.display = "none"
      })
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });


});



//     