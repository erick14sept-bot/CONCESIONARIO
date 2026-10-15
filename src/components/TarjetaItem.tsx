import type { Indicator } from '../types';

interface TarjetaItemProps {
  metric: string;
  value: string;
  status: Indicator['status'];
}

export const TarjetaItem = ({ metric, value, status }: TarjetaItemProps) => {
  const getStatusColor = (st: Indicator['status']) => {
    switch (st) {
      case 'Óptimo':
        return '#22c55e';
      case 'Alto':
        return '#eab308';
      case 'Medio':
        return '#f97316';
      default:
        return '#38bdf8';
    }
  };

  return (
    <div
      style={{
        background: '#1e293b',
        padding: '1.2rem',
        borderRadius: '8px',
        border: '1px solid #334155',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '0.5rem',
      }}
    >
      <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{metric}</span>
      <h3 style={{ fontSize: '1.3rem', margin: 0, color: '#fff' }}>{value}</h3>
      <span
        style={{
          alignSelf: 'flex-start',
          fontSize: '0.75rem',
          padding: '0.2rem 0.6rem',
          borderRadius: '12px',
          fontWeight: 'bold',
          color: '#fff',
          backgroundColor: getStatusColor(status),
        }}
      >
        {status === 'Óptimo' ? 'Stock Inmediato' : status === 'Alto' ? 'Bajo Pedido' : 'Edición VIP'}
      </span>
    </div>
  );
};