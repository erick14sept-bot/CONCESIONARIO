import { useState, useEffect } from 'react';
import './App.css';
import { Auto, SimulacionCredito } from './types';
import { CardAuto } from './components/Catalogo/CardAuto';
import { ModalDetalles } from './components/Modal/ModalDetalles';
import { FormularioCita } from './components/FormularioCita/FormularioCita';
import { PanelAccesibilidad } from './components/Accesibilidad/PanelAccesibilidad';
import { FormularioSimulador } from './components/FormularioSimulador';
import { TarjetaSimulacion } from './components/TarjetaSimulacion';

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
  },
  {
    id: 'sovereign',
    nombre: 'The Sovereign',
    categoria: 'Sedán Ejecutivo de Lujo · Audi A8 L',
    precio: 'Desde $420.000.000 COP',
    imagen: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=1200',
    descripcion: 'El máximo exponente del confort alemán con suspensión neumática predictiva y asientos con masaje.',
    specs: [
      { label: 'Motor', valor: '3.0L V6 TFSI Mild Hybrid' },
      { label: 'Potencia', valor: '340 HP' },
      { label: 'Tracción', valor: 'quattro con diferencial deportivo' }
    ],
    colores: 'Negro Mitos, Gris Daytona, Azul Navarra',
    categoriaFiltro: 'executive'
  },
  {
    id: 'apex',
    nombre: 'The Apex',
    categoria: 'Superdeportivo · Ferrari F8 Tributo',
    precio: 'Desde $1.850.000.000 COP',
    imagen: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200',
    descripcion: 'Homenaje al motor V8 más potente en la historia de la marca del Coche Rampante.',
    specs: [
      { label: 'Motor', valor: '3.9L V8 Biturbo' },
      { label: 'Potencia', valor: '720 HP' },
      { label: '0 a 100 km/h', valor: '2.9 segundos' }
    ],
    colores: 'Rosso Corsa, Giallo Modena, Nero Daytona',
    categoriaFiltro: 'performance'
  },
  {
    id: 'monarch',
    nombre: 'The Monarch',
    categoria: 'Ultra Lujo Executive · Rolls-Royce Ghost',
    precio: 'Desde $2.400.000.000 COP',
    imagen: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&q=80&w=1200',
    descripcion: 'Silencio absoluto, suspensión Planar y acabados en madera artesanal de nivel supremo.',
    specs: [
      { label: 'Motor', valor: '6.75L V12 Twin-Turbo' },
      { label: 'Potencia', valor: '563 HP' },
      { label: 'Tracción', valor: 'Integral en las 4 ruedas' }
    ],
    colores: 'Negro Diamante, Blanco Ártico, Plata Salamanca',
    categoriaFiltro: 'executive'
  },
  {
    id: 'specter',
    nombre: 'The Specter',
    categoria: 'Superdeportivo · Lamborghini Huracán EVO',
    precio: 'Desde $1.650.000.000 COP',
    imagen: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&q=80&w=1200',
    descripcion: 'Diseño hexagonal aerodinámico, tracción integral y sonido puramente atmosférico.',
    specs: [
      { label: 'Motor', valor: '5.2L V10 Atmosférico' },
      { label: 'Potencia', valor: '640 HP' },
      { label: 'Velocidad Máxima', valor: '325 km/h' }
    ],
    colores: 'Verde Mantis, Arancio Borealis, Grigio Lynx',
    categoriaFiltro: 'performance'
  },
  {
    id: 'vanguard',
    nombre: 'The Vanguard',
    categoria: 'Sedán de Lujo Tecnológico · BMW Serie 7',
    precio: 'Desde $510.000.000 COP',
    imagen: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1200',
    descripcion: 'Innovación de vanguardia con pantalla de cine posterior BMW Theatre Screen de 31 pulgadas.',
    specs: [
      { label: 'Motor', valor: '3.0L TwinPower Turbo, 6 cilindros' },
      { label: 'Potencia', valor: '380 HP' },
      { label: 'Tecnología', valor: 'Faros de Cristal Swarovski' }
    ],
    colores: 'Negro Zafiro, Gris Óxido, Azul Tanzanita',
    categoriaFiltro: 'executive'
  },
  {
    id: 'nemesis',
    nombre: 'The Nemesis',
    categoria: 'Gran Turismo Deportivo · Aston Martin Vantage',
    precio: 'Desde $1.100.000.000 COP',
    imagen: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200',
    descripcion: 'Elegancia británica combinada con un chasis de aluminio de respuesta instantánea.',
    specs: [
      { label: 'Motor', valor: '4.0L V8 Biturbo' },
      { label: 'Potencia', valor: '665 HP' },
      { label: 'Transmisión', valor: 'ZF Automática de 8 velocidades' }
    ],
    colores: 'Verde Racing British, Plata Xenon, Rojo Hyper',
    categoriaFiltro: 'performance'
  },
  {
    id: 'grand-executive',
    nombre: 'The Grand Executive',
    categoria: 'Gran Turismo Sedán · Bentley Flying Spur',
    precio: 'Desde $1.950.000.000 COP',
    imagen: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=1200',
    descripcion: 'La combinación definitiva de lujo artesanal británico y dinamismo de alto rendimiento.',
    specs: [
      { label: 'Motor', valor: '4.0L V8 Twin-Turbo' },
      { label: 'Potencia', valor: '542 HP' },
      { label: 'Interiores', valor: 'Cuero Nappa acolchado a mano' }
    ],
    colores: 'Azul Marlin, Verde Cumbrian, Blanco Ice',
    categoriaFiltro: 'executive'
  }
];

export default function App() {
  const [filtro, setFiltro] = useState<string>('all');
  const [autoModal, setAutoModal] = useState<Auto | null>(null);
  const [autoInteres, setAutoInteres] = useState<string>('');

  // Tema 3 y 4: Estados para el Simulador de Crédito
  const [simulaciones, setSimulaciones] = useState<SimulacionCredito[]>([]);
  const [tasaDolar, setTasaDolar] = useState<number | null>(null);
  const [cargandoApi, setCargandoApi] = useState(false);
  const [errorApi, setErrorApi] = useState<string | null>(null);

  // Tema 4: Mensaje inicial de montaje de componente
  useEffect(() => {
    console.log('Módulo de Financiamiento montado y listo.');
  }, []);

  const autosFiltrados = filtro === 'all' 
    ? AUTOS_DATA 
    : AUTOS_DATA.filter(a => a.categoriaFiltro === filtro);

  const handleAgendarDesdeModal = (nombreAuto: string) => {
    setAutoInteres(nombreAuto);
    setAutoModal(null);
    document.getElementById('cita')?.scrollIntoView({ behavior: 'smooth' });
  };

  const agregarSimulacion = (nueva: SimulacionCredito) => {
    setSimulaciones([nueva, ...simulaciones]);
  };

  // Tema 4: Consumo real de una API de Divisas para clientes internacionales
  const consultarTasaDolar = async () => {
    setCargandoApi(true);
    setErrorApi(null);
    try {
      // API pública de tasas de cambio (Exchange Rates)
      const respuesta = await fetch('https://open.er-api.com/v6/latest/USD');
      if (!respuesta.ok) throw new Error('Error en la respuesta de la API de divisas');
      
      const datos = await respuesta.json();
      
      if (datos && datos.rates && datos.rates.COP) {
        setTasaDolar(datos.rates.COP);
      } else {
        throw new Error('No se encontró la tasa para COP');
      }
    } catch (err) {
      setErrorApi('No se pudo conectar con el servidor financiero. Intente más tarde.');
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
            <li><a href="#financiamiento">Financiamiento</a></li>
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

        {/* Sección del Simulador de Crédito VIP (Temas 3 y 4) */}
        <section id="financiamiento" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #334155', paddingBottom: '1rem', gap: '1rem' }}>
            <div>
              <h2 style={{ color: '#38bdf8', margin: 0, fontSize: '1.8rem' }}>Simulador de Financiamiento VIP</h2>
              <p style={{ color: '#94a3b8', margin: '0.3rem 0 0 0', fontSize: '0.95rem' }}>Calcula tu plan de pagos y consulta precios internacionales</p>
            </div>
            <button
              onClick={consultarTasaDolar}
              disabled={cargandoApi}
              style={{
                background: cargandoApi ? '#475569' : '#10b981',
                color: '#fff',
                border: 'none',
                padding: '0.7rem 1.2rem',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: cargandoApi ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {cargandoApi ? 'Conectando al servidor...' : 'Consultar Tasa Dólar (USD) en Vivo'}
            </button>
          </div>

          {errorApi && (
            <div style={{ background: '#7f1d1d', border: '1px solid #991b1b', padding: '1rem', borderRadius: '6px', marginBottom: '1.5rem', color: '#fca5a5' }}>
              ⚠️ {errorApi}
            </div>
          )}

          {tasaDolar && (
            <div style={{ background: '#064e3b', border: '1px solid #059669', padding: '1rem', borderRadius: '6px', marginBottom: '1.5rem', color: '#a7f3d0' }}>
              ✅ Tasa de Cambio Actualizada: <strong>1 USD = {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(tasaDolar)}</strong>
            </div>
          )}

          {/* Formulario Controlado (Tema 3) */}
          <FormularioSimulador onAgregarSimulacion={agregarSimulacion} />

          {/* Tarjetas de Simulación Generadas */}
          {simulaciones.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Tus Planes Guardados ({simulaciones.length})</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {simulaciones.map((sim) => (
                  <TarjetaSimulacion
                    key={sim.id}
                    simulacion={sim}
                    tasaDolar={tasaDolar}
                  />
                ))}
              </div>
            </div>
          )}
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