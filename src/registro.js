import { post } from "./peticiones.js";



document.addEventListener("DOMContentLoaded", validacion);


function validacion(e){

    e.preventDefault();

    document.querySelectorAll("input").forEach((element)=> element.addEventListener("focus", limpiarError))

    document.querySelector("#nombre").addEventListener("blur", validacionNombre);
    document.querySelector("#apellidos").addEventListener("blur", validacionApellidos);
    document.querySelector("#email").addEventListener("blur", validacionEmail);
    document.querySelector("#repetirEmail").addEventListener("blur", validacionRepEmail);
    document.querySelector("#password").addEventListener("blur", validacionContrasenia);
    document.querySelector("#repetirPassword").addEventListener("blur", validacionRepContrasenia);
    document.querySelector("#condiciones").addEventListener("blur", validarCondiciones);
    
    document.querySelector("#formRegistro").addEventListener("submit", Envio);
}
function limpiarError(evento){
    evento.target.classList.remove("resaltado");
    evento.target.nextElementSibling.textContent = "";
}
function Envio(evento){
    evento.preventDefault();

    if (validacionNombre() && validacionApellidos() && validacionEmail() && validacionRepEmail() && validacionContrasenia() && validacionRepContrasenia() && validarCondiciones()){
        enviarForm();
    }
}

function validacionNombre(){
    if (document.getElementById("nombre").value === ""){
        document.getElementById("errorNombre").textContent = "El campo no puede quedar vacio";
        document.getElementById("nombre").classList.add("resaltado");
        return false;
    }else if(document.getElementById("nombre").value.length < 3){
        document.getElementById("errorNombre").textContent = "Debe tener mínimo 3 carácteres";
        document.getElementById("nombre").classList.add("resaltado");
        return false;
    }else{
        let nombre = document.getElementById("nombre").value.toLowerCase();
        let letra = nombre.charAt(0).toUpperCase();
        let nomCorregido = nombre.replace(nombre.charAt(0),letra);
        document.getElementById("nombre").value = nomCorregido;
    }
    return true;

}
function validacionApellidos(){
    if (document.getElementById("apellidos").value === ""){
        document.getElementById("errorApellidos").textContent = "El campo no puede quedar vacio";
        document.getElementById("apellidos").classList.add("resaltado");
        return false;
    }else if(document.getElementById("apellidos").value.length < 3){
        document.getElementById("errorApellidos").textContent = "Debe tener mínimo 3 carácteres";
        document.getElementById("apellidos").classList.add("resaltado");
        return false;
    }else{
        let nombre = document.getElementById("apellidos").value.toLowerCase();
        let letra = nombre.charAt(0).toUpperCase();
        let nomCorregido = nombre.replace(nombre.charAt(0),letra);
        document.getElementById("apellidos").value = nomCorregido;
    }
    return true;

}
function validacionEmail(){
    let RegEx =  new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
    if ( document.getElementById("email").value === ""){
        document.getElementById("errorEmail").textContent = "El campo no puede quedar vacio";
        document.getElementById("email").classList.add("resaltado");
        return false;
    }else if(!(document.getElementById("email").value.match(RegEx))){
        document.getElementById("errorEmail").textContent = "El campo no coincide con un email válido";
        document.getElementById("email").classList.add("resaltado");
        return false;
    }
    return true;
    
}
function validacionRepEmail(){
    let email = document.getElementById("email").value;
    if (document.getElementById("repetirEmail").value === ""){
        document.getElementById("errorRepetirEmail").textContent = "El campo no puede quedar vacio";
        document.getElementById("repetirEmail").classList.add("resaltado");
        return false;
    }else if(!(document.getElementById("repetirEmail").value == email)){
        document.getElementById("errorRepetirEmail").textContent = "El email no coinide";
        document.getElementById("repetirEmail").classList.add("resaltado");
        return false;
    }
    return true;
}
function validacionContrasenia(){
    let RegEx =  new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/);
    if (document.getElementById("password").value === ""){
        document.getElementById("errorPassword").textContent = "El campo no puede quedar vacio";
        document.getElementById("password").classList.add("resaltado");
        return false;
    }else if(!((document.getElementById("password").value.match(RegEx)))){
        document.getElementById("errorPassword").textContent = "La contraseña no es válida";
        document.getElementById("password").classList.add("resaltado");
        return false;
    }
    return true;
}
function validacionRepContrasenia(){
    let contrasenia = document.getElementById("password").value;
    if (document.getElementById("repetirPassword").value === ""){
        document.getElementById("errorRepetirPassword").textContent = "El campo no puede quedar vacio";
        document.getElementById("repetirPassword").classList.add("resaltado");
        return false;
    }else if(!(document.getElementById("repetirPassword").value == contrasenia)){
        document.getElementById("errorRepetirPassword").textContent = "La contrasenia no coinide";
        document.getElementById("repetirPassword").classList.add("resaltado");
        return false;
    }
    return true;
}
function validarCondiciones(){
    let activado = document.getElementById("condiciones").checked;
    if (!(activado)){
        document.getElementById("errorCondiciones").textContent = "Debes aceptar las condiciones";
        return false;
    }
    return true;
}
function enviarForm(){
    let usuario = {
        nombre: document.getElementById("nombre").value,
        apellidos: document.getElementById("apellidos").value,
        email: document.getElementsByTagName("email").value,
        pass: document.getElementById("password").value,
        condiciones: document.getElementById("condiciones").value,
    }

    post("/usuarios",usuario,funciona,error);
}
function error(){
    console.log("fallo");
}
function funciona(){
    console.log("acierto");;
}



