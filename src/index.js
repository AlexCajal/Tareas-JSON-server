import { get } from "./peticiones.js";

document.addEventListener("DOMContentLoaded",validarInicio)

function validarInicio(){

    document.getElementById("username").addEventListener("blur",validarNombre);
    document.getElementById("password").addEventListener("blur",validarPassword);

    document.getElementById("btnLogin").addEventListener("click",envio);
    
}

function validarNombre(){
    if (document.getElementById("username").value === ""){
        document.getElementById("errorLogin").textContent = "Los campos no pueden quedar vacios";
        document.getElementById("username").classList.add("resaltado");
        return false;
    }else{
        document.getElementById("errorLogin").textContent = "";
        document.getElementById("username").classList.remove("resaltado");
        return true
    }
}
function validarPassword(){
    if (document.getElementById("password").value === ""){
        document.getElementById("errorLogin").textContent = "Los campos no pueden quedar vacios";
        document.getElementById("password").classList.add("resaltado");
        return false;
    }else{
        document.getElementById("errorLogin").textContent = "";
        document.getElementById("password").classList.remove("resaltado");
        return true
    }
}
function envio(evento){
    evento.preventDefault();

    if (validarNombre() && validarPassword()){
        inicioSesion();
    }
}
function inicioSesion(){
    let user = {
        nombre: document.getElementById("username").value,
        password: document.getElementById("password").value,
    }
    let ruta = "/usuarios?nombre=" + user.nombre;
    let Usuario;
    get(ruta,(respuesta) => {
        Usuario = respuesta[0];
        if (Usuario.password === document.getElementById("password").value) {
            sessionStorage.setItem("usuario", JSON.stringify(Usuario));
            window.location.href = "../tareas.html";
        }else {
            document.getElementById("errorLogin").textContent = "Contraseña incorrecta";
        }
    },error);
}
function error(e){
    document.getElementById("errorLogin").textContent = "Usuario no encontrado";
}
