import { useState } from 'react';
import type { Indicator } from '../types';

interface FormularioProps {
  onAgregarMetrica: (nuevaMetrica: Indicator) => void;
}

export const FormularioMetrica = ({ onAgregarMetrica }: FormularioProps) => {
  const [metric, setMetric] = useState('');
  const [value, setValue] = useState('');
  const [status, setStatus] = useState<Indicator['status']>('Óptimo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!metric.trim() || !value.trim()) return;

    const nueva: Indicator = {
      id: Date.now(),
      metric,
      value,
      status,
    };

    onAgregarMetrica(nueva);
    setMetric('');
    setValue('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: '#1e293b',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '1px solid #334155',
        marginBottom: '2rem',
      }}
    >
      <h3 style={{ color: '#38bdf8', marginTop: 0, fontSize: '1.1rem' }}>
        Personalizar / Cotizar Accesorio VIP
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr auto',
          gap: '1rem',
          alignItems: 'end',
        }}
      >
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.85rem',
              color: '#94a3b8',
              marginBottom: '0.3rem',
            }}
          >
            Accesorio / Servicio:
          </label>
          <input
            type="text"
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            placeholder="Ej: Rines Forjados 20 pulgadas"
            style={{
              width: '100%',
              padding: '0.5rem',
              background: '#0f172a',
              border: '1px solid #475569',
              color: '#fff',
              borderRadius: '4px',
            }}
          />
        </div>
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.85rem',
              color: '#94a3b8',
              marginBottom: '0.3rem',
            }}
          >
            Presupuesto / Valor:
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ej: $4.200.000 COP"
            style={{
              width: '100%',
              padding: '0.5rem',
              background: '#0f172a',
              border: '1px solid #475569',
              color: '#fff',
              borderRadius: '4px',
            }}
          />
        </div>
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.85rem',
              color: '#94a3b8',
              marginBottom: '0.3rem',
            }}
          >
            Disponibilidad / Nivel:
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Indicator['status'])}
            style={{
              width: '100%',
              padding: '0.5rem',
              background: '#0f172a',
              border: '1px solid #475569',
              color: '#fff',
              borderRadius: '4px',
            }}
          >
            <option value="Óptimo">Óptimo (Inmediata)</option>
            <option value="Alto">Alto (Bajo Pedido)</option>
            <option value="Medio">Medio (Edición Limitada)</option>
          </select>
        </div>
        <button
          type="submit"
          style={{
            background: '#0284c7',
            color: '#fff',
            border: 'none',
            padding: '0.55rem 1.2rem',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Agregar
        </button>
      </div>
    </form>
  );
};