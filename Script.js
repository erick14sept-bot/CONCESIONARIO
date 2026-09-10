document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       1. FILTROS DEL CATÁLOGO (comportamiento original)
       ========================================================= */
    const botonesFiltro = document.querySelectorAll('.btn-filter');
    const tarjetasCoches = document.querySelectorAll('.card');

    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
            botonesFiltro.forEach(b => b.classList.remove('active'));
            boton.classList.add('active');

            const filtro = boton.getAttribute('data-filter');

            tarjetasCoches.forEach(tarjeta => {
                const categoria = tarjeta.getAttribute('data-category');
                if (filtro === 'all' || filtro === categoria) {
                    tarjeta.style.display = 'block';
                    tarjeta.style.opacity = '0';
                    setTimeout(() => tarjeta.style.opacity = '1', 50);
                } else {
                    tarjeta.style.display = 'none';
                }
            });
        });
    });

    /* =========================================================
       2. VENTANA FLOTANTE CON LA FICHA TÉCNICA DEL VEHÍCULO
       ========================================================= */
    const AUTOS = {
        authority: {
            nombre: 'The Authority',
            categoria: 'Sedán Ejecutivo · Mercedes-Benz Clase E',
            precio: 'Desde $185.000.000 COP',
            imagen: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=1200',
            descripcion: 'Un sedán ejecutivo pensado para quienes dirigen desde el asiento trasero tanto como desde el volante. Interiores en cuero Nappa, aislamiento acústico premium y el sistema multimedia MBUX con pantalla de 12.3".',
            specs: [
                { label: 'Motor', valor: '2.0L Turbo, 4 cilindros' },
                { label: 'Potencia', valor: '258 HP' },
                { label: '0 a 100 km/h', valor: '6.2 segundos' },
                { label: 'Transmisión', valor: 'Automática 9G-TRONIC' },
                { label: 'Rendimiento', valor: '14 km/l aprox.' },
                { label: 'Año modelo', valor: '2026' },
            ],
            colores: 'Negro Obsidiana, Blanco Diamante, Gris Selenita',
        },
        phantom: {
            nombre: 'The Phantom',
            categoria: 'Deportivo de Alto Rendimiento · Porsche 911 GT3',
            precio: 'Desde $950.000.000 COP',
            imagen: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
            descripcion: 'Ingeniería de pista homologada para calle. Suspensión ajustable, aerodinámica activa con alerón trasero y un motor bóxer atmosférico que redefine la experiencia de manejo deportivo.',
            specs: [
                { label: 'Motor', valor: '4.0L Bóxer 6 cilindros' },
                { label: 'Potencia', valor: '510 HP' },
                { label: '0 a 100 km/h', valor: '3.4 segundos' },
                { label: 'Transmisión', valor: 'PDK 7 velocidades' },
                { label: 'Velocidad máxima', valor: '318 km/h' },
                { label: 'Año modelo', valor: '2026' },
            ],
            colores: 'Blanco Guards, Rojo Guards, Negro Intenso',
        },
        panter: {
            nombre: 'The Panter',
            categoria: 'High Performance · BMW M3 Competition',
            precio: 'Desde $620.000.000 COP',
            imagen: 'https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&q=80&w=1200',
            descripcion: 'El equilibrio perfecto entre un sedán familiar y un deportivo de pista. Paquete Competition de serie, tracción M xDrive y la posibilidad de frenos carbono-cerámicos opcionales.',
            specs: [
                { label: 'Motor', valor: '3.0L Biturbo 6 cilindros' },
                { label: 'Potencia', valor: '503 HP' },
                { label: '0 a 100 km/h', valor: '3.9 segundos' },
                { label: 'Transmisión', valor: 'M Steptronic 8 velocidades' },
                { label: 'Tracción', valor: 'M xDrive' },
                { label: 'Año modelo', valor: '2026' },
            ],
            colores: 'Azul Isle of Man, Gris Brooklyn, Negro Zafiro',
        },
    };

    const overlay = document.getElementById('modal-overlay');
    const modalCoche = document.getElementById('modal-coche');
    let ultimoElementoActivo = null;

    function poblarModal(idAuto) {
        const auto = AUTOS[idAuto];
        if (!auto) return;

        document.getElementById('modal-imagen').src = auto.imagen;
        document.getElementById('modal-imagen').alt = auto.nombre;
        document.getElementById('modal-categoria').textContent = auto.categoria;
        document.getElementById('modal-titulo').textContent = auto.nombre;
        document.getElementById('modal-precio').textContent = auto.precio;
        document.getElementById('modal-descripcion').textContent = auto.descripcion;
        document.getElementById('modal-colores').textContent = auto.colores;

        const specsEl = document.getElementById('modal-specs');
        specsEl.innerHTML = '';
        auto.specs.forEach(spec => {
            const item = document.createElement('div');
            item.innerHTML = `<dt>${spec.label}</dt><dd>${spec.valor}</dd>`;
            specsEl.appendChild(item);
        });

        overlay.dataset.autoActual = idAuto;
    }

    function abrirModal(idAuto) {
        poblarModal(idAuto);
        ultimoElementoActivo = document.activeElement;
        overlay.hidden = false;
        document.body.style.overflow = 'hidden';
        document.getElementById('modal-cerrar').focus();
    }

    function cerrarModal() {
        overlay.hidden = true;
        document.body.style.overflow = '';
        if (ultimoElementoActivo) ultimoElementoActivo.focus();
    }

    document.querySelectorAll('.btn-detalles').forEach(boton => {
        boton.addEventListener('click', () => abrirModal(boton.dataset.carId));
    });

    document.getElementById('modal-cerrar').addEventListener('click', cerrarModal);
    document.getElementById('modal-btn-cerrar').addEventListener('click', cerrarModal);

    overlay.addEventListener('click', (evento) => {
        if (evento.target === overlay) cerrarModal();
    });

    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape' && !overlay.hidden) cerrarModal();
    });

    // Atrapa el foco dentro del modal mientras está abierto (accesibilidad por teclado)
    modalCoche.addEventListener('keydown', (evento) => {
        if (evento.key !== 'Tab') return;
        const focosPosibles = modalCoche.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const primero = focosPosibles[0];
        const ultimo = focosPosibles[focosPosibles.length - 1];

        if (evento.shiftKey && document.activeElement === primero) {
            evento.preventDefault();
            ultimo.focus();
        } else if (!evento.shiftKey && document.activeElement === ultimo) {
            evento.preventDefault();
            primero.focus();
        }
    });

    // "Agendar Cita para este Auto": cierra el modal, marca el interés y salta al formulario
    document.getElementById('modal-btn-agendar').addEventListener('click', () => {
        const idAuto = overlay.dataset.autoActual;
        const auto = AUTOS[idAuto];
        if (auto) {
            document.getElementById('interes-auto').value = auto.nombre;
            document.getElementById('interes-auto-nombre').textContent = auto.nombre;
            document.getElementById('interes-nota').hidden = false;
        }
        cerrarModal();
        document.getElementById('cita').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => document.getElementById('nombre').focus(), 400);
    });

    /* =========================================================
       3. FLEXIBILIDAD VISUAL: tamaño de letra, contraste y tema
       ========================================================= */
    const html = document.documentElement;
    const CLAVE_PREFERENCIAS = 'noir_preferencias_visuales';
    const ESCALAS = [1, 1.15, 1.3]; // 100%, 115%, 130% — no rompe el diseño (usa unidades relativas)

    let preferencias = { escalaIndex: 0, contraste: 'normal', tema: 'dark' };
    try {
        const guardado = JSON.parse(localStorage.getItem(CLAVE_PREFERENCIAS) || 'null');
        if (guardado) preferencias = { ...preferencias, ...guardado };
    } catch (e) { /* si falla, se usan los valores por defecto */ }

    function aplicarPreferencias() {
        html.style.setProperty('--font-scale', ESCALAS[preferencias.escalaIndex]);
        html.setAttribute('data-contrast', preferencias.contraste);
        html.setAttribute('data-theme', preferencias.tema);

        const btnContraste = document.getElementById('btn-contraste');
        btnContraste.setAttribute('aria-pressed', String(preferencias.contraste === 'alto'));

        const btnTema = document.getElementById('btn-tema');
        const esClaro = preferencias.tema === 'light';
        btnTema.setAttribute('aria-pressed', String(esClaro));
        btnTema.setAttribute('aria-label', esClaro ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');
        btnTema.querySelector('span').textContent = esClaro ? '☀' : '☾';

        try {
            localStorage.setItem(CLAVE_PREFERENCIAS, JSON.stringify(preferencias));
        } catch (e) { /* almacenamiento no disponible: la sesión sigue funcionando */ }
    }

    document.getElementById('btn-texto-mas').addEventListener('click', () => {
        preferencias.escalaIndex = Math.min(preferencias.escalaIndex + 1, ESCALAS.length - 1);
        aplicarPreferencias();
    });

    document.getElementById('btn-texto-menos').addEventListener('click', () => {
        preferencias.escalaIndex = Math.max(preferencias.escalaIndex - 1, 0);
        aplicarPreferencias();
    });

    document.getElementById('btn-contraste').addEventListener('click', () => {
        preferencias.contraste = preferencias.contraste === 'alto' ? 'normal' : 'alto';
        aplicarPreferencias();
    });

    document.getElementById('btn-tema').addEventListener('click', () => {
        preferencias.tema = preferencias.tema === 'light' ? 'dark' : 'light';
        aplicarPreferencias();
    });

    aplicarPreferencias();

    /* =========================================================
       4. FLUJO DE REGISTRO EN PASOS: "Paso X de 3"
          + guardado automático de borrador + errores específicos
       ========================================================= */
    const formulario = document.getElementById('formulario-cita');
    const pasos = Array.from(document.querySelectorAll('.form-step'));
    const TOTAL_PASOS = pasos.length;
    let pasoActual = 1;

    const pasoTexto = document.getElementById('paso-texto');
    const progresoRelleno = document.getElementById('progreso-relleno');
    const etiquetasPaso = document.querySelectorAll('.progreso-etiquetas li');

    const btnAnterior = document.getElementById('btn-anterior');
    const btnSiguiente = document.getElementById('btn-siguiente');
    const btnConfirmar = document.getElementById('btn-confirmar');
    const mensajeExito = document.getElementById('exito');
    const notaAutoguardado = document.getElementById('autosave-nota');

    const campos = {
        nombre: document.getElementById('nombre'),
        correo: document.getElementById('correo'),
        telefono: document.getElementById('telefono'),
        fecha: document.getElementById('fecha'),
        hora: document.getElementById('hora'),
    };

    // Validaciones con mensajes de error específicos por campo
    const validadores = {
        nombre: (valor) => {
            if (!valor.trim()) return 'Escribe tu nombre completo.';
            if (valor.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres.';
            return '';
        },
        correo: (valor) => {
            if (!valor.trim()) return 'Escribe tu correo electrónico.';
            const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!patron.test(valor)) return 'Ingresa un correo válido, por ejemplo carlos@ejemplo.com.';
            return '';
        },
        telefono: (valor) => {
            if (!valor.trim()) return 'Escribe tu número de teléfono.';
            const soloDigitos = valor.replace(/[^\d]/g, '');
            if (soloDigitos.length < 7) return 'El teléfono debe tener al menos 7 dígitos.';
            return '';
        },
        fecha: (valor) => {
            if (!valor) return 'Selecciona una fecha para la cita.';
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            const seleccionada = new Date(valor + 'T00:00:00');
            if (seleccionada < hoy) return 'La fecha no puede ser anterior a hoy.';
            return '';
        },
        hora: (valor) => {
            if (!valor) return 'Selecciona una hora aproximada.';
            return '';
        },
    };

    function mostrarError(campo, mensaje) {
        const errorEl = document.getElementById('error-' + campo);
        if (errorEl) errorEl.textContent = mensaje;
        if (campos[campo]) campos[campo].setAttribute('aria-invalid', mensaje ? 'true' : 'false');
    }

    function validarCampo(nombreCampo) {
        const mensaje = validadores[nombreCampo](campos[nombreCampo].value);
        mostrarError(nombreCampo, mensaje);
        return !mensaje;
    }

    function validarPaso(numeroPaso) {
        const camposPorPaso = {
            1: ['nombre', 'correo', 'telefono'],
            2: ['fecha', 'hora'],
            3: [],
        };
        return camposPorPaso[numeroPaso].every(validarCampo);
    }

    function actualizarProgreso() {
        pasoTexto.textContent = `Paso ${pasoActual} de ${TOTAL_PASOS}`;
        progresoRelleno.style.width = `${(pasoActual / TOTAL_PASOS) * 100}%`;

        etiquetasPaso.forEach(li => {
            li.classList.toggle('activo', Number(li.dataset.step) === pasoActual);
        });

        pasos.forEach(paso => {
            paso.hidden = Number(paso.dataset.step) !== pasoActual;
        });

        btnAnterior.hidden = pasoActual === 1;
        btnSiguiente.hidden = pasoActual === TOTAL_PASOS;
        btnConfirmar.hidden = pasoActual !== TOTAL_PASOS;

        if (pasoActual === TOTAL_PASOS) {
            document.getElementById('resumen-nombre').textContent = campos.nombre.value;
            document.getElementById('resumen-correo').textContent = campos.correo.value;
            document.getElementById('resumen-telefono').textContent = campos.telefono.value;
            document.getElementById('resumen-fecha').textContent = campos.fecha.value;
            document.getElementById('resumen-hora').textContent = campos.hora.value;
        }

        // Mueve el foco al inicio del nuevo paso para usuarios de teclado/lector de pantalla
        const pasoVisible = pasos.find(p => !p.hidden);
        const primerCampo = pasoVisible.querySelector('input');
        if (primerCampo) primerCampo.focus({ preventScroll: true });
    }

    btnSiguiente.addEventListener('click', () => {
        if (!validarPaso(pasoActual)) return;
        pasoActual = Math.min(pasoActual + 1, TOTAL_PASOS);
        actualizarProgreso();
    });

    btnAnterior.addEventListener('click', () => {
        pasoActual = Math.max(pasoActual - 1, 1);
        actualizarProgreso();
    });

    // Validación en vivo al salir de cada campo
    Object.keys(campos).forEach(nombreCampo => {
        campos[nombreCampo].addEventListener('blur', () => validarCampo(nombreCampo));
    });

    /* --- Guardado automático de borrador --- */
    const CLAVE_BORRADOR = 'noir_cita_borrador';
    let temporizadorGuardado = null;

    function guardarBorrador() {
        const datos = {
            nombre: campos.nombre.value,
            correo: campos.correo.value,
            telefono: campos.telefono.value,
            fecha: campos.fecha.value,
            hora: campos.hora.value,
            pasoActual,
            interesAuto: document.getElementById('interes-auto').value,
        };
        try {
            localStorage.setItem(CLAVE_BORRADOR, JSON.stringify(datos));
            notaAutoguardado.textContent = 'Borrador guardado automáticamente.';
            clearTimeout(temporizadorGuardado);
            temporizadorGuardado = setTimeout(() => { notaAutoguardado.textContent = '\u00A0'; }, 2500);
        } catch (e) { /* si el almacenamiento no está disponible, se continúa sin guardar */ }
    }

    let temporizadorDebounce = null;
    Object.values(campos).forEach(input => {
        input.addEventListener('input', () => {
            clearTimeout(temporizadorDebounce);
            temporizadorDebounce = setTimeout(guardarBorrador, 500);
        });
    });

    function cargarBorrador() {
        try {
            return JSON.parse(localStorage.getItem(CLAVE_BORRADOR) || 'null');
        } catch (e) {
            return null;
        }
    }

    function eliminarBorrador() {
        try { localStorage.removeItem(CLAVE_BORRADOR); } catch (e) { /* no-op */ }
    }

    const avisoBorrador = document.getElementById('aviso-borrador');
    const borradorGuardado = cargarBorrador();

    if (borradorGuardado) {
        avisoBorrador.hidden = false;

        document.getElementById('btn-restaurar').addEventListener('click', () => {
            campos.nombre.value = borradorGuardado.nombre || '';
            campos.correo.value = borradorGuardado.correo || '';
            campos.telefono.value = borradorGuardado.telefono || '';
            campos.fecha.value = borradorGuardado.fecha || '';
            campos.hora.value = borradorGuardado.hora || '';
            pasoActual = borradorGuardado.pasoActual || 1;
            if (borradorGuardado.interesAuto) {
                document.getElementById('interes-auto').value = borradorGuardado.interesAuto;
                document.getElementById('interes-auto-nombre').textContent = borradorGuardado.interesAuto;
                document.getElementById('interes-nota').hidden = false;
            }
            avisoBorrador.hidden = true;
            actualizarProgreso();
        });

        document.getElementById('btn-descartar').addEventListener('click', () => {
            eliminarBorrador();
            avisoBorrador.hidden = true;
        });
    }

    /* --- Envío final --- */
    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();
        if (!validarPaso(1) || !validarPaso(2)) return;

        mensajeExito.style.display = 'flex';
        eliminarBorrador();
        formulario.reset();
        document.getElementById('interes-nota').hidden = true;
        pasoActual = 1;
        actualizarProgreso();

        setTimeout(() => {
            mensajeExito.style.display = 'none';
        }, 6000);
    });

    actualizarProgreso();
});