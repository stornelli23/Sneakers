window.addEventListener("load", function () {
  let form = document.querySelector(".form-principal");

  form.addEventListener("submit", function (e) {
    let errors = [];
    let regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/ ;
    
    let inputEmail = document.getElementById("email");
    if (inputEmail.value == "") {
      errors.push("Ingrese su email");
    } else if (!regex.test(inputEmail.value)) {
      errors.push("Ingrese un formato de email valido");
    }

    let inputPassword = document.getElementById("password");
    if (inputPassword.value == "") {
      errors.push("Ingrese su contraseña");
    }

    let divErrors = document.querySelector(".errors");
    let ulErrors = document.querySelector("div.errors ul");
    if (errors.length > 0) {
        console.log("🚀 ~ file: loginValidations.js ~ line 23 ~ errors", errors)
        e.preventDefault();
        divErrors.style.display = "block"
      for (let index = 0; index < errors.length; index++) {
        ulErrors.innerHTML += "<li>" + errors[index] + "</li>";
      }
    }
    let liErrors = document.querySelectorAll(".errors ul li")
    console.log("🚀 ~ file: loginValidations.js ~ line 31 ~ liErrors", liErrors)
    inputEmail.addEventListener('click', function(){
        
        errors.splice(0, errors.length)
        console.log("🚀 ~ file: loginValidations.js ~ line 32 ~ errors", errors)
        divErrors.style.display = "none"
        

    })

  });
});
