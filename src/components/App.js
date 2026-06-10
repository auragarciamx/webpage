// auragarcia — Plataforma Multi-División
// Design Read: B2B HealthTech SaaS · clinical-precision aesthetic
// DESIGN_VARIANCE: 6 | MOTION_INTENSITY: 3 | VISUAL_DENSITY: 5
const { useState, useEffect, useRef, memo } = React;

// === LUCIDE-POWERED ICON COMPONENT ===
// Cache SVG innerHTML per icon name to avoid repeated DOM creation
const _iconCache = {};
const Icon = memo(({ name, size = 24, color = 'currentColor', className = '' }) => {
  // Convert kebab-case to PascalCase for Lucide lookup
  const pascal = name.replace(/(^\w|-\w)/g, m => m.replace('-', '').toUpperCase());

  // Custom SVG for LinkedIn (brand icon not in Lucide)
  if (name === 'linkedin') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    );
  }

  // Populate cache on first use
  // Lucide UMD exports icons as arrays of [tagName, attrs] tuples (inner SVG children)
  if (!_iconCache[pascal] && typeof lucide !== 'undefined' && Array.isArray(lucide[pascal])) {
    try {
      const inner = lucide[pascal].map(([tag, attrs]) => {
        const attrStr = Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ');
        return `<${tag} ${attrStr}/>`;
      }).join('');
      _iconCache[pascal] = inner;
    } catch (_) {}
  }

  const innerHTML = _iconCache[pascal];
  if (!innerHTML) return <span style={{ display: 'inline-block', width: size, height: size }} className={className} />;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className} dangerouslySetInnerHTML={{ __html: innerHTML }} />
  );
});

// === ECG: latido animado, firma visual de salud ===
const EcgLine = ({ color = '#818CF8', className = '' }) => (
  <svg viewBox="0 0 600 60" preserveAspectRatio="none" aria-hidden="true" className={`block w-full h-10 ${className}`}>
    <path className="ecg-path" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      d="M0,30 L150,30 L168,30 L178,14 L188,46 L198,6 L208,44 L218,30 L240,30 L390,30 L408,30 L418,18 L428,42 L438,10 L448,40 L458,30 L480,30 L600,30" />
  </svg>
);

// === Contador animado al entrar en viewport ===
const CountUp = ({ end, suffix = '', duration = 1600 }) => {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const t0 = performance.now();
      const tick = now => {
        const p = Math.min((now - t0) / duration, 1);
        setVal(Math.round(end * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
};

// === Divisor ondulado orgánico entre secciones ===
const WaveDivider = ({ from, to }) => (
  <div aria-hidden="true" style={{ backgroundColor: from, lineHeight: 0 }}>
    <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="block w-full h-10 md:h-16">
      <path d="M0,32 C240,62 480,2 720,26 C960,50 1200,10 1440,34 L1440,64 L0,64 Z" fill={to} />
    </svg>
  </div>
);

// === MAIN APP ===
const AuraGarciaApp = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDivisionsMenu, setShowDivisionsMenu] = useState(false);
  const [showAuraEffect, setShowAuraEffect] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMethodologyStep, setActiveMethodologyStep] = useState(0);
  const [methodologyLineProgress, setMethodologyLineProgress] = useState(0);

  const navSentinelRef = useRef(null);
  const methodologyRef = useRef(null);

  const handleThemeToggle = () => {
    setShowAuraEffect(true);
    setIsDarkMode(d => !d);
    setTimeout(() => setShowAuraEffect(false), 1500);
  };

  const divisions = [
    { id: 'transformacion', label: 'Transformación Digital', color: '#818CF8', tag: 'tag-transform' },
    { id: 'eai',            label: 'EAI · Agencia IA',       color: '#A78BFA', tag: 'tag-eai' },
    { id: 'analytics',      label: 'Analytics & Data',       color: '#22D3EE', tag: 'tag-analytics' },
    { id: 'equipos-medicos',label: 'Equipos Médicos',        color: '#34D399', tag: 'tag-medequip' },
    { id: 'marketing-salud',label: 'Marketing Digital',      color: '#FBBF24', tag: 'tag-marketing' },
  ];

  const services = [
    { title: 'Estrategia Digital en Salud',   description: 'Hoja de ruta clara para tu transformación digital.', timeframe: '4-6 sem', icon: 'map-pin', featured: true },
    { title: 'Datos Conectados',              description: 'Tus sistemas hablando entre sí, sin silos de información.', timeframe: '6-8 sem', icon: 'network' },
    { title: 'Inteligencia Hospitalaria',     description: 'KPIs clínicos y ejecutivos en tiempo real.', timeframe: '4-8 sem', icon: 'bar-chart' },
    { title: 'IA Médica Aplicada',            description: 'IA para diagnóstico y gestión. Validada, operativa.', timeframe: '8-12 sem', icon: 'brain' },
    { title: 'Productos AuraGarcia',          description: 'SALV.IA, MamRisk y CLARA. Probadas, no prototipos.', timeframe: '2-4 sem', icon: 'package' },
    { title: 'Transformación Organizacional', description: 'Equipos capacitados y procesos optimizados para el cambio.', timeframe: 'Continuo', icon: 'users' },
  ];

  const methodologySteps = [
    { letter: 'A', title: 'Analizar',   subtitle: 'Entendemos tu realidad actual',      description: 'Mapeamos procesos, datos y equipos para encontrar el valor oculto.',  result: 'Mapa de situación y hoja de ruta' },
    { letter: 'U', title: 'Unificar',   subtitle: 'Conectamos tus sistemas',            description: 'Datos estandarizados, flujos entre departamentos, cero silos.',        result: 'Información que fluye sin barreras' },
    { letter: 'R', title: 'Reinventar', subtitle: 'Construimos lo que funciona',        description: 'Herramientas diseñadas desde casos de uso clínicos reales.',           result: 'Tecnología que tu equipo realmente usa' },
    { letter: 'A', title: 'Ampliar',    subtitle: 'Escalamos y optimizamos',            description: 'Medimos, ajustamos y expandimos lo que genera impacto.',               result: 'Escala con métricas claras' },
  ];

  const whyUs = [
    { title: 'Experiencia Clínica Real',     description: 'Técnicos con experiencia clínica directa. Entendemos los desafíos del hospital porque los hemos vivido.',  icon: 'heart-pulse' },
    { title: 'Soluciones, no pilotos',       description: 'SALV.IA, MamRisk y CLARA funcionan hoy. Sin prototipos, sin esperas.',                                     icon: 'rocket' },
    { title: 'Metodología AURA',             description: '4 fases, del diagnóstico a valor clínico medible en semanas.',                                             icon: 'git-merge' },
    { title: 'Compliance y Seguridad',       description: 'RGPD, ISO 27001 y normativa sanitaria. Sin excepciones.',                                                  icon: 'shield' },
    { title: 'Soporte Continuo',             description: 'Contigo hasta que el cambio sea permanente.',                                                              icon: 'headphones' },
    { title: 'ROI Medible',                  description: 'Menos costes operativos, mejor atención, todo documentado.',                                               icon: 'trending-up' },
  ];

  const eaiServices = [
    { title: 'Agentes IA Clínicos',   description: 'Agentes que automatizan flujos clínicos completos sin intervención humana.',                        icon: 'cpu',            featured: true },
    { title: 'Integración LLM',       description: 'LLMs para notas clínicas, codificación y resúmenes de historiales.',                               icon: 'brain' },
    { title: 'Automatización RPA',    description: 'Facturación, altas e informes sin intervención humana.',                                           icon: 'zap' },
    { title: 'IA Conversacional',     description: 'Triaje, citas y soporte 24/7 para pacientes y staff.',                                             icon: 'message-circle' },
  ];

  const analyticsServices = [
    { title: 'Equipos de Datos Nearshore',  description: 'Data scientists senior en tu equipo. Especializados en salud. 40-60% del coste US/EU.',           icon: 'users' },
    { title: 'BI & Dashboards de Salud',    description: 'Dashboards en tiempo real para equipos clínicos y directivos. Compatibles HL7/FHIR.',              icon: 'bar-chart' },
    { title: 'Ingeniería de Datos',         description: 'HL7, FHIR, ETL y data warehouse en la nube. De punta a punta.',                                    icon: 'database' },
    { title: 'Analítica Avanzada',          description: 'Modelos predictivos de resultados, reingresos y uso de recursos.',                                  icon: 'trending-up' },
  ];

  const medEquipServices = [
    { title: 'Diagnóstico por Imagen',  description: 'Ecógrafos, radiología digital y resonancias. Precios de importación directa.',   icon: 'microscope' },
    { title: 'Equipamiento de UCI',     description: 'Monitores, ventiladores y desfibriladores. Garantía y soporte incluidos.',        icon: 'activity' },
    { title: 'Tecnología Quirúrgica',   description: 'Laparoscopia, instrumental quirúrgico e iluminación de alto rendimiento.',        icon: 'layers' },
    { title: 'Equipos de Laboratorio',  description: 'Hematología, PCR y microbiología. Formación del personal incluida.',              icon: 'cpu' },
  ];

  const products = [
    { name: 'SALV.IA',  tagline: 'Detección de arritmias en ECG en segundos.',          tag: 'Cardiología',  icon: 'heart-pulse', color: '#818CF8' },
    { name: 'MamRisk',  tagline: 'Estratificación de riesgo en screening de mama.',      tag: 'Radiología',   icon: 'scan',        color: '#A78BFA' },
    { name: 'CLARA',    tagline: 'Documentación clínica asistida por IA.',               tag: 'Asistente IA', icon: 'sparkles',    color: '#22D3EE' },
  ];

  const marketingServices = [
    { title: 'SEO Médico',          description: 'Posicionamiento para clínicas y hospitales. Contenido clínicamente riguroso.',  icon: 'search' },
    { title: 'Social Media Clínico',description: 'Contenido que educa, genera confianza y atrae pacientes.',                     icon: 'share-2' },
    { title: 'Paid Ads para Salud', description: 'Google y Meta dentro del marco sanitario. ROI garantizado.',                   icon: 'megaphone' },
    { title: 'Contenido Médico',    description: 'Blog, newsletters y casos clínicos con validación médica.',                    icon: 'edit' },
  ];

  // IntersectionObserver for navbar scroll state (replaces window scroll listener)
  useEffect(() => {
    const el = navSentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setIsScrolled(!e.isIntersecting), { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // IntersectionObserver for methodology steps (replaces window scroll listener)
  useEffect(() => {
    const container = methodologyRef.current;
    if (!container) return;
    const stepEls = container.querySelectorAll('[data-step]');
    if (!stepEls.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = parseInt(e.target.dataset.step, 10);
          setActiveMethodologyStep(idx);
          setMethodologyLineProgress((idx + 1) / methodologySteps.length);
        }
      });
    }, { threshold: 0.55, rootMargin: '-5% 0px -35% 0px' });
    stepEls.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [methodologySteps.length]);

  // IntersectionObserver for reveal animations
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal-hidden').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const dk = isDarkMode;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${dk ? 'bg-black text-white' : 'bg-white text-gray-900'}`}
      style={{ fontFamily: 'Girot, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>

      <style>{`
        @keyframes wave-flow { 0%{transform:translateX(0)translateY(0)scale(1);border-radius:30% 70% 70% 30%/30% 30% 70% 70%} 50%{transform:translateX(-1%)translateY(2%)scale(1.01);border-radius:50% 50%} 100%{transform:translateX(0)translateY(0)scale(1);border-radius:30% 70% 70% 30%/30% 30% 70% 70%} }
        @keyframes wave-rev  { 0%{transform:scale(1)} 50%{transform:translateX(1%)translateY(-2%)scale(1.02)} 100%{transform:scale(1)} }
        @keyframes aura-drift { 0%{transform:translate(-50%,-50%)} 25%{transform:translate(-50%,-50%) translateX(80px) translateY(-40px)} 50%{transform:translate(-50%,-50%) translateX(-40px) translateY(80px)} 75%{transform:translate(-50%,-50%) translateX(120px) translateY(40px)} 100%{transform:translate(-50%,-50%)} }
        @keyframes aura-breathe { 0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.08} 50%{transform:translate(-50%,-50%) scale(1.3);opacity:0.15} }
        @keyframes sweep  { 0%{transform:translateX(-100%);opacity:0} 50%{opacity:1} 100%{transform:translateX(100%);opacity:0} }
        @keyframes sweep2 { 0%{transform:translateX(-100%);opacity:0} 20%{opacity:0} 70%{opacity:1} 100%{transform:translateX(100%);opacity:0} }
        .wf { animation: wave-flow 15s ease-in-out infinite }
        .wr { animation: wave-rev  18s ease-in-out infinite }
        .s1 { animation: sweep  1.5s ease-out forwards }
        .s2 { animation: sweep2 1.5s ease-out forwards }
        .card-hover { transition: all 0.35s cubic-bezier(0.4,0,0.2,1); }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 16px 40px -16px rgba(99,102,241,0.3); }
        .list-item-hover { transition: background 0.2s ease; }
        .list-item-hover:hover { background: rgba(255,255,255,0.03) !important; }
        .ecg-path { stroke-dasharray: 760; stroke-dashoffset: 760; animation: ecg-draw 4s linear infinite; }
        @keyframes ecg-draw { 0%{stroke-dashoffset:760} 55%{stroke-dashoffset:0} 100%{stroke-dashoffset:-760} }
        .marquee-track { display: flex; width: max-content; animation: marquee 32s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        @keyframes marquee { to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) {
          .wf, .wr, .ecg-path, .marquee-track { animation: none !important; }
          .reveal-hidden { opacity: 1 !important; transform: none !important; transition: none !important; }
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      {showAuraEffect && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent s1" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/15 to-transparent s2" />
        </div>
      )}

      {/* ── HEADER ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? (dk ? 'bg-black/92 backdrop-blur-xl border-b border-white/5' : 'bg-white/92 backdrop-blur-xl border-b border-gray-200/50') : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex justify-between items-center">
          <img src="resources/logos/AuragarciaLogoVector-2.png" alt="AuraGarcia" className={`h-12 md:h-14 w-auto ${dk ? 'brightness-0 invert' : ''}`} />

          <nav className="hidden md:flex items-center gap-6">
            <div className="relative">
              <button onClick={() => setShowDivisionsMenu(v => !v)}
                className={`flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] transition-colors ${dk ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                Divisiones
                <Icon name="chevron-down" size={12} color="currentColor" className={`transition-transform duration-200 ${showDivisionsMenu ? 'rotate-180' : ''}`} />
              </button>
              {showDivisionsMenu && (
                <div className={`absolute top-full left-0 mt-3 w-60 rounded-2xl overflow-hidden shadow-2xl ${dk ? 'bg-[#111] border border-white/10' : 'bg-white border border-gray-100'}`}>
                  {divisions.map(d => (
                    <a key={d.id} href={`#${d.id}`} onClick={() => setShowDivisionsMenu(false)}
                      className={`flex items-center gap-3 px-5 py-3 text-sm transition-colors ${dk ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                      {d.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <a href="#testimonios" className={`text-xs uppercase tracking-[0.25em] transition-colors ${dk ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Testimonios</a>
            <a href="#contacto"    className={`text-xs uppercase tracking-[0.25em] transition-colors ${dk ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Contacto</a>
          </nav>

          <div className="flex items-center gap-3">
            <a href="https://calendly.com/avragarcia" target="_blank" rel="noopener noreferrer"
              className="hidden md:inline-flex btn-gradient-primary px-5 py-2 rounded-full text-xs uppercase tracking-widest font-medium">
              Agendar llamada
            </a>
            <button onClick={handleThemeToggle}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${dk ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'}`}>
              <Icon name={dk ? 'sun' : 'moon'} size={14} color={dk ? 'white' : '#374151'} />
            </button>
            <button onClick={() => setIsMobileMenuOpen(v => !v)} className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5">
              <span className={`block w-5 h-0.5 transition-all duration-300 ${dk ? 'bg-white' : 'bg-gray-900'} ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 transition-all duration-300 ${dk ? 'bg-white' : 'bg-gray-900'} ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 transition-all duration-300 ${dk ? 'bg-white' : 'bg-gray-900'} ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className={`md:hidden ${dk ? 'bg-black/95 border-t border-white/5' : 'bg-white border-t border-gray-100'} backdrop-blur-xl`}>
            <nav className="px-6 py-6 space-y-1">
              {divisions.map(d => (
                <a key={d.id} href={`#${d.id}`} onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 py-3 text-sm transition-colors ${dk ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                  {d.label}
                </a>
              ))}
              <div className="pt-4 border-t border-white/5 space-y-2">
                <a href="#testimonios" onClick={() => setIsMobileMenuOpen(false)} className={`block py-2 text-sm ${dk ? 'text-gray-300' : 'text-gray-600'}`}>Testimonios</a>
                <a href="#contacto"    onClick={() => setIsMobileMenuOpen(false)} className={`block py-2 text-sm ${dk ? 'text-gray-300' : 'text-gray-600'}`}>Contacto</a>
                <a href="https://calendly.com/avragarcia" target="_blank" rel="noopener noreferrer"
                  className="mt-3 w-full btn-gradient-primary px-6 py-3 rounded-full text-sm text-center block">
                  Agendar llamada
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* ── HERO — left-aligned, DESIGN_VARIANCE 6 ── */}
      <section id="inicio" className="relative min-h-screen flex items-center px-4 md:px-8 pt-20 overflow-hidden">
        {/* Scroll sentinel for navbar (replaces window scroll listener) */}
        <div ref={navSentinelRef} className="absolute top-24 left-0 w-px h-px pointer-events-none" aria-hidden="true" />

        {/* Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 wf" style={{ background: dk ? 'linear-gradient(135deg,#000 0%,#0d0d1a 30%,#111128 60%,#050510 100%)' : 'linear-gradient(135deg,#EEF2FF 0%,#E0E7FF 40%,#F5F3FF 70%,#EFF6FF 100%)' }} />
          <div className="absolute inset-0 wr opacity-60" style={{ background: dk ? 'linear-gradient(45deg,#0d0d1a,#111428,#0f1535)' : 'linear-gradient(45deg,#E0E7FF,#EDE9FE,#DBEAFE)' }} />
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle,rgba(99,102,241,0.09) 0%,transparent 65%)', transform: 'translate(-50%,-50%)', animation: 'aura-drift 22s ease-in-out infinite', filter: 'blur(60px)' }} />
          <div className="absolute inset-0 opacity-[0.12]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px' }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-16">
          {/* Left */}
          <div>
            <div className="flex flex-wrap gap-2 mb-8 reveal-hidden">
              {divisions.map(d => (
                <a key={d.id} href={`#${d.id}`} className="stat-pill text-xs transition-all duration-300 hover:scale-105"
                  style={{ background: `${d.color}18`, color: d.color, border: `1px solid ${d.color}30` }}>
                  {d.label}
                </a>
              ))}
            </div>

            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-light leading-[1.0] mb-6 reveal-hidden delay-1 ${dk ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
              Salud más<br />
              <span className="gradient-text-primary" style={{ paddingBottom: '0.1em', display: 'inline-block' }}>inteligente</span>
            </h1>

            <p className={`text-lg md:text-xl leading-relaxed mb-6 max-w-lg font-light reveal-hidden delay-2 ${dk ? 'text-gray-300' : 'text-gray-600'}`}>
              Todo lo que necesitas para liderar la salud digital, en una sola empresa.
            </p>

            <div className="max-w-md mb-8 reveal-hidden delay-2" style={{ opacity: 0.7 }}>
              <EcgLine color={dk ? '#818CF8' : '#6366F1'} />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12 reveal-hidden delay-3">
              <a href="https://calendly.com/avragarcia" target="_blank" rel="noopener noreferrer"
                className="btn-gradient-primary px-8 py-4 rounded-full text-base font-light inline-flex items-center gap-2">
                Conversemos <Icon name="arrow-right" size={18} color="white" />
              </a>
              <a href="#transformacion"
                className={`px-8 py-4 rounded-full text-base font-light inline-flex items-center gap-2 transition-all duration-300 ${dk ? 'border border-white/15 text-white hover:bg-white/5' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                Ver servicios
              </a>
            </div>

            <div className="flex flex-wrap gap-4 reveal-hidden delay-4">
              {[['40%','reducción diagnóstico'],['6 sem','implementación'],['50+','hospitales']].map(([v, l]) => (
                <span key={l} className="stat-pill"
                  style={{ background: dk ? 'rgba(255,255,255,0.06)' : 'rgba(99,102,241,0.08)', border: dk ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(99,102,241,0.15)', color: dk ? 'rgba(255,255,255,0.85)' : '#4338CA' }}>
                  <strong style={{ color: '#818CF8', marginRight: 5 }}>{v}</strong>{l}
                </span>
              ))}
            </div>
          </div>

          {/* Right — image panel */}
          <div className="hidden lg:block reveal-hidden delay-2">
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4/5' }}>
              <img src="https://picsum.photos/seed/medtech2026/600/750" alt="Healthcare technology"
                className="w-full h-full object-cover" loading="eager" />
              <div className="absolute inset-0" style={{ background: dk ? 'linear-gradient(to top,rgba(0,0,0,0.75) 0%,rgba(0,0,0,0.1) 50%,transparent 100%)' : 'linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 60%)' }} />
              {/* Floating metric card */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="rounded-2xl p-4 backdrop-blur-md" style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Hospitales activos</p>
                      <p className="text-2xl font-light text-white">50+</p>
                    </div>
                    <div className="flex -space-x-2">
                      {['#818CF8','#22D3EE','#34D399','#FBBF24'].map((c, i) => (
                        <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
                          style={{ background: `${c}30`, color: c, border: '2px solid rgba(0,0,0,0.6)' }}>
                          {['H','C','I','M'][i]}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE — divisiones en movimiento ── */}
      <div className={`py-5 overflow-hidden ${dk ? 'border-y border-white/5 bg-black' : 'border-y border-gray-100 bg-white'}`} aria-hidden="true">
        <div className="marquee-track items-center gap-0">
          {[...Array(2)].map((_, dup) => (
            <div key={dup} className="flex items-center">
              {divisions.map(d => (
                <span key={`${dup}-${d.id}`} className="flex items-center gap-3 px-8 text-sm uppercase tracking-[0.3em] whitespace-nowrap font-light"
                  style={{ color: d.color }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.color }} />
                  {d.label}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── DIV 1: TRANSFORMACIÓN DIGITAL ── */}
      <section id="transformacion" className="py-24 md:py-32 px-4 md:px-8" style={{ backgroundColor: dk ? '#050510' : '#FAFAFA' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 reveal-hidden">
            <span className="section-label tag-transform mb-5 inline-block">Transformación Digital en Salud</span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-5">
              <h2 className={`text-4xl md:text-6xl font-light leading-tight ${dk ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
                Servicios que<br />mueven la aguja
              </h2>
              <p className={`text-sm font-light max-w-xs md:text-right ${dk ? 'text-gray-400' : 'text-gray-500'}`}>
                Impacto medible en semanas
              </p>
            </div>
          </div>

          {/* Bento: featured (2-col) + regular */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div className={`md:col-span-2 ${dk ? 'card-glass-dark' : 'card-glass-light'} gradient-border-card p-8 reveal-hidden delay-1 card-hover relative overflow-hidden`}>
              <div className="absolute right-0 top-0 bottom-0 w-2/5 hidden md:block pointer-events-none"
                style={{ background: `url('https://picsum.photos/seed/health-strategy/300/400') center/cover no-repeat`, opacity: 0.1, filter: 'blur(3px)' }} />
              <div className="relative z-10">
                <div className="icon-box mb-6" style={{ background: 'rgba(99,102,241,0.12)' }}>
                  <Icon name={services[0].icon} size={24} color="#818CF8" />
                </div>
                <h3 className={`text-2xl font-medium mb-3 ${dk ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>{services[0].title}</h3>
                <p className={`text-sm font-light leading-relaxed mb-6 max-w-sm ${dk ? 'text-gray-400' : 'text-gray-500'}`}>{services[0].description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#818CF8' }}>{services[0].timeframe}</span>
                  <a href="https://calendly.com/avragarcia" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium transition-all hover:gap-2.5" style={{ color: '#818CF8' }}>
                    Solicitar <Icon name="arrow-right" size={12} color="#818CF8" />
                  </a>
                </div>
              </div>
            </div>

            <div className={`${dk ? 'card-glass-dark' : 'card-glass-light'} gradient-border-card p-7 reveal-hidden delay-2 card-hover`}>
              <div className="icon-box mb-5" style={{ background: 'rgba(99,102,241,0.12)' }}>
                <Icon name={services[1].icon} size={22} color="#818CF8" />
              </div>
              <h3 className={`text-base font-medium mb-2 ${dk ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>{services[1].title}</h3>
              <p className={`text-sm font-light leading-relaxed mb-4 ${dk ? 'text-gray-400' : 'text-gray-500'}`}>{services[1].description}</p>
              <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#818CF8' }}>{services[1].timeframe}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {services.slice(2).map((s, i) => (
              <div key={i} className={`${dk ? 'card-glass-dark' : 'card-glass-light'} gradient-border-card p-7 reveal-hidden delay-${i+1} card-hover`}>
                <div className="flex items-start gap-4">
                  <div className="icon-box flex-shrink-0" style={{ background: 'rgba(99,102,241,0.12)' }}>
                    <Icon name={s.icon} size={22} color="#818CF8" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-base font-medium mb-1.5 ${dk ? 'text-white' : 'text-gray-900'}`}
                      style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>{s.title}</h3>
                    <p className={`text-sm font-light leading-relaxed mb-3 ${dk ? 'text-gray-400' : 'text-gray-500'}`}>{s.description}</p>
                    <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#818CF8' }}>{s.timeframe}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal-hidden">
            <a href="https://calendly.com/avragarcia" target="_blank" rel="noopener noreferrer"
              className="btn-gradient-primary px-8 py-3 rounded-full text-sm inline-flex items-center gap-2">
              Solicitar propuesta <Icon name="arrow-right" size={16} color="white" />
            </a>
          </div>
        </div>
      </section>

      {/* ── METODOLOGÍA ── */}
      <section ref={methodologyRef} id="metodologia" className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden" style={{ backgroundColor: dk ? '#080818' : '#F5F5FF' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full"
            style={{ background: 'radial-gradient(circle,rgba(99,102,241,0.07) 0%,transparent 65%)', transform: 'translate(-50%,-50%)', animation: 'aura-drift 20s ease-in-out infinite', filter: 'blur(55px)' }} />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="mb-20 reveal-hidden">
            <h2 className={`text-4xl md:text-6xl font-light mb-4 ${dk ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
              Metodología <span style={{ color: '#818CF8' }}>AURA</span>
            </h2>
            <p className={`text-lg font-light ${dk ? 'text-gray-400' : 'text-gray-500'}`}>De la idea a valor clínico medible.</p>
          </div>

          <div className="relative max-w-2xl">
            <div className={`absolute left-8 md:left-10 top-0 bottom-0 w-px ${dk ? 'bg-white/8' : 'bg-gray-200'}`} />
            <div className="absolute left-8 md:left-10 top-0 w-px transition-all duration-500"
              style={{ height: `${methodologyLineProgress * 100}%`, background: 'linear-gradient(to bottom,#818CF8,#A78BFA)', boxShadow: '0 0 8px rgba(99,102,241,0.4)', opacity: methodologyLineProgress > 0 ? 1 : 0 }} />

            {methodologySteps.map((step, i) => (
              <div key={i} data-step={i}
                className={`relative flex items-start mb-12 transition-all duration-700 ${i <= activeMethodologyStep ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'}`}>
                <div className={`relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl font-light flex-shrink-0 transition-all duration-700 ${i <= activeMethodologyStep ? (dk ? 'border border-indigo-400/40 text-white' : 'bg-white border border-indigo-200 text-indigo-700 shadow-lg') : (dk ? 'bg-white/4 border border-white/8 text-gray-600' : 'bg-gray-100 border border-gray-200 text-gray-400')}`}
                  style={{ fontFamily: 'Nortica, Girot, sans-serif', ...(i <= activeMethodologyStep && { background: dk ? 'linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.15))' : 'white' }) }}>
                  {step.letter}
                  {i <= activeMethodologyStep && <div className="absolute inset-0 rounded-full bg-indigo-400/15 blur-xl -z-10 animate-pulse" />}
                </div>
                <div className="ml-8 flex-1">
                  <h3 className={`text-2xl md:text-3xl font-light mb-2 ${i <= activeMethodologyStep ? (dk ? 'text-white' : 'text-gray-900') : (dk ? 'text-gray-600' : 'text-gray-400')}`}
                    style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>{step.title}</h3>
                  <p className={`text-base font-light mb-3 ${i <= activeMethodologyStep ? (dk ? 'text-gray-300' : 'text-gray-700') : (dk ? 'text-gray-700' : 'text-gray-400')}`}>{step.subtitle}</p>
                  <p className={`text-sm font-light mb-4 ${i <= activeMethodologyStep ? (dk ? 'text-gray-400' : 'text-gray-600') : (dk ? 'text-gray-800' : 'text-gray-300')}`}>{step.description}</p>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-light ${i <= activeMethodologyStep ? (dk ? 'bg-indigo-500/10 border border-indigo-400/20 text-gray-300' : 'bg-indigo-50 border border-indigo-100 text-gray-700') : (dk ? 'bg-white/3 border border-white/5 text-gray-700' : 'bg-gray-50 text-gray-400')}`}>
                    <Icon name="check" size={14} color={i <= activeMethodologyStep ? '#818CF8' : (dk ? '#374151' : '#9CA3AF')} />
                    {step.result}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTOS PROPIOS ── */}
      <section id="productos" className="py-20 md:py-24 px-4 md:px-8" style={{ backgroundColor: dk ? '#050510' : '#FAFAFA' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 reveal-hidden">
            <h2 className={`text-3xl md:text-4xl font-light ${dk ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
              Productos propios, <span style={{ color: '#818CF8' }}>listos hoy</span>
            </h2>
            <p className={`text-sm font-light max-w-xs md:text-right ${dk ? 'text-gray-400' : 'text-gray-500'}`}>
              Desarrollados y validados en hospitales reales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {products.map((p, i) => (
              <div key={p.name} className={`p-7 rounded-2xl reveal-hidden delay-${i+1} card-hover`}
                style={{ background: dk ? `${p.color}0D` : `${p.color}0A`, border: `1px solid ${p.color}${dk ? '2E' : '24'}` }}>
                <div className="flex items-center justify-between mb-6">
                  <div className="icon-box" style={{ background: `${p.color}1F` }}>
                    <Icon name={p.icon} size={22} color={p.color} />
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full" style={{ background: `${p.color}1A`, color: p.color }}>{p.tag}</span>
                </div>
                <h3 className={`text-xl font-medium mb-2 ${dk ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>{p.name}</h3>
                <p className={`text-sm font-light leading-relaxed ${dk ? 'text-gray-400' : 'text-gray-500'}`}>{p.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POR QUÉ ELEGIRNOS — 2-col heading + feature list ── */}
      <section id="por-que-elegirnos" className="py-24 md:py-32 px-4 md:px-8" style={{ backgroundColor: dk ? '#050510' : '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="reveal-hidden">
              <h2 className={`text-4xl md:text-5xl font-light leading-tight mb-6 ${dk ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
                Por qué trabajar<br />con nosotros
              </h2>
              <p className={`text-base font-light mb-10 ${dk ? 'text-gray-400' : 'text-gray-500'}`}>
                No somos genéricos. Vivimos en la intersección de la clínica y la tecnología.
              </p>
              <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <img src="https://picsum.photos/seed/healthcare-team/500/375" alt="Healthcare team"
                  className="w-full h-full object-cover" />
              </div>
            </div>

            <div>
              {whyUs.map((item, i) => (
                <div key={i} className={`flex items-start gap-5 py-6 reveal-hidden delay-${Math.min(i+1,6)} ${i < whyUs.length - 1 ? (dk ? 'border-b border-white/6' : 'border-b border-gray-100') : ''}`}>
                  <div className="icon-box flex-shrink-0 mt-0.5" style={{ background: 'rgba(99,102,241,0.1)' }}>
                    <Icon name={item.icon} size={20} color="#818CF8" />
                  </div>
                  <div>
                    <h3 className={`text-base font-medium mb-1.5 ${dk ? 'text-white' : 'text-gray-900'}`}
                      style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>{item.title}</h3>
                    <p className={`text-sm font-light leading-relaxed ${dk ? 'text-gray-400' : 'text-gray-500'}`}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WaveDivider from={dk ? '#050510' : '#FFFFFF'} to={dk ? '#080814' : '#F8F6FF'} />

      {/* ── DIV 2: EAI — feature spotlight layout ── */}
      <section id="eai" className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden" style={{ backgroundColor: dk ? '#080814' : '#F8F6FF' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full"
            style={{ background: 'radial-gradient(circle,rgba(139,92,246,0.08) 0%,transparent 65%)', transform: 'translate(50%,-50%)', animation: 'aura-breathe 14s ease-in-out infinite', filter: 'blur(55px)' }} />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-16 reveal-hidden">
            <span className="section-label tag-eai mb-5 inline-block">EAI · Agencia de Inteligencia Artificial</span>
            <h2 className={`text-4xl md:text-6xl font-light mt-5 mb-4 ${dk ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
              IA que trabaja<br />
              <span style={{ color: '#A78BFA' }}>para tu clínica</span>
            </h2>
            <p className={`text-lg font-light max-w-xl ${dk ? 'text-gray-400' : 'text-gray-500'}`}>Agentes, automatización y LLMs para salud.</p>
          </div>

          {/* Feature spotlight: 1 big (2/3) + 3 stacked (1/3) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-12">
            {/* Featured: Agentes IA */}
            <div className="lg:col-span-2 p-8 rounded-2xl reveal-hidden delay-1 card-hover relative overflow-hidden"
              style={{ background: dk ? 'rgba(139,92,246,0.08)' : 'rgba(139,92,246,0.05)', border: dk ? '1px solid rgba(139,92,246,0.22)' : '1px solid rgba(139,92,246,0.16)' }}>
              <div className="icon-box mb-6" style={{ background: 'rgba(139,92,246,0.18)', width: 52, height: 52 }}>
                <Icon name={eaiServices[0].icon} size={26} color="#A78BFA" />
              </div>
              <h3 className={`text-2xl font-medium mb-3 ${dk ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>{eaiServices[0].title}</h3>
              <p className={`text-sm font-light leading-relaxed mb-8 max-w-sm ${dk ? 'text-gray-400' : 'text-gray-500'}`}>{eaiServices[0].description}</p>
              {/* Use-case chips */}
              <div className="flex flex-wrap gap-2">
                {['Triaje automático','Notas por voz','Alertas predictivas','Resumen historiales','Codificación CIE-10','Chatbot pacientes'].map(u => (
                  <span key={u} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
                    style={{ background: dk ? 'rgba(139,92,246,0.14)' : 'rgba(139,92,246,0.08)', color: dk ? '#C4B5FD' : '#6D28D9' }}>
                    <Icon name="check" size={10} color={dk ? '#A78BFA' : '#7C3AED'} />{u}
                  </span>
                ))}
              </div>
            </div>

            {/* 3 smaller cards stacked */}
            <div className="flex flex-col gap-5">
              {eaiServices.slice(1).map((s, i) => (
                <div key={i} className={`flex-1 p-5 rounded-2xl reveal-hidden delay-${i+2} card-hover`}
                  style={{ background: dk ? 'rgba(139,92,246,0.05)' : 'rgba(139,92,246,0.03)', border: dk ? '1px solid rgba(139,92,246,0.16)' : '1px solid rgba(139,92,246,0.12)' }}>
                  <div className="flex items-start gap-3">
                    <div className="icon-box flex-shrink-0" style={{ background: 'rgba(139,92,246,0.14)', width: 36, height: 36 }}>
                      <Icon name={s.icon} size={16} color="#A78BFA" />
                    </div>
                    <div>
                      <h3 className={`text-sm font-medium mb-1 ${dk ? 'text-white' : 'text-gray-900'}`}>{s.title}</h3>
                      <p className={`text-xs font-light leading-relaxed ${dk ? 'text-gray-500' : 'text-gray-500'}`}>{s.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-hidden">
            <a href="https://calendly.com/avragarcia" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-light transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#7C3AED,#6D28D9)', color: 'white', boxShadow: '0 0 20px rgba(124,58,237,0.3)' }}>
              Agenda una demo <Icon name="arrow-right" size={16} color="white" />
            </a>
          </div>
        </div>
      </section>

      <WaveDivider from={dk ? '#080814' : '#F8F6FF'} to={dk ? '#040514' : '#F0FDFE'} />

      {/* ── DIV 3: ANALYTICS & DATA — horizontal list layout ── */}
      <section id="analytics" className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden" style={{ backgroundColor: dk ? '#040514' : '#F0FDFE' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/3 w-96 h-96 rounded-full"
            style={{ background: 'radial-gradient(circle,rgba(6,182,212,0.07) 0%,transparent 65%)', transform: 'translate(-50%,-50%)', animation: 'aura-drift 22s ease-in-out infinite', filter: 'blur(55px)' }} />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-16 reveal-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
              <h2 className={`text-4xl md:text-5xl font-light ${dk ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
                Datos de clase mundial,{' '}
                <span style={{ color: '#22D3EE' }}>nearshore para salud</span>
              </h2>
              <p className={`text-base font-light ${dk ? 'text-gray-400' : 'text-gray-500'}`}>
                Data scientists senior en tu equipo, al 40-60% del coste US/EU.
              </p>
            </div>
          </div>

          {/* Big stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 reveal-hidden">
            {[['40-60%','Ahorro vs US/EU'],['Salud','Especialización total'],['Ágil','Despliegue rápido'],['Bilingüe','EN + ES']].map(([v, l]) => (
              <div key={l} className="p-5 rounded-2xl text-center"
                style={{ background: dk ? 'rgba(6,182,212,0.08)' : 'rgba(6,182,212,0.06)', border: dk ? '1px solid rgba(6,182,212,0.18)' : '1px solid rgba(6,182,212,0.14)' }}>
                <div className="text-lg font-medium mb-1" style={{ color: '#22D3EE' }}>{v}</div>
                <div className={`text-xs font-light ${dk ? 'text-gray-400' : 'text-gray-500'}`}>{l}</div>
              </div>
            ))}
          </div>

          {/* Horizontal capability list */}
          <div className={`rounded-2xl overflow-hidden mb-12 ${dk ? 'border border-white/6' : 'border border-gray-100'}`}>
            {analyticsServices.map((s, i) => (
              <div key={i} className={`flex items-center gap-5 px-7 py-6 reveal-hidden delay-${i+1} list-item-hover ${i < analyticsServices.length - 1 ? (dk ? 'border-b border-white/6' : 'border-b border-gray-100') : ''}`}
                style={{ background: dk ? 'rgba(6,182,212,0.04)' : 'rgba(6,182,212,0.03)' }}>
                <div className="icon-box flex-shrink-0" style={{ background: 'rgba(6,182,212,0.12)' }}>
                  <Icon name={s.icon} size={20} color="#22D3EE" />
                </div>
                <div className="flex-1">
                  <h3 className={`text-base font-medium mb-0.5 ${dk ? 'text-white' : 'text-gray-900'}`}
                    style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>{s.title}</h3>
                  <p className={`text-sm font-light ${dk ? 'text-gray-400' : 'text-gray-500'}`}>{s.description}</p>
                </div>
                <Icon name="arrow-up-right" size={16} color={dk ? '#22D3EE' : '#0891B2'} className="flex-shrink-0 opacity-50" />
              </div>
            ))}
          </div>

          <div className="reveal-hidden">
            <a href="https://calendly.com/avragarcia" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-light transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#0891B2,#0E7490)', color: 'white', boxShadow: '0 0 20px rgba(8,145,178,0.3)' }}>
              Arma tu equipo de datos <Icon name="arrow-right" size={16} color="white" />
            </a>
          </div>
        </div>
      </section>

      <WaveDivider from={dk ? '#040514' : '#F0FDFE'} to={dk ? '#050510' : '#F0FDF7'} />

      {/* ── DIV 4: EQUIPOS MÉDICOS — 2-col header with image ── */}
      <section id="equipos-medicos" className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden" style={{ backgroundColor: dk ? '#050510' : '#F0FDF7' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full"
            style={{ background: 'radial-gradient(circle,rgba(16,185,129,0.07) 0%,transparent 65%)', transform: 'translate(50%,50%)', animation: 'aura-breathe 16s ease-in-out infinite', filter: 'blur(55px)' }} />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="reveal-hidden">
              <span className="section-label tag-medequip mb-5 inline-block">Importación de Equipos Médicos</span>
              <h2 className={`text-4xl md:text-5xl font-light mt-5 mb-4 ${dk ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
                Tecnología médica<br />
                <span style={{ color: '#34D399' }}>de vanguardia</span>
              </h2>
              <p className={`text-base font-light mb-8 ${dk ? 'text-gray-400' : 'text-gray-500'}`}>
                Equipos de primera línea, importación directa, soporte incluido.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Precios competitivos','Garantía y soporte técnico','Importación directa','Formación del personal','Entrega rápida'].map(item => (
                  <span key={item} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
                    style={{ background: dk ? 'rgba(16,185,129,0.1)' : 'rgba(16,185,129,0.07)', color: dk ? '#34D399' : '#065F46' }}>
                    <Icon name="check" size={10} color={dk ? '#34D399' : '#059669'} />{item}
                  </span>
                ))}
              </div>
            </div>
            <div className="hidden lg:block reveal-hidden delay-1">
              <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '1/1' }}>
                <img src="https://picsum.photos/seed/medical-equipment/500/500" alt="Medical equipment"
                  className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {medEquipServices.map((s, i) => (
              <div key={i} className={`p-7 rounded-2xl reveal-hidden delay-${i+1} card-hover`}
                style={{ background: dk ? 'rgba(16,185,129,0.05)' : 'rgba(16,185,129,0.04)', border: dk ? '1px solid rgba(16,185,129,0.18)' : '1px solid rgba(16,185,129,0.14)' }}>
                <div className="icon-box mb-5" style={{ background: 'rgba(16,185,129,0.12)' }}>
                  <Icon name={s.icon} size={22} color="#34D399" />
                </div>
                <h3 className={`text-base font-medium mb-2 ${dk ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>{s.title}</h3>
                <p className={`text-sm font-light leading-relaxed ${dk ? 'text-gray-400' : 'text-gray-500'}`}>{s.description}</p>
              </div>
            ))}
          </div>

          <div className="reveal-hidden">
            <a href="https://calendly.com/avragarcia" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-light transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#059669,#047857)', color: 'white', boxShadow: '0 0 20px rgba(5,150,105,0.3)' }}>
              Ver catálogo <Icon name="arrow-right" size={16} color="white" />
            </a>
          </div>
        </div>
      </section>

      <WaveDivider from={dk ? '#050510' : '#F0FDF7'} to={dk ? '#080808' : '#FFFBEB'} />

      {/* ── DIV 5: MARKETING DIGITAL — editorial list layout ── */}
      <section id="marketing-salud" className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden" style={{ backgroundColor: dk ? '#080808' : '#FFFBEB' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 right-1/3 w-80 h-80 rounded-full"
            style={{ background: 'radial-gradient(circle,rgba(245,158,11,0.07) 0%,transparent 65%)', transform: 'translate(50%,-50%)', animation: 'aura-drift 18s ease-in-out infinite', filter: 'blur(55px)' }} />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-16 reveal-hidden">
            <span className="section-label tag-marketing mb-5 inline-block">Marketing Digital para Salud</span>
            <h2 className={`text-4xl md:text-6xl font-light mt-5 mb-4 ${dk ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
              Visibilidad digital<br />
              <span style={{ color: '#FBBF24' }}>para profesionales</span>
            </h2>
            <p className={`text-lg font-light max-w-lg ${dk ? 'text-gray-400' : 'text-gray-500'}`}>Marketing de salud con rigor clínico y cumplimiento normativo.</p>
          </div>

          {/* Editorial list */}
          <div className={`rounded-2xl overflow-hidden mb-12 ${dk ? 'border border-white/6' : 'border border-amber-100'}`}>
            {marketingServices.map((s, i) => (
              <div key={i} className={`group flex items-center gap-6 px-7 py-7 reveal-hidden delay-${i+1} cursor-default ${i < marketingServices.length - 1 ? (dk ? 'border-b border-white/6' : 'border-b border-amber-100') : ''}`}
                style={{ background: dk ? 'rgba(245,158,11,0.04)' : 'rgba(245,158,11,0.03)', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = dk ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.07)'}
                onMouseLeave={e => e.currentTarget.style.background = dk ? 'rgba(245,158,11,0.04)' : 'rgba(245,158,11,0.03)'}>
                <div className="icon-box flex-shrink-0" style={{ background: 'rgba(245,158,11,0.14)' }}>
                  <Icon name={s.icon} size={20} color="#FBBF24" />
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-medium mb-1 ${dk ? 'text-white' : 'text-gray-900'}`}
                    style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>{s.title}</h3>
                  <p className={`text-sm font-light leading-relaxed ${dk ? 'text-gray-400' : 'text-gray-500'}`}>{s.description}</p>
                </div>
                <Icon name="arrow-up-right" size={18} color="#FBBF24" className="flex-shrink-0 opacity-0 group-hover:opacity-60 transition-opacity" />
              </div>
            ))}
          </div>

          <div className="reveal-hidden">
            <a href="https://calendly.com/avragarcia" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-light transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#D97706,#B45309)', color: 'white', boxShadow: '0 0 20px rgba(217,119,6,0.3)' }}>
              Consulta gratuita <Icon name="arrow-right" size={16} color="white" />
            </a>
          </div>
        </div>
      </section>

      <WaveDivider from={dk ? '#080808' : '#FFFBEB'} to={dk ? '#050510' : '#FAFAFA'} />

      {/* ── TESTIMONIOS ── */}
      <section id="testimonios" className="py-24 md:py-32 px-4 md:px-8" style={{ backgroundColor: dk ? '#050510' : '#FAFAFA' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 reveal-hidden">
            <h2 className={`text-4xl md:text-6xl font-light mb-4 ${dk ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
              Resultados que hablan
            </h2>
            <p className={`text-lg font-light ${dk ? 'text-gray-400' : 'text-gray-500'}`}>Instituciones que ya están en el futuro.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { metric: '40%',   quote: 'Con SALV.IA nuestros cardiólogos identifican arritmias complejas en segundos.', role: 'Jefa de Cardiología, Hospital Madrid', initials: 'MG' },
              { metric: '6 sem', quote: 'Conectaron todos nuestros sistemas en tiempo récord. Resultados desde el día uno.',          role: 'CTO, Clínica Barcelona',              initials: 'CR' },
              { metric: '85%',   quote: 'MamRisk revolucionó nuestro programa de screening.',                                         role: 'Radióloga, Hospital Valencia',        initials: 'AM' },
            ].map((t, i) => (
              <div key={i} className={`${dk ? 'card-glass-dark' : 'card-glass-light'} p-8 rounded-2xl reveal-hidden delay-${i+1} relative overflow-hidden card-hover`}>
                <div className={`quote-mark absolute top-2 right-5 ${dk ? 'text-white' : 'text-gray-900'}`}>"</div>
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <div className="text-4xl font-light mb-3" style={{ color: '#818CF8' }}>{t.metric}</div>
                <p className={`text-sm font-light leading-relaxed mb-6 ${dk ? 'text-gray-300' : 'text-gray-600'}`}>"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0"
                    style={{ background: 'rgba(99,102,241,0.2)', color: '#818CF8', border: '1px solid rgba(99,102,241,0.3)' }}>{t.initials}</div>
                  <p className={`text-xs font-light ${dk ? 'text-gray-400' : 'text-gray-500'}`}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats strip */}
          <div className="rounded-2xl p-8 md:p-12 reveal-hidden"
            style={{ background: dk ? 'linear-gradient(135deg,rgba(99,102,241,0.08),rgba(139,92,246,0.06))' : 'linear-gradient(135deg,#EEF2FF,#F5F3FF)', border: dk ? '1px solid rgba(99,102,241,0.15)' : '1px solid rgba(99,102,241,0.1)' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { end: 50, suffix: '+',  label: 'Hospitales Transformados' },
                { end: 3,  suffix: 'M+', label: 'Pacientes Impactados' },
                { end: 6,  suffix: '',   label: 'Años de Experiencia' },
                { end: 98, suffix: '%',  label: 'Satisfacción Cliente' },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-3xl md:text-4xl font-light mb-2" style={{ color: '#818CF8' }}>
                    <CountUp end={s.end} suffix={s.suffix} />
                  </div>
                  <p className={`text-sm font-light ${dk ? 'text-gray-400' : 'text-gray-500'}`}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section id="contacto" className="py-24 md:py-32 px-4 md:px-8" style={{ backgroundColor: dk ? '#080818' : '#F5F5FF' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 reveal-hidden">
            <h2 className={`text-4xl md:text-6xl font-light mb-4 ${dk ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
              Conversemos sobre<br />
              <span style={{ color: '#818CF8' }}>tu proyecto</span>
            </h2>
            <p className={`text-lg font-light ${dk ? 'text-gray-400' : 'text-gray-500'}`}>Primera consulta gratuita, sin compromisos</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 reveal-hidden">
            <div className={`lg:col-span-3 rounded-2xl p-8 md:p-10 ${dk ? 'bg-white/3 border border-white/8' : 'bg-white border border-gray-100 shadow-lg'}`}>
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={`block text-sm font-light mb-2 ${dk ? 'text-gray-300' : 'text-gray-700'}`}>Hospital / Clínica *</label>
                    <input type="text" placeholder="Hospital Madrid..." className={`input-modern w-full px-4 py-3 rounded-2xl text-sm font-light ${dk ? 'bg-white/5 border border-white/10 text-white placeholder-gray-600' : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'}`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-light mb-2 ${dk ? 'text-gray-300' : 'text-gray-700'}`}>Tu nombre *</label>
                    <input type="text" placeholder="Dr. García" className={`input-modern w-full px-4 py-3 rounded-2xl text-sm font-light ${dk ? 'bg-white/5 border border-white/10 text-white placeholder-gray-600' : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'}`} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={`block text-sm font-light mb-2 ${dk ? 'text-gray-300' : 'text-gray-700'}`}>Email *</label>
                    <input type="email" placeholder="tu@hospital.com" className={`input-modern w-full px-4 py-3 rounded-2xl text-sm font-light ${dk ? 'bg-white/5 border border-white/10 text-white placeholder-gray-600' : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'}`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-light mb-2 ${dk ? 'text-gray-300' : 'text-gray-700'}`}>Teléfono</label>
                    <input type="tel" placeholder="+34 600 000 000" className={`input-modern w-full px-4 py-3 rounded-2xl text-sm font-light ${dk ? 'bg-white/5 border border-white/10 text-white placeholder-gray-600' : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'}`} />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-light mb-2 ${dk ? 'text-gray-300' : 'text-gray-700'}`}>División de interés</label>
                  <select className={`input-modern w-full px-4 py-3 rounded-2xl text-sm font-light ${dk ? 'bg-white/5 border border-white/10 text-white' : 'bg-gray-50 border border-gray-200 text-gray-900'}`}>
                    <option value="">Selecciona una división</option>
                    {divisions.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
                    <option value="multiple">Varias divisiones</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-light mb-2 ${dk ? 'text-gray-300' : 'text-gray-700'}`}>¿En qué podemos ayudarte? *</label>
                  <textarea rows={4} placeholder="Cuéntanos tu proyecto..." className={`input-modern w-full px-4 py-3 rounded-2xl text-sm font-light resize-none ${dk ? 'bg-white/5 border border-white/10 text-white placeholder-gray-600' : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'}`} />
                </div>
                <button type="submit" className="w-full btn-gradient-primary py-4 rounded-full text-sm font-medium inline-flex justify-center items-center gap-2">
                  Enviar mensaje <Icon name="arrow-right" size={16} color="white" />
                </button>
                <p className={`text-xs font-light text-center ${dk ? 'text-gray-600' : 'text-gray-400'}`}>Privacidad garantizada. Sin spam.</p>
              </form>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-5 reveal-hidden delay-2">
              <div className={`rounded-2xl p-6 ${dk ? 'bg-white/3 border border-white/8' : 'bg-white border border-gray-100 shadow-sm'}`}>
                <h3 className={`text-base font-medium mb-5 ${dk ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>¿Prefieres hablar directamente?</h3>
                <div className="space-y-4">
                  {[
                    { icon: 'mail',     label: 'hola@auragarcia.com',      href: 'mailto:hola@auragarcia.com' },
                    { icon: 'calendar', label: 'Agendar llamada de 15 min', href: 'https://calendly.com/avragarcia' },
                    { icon: 'linkedin', label: 'LinkedIn',                   href: 'https://linkedin.com/company/auragarcia' },
                  ].map(item => (
                    <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                      className={`flex items-center gap-3 text-sm font-light transition-colors ${dk ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                      <div className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(99,102,241,0.12)' }}>
                        <Icon name={item.icon} size={16} color="#818CF8" />
                      </div>
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-6" style={{ background: dk ? 'rgba(99,102,241,0.08)' : 'rgba(238,242,255,1)', border: dk ? '1px solid rgba(99,102,241,0.18)' : '1px solid rgba(99,102,241,0.12)' }}>
                <p className={`text-xs uppercase tracking-widest mb-3 ${dk ? 'text-indigo-400' : 'text-indigo-600'}`}>Respuesta garantizada</p>
                <p className={`text-sm font-light leading-relaxed ${dk ? 'text-gray-300' : 'text-gray-600'}`}>Respuesta en menos de 24h. Primera consulta gratuita.</p>
              </div>

              <div className={`rounded-2xl p-6 ${dk ? 'bg-white/3 border border-white/8' : 'bg-white border border-gray-100 shadow-sm'}`}>
                <p className={`text-xs uppercase tracking-widest mb-4 ${dk ? 'text-gray-500' : 'text-gray-400'}`}>Nuestras divisiones</p>
                <div className="flex flex-col gap-2">
                  {divisions.map(d => (
                    <a key={d.id} href={`#${d.id}`} className="flex items-center gap-2 text-xs font-light transition-colors"
                      style={{ color: dk ? '#9CA3AF' : '#6B7280' }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                      {d.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRE-FOOTER CTA ── */}
      <section className="cta-strip py-24 md:py-32 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center reveal-hidden">
          <div>
            <h2 className="text-4xl md:text-5xl font-light text-white leading-tight mb-4"
              style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
              Transforma tu hospital<br />en semanas, no años
            </h2>
            <p className="text-gray-400 text-base font-light max-w-sm">Primera consulta gratuita. Sin compromiso.</p>
          </div>
          <div className="flex flex-col sm:flex-row lg:justify-end gap-4">
            <a href="https://calendly.com/avragarcia" target="_blank" rel="noopener noreferrer"
              className="btn-gradient-primary px-8 py-4 rounded-full text-base font-light inline-flex items-center gap-2">
              Agenda tu llamada <Icon name="arrow-right" size={18} color="white" />
            </a>
            <a href="#contacto"
              className="px-8 py-4 rounded-full text-base font-light inline-flex items-center justify-center gap-2 border border-white/15 text-white hover:bg-white/5 transition-all duration-300">
              Enviar mensaje
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-black px-4 md:px-8">
        <div className="footer-gradient-top" />
        <div className="max-w-6xl mx-auto py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
            {[
              { title: 'Empresa',    links: [['Sobre Nosotros','#'],['Equipo','#'],['Casos de Éxito','#'],['Prensa','#']] },
              { title: 'Divisiones', links: divisions.map(d => [d.label, `#${d.id}`]) },
              { title: 'Recursos',   links: [['Blog','#'],['Whitepapers','#'],['Eventos','#'],['Webinars','#']] },
              { title: 'Legal',      links: [['Política de Privacidad','#'],['Términos de Servicio','#'],['Compliance','#'],['RGPD','#']] },
              { title: 'Conectar',   links: [['LinkedIn','https://linkedin.com/company/auragarcia'],['Email','mailto:hola@auragarcia.com'],['Calendly','https://calendly.com/avragarcia'],['Madrid, España','#']] },
            ].map(col => (
              <div key={col.title} className="space-y-4">
                <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-white">{col.title}</h3>
                <nav className="space-y-2">
                  {col.links.map(([label, href]) => (
                    <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                      className="block text-xs font-light text-gray-500 hover:text-white transition-colors duration-300">{label}</a>
                  ))}
                </nav>
              </div>
            ))}
          </div>
          <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <img src="resources/logos/AuragarciaLogoVector-2.png" alt="AuraGarcia" className="h-6 w-auto brightness-0 invert" />
              <p className="text-sm font-light text-gray-500">© 2026 AuraGarcia. Todos los derechos reservados.</p>
            </div>
            <p className="text-xs font-light text-gray-600">Consultoría en transformación digital sanitaria · Madrid, España</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

ReactDOM.render(<AuraGarciaApp />, document.getElementById('root'));
