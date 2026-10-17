import { useState } from 'react';
import type { SimulacionCredito } from '../types';

interface FormularioProps {
  onAgregarSimulacion: (nueva: SimulacionCredito) => void;
}

export const FormularioSimulador = ({ onAgregarSimulacion }: FormularioProps) => {
  const [vehiculo, setVehiculo] = useState('');
  const [montoTotal, setMontoTotal] = useState('');
  const [cuotaInicial, setCuotaInicial] = useState('');
  const [plazoMeses, setPlazoMeses] = useState<number>(36);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehiculo.trim() || !montoTotal || !cuotaInicial) return;

    const monto = parseFloat(montoTotal);
    const inicial = parseFloat(cuotaInicial);
    
    // Cálculo básico de crédito vehicular (Tasa estimada del 1.5% mensual)
    const montoPrestamo = monto - inicial;
    const tasaMensual = 0.015;
    let cuota = 0;

    if (montoPrestamo > 0) {
      cuota = (montoPrestamo * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazoMeses));
    }

    const nuevaSimulacion: SimulacionCredito = {
      id: Date.now(),
      vehiculo,
      montoTotal: monto,
      cuotaInicial: inicial,
      plazoMeses,
      cuotaMensual: cuota,
    };

    onAgregarSimulacion(nuevaSimulacion);
    setVehiculo('');
    setMontoTotal('');
    setCuotaInicial('');
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
      <h3 style={{ color: '#38bdf8', marginTop: 0, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
        Simular Plan de Financiamiento
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          alignItems: 'end',
        }}
      >
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
            Vehículo de Interés:
          </label>
          <input
            type="text"
            value={vehiculo}
            onChange={(e) => setVehiculo(e.target.value)}
            placeholder="Ej: Porsche 911 GT3"
            style={{ width: '100%', padding: '0.6rem', background: '#0f172a', border: '1px solid #475569', color: '#fff', borderRadius: '4px' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
            Precio Total (COP):
          </label>
          <input
            type="number"
            value={montoTotal}
            onChange={(e) => setMontoTotal(e.target.value)}
            placeholder="Ej: 950000000"
            style={{ width: '100%', padding: '0.6rem', background: '#0f172a', border: '1px solid #475569', color: '#fff', borderRadius: '4px' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
            Cuota Inicial (COP):
          </label>
          <input
            type="number"
            value={cuotaInicial}
            onChange={(e) => setCuotaInicial(e.target.value)}
            placeholder="Ej: 300000000"
            style={{ width: '100%', padding: '0.6rem', background: '#0f172a', border: '1px solid #475569', color: '#fff', borderRadius: '4px' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
            Plazo:
          </label>
          <select
            value={plazoMeses}
            onChange={(e) => setPlazoMeses(Number(e.target.value))}
            style={{ width: '100%', padding: '0.6rem', background: '#0f172a', border: '1px solid #475569', color: '#fff', borderRadius: '4px' }}
          >
            <option value={12}>12 Meses</option>
            <option value={24}>24 Meses</option>
            <option value={36}>36 Meses</option>
            <option value={48}>48 Meses</option>
            <option value={60}>60 Meses</option>
          </select>
        </div>
        <button
          type="submit"
          style={{
            background: '#0284c7',
            color: '#fff',
            border: 'none',
            padding: '0.65rem 1.2rem',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer',
            height: 'fit-content'
          }}
        >
          Calcular Cuota
        </button>
      </div>
    </form>
  );
};