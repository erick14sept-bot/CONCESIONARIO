import type { SimulacionCredito } from '../types';

interface TarjetaProps {
  simulacion: SimulacionCredito;
  tasaDolar: number | null;
}

export const TarjetaSimulacion = ({ simulacion, tasaDolar }: TarjetaProps) => {
  // Formateador de moneda colombiana
  const formatoCOP = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
  const formatoUSD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div
      style={{
        background: '#1e293b',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '1px solid #334155',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
      }}
    >
      <div style={{ borderBottom: '1px solid #475569', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 'bold', textTransform: 'uppercase' }}>
          {simulacion.vehiculo}
        </span>
        <h3 style={{ fontSize: '1.6rem', margin: '0.3rem 0 0 0', color: '#fff' }}>
          {formatoCOP.format(simulacion.cuotaMensual)} <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>/ mes</span>
        </h3>
        {tasaDolar && (
          <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.9rem', color: '#22c55e' }}>
            Aprox: {formatoUSD.format(simulacion.cuotaMensual / tasaDolar)} USD
          </p>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem' }}>
        <div>
          <span style={{ color: '#94a3b8', display: 'block' }}>Precio Vehículo:</span>
          <strong style={{ color: '#f1f5f9' }}>{formatoCOP.format(simulacion.montoTotal)}</strong>
        </div>
        <div>
          <span style={{ color: '#94a3b8', display: 'block' }}>Plazo:</span>
          <strong style={{ color: '#f1f5f9' }}>{simulacion.plazoMeses} Meses</strong>
        </div>
        <div>
          <span style={{ color: '#94a3b8', display: 'block' }}>Cuota Inicial:</span>
          <strong style={{ color: '#f1f5f9' }}>{formatoCOP.format(simulacion.cuotaInicial)}</strong>
        </div>
        <div>
          <span style={{ color: '#94a3b8', display: 'block' }}>Tasa Estimada:</span>
          <strong style={{ color: '#f1f5f9' }}>1.5% M.V.</strong>
        </div>
      </div>
    </div>
  );
};