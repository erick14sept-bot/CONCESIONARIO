import React from 'react';
import { Auto } from '../../types';

interface Props {
  auto: Auto;
  onVerDetalles: (id: string) => void;
}

export const CardAuto: React.FC<Props> = ({ auto, onVerDetalles }) => {
  return (
    <div className="card" data-category={auto.categoriaFiltro}>
      <img src={auto.imagen} alt={auto.nombre} />
      <div className="card-content">
        <h3>{auto.nombre}</h3>
        <p>{auto.categoria}</p>
        <button
          className="btn btn-solid btn-detalles"
          onClick={() => onVerDetalles(auto.id)}
        >
          Ver Detalles
        </button>
      </div>
    </div>
  );
};