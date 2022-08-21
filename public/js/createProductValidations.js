window.addEventListener("load", function () {
    let form = document.querySelector(".form-principal.createProduct");
  
    form.addEventListener("submit", function (e) {
      let errors = [];

      let inputName = document.getElementById("name");
      if(inputName.value == "") {
          errors.push ("Ingrese el nombre del producto");
      }  else if (inputName.value.length < 5) {
        errors.push("El nombre del producto debe tener más de cinco caracteres");
      }

      let inputPrice = document.getElementById("price");
      if(inputPrice.value == "") {
          errors.push ("Ingrese un precio");
      } 

      let inputDescription = document.getElementById("description");
      if (inputDescription.value == "") {
        errors.push("Ingrese una descripción de producto");
      } else if (inputDescription.value.length < 20) {
        errors.push("La descripción del producto debe tener más de 20 caracteres");
      }
  
  let categoryUno = document.getElementById("categoryUno").checked;
  let categoryDos = document.getElementById("categoryDos").checked;
  let categoryTres = document.getElementById("categoryTres").checked;
 if( categoryUno == false && categoryDos == false && categoryTres == false) 
{
 errors.push("Seleccione una categoría: hombre, mujer o unisex");
} 

      let inputBrand = document.getElementById("brand").selectedIndex;
      if (inputBrand == null || inputBrand == 0 ) {
        errors.push("Seleccione una marca");
      } 

      let talleUno = document.getElementById("sizeUno");
      let talleDos = document.getElementById("sizeDos"); 
      let talleTres = document.getElementById("sizeTres");
      let talleCuatro = document.getElementById("sizeCuatro");
      let talleCinco = document.getElementById("sizeCinco"); 
      if( !talleUno.checked && !talleDos.checked && !talleTres.checked && !talleCuatro.checked && !talleCinco.checked) {
      errors.push("Debe seleccionar un talle");
  }

let inputImage = document.getElementById("image").value;
if (!inputImage ) {
 errors.push("Debe subir una imagen")
 }
      /* This is the code that displays the error messages. */
      let divErrors = document.querySelector(".errors");
      let ulErrors = document.querySelector("div.errors ul");
      if (errors.length > 0) {
        e.preventDefault();
        divErrors.style.display = "block";
        for (let index = 0; index < errors.length; index++) {
          ulErrors.innerHTML += "<li>" + errors[index] + "</li>";
        }
      }
      
      let enviarProducto = document.getElementById("enviarProducto");
     /* Removing the error messages when the user clicks on the input field. */
      enviarProducto.addEventListener("click", function () {
        while (ulErrors.firstChild) {
          ulErrors.removeChild(ulErrors.firstChild);
        }
        errors.splice(0, errors.length);
        divErrors.style.display = "none";
      });
    });
  });
  