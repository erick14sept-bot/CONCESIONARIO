"use strict";
// agenda.ts - Lógica para enviar el formulario al backend
async function enviarCitaAlBackend(evento) {
    evento.preventDefault(); // Detiene el comportamiento por defecto del formulario
    // Captura los datos ingresados en tu HTML
    const datosCita = {
        nombre: document.getElementById("nombre")?.value,
        correo: document.getElementById("correo")?.value,
        telefono: document.getElementById("telefono")?.value,
        fecha: document.getElementById("fecha")?.value,
        hora: document.getElementById("hora")?.value,
        autoInteres: document.getElementById("interes-auto")?.value || "Consultoría General",
    };
    try {
        // Hace la petición al backend en Express
        const respuesta = await fetch("http://localhost:3000/api/agendar-cita", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datosCita),
        });
        if (respuesta.ok) {
            console.log("Cita guardada correctamente en el backend.");
            // Muestra el mensaje de éxito en la interfaz
            const exitoDiv = document.getElementById("exito");
            if (exitoDiv)
                exitoDiv.style.display = "flex";
        }
        else {
            const errorData = await respuesta.json();
            alert(`Error al agendar la cita: ${errorData.error || 'Inténtalo de nuevo'}`);
        }
    }
    catch (error) {
        console.error("Error al conectar con el servidor backend:", error);
        alert("No se pudo conectar con el servidor backend. Asegúrate de que 'node server.js' esté corriendo.");
    }
}
// Escucha el evento submit del formulario cuando cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario-cita");
    if (formulario) {
        formulario.addEventListener("submit", enviarCitaAlBackend);
    }
});
//# sourceMappingURL=agenda.js.map