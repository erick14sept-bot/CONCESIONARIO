const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors()); 

const KEYFILEPATH = path.join(__dirname, 'credentials.json');
const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const calendar = google.calendar({ version: 'v3', auth });

const CALENDAR_ID = 'erick14sept@gmail.com';

app.post('/api/agendar-cita', async (req, res) => {
  try {
    const { nombre, correo, telefono, fecha, hora, autoInteres } = req.body;

    if (!fecha || !hora) {
      return res.status(400).json({ error: 'La fecha y la hora son obligatorias.' });
    }

    const inicioStr = `${fecha}T${hora}:00`;
    
    // Calculamos la hora de fin (+1 hora)
    const [h, m] = hora.split(':').map(Number);
    const horaFin = String((h + 1) % 24).padStart(2, '0');
    const finStr = `${fecha}T${horaFin}:${String(m).padStart(2, '0')}:00`;

    const evento = {
      summary: `Cita de Consultoría - ${autoInteres || 'General'}`,
      description: `DATOS DEL CLIENTE:\n` +
                   `• Nombre: ${nombre}\n` +
                   `• Teléfono: ${telefono}\n` +
                   `• Correo: ${correo}`,
      start: { 
        dateTime: inicioStr, 
        timeZone: 'America/Bogota' 
      },
      end: { 
        dateTime: finStr, 
        timeZone: 'America/Bogota' 
      }

    };

    const respuesta = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      resource: evento,
    });

    res.status(200).json({ status: 'exito', data: respuesta.data });
  } catch (error) {
    console.error('Error detallado de Google Calendar:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Ocurrió un error al agendar la cita' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});