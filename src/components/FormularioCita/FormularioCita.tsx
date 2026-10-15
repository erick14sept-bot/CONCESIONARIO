// src/components/FormularioCita/FormularioCita.tsx
import React, { useState, useEffect } from 'react';
import { enviarCitaAlBackend } from '../../services/api';
import { CitaFormData } from '../../types';

interface Props {
  autoInteresInicial?: string;
}

export const FormularioCita: React.FC<Props> = ({ autoInteresInicial = '' }) => {
  const [paso, setPaso] = useState<number>(1);
  const [autoInteres, setAutoInteres] = useState<string>(autoInteresInicial);
  const [formData, setFormData] = useState<CitaFormData>({
    nombre: '',
    correo: '',
    telefono: '',
    fecha: '',
    hora: '',
    autoInteres: autoInteresInicial,
  });

  const [errores, setErrores] = useState<Record<string, string>>({});
  const [exito, setExito] = useState<boolean>(false);
  const [mensajeAutoguardado, setMensajeAutoguardado] = useState<string>('');

  useEffect(() => {
    if (autoInteresInicial) {
      setAutoInteres(autoInteresInicial);
      setFormData((prev) => ({ ...prev, autoInteres: autoInteresInicial }));
    }
  }, [autoInteresInicial]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setMensajeAutoguardado('Borrador guardado automáticamente.');
    setTimeout(() => setMensajeAutoguardado(''), 2000);
  };

  const validarPaso = (pasoActual: number): boolean => {
    const nuevosErrores: Record<string, string> = {};

    if (pasoActual === 1) {
      if (!formData.nombre.trim()) nuevosErrores.nombre = 'Escribe tu nombre completo.';
      if (!formData.correo.trim()) nuevosErrores.correo = 'Escribe tu correo electrónico.';
      if (!formData.telefono.trim()) nuevosErrores.telefono = 'Escribe tu número de teléfono.';
    } else if (pasoActual === 2) {
      if (!formData.fecha) nuevosErrores.fecha = 'Selecciona una fecha para la cita.';
      if (!formData.hora) nuevosErrores.hora = 'Selecciona una hora aproximada.';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSiguiente = () => {
    if (validarPaso(paso)) {
      setPaso((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleAnterior = () => {
    setPaso((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarPaso(1) || !validarPaso(2)) return;

    try {
      await enviarCitaAlBackend(formData);
      setExito(true);
      setFormData({
        nombre: '',
        correo: '',
        telefono: '',
        fecha: '',
        hora: '',
        autoInteres: '',
      });
      setAutoInteres('');
      setPaso(1);
      setTimeout(() => setExito(false), 6000);
    } catch (err: any) {
      alert(`Error: ${err.message || 'No se pudo conectar con el servidor backend.'}`);
    }
  };

  return (
    <div className="form-container">
      <h2>SOLICITUD EXPERTA</h2>
      <p className="subtitle">Déjanos tus datos para agendar una consultoría personalizada sobre tu diseño.</p>

      <div className="progreso">
        <p className="paso-texto">Paso {paso} de 3</p>
        <div className="progreso-barra">
          <div className="progreso-barra-relleno" style={{ width: `${(paso / 3) * 100}%` }}></div>
        </div>
        <ol className="progreso-etiquetas">
          <li className={paso === 1 ? 'activo' : ''}>Tus datos</li>
          <li className={paso === 2 ? 'activo' : ''}>Fecha y hora</li>
          <li className={paso === 3 ? 'activo' : ''}>Confirmar</li>
        </ol>
      </div>

      <form id="formulario-cita" onSubmit={handleSubmit} noValidate>
        {autoInteres && (
          <p className="interes-nota">
            Cita para: <strong>{autoInteres}</strong>
          </p>
        )}

        {/* PASO 1 */}
        {paso === 1 && (
          <fieldset className="form-step">
            <div className="form-group">
              <label htmlFor="nombre">NOMBRE COMPLETO</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej. Carlos Mendoza"
              />
              {errores.nombre && <p className="error-msg">{errores.nombre}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="correo">CORREO ELECTRÓNICO</label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                placeholder="carlos@ejemplo.com"
              />
              {errores.correo && <p className="error-msg">{errores.correo}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="telefono">TELÉFONO</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+57 300 000 0000"
              />
              {errores.telefono && <p className="error-msg">{errores.telefono}</p>}
            </div>
          </fieldset>
        )}

        {/* PASO 2 */}
        {paso === 2 && (
          <fieldset className="form-step">
            <div className="form-group row">
              <div className="col">
                <label htmlFor="fecha">FECHA</label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                />
                {errores.fecha && <p className="error-msg">{errores.fecha}</p>}
              </div>
              <div className="col">
                <label htmlFor="hora">HORA (APROX)</label>
                <input
                  type="time"
                  id="hora"
                  name="hora"
                  value={formData.hora}
                  onChange={handleChange}
                />
                {errores.hora && <p className="error-msg">{errores.hora}</p>}
              </div>
            </div>
          </fieldset>
        )}

        {/* PASO 3 */}
        {paso === 3 && (
          <fieldset className="form-step">
            <p className="resumen-intro">Revisa que todo esté correcto antes de confirmar tu cita.</p>
            <dl className="resumen-lista">
              <div className="resumen-item"><dt>Nombre</dt><dd>{formData.nombre}</dd></div>
              <div className="resumen-item"><dt>Correo</dt><dd>{formData.correo}</dd></div>
              <div className="resumen-item"><dt>Teléfono</dt><dd>{formData.telefono}</dd></div>
              <div className="resumen-item"><dt>Fecha</dt><dd>{formData.fecha}</dd></div>
              <div className="resumen-item"><dt>Hora</dt><dd>{formData.hora}</dd></div>
            </dl>
          </fieldset>
        )}

        <p className="autosave-nota">{mensajeAutoguardado || '\u00A0'}</p>

        <div className="acciones-form">
          {paso > 1 && (
            <button type="button" className="btn btn-outline" onClick={handleAnterior}>
              Anterior
            </button>
          )}
          {paso < 3 ? (
            <button type="button" className="btn btn-solid btn-accion-principal" onClick={handleSiguiente}>
              Siguiente
            </button>
          ) : (
            <button type="submit" className="btn btn-solid full-width">
              CONFIRMAR CITA
            </button>
          )}
        </div>

        {exito && (
          <div className="success-msg" style={{ display: 'flex' }}>
            <span>¡CITA AGENDADA CON ÉXITO!</span>
          </div>
        )}
      </form>
    </div>
  );
};