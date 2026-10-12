import React from 'react';
import { Auto } from '../../types';

interface Props {
  auto: Auto | null;
  onClose: () => void;
  onAgendar: (nombreAuto: string) => void;
}

export const ModalDetalles: React.FC<Props> = ({ auto, onClose, onAgendar }) => {
  if (!auto) return null;

  return (
    <div className="modal-overlay" id="modal-overlay">
      <div className="modal-coche" role="dialog" aria-modal="true">
        <button type="button" className="modal-cerrar" onClick={onClose} aria-label="Cerrar">✕</button>
        <img className="modal-imagen" src={auto.imagen} alt={auto.nombre} />
        <div className="modal-cuerpo">
          <p className="modal-categoria">{auto.categoria}</p>
          <h3>{auto.nombre}</h3>
          <p className="modal-precio">{auto.precio}</p>
          <p className="modal-descripcion">{auto.descripcion}</p>
          <dl className="modal-specs">
            {auto.specs.map((s, idx) => (
              <div key={idx}><dt>{s.label}</dt><dd>{s.valor}</dd></div>
            ))}
          </dl>
          <div className="modal-colores">
            <span className="modal-colores-label">Colores disponibles</span>
            <p>{auto.colores}</p>
          </div>
          <div className="modal-acciones">
            <button type="button" className="btn btn-outline" onClick={onClose}>Seguir viendo</button>
            <button
              type="button"
              className="btn btn-solid btn-accion-principal"
              onClick={() => onAgendar(auto.nombre)}
            >
              Agendar Cita para este Auto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};