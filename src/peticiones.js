export function get(ruta, callback, callbackError) {

    fetch(URL_SERVER + ruta)
        .then(response => {
            if (!response.ok) {
                console.log("Fallo peticion GET");
                throw new Error(response.status);
            } else {
                return response.json();
            }
        })
        .then(data => callback(data))
        .catch(error => callbackError(error));


}
export function post(ruta, datosUsuario, callback, callbackError) {

    const cabecera = new Headers();
    cabecera.append("Content-Type", "application/json");

    const enivarDatos = {
        method: "POST",
        headers: cabecera,
        body: JSON.stringify(datosUsuario)
    }

    fetch(URL_SERVER + ruta, enivarDatos)
        .then(response => {
            if (!response.ok) {
                console.log("FALLO PETICION POST")
                throw new Error(response.status)
            } else {
                return response.json();
            }
        })
        .then(data => callback(data))
        .catch(error => callbackError(error))
}
export function peticionDelete(ruta, callback, callbackError) {

    fetch(URL_SERVER + ruta, { method: "DELETE" })
        .then(response => {
            if (!response.ok) {
                console.log("FALLO PETICION DELETE")
                throw new Error(response.status);
            }
        })
        .then(data => callback(data))
        .catch(error => callbackError(error));

}
export function patch(ruta, datos, callback, callbackError) {

    const cabecera = new Headers();
    cabecera.append("Content-Type", "application/json");

    const enviarDatos = {
        method: "PATCH",
        headers: cabecera,
        body: JSON.stringify(datos)
    }

    fetch(URL_SERVER + ruta, enviarDatos)
        .then(response => {
            if (!response.ok) {
                console.log("ERROR PETICION PATCH");
                throw new Error(response.status)
            }
            return response.json();
        })
        .then(data => callback(data))
        .catch(error => callbackError(error));
    }