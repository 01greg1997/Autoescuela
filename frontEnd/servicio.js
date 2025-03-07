const url = "http://localhost:4000/servicios";
const contenido = document.querySelector('#data'); // Asegúrate de que este ID existe en tu HTML
let resultado = "";

// Función para cargar los datos en la tabla
const carga_data = (datos) => {
    resultado = ""; // Reiniciar la variable para evitar acumulación de datos duplicados
    
    // Recorremos los datos y generamos las filas de la tabla
    for (let i = 0; i < datos.length; i++) {
        resultado += `
            <tr>
                <td>${datos[i].CODServicio}</td>
                <td>${datos[i].Nombre_Servicio}</td>
                <td>${datos[i].Descripcion}</td>
                <td>${datos[i].Nivel_Complejidad}</td>
                <td>${datos[i].Costo}</td>
                <td>${datos[i].Activo}</td>
            </tr>
        `;
    }
    contenido.innerHTML = resultado; // Insertamos las filas en el cuerpo de la tabla
};

// Función para obtener datos del servidor
const obtener_datos = () => {
    fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error HTTP! Estado: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        carga_data(data); // Llamamos a la función para cargar los datos
    })
    .catch(error => {
        console.error("Error al obtener datos:", error.message);
    });
};

// Llamar la función cuando cargue la página
document.addEventListener("DOMContentLoaded", obtener_datos);
