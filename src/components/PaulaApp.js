// Paula by AuraGarcia — Agente de IA personalizable
// Página de producto

const { useState, useEffect, useRef } = React;

// Iconos inline (estilo Lucide) — nativos de React para sobrevivir a los re-renders
const ICON_PATHS = {
  'message-circle': 'M7.9 20A9 9 0 1 0 4 16.1L2 22Z',
  'cpu': 'M4 4h16v16H4z M9 1v3 M15 1v3 M9 20v3 M15 20v3 M20 9h3 M20 14h3 M1 9h3 M1 14h3 M9 9h6v6H9z',
  'shield-check': 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4',
  'sliders-horizontal': 'M3 6h11 M18 6h3 M3 12h3 M10 12h11 M3 18h7 M14 18h7 M16 4v4 M8 10v4 M12 16v4',
  'brain': 'M9 3a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 1 5 3 3 0 0 0 5 1V3z M15 3a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-1 5 3 3 0 0 1-5 1V3z',
  'zap': 'M13 2L3 14h9l-1 8 10-12h-9z',
  'lock': 'M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0v4',
  'key': 'M15.5 7.5a4 4 0 1 1-5 5L3 20l2 2 2-2 2 2 4-4',
  'server': 'M3 4h18v6H3z M3 14h18v6H3z M7 7h.01 M7 17h.01',
  'check': 'M20 6 9 17l-5-5'
};

const Icon = ({ name, className = '', size = 24, style = {} }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className} style={style} aria-hidden="true">
    {(ICON_PATHS[name] || '').split(' M').map((d, i) => (
      <path key={i} d={i === 0 ? d : 'M' + d} />
    ))}
  </svg>
);

const PaulaApp = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuraEffect, setShowAuraEffect] = useState(false);

  const handleThemeToggle = () => {
    setShowAuraEffect(true);
    setIsDarkMode(!isDarkMode);
    setTimeout(() => setShowAuraEffect(false), 1500);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = (currentScrollY / documentHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal-hidden').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ====== CONTENIDO DEL PRODUCTO ======
  const plans = [
    {
      name: 'Personal',
      price: 'Gratis',
      tagline: 'Para empezar a explorar',
      features: ['1 canal a elección', '1 modelo de IA', 'Memoria básica', '3 herramientas conectadas'],
      highlighted: false
    },
    {
      name: 'Pro',
      price: 'A medida',
      tagline: 'Para profesionales y equipos',
      features: ['Canales ilimitados', 'Cualquier modelo', 'Memoria avanzada', 'Herramientas ilimitadas', 'Acciones y automatizaciones', 'Soporte prioritario'],
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Hablemos',
      tagline: 'Para organizaciones',
      features: ['Despliegue privado', 'Soberanía de datos', 'SSO y auditoría', 'Integraciones a medida', 'SLA dedicado'],
      highlighted: false
    }
  ];

  const textMain = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSoft = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const textFaint = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const accent = isDarkMode ? 'text-blue-400' : 'text-blue-700';
  const cardClass = isDarkMode
    ? 'bg-white/[0.04] border border-white/10 hover:border-blue-400/40'
    : 'bg-white border border-gray-200/70 hover:border-blue-500/40';

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}`} style={{ fontFamily: 'Girot, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>

      {/* Barra de progreso superior */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>

      {/* Efecto Aura al cambiar tema */}
      {showAuraEffect && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" style={{ animation: 'aura-sweep 1.5s ease-out forwards' }}></div>
        </div>
      )}

      <style>{`
        @keyframes aura-sweep {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes paula-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        @keyframes paula-glow {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.08); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .paula-float { animation: paula-float 6s ease-in-out infinite; }
        .paula-marquee { display: inline-flex; animation: marquee 28s linear infinite; }
      `}</style>

      {/* ===== HEADER ===== */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 40 ? (isDarkMode ? 'bg-black/90 backdrop-blur-xl border-b border-gray-800/50' : 'bg-white/85 backdrop-blur-xl border-b border-slate-200/40') : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-5 flex justify-between items-center">
          <a href="#inicio" className="flex items-center space-x-3">
            <img src="resources/logos/AuragarciaLogoVector-2.png" alt="AuraGarcia" className={`h-12 md:h-14 w-auto ${isDarkMode ? 'brightness-0 invert' : ''}`} />
            <span className={`text-sm tracking-[0.35em] uppercase font-medium ${textMain}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>Paula</span>
          </a>

          <nav className="hidden md:flex space-x-8">
            <a href="#planes" className={`text-xs uppercase tracking-[0.3em] transition-all duration-300 ${textSoft} hover:opacity-100`}>Planes</a>
            <a href="#contacto" className={`text-xs uppercase tracking-[0.3em] transition-all duration-300 ${textSoft}`}>Contacto</a>
            <a href="index.html" className={`text-xs uppercase tracking-[0.3em] transition-all duration-300 ${textSoft}`}>AuraGarcia</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button onClick={handleThemeToggle} aria-label="Cambiar tema" className={`w-8 h-8 rounded-full transition-all duration-500 flex items-center justify-center ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-900/10 hover:bg-gray-900/20'}`}>
              <div className={`w-4 h-4 rounded-full transition-all duration-500 ${isDarkMode ? 'bg-white' : 'bg-gray-900'}`}></div>
            </button>
            <a href="#contacto" className="hidden md:inline-flex btn-gradient-primary px-5 py-2.5 rounded-full text-sm font-medium">Probar Paula</a>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Menú" className="md:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1">
              <div className={`w-5 h-0.5 transition-all duration-300 ${isDarkMode ? 'bg-white' : 'bg-gray-900'} ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-5 h-0.5 transition-all duration-300 ${isDarkMode ? 'bg-white' : 'bg-gray-900'} ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-5 h-0.5 transition-all duration-300 ${isDarkMode ? 'bg-white' : 'bg-gray-900'} ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className={`md:hidden absolute top-full left-0 right-0 ${isDarkMode ? 'bg-black/90 backdrop-blur-2xl border-b border-gray-800/30' : 'bg-white/90 backdrop-blur-2xl border-b border-slate-200/20'}`}>
            <nav className="px-6 py-6 space-y-4">
              {[['Planes', '#planes'], ['Contacto', '#contacto'], ['AuraGarcia', 'index.html'], ['Probar Paula', '#contacto']].map(([label, href]) => (
                <a key={href} href={href} onClick={() => setIsMobileMenuOpen(false)} className={`block text-sm uppercase tracking-[0.3em] py-2 ${textSoft}`}>{label}</a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ===== PAULA — GRID PRINCIPAL ===== */}
      <div id="inicio" className="pt-20 md:pt-24" style={{ backgroundColor: '#0a0a0a' }}>
        {typeof PaulaSection !== 'undefined' && <PaulaSection />}
      </div>

      {/* ===== PLANES ===== */}
      <section id="planes" className={`py-24 md:py-32 px-4 md:px-8 relative overflow-hidden ${isDarkMode ? 'bg-black' : 'bg-gradient-to-b from-white via-indigo-50/40 to-white'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal-hidden">
            <p className={`text-xs uppercase tracking-[0.3em] mb-6 ${accent}`}>Planes</p>
            <h2 className={`text-4xl md:text-6xl font-light leading-tight mb-5 ${textMain}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
              Empieza <span className="gradient-text-primary">a tu ritmo</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan, i) => (
              <div key={i} className={`reveal-hidden delay-${i + 1} relative p-8 rounded-3xl flex flex-col transition-all duration-500 ${plan.highlighted ? (isDarkMode ? 'bg-gradient-to-b from-indigo-900/40 to-purple-900/20 border border-blue-400/40 glow-indigo' : 'bg-gradient-to-b from-indigo-50 to-purple-50 border border-blue-500/40 shadow-xl') : cardClass}`}>
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-medium text-white" style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>Más popular</span>
                )}
                <h3 className={`text-2xl font-medium mb-1 ${textMain}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>{plan.name}</h3>
                <p className={`text-sm font-light mb-4 ${textFaint}`}>{plan.tagline}</p>
                <div className={`text-3xl font-light mb-6 ${accent}`}>{plan.price}</div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start text-sm font-light ${textSoft}`}>
                      <Icon name="check" className={`${accent} mr-2 mt-0.5 flex-shrink-0`} size={16} />{f}
                    </li>
                  ))}
                </ul>
                <a href="#contacto" className={`text-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${plan.highlighted ? 'btn-gradient-primary justify-center' : (isDarkMode ? 'border border-white/20 hover:border-white/40 text-white' : 'border border-gray-900/20 hover:border-gray-900/40 text-gray-900')}`}>
                  {plan.price === 'Hablemos' ? 'Contactar' : 'Empezar'}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section id="contacto" className="cta-strip py-24 md:py-32 px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-light leading-tight mb-6 text-white" style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
            Empieza a hablar<br />con <span className="gradient-text-primary font-medium">Paula</span> hoy
          </h2>
          <p className="text-lg font-light mb-10 text-gray-300 max-w-xl mx-auto">
            Tu agente personalizable, conectado a tus herramientas y disponible donde tú estés. Pruébala gratis y descubre lo que es trabajar con superpoderes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://calendly.com/avragarcia" target="_blank" rel="noopener noreferrer" className="btn-gradient-primary px-8 py-4 rounded-full text-base font-medium justify-center">Probar Paula gratis</a>
            <a href="mailto:hola@auragarcia.com?subject=Quiero%20conocer%20a%20Paula" className="px-8 py-4 rounded-full text-base font-light text-center border border-white/20 hover:border-white/40 text-white hover:bg-white/5 transition-all duration-300">Hablar con el equipo</a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className={`py-16 px-4 md:px-8 ${isDarkMode ? 'bg-black' : 'bg-gray-900'}`}>
        <div className="footer-gradient-top mb-12"></div>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img src="resources/logos/AuragarciaLogoVector-2.png" alt="AuraGarcia" className="h-10 w-auto brightness-0 invert" />
                <span className="text-sm tracking-[0.35em] uppercase font-medium text-white" style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>Paula</span>
              </div>
              <p className="text-sm font-light text-gray-400 max-w-sm">El agente de IA personalizable de AuraGarcia. Conéctalo de forma segura a tus herramientas, desde el canal que prefieras y con el modelo que quieras.</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">Producto</h4>
              <div className="space-y-3">
                <a href="#inicio" className="block text-sm text-gray-400 hover:text-white transition-colors">Paula</a>
                <a href="#planes" className="block text-sm text-gray-400 hover:text-white transition-colors">Planes</a>
                <a href="#contacto" className="block text-sm text-gray-400 hover:text-white transition-colors">Probar Paula</a>
              </div>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">AuraGarcia</h4>
              <div className="space-y-3">
                <a href="index.html" className="block text-sm text-gray-400 hover:text-white transition-colors">Web principal</a>
                <a href="mailto:hola@auragarcia.com" className="block text-sm text-gray-400 hover:text-white transition-colors">Contacto</a>
                <a href="https://calendly.com/avragarcia" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-400 hover:text-white transition-colors">Agendar llamada</a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm font-light text-gray-500">© 2026 AuraGarcia · Paula. Todos los derechos reservados.</p>
            <p className="text-xs font-light text-gray-600">Creada con OpenClaw · Madrid, España</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

ReactDOM.render(<PaulaApp />, document.getElementById('root'));
