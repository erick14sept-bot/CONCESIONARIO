// src/services/api.ts
import { CitaFormData } from '../types';

export async function enviarCitaAlBackend(datosCita: CitaFormData) {
  const respuesta = await fetch("http://localhost:3000/api/agendar-cita", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datosCita),
  });

  if (!respuesta.ok) {
    const errorData = await respuesta.json();
    throw new Error(errorData.error || 'Error al agendar la cita');
  }

  return await respuesta.json();
}