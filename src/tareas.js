import { get, patch, peticionDelete, post } from "./peticiones.js";

const usuario = JSON.parse(sessionStorage.getItem("usuario"));
let ruta = "/tareas?id_user=" + usuario.id;
let rutaGuardar = "/tareas"

document.addEventListener("DOMContentLoaded", cargarListaTareas);
document.getElementById("btnAddTask").addEventListener("click", mostrarFormulario);
document.getElementById("btnLogout").addEventListener("click", cerrarSesion);

function cerrarSesion() {
    sessionStorage.removeItem("usuario");
    window.location.href = "../index.html";
}

function cargarListaTareas() {
    get(ruta, (respuesta) => {
        console.log(respuesta);
        respuesta.forEach(tarea => {
            cargarTarea(tarea);
        }
        )
    }, (error) => { });
}

function mostrarFormulario() {
    document.getElementById("btnAddTask").hidden = true;
    const contenedor = document.getElementById("contenedorFormulario");

    if (document.getElementById("formTarea")) return;

    const form = document.createElement("form");
    form.id = "formTarea";

    const inputNombre = document.createElement("input");
    inputNombre.type = "text";
    inputNombre.placeholder = "Nombre de la tarea";
    inputNombre.id = "nombreTarea"

    inputNombre.addEventListener("blur", (validarNombre) => {
        if (document.getElementById("nombreTarea").value === "") {
            document.getElementById("nombreTarea").classList.add("resaltado");
            return false;
        }
        return true;
    })

    const inputCheck = document.createElement("input");
    inputCheck.type = "checkbox";
    inputCheck.id = "estadoTarea";

    const labelCheck = document.createElement("label");
    labelCheck.textContent = "Completada";

    const btnGuardar = document.createElement("button");
    btnGuardar.type = "submit";
    btnGuardar.textContent = "Guardar";
    btnGuardar.id = "btnGuardar";

    form.appendChild(inputNombre);
    form.appendChild(document.createElement("br"));

    form.appendChild(inputCheck);
    form.appendChild(labelCheck);
    form.appendChild(document.createElement("br"));

    form.appendChild(btnGuardar);

    document.querySelector("main").prepend(form);

    form.addEventListener("submit", tareaRegistrada);

}
function cargarTarea(tarea) {
    const div = document.createElement("div");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarea.acabada;

    checkbox.addEventListener("change", () => {
        let rutaChecked = rutaGuardar + "/" + tarea.id
        if (tarea.acabada) {
            tarea.acabada = false;
        } else {
            tarea.acabada = true;
        }

        patch(rutaChecked, tarea, (funciona) => { }, (error) => { })
    })

    const span = document.createElement("span");
    span.textContent = tarea.nombre;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";

    btnEliminar.addEventListener("click", () => {
        let rutaDelete = rutaGuardar + "/" + tarea.id;
        peticionDelete(rutaDelete, (funciona) => {
            div.remove();
        }, (error) => { });

    });

    div.appendChild(checkbox);
    div.appendChild(span);
    div.appendChild(btnEliminar);

    document.getElementById("listaTareas").appendChild(div);
}
function tareaRegistrada(evento) {
    evento.preventDefault();
    
        let tarea = {
            nombre: document.getElementById("nombreTarea").value,
            acabada: document.getElementById("estadoTarea").checked,
            id_user: usuario.id,
        }
        post(rutaGuardar, tarea, (funciona) => { cargarTarea(tarea) }, (errorAddTarea) => { console.log(e) });
    }

