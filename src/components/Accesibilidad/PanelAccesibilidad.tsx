// src/components/Accesibilidad/PanelAccesibilidad.tsx
import React, { useState, useEffect } from 'react';

export const PanelAccesibilidad: React.FC = () => {
  const [fontScaleIndex, setFontScaleIndex] = useState<number>(0);
  const [altoContraste, setAltoContraste] = useState<boolean>(false);
  const [modoClaro, setModoClaro] = useState<boolean>(false);

  const ESCALAS = [1, 1.15, 1.3];

  useEffect(() => {
    const html = document.documentElement;
    html.style.setProperty('--font-scale', String(ESCALAS[fontScaleIndex]));
    html.setAttribute('data-contrast', altoContraste ? 'alto' : 'normal');
    html.setAttribute('data-theme', modoClaro ? 'light' : 'dark');
  }, [fontScaleIndex, altoContraste, modoClaro]);

  return (
    <div className="panel-accesibilidad" role="region" aria-label="Preferencias de visualización">
      <button
        type="button"
        className="btn-accesibilidad"
        aria-label="Reducir tamaño de letra"
        onClick={() => setFontScaleIndex((prev) => Math.max(prev - 1, 0))}
      >
        A−
      </button>

      <button
        type="button"
        className="btn-accesibilidad"
        aria-label="Aumentar tamaño de letra"
        onClick={() => setFontScaleIndex((prev) => Math.min(prev + 1, ESCALAS.length - 1))}
      >
        A+
      </button>

      <button
        type="button"
        className="btn-accesibilidad"
        aria-pressed={altoContraste}
        aria-label="Activar modo de alto contraste"
        onClick={() => setAltoContraste((prev) => !prev)}
      >
        ◐
      </button>

      <button
        type="button"
        className="btn-accesibilidad"
        aria-pressed={modoClaro}
        aria-label="Cambiar a modo claro u oscuro"
        onClick={() => setModoClaro((prev) => !prev)}
      >
        {modoClaro ? '☀' : '☾'}
      </button>
    </div>
  );
};