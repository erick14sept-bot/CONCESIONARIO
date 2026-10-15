import { useState, useEffect } from 'react';
import './App.css';
import { Auto, Indicator } from './types';
import { CardAuto } from './components/Catalogo/CardAuto';
import { ModalDetalles } from './components/Modal/ModalDetalles';
import { FormularioCita } from './components/FormularioCita/FormularioCita';
import { PanelAccesibilidad } from './components/Accesibilidad/PanelAccesibilidad';
import { FormularioMetrica } from './components/FormularioMetrica';
import { TarjetaItem } from './components/TarjetaItem';

const AUTOS_DATA: Auto[] = [
  {
    id: 'authority',
    nombre: 'The Authority',
    categoria: 'Sedán Ejecutivo · Mercedes-Benz Clase E',
    precio: 'Desde $185.000.000 COP',
    imagen: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=1200',
    descripcion: 'Un sedán ejecutivo pensado para quienes dirigen desde el asiento trasero tanto como desde el volante.',
    specs: [
      { label: 'Motor', valor: '2.0L Turbo, 4 cilindros' },
      { label: 'Potencia', valor: '258 HP' },
      { label: 'Transmisión', valor: 'Automática 9G-TRONIC' }
    ],
    colores: 'Negro Obsidiana, Blanco Diamante, Gris Selenita',
    categoriaFiltro: 'executive'
  },
  {
    id: 'phantom',
    nombre: 'The Phantom',
    categoria: 'Deportivo de Alto Rendimiento · Porsche 911 GT3',
    precio: 'Desde $950.000.000 COP',
    imagen: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
    descripcion: 'Ingeniería de pista homologada para calle con suspensión ajustable y aerodinámica activa.',
    specs: [
      { label: 'Motor', valor: '4.0L Bóxer 6 cilindros' },
      { label: 'Potencia', valor: '510 HP' },
      { label: '0 a 100 km/h', valor: '3.4 segundos' }
    ],
    colores: 'Blanco Guards, Rojo Guards, Negro Intenso',
    categoriaFiltro: 'performance'
  },
  {
    id: 'panter',
    nombre: 'The Panter',
    categoria: 'High Performance · BMW M3 Competition',
    precio: 'Desde $620.000.000 COP',
    imagen: 'https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&q=80&w=1200',
    descripcion: 'El equilibrio perfecto entre un sedán familiar y un deportivo de pista.',
    specs: [
      { label: 'Motor', valor: '3.0L Biturbo 6 cilindros' },
      { label: 'Potencia', valor: '503 HP' },
      { label: 'Tracción', valor: 'M xDrive' }
    ],
    colores: 'Azul Isle of Man, Gris Brooklyn, Negro Zafiro',
    categoriaFiltro: 'performance'
  }
];

export default function App() {
  const [filtro, setFiltro] = useState<string>('all');
  const [autoModal, setAutoModal] = useState<Auto | null>(null);
  const [autoInteres, setAutoInteres] = useState<string>('');

  // Tema 3 y 4: Opciones de personalización y accesorios cotizados por el cliente
  const [indicators, setIndicators] = useState<Indicator[]>([
    { id: 1, metric: 'Polarizado Cerámico HD', value: '$850.000 COP', status: 'Óptimo' },
    { id: 2, metric: 'Rines Forjados 20"', value: '$4.200.000 COP', status: 'Alto' },
    { id: 3, metric: 'Tratamiento Cerámico de Pintura', value: '$1.500.000 COP', status: 'Óptimo' },
    { id: 4, metric: 'Sistema de Escape Deportivo', value: '$6.800.000 COP', status: 'Medio' }
  ]);
  const [cargandoApi, setCargandoApi] = useState(false);
  const [errorApi, setErrorApi] = useState<string | null>(null);

  useEffect(() => {
    console.log('Módulo de Personalización VIP listo.');
  }, []);

  const autosFiltrados = filtro === 'all' 
    ? AUTOS_DATA 
    : AUTOS_DATA.filter(a => a.categoriaFiltro === filtro);

  const handleAgendarDesdeModal = (nombreAuto: string) => {
    setAutoInteres(nombreAuto);
    setAutoModal(null);
    document.getElementById('cita')?.scrollIntoView({ behavior: 'smooth' });
  };

  const agregarIndicador = (nuevo: Indicator) => {
    setIndicators([nuevo, ...indicators]);
  };

  // Tema 4: Consumo de API externa para consultar catálogo internacional de accesorios
  const consumirApiExterna = async () => {
    setCargandoApi(true);
    setErrorApi(null);
    try {
      const respuesta = await fetch('https://fakestoreapi.com/products/1');
      if (!respuesta.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      const datos = await respuesta.json();

      const nuevoAccesorio: Indicator = {
        id: Date.now(),
        metric: datos.title ? `Accesorio VIP: ${datos.title.substring(0, 20)}...` : 'Accesorio Importado',
        value: `$${datos.price || '120'} USD`,
        status: 'Óptimo'
      };

      setIndicators((prev) => [nuevoAccesorio, ...prev]);
    } catch (err) {
      setErrorApi('No se pudo consultar el catálogo remoto. Verifique su conexión.');
    } finally {
      setCargandoApi(false);
    }
  };

  return (
    <div>
      <header>
        <div className="logo">Noir<span>collection</span></div>
        <nav>
          <ul>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#personalizacion">Personalización VIP</a></li>
            <li><a href="#catalogo">Catálogo</a></li>
            <li><a href="#cita">Agendar Cita</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="hero-content">
            <h1>Maneja Diferente</h1>
            <p>Descubre lo último en tecnología automotriz con nuestra amplia gama de vehículos.</p>
            <a href="#catalogo" className="btn btn-outline">EXPLORAR COLLECTION</a>
          </div>
        </section>

        {/* Sección de Cotizador y Personalización VIP (Temas 3 y 4) */}
        <section id="personalizacion" style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #334155', paddingBottom: '1rem' }}>
            <div>
              <h2 style={{ color: '#38bdf8', margin: 0 }}>Cotizador de Personalización y Accesorios VIP</h2>
              <p style={{ color: '#94a3b8', margin: '0.2rem 0 0 0', fontSize: '0.9rem' }}>Simula y agrega paquetes exclusivos para tu nuevo vehículo</p>
            </div>
            <button
              onClick={consumirApiExterna}
              disabled={cargandoApi}
              style={{
                background: cargandoApi ? '#444' : '#0d9488',
                color: '#fff',
                border: 'none',
                padding: '0.6rem 1rem',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: cargandoApi ? 'not-allowed' : 'pointer'
              }}
            >
              {cargandoApi ? 'Consultando...' : 'Consultar Catálogo Importado'}
            </button>
          </div>

          {errorApi && (
            <div style={{ background: '#7f1d1d', border: '1px solid #991b1b', padding: '0.8rem', borderRadius: '6px', marginBottom: '1.5rem', color: '#fca5a5' }}>
              {errorApi}
            </div>
          )}

          {/* Formulario Controlado (Tema 3) */}
          <FormularioMetrica onAgregarMetrica={agregarIndicador} />

          {/* Tarjetas Dinámicas de Accesorios Cotizados */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#fff' }}>Opciones y Accesorios Cotizados ({indicators.length})</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              {indicators.map((item) => (
                <TarjetaItem
                  key={item.id}
                  metric={item.metric}
                  value={item.value}
                  status={item.status}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="catalogo" className="collection">
          <div className="filters">
            <button className={`btn-filter ${filtro === 'all' ? 'active' : ''}`} onClick={() => setFiltro('all')}>Todos</button>
            <button className={`btn-filter ${filtro === 'executive' ? 'active' : ''}`} onClick={() => setFiltro('executive')}>Executive</button>
            <button className={`btn-filter ${filtro === 'performance' ? 'active' : ''}`} onClick={() => setFiltro('performance')}>High Performance</button>
          </div>

          <div className="grid-coches">
            {autosFiltrados.map(auto => (
              <CardAuto 
                key={auto.id} 
                auto={auto} 
                onVerDetalles={(id) => setAutoModal(AUTOS_DATA.find(a => a.id === id) || null)} 
              />
            ))}
          </div>
        </section>

        <ModalDetalles 
          auto={autoModal} 
          onClose={() => setAutoModal(null)} 
          onAgendar={handleAgendarDesdeModal} 
        />

        <section id="cita" className="cita">
          <FormularioCita autoInteresInicial={autoInteres} />
        </section>
      </main>

      <footer>
        <p>Copyright 2026 - All rights reserved</p>
      </footer>

      <PanelAccesibilidad />
    </div>
  );
}