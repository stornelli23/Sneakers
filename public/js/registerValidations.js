window.addEventListener("load", function () {
    let form = document.querySelector(".form-principal.register");
  
    form.addEventListener("submit", function (e) {
      let errors = [];
      /* A regular expression that validates the email format. */
      let regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
     
      /* This is the code that validates the email, password, name and date of birth fields. */
        console.log("hola chicos")
      let inputName = document.getElementById("name");
      if(inputName.value == "") {
          errors.push ("Ingrese su nombre");
      }  else if (inputName.value < 2) {
        errors.push("Su nombre debe tener más de dos caracteres");
      }

      let inputLastName = document.getElementById("lastName");
      if(inputLastName.value == "") {
          errors.push ("Ingrese su apellido");
      }  else if (inputLastName.value < 2) {
        errors.push("Su apellido debe tener más de dos caracteres");
      }

      let inputEmail = document.getElementById("email");
      if (inputEmail.value == "") {
        errors.push("Ingrese su email");
      } else if (!regex.test(inputEmail.value)) {
        errors.push("Ingrese un formato de email valido");
      }
  
      let inputPassword = document.getElementById("password");
      if (inputPassword.value == "") {
        errors.push("Ingrese su contraseña");
      } else if (inputPassword.value < 8) {
        errors.push("Su contraseña debe tener por lo menos 8 caracteres");
      }

    let selectGender = document.getElementById("gender").selectedIndex;
    if (selectGender == null || selectGender == 0 ){
    errors.push("Debe seleccionar una opción en el campo 'Genero'");
    }

      let inputdateOfBirth = document.getElementById("dateOfBirth");
      if (inputdateOfBirth.value == "") {
          errors.push("Seleccione una fecha de nacimiento");
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
  
     /* Removing the error messages when the user clicks on the input field. */
      inputEmail.addEventListener("click", function () {
        while (ulErrors.firstChild) {
          ulErrors.removeChild(ulErrors.firstChild);
        }
        errors.splice(0, errors.length);
        divErrors.style.display = "none";
      });
    });
  });
  