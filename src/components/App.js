// auragarcia - Plataforma Multi-División
const { useState, useEffect, useRef } = React;

// === ICON COMPONENT ===
const Icon = ({ name, size = 24, color = 'currentColor', className = '' }) => {
  const icons = {
    'map-pin': <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
    'network': <><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></>,
    'bar-chart': <><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></>,
    'brain': <><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></>,
    'package': <><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>,
    'users': <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    'shield': <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    'trending-up': <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    'headphones': <><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></>,
    'git-merge': <><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/></>,
    'zap': <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    'activity': <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,
    'message-circle': <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,
    'cpu': <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></>,
    'database': <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>,
    'layers': <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
    'code-2': <><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></>,
    'microscope': <><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></>,
    'heart-pulse': <><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l1.5-3 2 4.5 1.5-3H21"/></>,
    'megaphone': <><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></>,
    'search': <><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></>,
    'share-2': <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></>,
    'edit': <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    'arrow-right': <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    'check': <polyline points="20 6 9 17 4 12"/>,
    'star': <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
    'rocket': <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></>,
    'calendar': <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    'mail': <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    'chevron-down': <polyline points="6 9 12 15 18 9"/>,
    'moon': <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>,
    'sun': <><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></>,
    'globe': <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
    'linkedin': <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>,
  };
  const content = icons[name];
  if (!content) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {content}
    </svg>
  );
};

// === MAIN APP ===
const AuraGarciaApp = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDivisionsMenu, setShowDivisionsMenu] = useState(false);
  const [showAuraEffect, setShowAuraEffect] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeMethodologyStep, setActiveMethodologyStep] = useState(0);
  const [methodologyLineProgress, setMethodologyLineProgress] = useState(0);

  const methodologyRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const handleThemeToggle = () => {
    setShowAuraEffect(true);
    setIsDarkMode(!isDarkMode);
    setTimeout(() => setShowAuraEffect(false), 1500);
  };

  const divisions = [
    { id: 'transformacion', label: 'Transformación Digital', color: '#818CF8', tag: 'tag-transform' },
    { id: 'eai', label: 'EAI — Agencia IA', color: '#A78BFA', tag: 'tag-eai' },
    { id: 'analytics', label: 'Analytics & Data', color: '#22D3EE', tag: 'tag-analytics' },
    { id: 'equipos-medicos', label: 'Equipos Médicos', color: '#34D399', tag: 'tag-medequip' },
    { id: 'marketing-salud', label: 'Marketing Digital', color: '#FBBF24', tag: 'tag-marketing' },
  ];

  const services = [
    { title: 'Estrategia Digital en Salud', description: 'Diagnóstico integral y hoja de ruta personalizada para la transformación digital de tu institución.', timeframe: '4–6 sem', number: '01', icon: 'map-pin' },
    { title: 'Datos Conectados', description: 'Integramos tus sistemas para que hablen entre sí, creando flujos de información fluidos entre departamentos.', timeframe: '6–8 sem', number: '02', icon: 'network' },
    { title: 'Inteligencia Hospitalaria', description: 'Tableros que transforman datos en decisiones con KPIs ejecutivos y clínicos en tiempo real.', timeframe: '4–8 sem', number: '03', icon: 'bar-chart' },
    { title: 'IA Médica Aplicada', description: 'Modelos predictivos para diagnóstico y gestión, con herramientas de IA validadas y operativas.', timeframe: '8–12 sem', number: '04', icon: 'brain' },
    { title: 'Productos AuraGarcia', description: 'SALV.IA, MamRisk y CLARA: soluciones probadas, no prototipos. Tecnología adaptable a tus necesidades.', timeframe: '2–4 sem', number: '05', icon: 'package' },
    { title: 'Transformación Organizacional', description: 'Formación y cambio cultural para adopción exitosa, con equipos capacitados y procesos optimizados.', timeframe: 'Continuo', number: '06', icon: 'users' },
  ];

  const methodologySteps = [
    { letter: 'A', title: 'Analizar', subtitle: 'Entendemos tu realidad actual', description: 'Analizamos procesos, datos y equipos para detectar oportunidades de mejora.', result: 'Mapa claro de dónde estás y hacia dónde ir' },
    { letter: 'U', title: 'Unificar', subtitle: 'Conectamos tus sistemas', description: 'Estandarizamos datos y creamos flujos entre departamentos.', result: 'Información que fluye sin barreras' },
    { letter: 'R', title: 'Reinventar', subtitle: 'Construimos soluciones que funcionan', description: 'Desarrollamos herramientas centradas en casos de uso reales.', result: 'Tecnología que tu equipo realmente usa' },
    { letter: 'A', title: 'Ampliar', subtitle: 'Escalamos y optimizamos', description: 'Medimos impacto y expandimos lo que funciona.', result: 'Crecimiento sostenible con métricas claras' },
  ];

  const whyUs = [
    { title: 'Experiencia Clínica Real', description: 'Nuestro equipo combina expertise técnico con experiencia clínica directa. Entendemos los desafíos reales de los hospitales.', icon: 'heart-pulse' },
    { title: 'Productos Listos para Usar', description: 'SALV.IA, MamRisk y CLARA son soluciones probadas. Implementación inmediata con resultados medibles.', icon: 'rocket' },
    { title: 'Metodología AURA Probada', description: 'Proceso estructurado de 4 fases que garantiza resultados. De la idea a valor clínico medible en 6–12 semanas.', icon: 'git-merge' },
    { title: 'Compliance y Seguridad', description: 'Cumplimiento total con RGPD, ISO 27001 y normativas sanitarias. Seguridad de datos como prioridad absoluta.', icon: 'shield' },
    { title: 'Soporte Continuo', description: 'Acompañamiento post-implementación con formación, soporte técnico y optimización continua de resultados.', icon: 'headphones' },
    { title: 'ROI Medible', description: 'Retorno de inversión claro y medible. Reducción de costos operativos y mejora en calidad de atención documentada.', icon: 'trending-up' },
  ];

  const eaiServices = [
    { title: 'Agentes IA Clínicos', description: 'Automatización de flujos de trabajo médico con agentes inteligentes que entienden el contexto clínico.', icon: 'cpu' },
    { title: 'Integración LLM', description: 'Modelos de lenguaje adaptados al dominio de la salud: notas clínicas, codificación, resúmenes de historiales.', icon: 'brain' },
    { title: 'Automatización RPA', description: 'Eliminación de tareas repetitivas sin intervención humana: facturación, alta de pacientes, informes periódicos.', icon: 'zap' },
    { title: 'IA Conversacional', description: 'Chatbots especializados para pacientes y staff: triaje inicial, recordatorios, gestión de citas, soporte 24/7.', icon: 'message-circle' },
  ];

  const analyticsServices = [
    { title: 'Nearshore Data Teams', description: 'Senior data scientists and engineers embedded in your team — at 40–60% of US/EU cost, with full healthcare specialization.', icon: 'users' },
    { title: 'Healthcare BI & Dashboards', description: 'Real-time KPI dashboards for clinical and executive teams. HL7/FHIR-compatible, customized to your workflows.', icon: 'bar-chart' },
    { title: 'Data Engineering', description: 'End-to-end data pipelines: HL7, FHIR, interoperability, ETL processes, and cloud data warehouse architecture.', icon: 'database' },
    { title: 'Advanced Analytics', description: 'Predictive models, ML pipelines, and model ops for patient outcomes, readmission risk, and resource optimization.', icon: 'trending-up' },
  ];

  const medEquipServices = [
    { title: 'Diagnóstico por Imagen', description: 'Ecógrafos portátiles, equipos de radiología digital, resonancias de última generación a precios competitivos.', icon: 'microscope' },
    { title: 'Equipamiento de UCI', description: 'Monitores multiparamétricos, ventiladores, bombas de infusión y desfibriladores con garantía y soporte técnico.', icon: 'activity' },
    { title: 'Tecnología Quirúrgica', description: 'Instrumental de precisión, equipos de laparoscopia, mesas quirúrgicas y sistemas de iluminación de alto rendimiento.', icon: 'layers' },
    { title: 'Equipos de Laboratorio', description: 'Analizadores hematológicos, PCR, bioquímica clínica y equipos de microbiología con formación incluida.', icon: 'cpu' },
  ];

  const marketingServices = [
    { title: 'SEO Médico', description: 'Posicionamiento orgánico para clínicas, consultas y hospitales. Estrategia de contenido con rigor clínico y cumplimiento normativo.', icon: 'search' },
    { title: 'Social Media Clínico', description: 'Gestión de redes sociales especializada en salud. Contenido que educa, genera confianza y atrae pacientes.', icon: 'share-2' },
    { title: 'Paid Ads para Salud', description: 'Campañas de Google y Meta optimizadas dentro del marco regulatorio sanitario. CPL medible y ROI garantizado.', icon: 'megaphone' },
    { title: 'Contenido Médico', description: 'Blog, newsletters, casos clínicos y educación para pacientes. Copywriting especializado con validación médica.', icon: 'edit' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(Math.min((y / docH) * 100, 100));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const handler = () => {
      const cardW = container.scrollWidth / services.length;
      setActiveService(Math.round(container.scrollLeft / cardW));
    };
    container.addEventListener('scroll', handler, { passive: true });
    return () => container.removeEventListener('scroll', handler);
  }, [services.length]);

  useEffect(() => {
    const handler = () => {
      const section = methodologyRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.top >= window.innerHeight || rect.top + rect.height <= 0) {
        setActiveMethodologyStep(0); setMethodologyLineProgress(0); return;
      }
      const progress = Math.max(0, Math.min(1, (window.innerHeight / 2 - rect.top) / (rect.height * 0.8)));
      setActiveMethodologyStep(Math.min(methodologySteps.length - 1, Math.floor(progress * methodologySteps.length)));
      setMethodologyLineProgress(Math.max(0, Math.min(1, (progress * methodologySteps.length) / methodologySteps.length)));
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [methodologySteps.length]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal-hidden').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const dk = isDarkMode;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${dk ? 'bg-black text-white' : 'bg-white text-gray-900'}`} style={{ fontFamily: 'Girot, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>

      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>

      <style>{`
        @keyframes wave-flow { 0%{transform:translateX(0)translateY(0)scale(1);border-radius:30% 70% 70% 30%/30% 30% 70% 70%} 50%{transform:translateX(-1%)translateY(2%)scale(1.01);border-radius:50% 50% 50% 50%} 100%{transform:translateX(0)translateY(0)scale(1);border-radius:30% 70% 70% 30%/30% 30% 70% 70%} }
        @keyframes wave-rev { 0%{transform:translateX(0)translateY(0)scale(1)} 50%{transform:translateX(1%)translateY(-2%)scale(1.02)} 100%{transform:translateX(0)translateY(0)scale(1)} }
        @keyframes aura-drift { 0%{transform:translate(-50%,-50%) translateX(0) translateY(0)} 25%{transform:translate(-50%,-50%) translateX(80px) translateY(-40px)} 50%{transform:translate(-50%,-50%) translateX(-40px) translateY(80px)} 75%{transform:translate(-50%,-50%) translateX(120px) translateY(40px)} 100%{transform:translate(-50%,-50%) translateX(0) translateY(0)} }
        @keyframes aura-breathe { 0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.08} 50%{transform:translate(-50%,-50%) scale(1.3);opacity:0.15} }
        @keyframes aura-float { 0%,100%{transform:translate(-50%,-50%) translateY(0) rotate(0deg)} 33%{transform:translate(-50%,-50%) translateY(-60px) rotate(120deg)} 66%{transform:translate(-50%,-50%) translateY(50px) rotate(240deg)} }
        @keyframes sweep { 0%{transform:translateX(-100%);opacity:0} 50%{opacity:1} 100%{transform:translateX(100%);opacity:0} }
        @keyframes sweep2 { 0%{transform:translateX(-100%);opacity:0} 20%{opacity:0} 70%{opacity:1} 100%{transform:translateX(100%);opacity:0} }
        .wf{animation:wave-flow 15s ease-in-out infinite}
        .wr{animation:wave-rev 18s ease-in-out infinite}
        .s1{animation:sweep 1.5s ease-out forwards}
        .s2{animation:sweep2 1.5s ease-out forwards}
      `}</style>

      {showAuraEffect && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent s1"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/15 to-transparent s2"></div>
        </div>
      )}

      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 50 ? (dk ? 'bg-black/92 backdrop-blur-xl border-b border-white/5' : 'bg-white/92 backdrop-blur-xl border-b border-gray-200/50') : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex justify-between items-center">
          <img src="resources/logos/AuragarciaLogoVector-2.png" alt="AuraGarcia" className={`h-12 md:h-14 w-auto ${dk ? 'brightness-0 invert' : ''}`} />

          <nav className="hidden md:flex items-center gap-6">
            <div className="relative">
              <button onClick={() => setShowDivisionsMenu(!showDivisionsMenu)}
                className={`flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] transition-colors duration-300 ${dk ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                Divisiones
                <Icon name="chevron-down" size={12} color="currentColor" className={`transition-transform duration-200 ${showDivisionsMenu ? 'rotate-180' : ''}`} />
              </button>
              {showDivisionsMenu && (
                <div className={`absolute top-full left-0 mt-3 w-60 rounded-2xl overflow-hidden shadow-2xl ${dk ? 'bg-[#111] border border-white/10' : 'bg-white border border-gray-100 shadow-xl'}`}>
                  {divisions.map(d => (
                    <a key={d.id} href={`#${d.id}`} onClick={() => setShowDivisionsMenu(false)}
                      className={`flex items-center gap-3 px-5 py-3 text-sm transition-colors ${dk ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }}></span>
                      {d.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <a href="#testimonios" className={`text-xs uppercase tracking-[0.25em] transition-colors ${dk ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Testimonios</a>
            <a href="#contacto" className={`text-xs uppercase tracking-[0.25em] transition-colors ${dk ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Contacto</a>
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
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5">
              <span className={`block w-5 h-0.5 transition-all duration-300 ${dk ? 'bg-white' : 'bg-gray-900'} ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-5 h-0.5 transition-all duration-300 ${dk ? 'bg-white' : 'bg-gray-900'} ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-5 h-0.5 transition-all duration-300 ${dk ? 'bg-white' : 'bg-gray-900'} ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className={`md:hidden ${dk ? 'bg-black/95 border-t border-white/5' : 'bg-white border-t border-gray-100'} backdrop-blur-xl`}>
            <nav className="px-6 py-6 space-y-1">
              {divisions.map(d => (
                <a key={d.id} href={`#${d.id}`} onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 py-3 text-sm transition-colors ${dk ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></span>
                  {d.label}
                </a>
              ))}
              <div className="pt-4 border-t border-white/5 space-y-2">
                <a href="#testimonios" onClick={() => setIsMobileMenuOpen(false)} className={`block py-2 text-sm ${dk ? 'text-gray-300' : 'text-gray-600'}`}>Testimonios</a>
                <a href="#contacto" onClick={() => setIsMobileMenuOpen(false)} className={`block py-2 text-sm ${dk ? 'text-gray-300' : 'text-gray-600'}`}>Contacto</a>
                <a href="https://calendly.com/avragarcia" target="_blank" rel="noopener noreferrer"
                  className="mt-3 w-full btn-gradient-primary px-6 py-3 rounded-full text-sm text-center justify-center block">
                  Agendar llamada
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="inicio" className="relative min-h-screen flex items-center px-4 md:px-8 pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 wf" style={{ background: dk ? 'linear-gradient(135deg,#000 0%,#0d0d1a 30%,#111128 60%,#050510 100%)' : 'linear-gradient(135deg,#EEF2FF 0%,#E0E7FF 40%,#F5F3FF 70%,#EFF6FF 100%)' }}></div>
          <div className="absolute inset-0 wr opacity-60" style={{ background: dk ? 'linear-gradient(45deg,#0d0d1a 0%,#111428 50%,#0f1535 100%)' : 'linear-gradient(45deg,#E0E7FF 0%,#EDE9FE 50%,#DBEAFE 100%)' }}></div>
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(99,102,241,0.1) 0%,transparent 60%)', transform: 'translate(-50%,-50%)', animation: 'aura-drift 22s ease-in-out infinite', filter: 'blur(50px)' }}></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(139,92,246,0.08) 0%,transparent 60%)', transform: 'translate(50%,50%)', animation: 'aura-float 18s ease-in-out infinite', filter: 'blur(40px)' }}></div>
          <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px' }}></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10 text-center px-4 w-full">
          <div className="flex flex-wrap justify-center gap-2 mb-10 reveal-hidden">
            {divisions.map(d => (
              <a key={d.id} href={`#${d.id}`}
                className="stat-pill text-xs transition-all duration-300 hover:scale-105"
                style={{ background: `${d.color}18`, color: d.color, border: `1px solid ${d.color}30` }}>
                {d.label}
              </a>
            ))}
          </div>

          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-light leading-[0.9] mb-6 reveal-hidden delay-1 ${dk ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
            Salud más<br /><span className="gradient-text-primary">inteligente</span>
          </h1>

          <p className={`text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto font-light reveal-hidden delay-2 ${dk ? 'text-gray-300' : 'text-gray-600'}`}>
            Cinco divisiones especializadas para transformar la salud digital: datos, IA, equipos, marketing y más.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12 reveal-hidden delay-3">
            {[['40%','reducción diagnóstico'],['95%','precisión IA'],['6 sem','implementación'],['50+','hospitales']].map(([v, l]) => (
              <span key={l} className="stat-pill"
                style={{ background: dk ? 'rgba(255,255,255,0.06)' : 'rgba(99,102,241,0.08)', border: dk ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(99,102,241,0.15)', color: dk ? 'rgba(255,255,255,0.85)' : '#4338CA' }}>
                <strong style={{ color: '#818CF8', marginRight: '5px' }}>{v}</strong>{l}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 reveal-hidden delay-4">
            <a href="https://calendly.com/avragarcia" target="_blank" rel="noopener noreferrer"
              className="btn-gradient-primary px-10 py-4 rounded-full text-base font-light justify-center inline-flex items-center gap-2">
              Conversemos <Icon name="arrow-right" size={18} color="white" />
            </a>
            <a href="#transformacion"
              className={`px-10 py-4 rounded-full text-base font-light inline-flex items-center justify-center gap-2 transition-all duration-300 ${dk ? 'border border-white/15 text-white hover:bg-white/5' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
              Ver servicios
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className={`text-xs uppercase tracking-[0.3em] font-light ${dk ? 'text-gray-600' : 'text-gray-400'}`}>Descubre más</span>
          <div className="w-px h-12 overflow-hidden relative">
            <div className="absolute top-0 w-full bg-gradient-to-b from-indigo-400/60 to-transparent" style={{ height: `${Math.min(scrollProgress * 3, 100)}%` }}></div>
          </div>
        </div>
      </section>

      {/* DIV 1: TRANSFORMACIÓN DIGITAL */}
      <section id="transformacion" className="py-24 md:py-32 px-4 md:px-8" style={{ backgroundColor: dk ? '#050510' : '#FAFAFA' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal-hidden">
            <span className="section-label tag-transform mb-5 inline-block">Transformación Digital en Salud</span>
            <h2 className={`text-4xl md:text-6xl font-light leading-tight mt-5 mb-4 ${dk ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
              Servicios que mueven<br /><span className="gradient-text-primary">la aguja</span>
            </h2>
            <p className={`text-lg font-light max-w-xl mx-auto ${dk ? 'text-gray-400' : 'text-gray-500'}`}>Paquetes claros, entregables medibles, impacto en semanas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {services.map((s, i) => (
              <div key={i} className={`${dk ? 'card-glass-dark' : 'card-glass-light'} gradient-border-card p-7 reveal-hidden delay-${Math.min(i+1,6)}`}>
                <div className="icon-box mb-5" style={{ background: 'rgba(99,102,241,0.12)' }}>
                  <Icon name={s.icon} size={22} color="#818CF8" />
                </div>
                <div className={`text-5xl font-light mb-2 ${dk ? 'text-indigo-400/15' : 'text-indigo-100'}`}>{s.number}</div>
                <h3 className={`text-base font-medium mb-2 leading-snug ${dk ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>{s.title}</h3>
                <p className={`text-sm font-light leading-relaxed mb-4 ${dk ? 'text-gray-400' : 'text-gray-500'}`}>{s.description}</p>
                <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#818CF8' }}>{s.timeframe}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center reveal-hidden">
            <a href="https://calendly.com/avragarcia" target="_blank" rel="noopener noreferrer"
              className="btn-gradient-primary px-8 py-3 rounded-full text-sm inline-flex items-center gap-2">
              Solicitar propuesta <Icon name="arrow-right" size={16} color="white" />
            </a>
          </div>
        </div>
      </section>

      {/* METODOLOGÍA */}
      <section ref={methodologyRef} id="metodologia" className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden" style={{ backgroundColor: dk ? '#080818' : '#F5F5FF' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle,rgba(99,102,241,0.07) 0%,transparent 60%)', transform: 'translate(-50%,-50%)', animation: 'aura-drift 20s ease-in-out infinite', filter: 'blur(50px)' }}></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-20 reveal-hidden">
            <span className="section-label tag-transform mb-5 inline-block">Metodología</span>
            <h2 className={`text-4xl md:text-6xl font-light mt-5 mb-4 ${dk ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
              Metodología <span className="gradient-text-primary">AURA</span>
            </h2>
            <p className={`text-lg font-light ${dk ? 'text-gray-400' : 'text-gray-500'}`}>De la idea a valor clínico medible, sin ruido</p>
          </div>

          <div className="relative max-w-2xl mx-auto">
            <div className={`absolute left-8 md:left-10 top-0 bottom-0 w-px ${dk ? 'bg-white/8' : 'bg-gray-200'}`}></div>
            <div className="absolute left-8 md:left-10 top-0 w-px transition-all duration-300"
              style={{ height: `${methodologyLineProgress * 100}%`, background: 'linear-gradient(to bottom,#818CF8,#A78BFA)', boxShadow: '0 0 8px rgba(99,102,241,0.4)', opacity: methodologyLineProgress > 0 ? 1 : 0 }}></div>

            {methodologySteps.map((step, i) => (
              <div key={i} className={`relative flex items-start mb-16 transition-all duration-700 ${i <= activeMethodologyStep ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-4'}`}>
                <div className={`relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl font-light flex-shrink-0 transition-all duration-700 backdrop-blur-md ${i <= activeMethodologyStep ? (dk ? 'border border-indigo-400/40 text-white shadow-lg shadow-indigo-500/20' : 'bg-white border border-indigo-200 text-indigo-700 shadow-lg') : (dk ? 'bg-white/4 border border-white/8 text-gray-600' : 'bg-gray-100 border border-gray-200 text-gray-400')}`}
                  style={{ fontFamily: 'Nortica, Girot, sans-serif', ...(i <= activeMethodologyStep && { background: dk ? 'linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.15))' : 'white' }) }}>
                  {step.letter}
                  {i <= activeMethodologyStep && <div className="absolute inset-0 rounded-full bg-indigo-400/15 blur-xl -z-10 animate-pulse"></div>}
                </div>
                <div className="ml-8 flex-1">
                  <h3 className={`text-2xl md:text-3xl font-light mb-2 ${i <= activeMethodologyStep ? (dk ? 'text-white' : 'text-gray-900') : (dk ? 'text-gray-600' : 'text-gray-400')}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>{step.title}</h3>
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

      {/* POR QUÉ ELEGIRNOS */}
      <section id="por-que-elegirnos" className="py-24 md:py-32 px-4 md:px-8" style={{ backgroundColor: dk ? '#050510' : '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal-hidden">
            <span className="section-label tag-transform mb-5 inline-block">Por qué elegirnos</span>
            <h2 className={`text-4xl md:text-6xl font-light mt-5 mb-4 ${dk ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
              Diferenciación que <span className="gradient-text-primary">importa</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map((item, i) => (
              <div key={i} className={`${dk ? 'card-glass-dark' : 'card-glass-light'} gradient-border-card p-7 reveal-hidden delay-${Math.min(i+1,6)}`}>
                <div className="icon-box mb-5" style={{ background: 'rgba(99,102,241,0.12)' }}>
                  <Icon name={item.icon} size={22} color="#818CF8" />
                </div>
                <h3 className={`text-lg font-medium mb-3 ${dk ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>{item.title}</h3>
                <p className={`text-sm font-light leading-relaxed ${dk ? 'text-gray-400' : 'text-gray-500'}`}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="division-divider"></div>

      {/* DIV 2: EAI */}
      <section id="eai" className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden" style={{ backgroundColor: dk ? '#080814' : '#F8F6FF' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle,rgba(139,92,246,0.08) 0%,transparent 60%)', transform: 'translate(50%,-50%)', animation: 'aura-breathe 14s ease-in-out infinite', filter: 'blur(50px)' }}></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 reveal-hidden">
            <span className="section-label tag-eai mb-5 inline-block">EAI — Agencia de Inteligencia Artificial</span>
            <h2 className={`text-4xl md:text-6xl font-light mt-5 mb-4 ${dk ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
              IA que trabaja<br />
              <span style={{ background: 'linear-gradient(135deg,#A78BFA,#7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>para tu clínica</span>
            </h2>
            <p className={`text-lg font-light max-w-xl mx-auto ${dk ? 'text-gray-400' : 'text-gray-500'}`}>Agentes, automatización y LLMs especializados en el dominio de la salud</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {eaiServices.map((s, i) => (
              <div key={i} className={`p-7 rounded-2xl reveal-hidden delay-${i+1} transition-all duration-400`}
                style={{ background: dk ? 'rgba(139,92,246,0.06)' : 'rgba(139,92,246,0.04)', border: dk ? '1px solid rgba(139,92,246,0.18)' : '1px solid rgba(139,92,246,0.14)' }}>
                <div className="icon-box mb-5" style={{ background: 'rgba(139,92,246,0.15)' }}>
                  <Icon name={s.icon} size={22} color="#A78BFA" />
                </div>
                <h3 className={`text-lg font-medium mb-3 ${dk ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>{s.title}</h3>
                <p className={`text-sm font-light leading-relaxed ${dk ? 'text-gray-400' : 'text-gray-500'}`}>{s.description}</p>
              </div>
            ))}
          </div>

          <div className={`rounded-2xl p-6 md:p-8 mb-10 reveal-hidden`} style={{ background: dk ? 'rgba(139,92,246,0.07)' : 'rgba(139,92,246,0.04)', border: dk ? '1px solid rgba(139,92,246,0.18)' : '1px solid rgba(139,92,246,0.12)' }}>
            <p className={`text-xs uppercase tracking-widest mb-4 ${dk ? 'text-violet-400' : 'text-violet-600'}`}>Casos de uso destacados</p>
            <div className="flex flex-wrap gap-3">
              {['Triaje automático','Notas clínicas por voz','Alertas predictivas','Resumen de historiales','Codificación CIE-10','Chatbot de pacientes'].map(u => (
                <span key={u} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                  style={{ background: dk ? 'rgba(139,92,246,0.12)' : 'rgba(139,92,246,0.08)', color: dk ? '#C4B5FD' : '#6D28D9' }}>
                  <Icon name="check" size={12} color={dk ? '#A78BFA' : '#7C3AED'} />{u}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center reveal-hidden">
            <a href="https://calendly.com/avragarcia" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-light transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#7C3AED,#6D28D9)', color: 'white', boxShadow: '0 0 20px rgba(124,58,237,0.35)' }}>
              Agenda una demo de IA <Icon name="arrow-right" size={16} color="white" />
            </a>
          </div>
        </div>
      </section>

      <div className="division-divider"></div>

      {/* DIV 3: ANALYTICS & DATA (EN) */}
      <section id="analytics" className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden" style={{ backgroundColor: dk ? '#040514' : '#F0FDFE' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/3 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle,rgba(6,182,212,0.07) 0%,transparent 60%)', transform: 'translate(-50%,-50%)', animation: 'aura-drift 22s ease-in-out infinite', filter: 'blur(50px)' }}></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 reveal-hidden">
            <span className="section-label tag-analytics mb-5 inline-block">Analytics &amp; Data Teams</span>
            <h2 className={`text-4xl md:text-6xl font-light mt-5 mb-4 ${dk ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
              World-class data teams,<br />
              <span style={{ background: 'linear-gradient(135deg,#22D3EE,#0891B2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>nearshored for healthcare</span>
            </h2>
            <p className={`text-lg font-light max-w-2xl mx-auto ${dk ? 'text-gray-400' : 'text-gray-500'}`}>Senior healthcare data scientists and engineers embedded in your team — at 40–60% of US/EU rates.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 reveal-hidden">
            {[['40–60%','Cost savings vs US/EU'],['Healthcare','Domain specialized'],['Agile','Fast deployment'],['Bilingual','English + Spanish']].map(([v, l]) => (
              <div key={l} className="text-center p-5 rounded-2xl" style={{ background: dk ? 'rgba(6,182,212,0.08)' : 'rgba(6,182,212,0.06)', border: dk ? '1px solid rgba(6,182,212,0.18)' : '1px solid rgba(6,182,212,0.14)' }}>
                <div className="text-lg font-medium mb-1" style={{ color: '#22D3EE' }}>{v}</div>
                <div className={`text-xs font-light ${dk ? 'text-gray-400' : 'text-gray-500'}`}>{l}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {analyticsServices.map((s, i) => (
              <div key={i} className={`p-7 rounded-2xl reveal-hidden delay-${i+1}`}
                style={{ background: dk ? 'rgba(6,182,212,0.05)' : 'rgba(6,182,212,0.04)', border: dk ? '1px solid rgba(6,182,212,0.18)' : '1px solid rgba(6,182,212,0.14)' }}>
                <div className="icon-box mb-5" style={{ background: 'rgba(6,182,212,0.12)' }}>
                  <Icon name={s.icon} size={22} color="#22D3EE" />
                </div>
                <h3 className={`text-lg font-medium mb-3 ${dk ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>{s.title}</h3>
                <p className={`text-sm font-light leading-relaxed ${dk ? 'text-gray-400' : 'text-gray-500'}`}>{s.description}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center reveal-hidden">
            <a href="https://calendly.com/avragarcia" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-light transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#0891B2,#0E7490)', color: 'white', boxShadow: '0 0 20px rgba(8,145,178,0.35)' }}>
              Build your data team <Icon name="arrow-right" size={16} color="white" />
            </a>
          </div>
        </div>
      </section>

      <div className="division-divider"></div>

      {/* DIV 4: EQUIPOS MÉDICOS */}
      <section id="equipos-medicos" className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden" style={{ backgroundColor: dk ? '#050510' : '#F0FDF7' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle,rgba(16,185,129,0.07) 0%,transparent 60%)', transform: 'translate(50%,50%)', animation: 'aura-breathe 16s ease-in-out infinite', filter: 'blur(50px)' }}></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 reveal-hidden">
            <span className="section-label tag-medequip mb-5 inline-block">Importación de Equipos Médicos</span>
            <h2 className={`text-4xl md:text-6xl font-light mt-5 mb-4 ${dk ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
              Tecnología médica<br />
              <span style={{ background: 'linear-gradient(135deg,#34D399,#059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>de vanguardia</span>
            </h2>
            <p className={`text-lg font-light max-w-xl mx-auto ${dk ? 'text-gray-400' : 'text-gray-500'}`}>Importación directa de equipos médicos de primera línea a precios competitivos, con soporte completo</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {medEquipServices.map((s, i) => (
              <div key={i} className={`p-7 rounded-2xl reveal-hidden delay-${i+1}`}
                style={{ background: dk ? 'rgba(16,185,129,0.05)' : 'rgba(16,185,129,0.04)', border: dk ? '1px solid rgba(16,185,129,0.18)' : '1px solid rgba(16,185,129,0.14)' }}>
                <div className="icon-box mb-5" style={{ background: 'rgba(16,185,129,0.12)' }}>
                  <Icon name={s.icon} size={22} color="#34D399" />
                </div>
                <h3 className={`text-lg font-medium mb-3 ${dk ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>{s.title}</h3>
                <p className={`text-sm font-light leading-relaxed ${dk ? 'text-gray-400' : 'text-gray-500'}`}>{s.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10 reveal-hidden">
            {['Precios competitivos','Garantía y soporte técnico','Importación directa','Formación del personal','Entrega rápida'].map(item => (
              <span key={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                style={{ background: dk ? 'rgba(16,185,129,0.1)' : 'rgba(16,185,129,0.07)', color: dk ? '#34D399' : '#065F46' }}>
                <Icon name="check" size={12} color={dk ? '#34D399' : '#059669'} />{item}
              </span>
            ))}
          </div>

          <div className="flex justify-center reveal-hidden">
            <a href="https://calendly.com/avragarcia" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-light transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#059669,#047857)', color: 'white', boxShadow: '0 0 20px rgba(5,150,105,0.35)' }}>
              Ver catálogo <Icon name="arrow-right" size={16} color="white" />
            </a>
          </div>
        </div>
      </section>

      <div className="division-divider"></div>

      {/* DIV 5: MARKETING DIGITAL */}
      <section id="marketing-salud" className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden" style={{ backgroundColor: dk ? '#080808' : '#FFFBEB' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 right-1/3 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle,rgba(245,158,11,0.07) 0%,transparent 60%)', transform: 'translate(50%,-50%)', animation: 'aura-drift 18s ease-in-out infinite', filter: 'blur(50px)' }}></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 reveal-hidden">
            <span className="section-label tag-marketing mb-5 inline-block">Marketing Digital para Salud</span>
            <h2 className={`text-4xl md:text-6xl font-light mt-5 mb-4 ${dk ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
              Visibilidad digital para<br />
              <span style={{ background: 'linear-gradient(135deg,#FBBF24,#D97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>profesionales de la salud</span>
            </h2>
            <p className={`text-lg font-light max-w-xl mx-auto ${dk ? 'text-gray-400' : 'text-gray-500'}`}>Marketing especializado en el sector sanitario con conocimiento clínico real y cumplimiento normativo</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {marketingServices.map((s, i) => (
              <div key={i} className={`p-7 rounded-2xl reveal-hidden delay-${i+1}`}
                style={{ background: dk ? 'rgba(245,158,11,0.05)' : 'rgba(245,158,11,0.04)', border: dk ? '1px solid rgba(245,158,11,0.18)' : '1px solid rgba(245,158,11,0.14)' }}>
                <div className="icon-box mb-5" style={{ background: 'rgba(245,158,11,0.12)' }}>
                  <Icon name={s.icon} size={22} color="#FBBF24" />
                </div>
                <h3 className={`text-lg font-medium mb-3 ${dk ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>{s.title}</h3>
                <p className={`text-sm font-light leading-relaxed ${dk ? 'text-gray-400' : 'text-gray-500'}`}>{s.description}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center reveal-hidden">
            <a href="https://calendly.com/avragarcia" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-light transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#D97706,#B45309)', color: 'white', boxShadow: '0 0 20px rgba(217,119,6,0.35)' }}>
              Consulta gratuita <Icon name="arrow-right" size={16} color="white" />
            </a>
          </div>
        </div>
      </section>

      <div className="division-divider"></div>

      {/* TESTIMONIOS */}
      <section id="testimonios" className="py-24 md:py-32 px-4 md:px-8" style={{ backgroundColor: dk ? '#050510' : '#FAFAFA' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal-hidden">
            <span className="section-label tag-transform mb-5 inline-block">Testimonios</span>
            <h2 className={`text-4xl md:text-6xl font-light mt-5 mb-4 ${dk ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
              Resultados que <span className="gradient-text-primary">hablan</span>
            </h2>
            <p className={`text-lg font-light ${dk ? 'text-gray-400' : 'text-gray-500'}`}>Hospitales que transformaron su operación con nuestra metodología</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { metric: '40%', quote: 'Reducción en tiempo de diagnóstico con SALV.IA. Nuestros cardiólogos identifican arritmias complejas en segundos.', name: 'Dra. María González', role: 'Jefa de Cardiología, Hospital Madrid', initials: 'MG' },
              { metric: '6 sem', quote: 'De la idea a implementación. AuraGarcia conectó todos nuestros sistemas en tiempo récord con resultados desde el primer día.', name: 'Carlos Ruiz', role: 'CTO, Clínica Barcelona', initials: 'CR' },
              { metric: '85%', quote: 'Mejora en precisión de detección de cáncer de mama. MamRisk ha revolucionado nuestro programa de screening.', name: 'Dra. Ana Martín', role: 'Radióloga, Hospital Valencia', initials: 'AM' },
            ].map((t, i) => (
              <div key={i} className={`${dk ? 'card-glass-dark' : 'card-glass-light'} p-8 rounded-2xl reveal-hidden delay-${i+1} relative overflow-hidden`}>
                <div className={`quote-mark absolute top-2 right-5 ${dk ? 'text-white' : 'text-gray-900'}`}>"</div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <div className="text-3xl font-light mb-3 gradient-text-primary">{t.metric}</div>
                <p className={`text-sm font-light leading-relaxed mb-6 ${dk ? 'text-gray-300' : 'text-gray-600'}`}>"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,#6366F1,#8B5CF6)', color: 'white' }}>{t.initials}</div>
                  <div>
                    <p className={`text-sm font-medium ${dk ? 'text-white' : 'text-gray-900'}`}>{t.name}</p>
                    <p className={`text-xs font-light ${dk ? 'text-gray-400' : 'text-gray-500'}`}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`rounded-2xl p-8 md:p-12 reveal-hidden`}
            style={{ background: dk ? 'linear-gradient(135deg,rgba(99,102,241,0.08),rgba(139,92,246,0.06))' : 'linear-gradient(135deg,rgba(238,242,255,1),rgba(245,243,255,1))', border: dk ? '1px solid rgba(99,102,241,0.15)' : '1px solid rgba(99,102,241,0.1)' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[['50+','Hospitales Transformados'],['3M+','Pacientes Impactados'],['6','Años de Experiencia'],['98%','Satisfacción Cliente']].map(([v, l]) => (
                <div key={l}>
                  <div className="text-3xl md:text-4xl font-light mb-2 gradient-text-primary">{v}</div>
                  <p className={`text-sm font-light ${dk ? 'text-gray-400' : 'text-gray-500'}`}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="py-24 md:py-32 px-4 md:px-8" style={{ backgroundColor: dk ? '#080818' : '#F5F5FF' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal-hidden">
            <span className="section-label tag-transform mb-5 inline-block">Contacto</span>
            <h2 className={`text-4xl md:text-6xl font-light mt-5 mb-4 ${dk ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
              Conversemos sobre<br /><span className="gradient-text-primary">tu proyecto</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 reveal-hidden">
            {/* Form */}
            <div className={`lg:col-span-3 rounded-2xl p-8 md:p-10 ${dk ? 'bg-white/3 border border-white/8' : 'bg-white border border-gray-100 shadow-lg'}`}>
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={`block text-sm font-light mb-2 ${dk ? 'text-gray-300' : 'text-gray-700'}`}>Hospital / Clínica *</label>
                    <input type="text" placeholder="Hospital Madrid..." className={`input-modern w-full px-4 py-3 rounded-xl text-sm font-light ${dk ? 'bg-white/5 border border-white/10 text-white placeholder-gray-600' : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'}`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-light mb-2 ${dk ? 'text-gray-300' : 'text-gray-700'}`}>Tu nombre *</label>
                    <input type="text" placeholder="Dr. María González" className={`input-modern w-full px-4 py-3 rounded-xl text-sm font-light ${dk ? 'bg-white/5 border border-white/10 text-white placeholder-gray-600' : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'}`} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={`block text-sm font-light mb-2 ${dk ? 'text-gray-300' : 'text-gray-700'}`}>Email *</label>
                    <input type="email" placeholder="maria@hospital.com" className={`input-modern w-full px-4 py-3 rounded-xl text-sm font-light ${dk ? 'bg-white/5 border border-white/10 text-white placeholder-gray-600' : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'}`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-light mb-2 ${dk ? 'text-gray-300' : 'text-gray-700'}`}>Teléfono</label>
                    <input type="tel" placeholder="+34 600 123 456" className={`input-modern w-full px-4 py-3 rounded-xl text-sm font-light ${dk ? 'bg-white/5 border border-white/10 text-white placeholder-gray-600' : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'}`} />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-light mb-2 ${dk ? 'text-gray-300' : 'text-gray-700'}`}>División de interés</label>
                  <select className={`input-modern w-full px-4 py-3 rounded-xl text-sm font-light ${dk ? 'bg-white/5 border border-white/10 text-white' : 'bg-gray-50 border border-gray-200 text-gray-900'}`}>
                    <option value="">Selecciona una división</option>
                    {divisions.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
                    <option value="multiple">Varias divisiones</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-light mb-2 ${dk ? 'text-gray-300' : 'text-gray-700'}`}>¿En qué podemos ayudarte? *</label>
                  <textarea rows={4} placeholder="Cuéntanos sobre tu proyecto, desafíos actuales, timeline esperado..." className={`input-modern w-full px-4 py-3 rounded-xl text-sm font-light resize-none ${dk ? 'bg-white/5 border border-white/10 text-white placeholder-gray-600' : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'}`}></textarea>
                </div>
                <button type="submit" className="w-full btn-gradient-primary py-4 rounded-xl text-sm font-medium justify-center">
                  Enviar mensaje <Icon name="arrow-right" size={16} color="white" />
                </button>
                <p className={`text-xs font-light text-center ${dk ? 'text-gray-600' : 'text-gray-400'}`}>Al enviar aceptas nuestra política de privacidad. No compartimos tu información.</p>
              </form>
            </div>

            {/* Contact info */}
            <div className="lg:col-span-2 flex flex-col gap-5 reveal-hidden delay-2">
              <div className={`rounded-2xl p-6 ${dk ? 'bg-white/3 border border-white/8' : 'bg-white border border-gray-100 shadow-sm'}`}>
                <h3 className={`text-base font-medium mb-5 ${dk ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>¿Prefieres hablar directamente?</h3>
                <div className="space-y-4">
                  {[
                    { icon: 'mail', label: 'hola@auragarcia.com', href: 'mailto:hola@auragarcia.com' },
                    { icon: 'calendar', label: 'Agendar llamada de 15 min', href: 'https://calendly.com/avragarcia' },
                    { icon: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/company/auragarcia' },
                  ].map(item => (
                    <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                      className={`flex items-center gap-3 text-sm font-light transition-colors ${dk ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(99,102,241,0.12)' }}>
                        <Icon name={item.icon} size={16} color="#818CF8" />
                      </div>
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-6" style={{ background: dk ? 'rgba(99,102,241,0.08)' : 'rgba(238,242,255,1)', border: dk ? '1px solid rgba(99,102,241,0.18)' : '1px solid rgba(99,102,241,0.12)' }}>
                <p className={`text-xs uppercase tracking-widest mb-3 ${dk ? 'text-indigo-400' : 'text-indigo-600'}`}>Respuesta garantizada</p>
                <p className={`text-sm font-light leading-relaxed ${dk ? 'text-gray-300' : 'text-gray-600'}`}>Respondemos en menos de 24h. Primera consulta gratuita sin compromiso.</p>
              </div>

              <div className={`rounded-2xl p-6 ${dk ? 'bg-white/3 border border-white/8' : 'bg-white border border-gray-100 shadow-sm'}`}>
                <p className={`text-xs uppercase tracking-widest mb-4 ${dk ? 'text-gray-500' : 'text-gray-400'}`}>Nuestras divisiones</p>
                <div className="flex flex-col gap-2">
                  {divisions.map(d => (
                    <a key={d.id} href={`#${d.id}`} className="flex items-center gap-2 text-xs font-light transition-colors"
                      style={{ color: dk ? '#9CA3AF' : '#6B7280' }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.color }}></span>
                      {d.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRE-FOOTER CTA */}
      <section className="cta-strip py-24 md:py-32 px-4 md:px-8 text-center">
        <div className="max-w-3xl mx-auto reveal-hidden">
          <span className="section-label tag-transform mb-8 inline-block">¿Listo para empezar?</span>
          <h2 className="text-4xl md:text-6xl font-light mt-6 mb-6 gradient-text-primary" style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
            Transforma tu hospital<br />en semanas, no años
          </h2>
          <p className="text-gray-400 text-lg font-light mb-10 max-w-xl mx-auto">
            Primera consulta gratuita. Resultados medibles en 6 semanas. Sin compromisos.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://calendly.com/avragarcia" target="_blank" rel="noopener noreferrer"
              className="btn-gradient-primary px-10 py-4 rounded-full text-base font-light justify-center inline-flex items-center gap-2">
              Agenda tu llamada gratuita <Icon name="arrow-right" size={18} color="white" />
            </a>
            <a href="#contacto"
              className="px-10 py-4 rounded-full text-base font-light inline-flex items-center justify-center gap-2 border border-white/15 text-white hover:bg-white/5 transition-all duration-300">
              Enviar mensaje
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black px-4 md:px-8">
        <div className="footer-gradient-top"></div>
        <div className="max-w-6xl mx-auto py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
            {[
              { title: 'Empresa', links: [['Sobre Nosotros','#'],['Equipo','#'],['Casos de Éxito','#'],['Prensa','#']] },
              { title: 'Divisiones', links: divisions.map(d => [d.label, `#${d.id}`]) },
              { title: 'Recursos', links: [['Blog','#'],['Whitepapers','#'],['Eventos','#'],['Webinars','#']] },
              { title: 'Legal', links: [['Política de Privacidad','#'],['Términos de Servicio','#'],['Compliance','#'],['RGPD','#']] },
              { title: 'Conectar', links: [['LinkedIn','https://linkedin.com/company/auragarcia'],['Email','mailto:hola@auragarcia.com'],['Calendly','https://calendly.com/avragarcia'],['Madrid, España','#']] },
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
              <p className="text-sm font-light text-gray-500">© 2025 AuraGarcia. Todos los derechos reservados.</p>
            </div>
            <p className="text-xs font-light text-gray-600">Consultoría en transformación digital sanitaria · Madrid, España</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

ReactDOM.render(<AuraGarciaApp />, document.getElementById('root'));
