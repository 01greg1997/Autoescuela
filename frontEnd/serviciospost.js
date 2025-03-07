const url = "http://localhost:4000/servicios";  

document.getElementById('formularioData').addEventListener('submit', async (e) => { 
    e.preventDefault(); 

    // Obtener valores del formulario 
    const Nombre_Servicio = document.getElementById('Nombre_Servicio').value.trim(); 
    const Descripcion = document.getElementById('Descripcion').value.trim(); 
    const Nivel_Complejidad = document.getElementById('Nivel_Complejidad').value.trim().toLowerCase(); 
    const Costo = parseFloat(document.getElementById('Costo').value); 
    const Activo = document.getElementById('Activo').value.trim() === 'true'; 

    // Validaciones básicas 
    if (!Nombre_Servicio || !Descripcion) { 
        alert("Todos los campos son obligatorios."); 
        return; 
    } 
    if (!['bajo', 'media', 'alta'].includes(Nivel_Complejidad)) { 
        alert("El nivel de complejidad debe ser 'bajo', 'media' o 'alta'."); 
        return; 
    } 
    if (isNaN(Costo) || Costo <= 0) { 
        alert("El costo debe ser un número válido mayor a 0."); 
        return; 
    } 

    // Enviar datos al servidor 
    try { 
        const response = await fetch(url, { 
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json' 
            }, 
            body: JSON.stringify({ 
                Nombre_Servicio, 
                Descripcion, 
                Nivel_Complejidad, 
                Costo, 
                Activo 
            }) 
        }); 

        const data = await response.json(); 

        if (response.ok) { 
            alert("Servicio agregado correctamente."); 
            document.getElementById('formularioData').reset(); 
        } else { 
            alert(`Error: ${data.message || "No se pudo agregar el servicio."}`); 
        } 
    } catch (error) { 
        console.error('Error:', error); 
        alert("Ocurrió un error al enviar los datos."); 
    } 
});