const url = "http://localhost:4000/servicios";

document.getElementById('formularioEliminar').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtener el ID del formulario
    const id = document.getElementById('CODServicio').value.trim();

    // Validación básica
    if (!id) {
        alert("El campo ID del Servicio es obligatorio.");
        return;
    }

    // Enviar solicitud al servidor para eliminar el servicio
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            alert("Servicio eliminado correctamente.");
            document.getElementById('formularioEliminar').reset();
        } else {
            alert(`Error: ${data.message || "No se pudo eliminar el servicio."}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Ocurrió un error al eliminar el servicio.");
    }
});
