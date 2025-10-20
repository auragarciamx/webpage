// auragarcia - Ciencia de Datos en Salud
// Aplicación web corporativa

const { useState, useEffect, useRef } = React;

const AuraGarciaApp = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [showAuraEffect, setShowAuraEffect] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeMethodologyStep, setActiveMethodologyStep] = useState(0);
  const [methodologyLineProgress, setMethodologyLineProgress] = useState(0);
  
  const methodologyRef = useRef(null);
  
  const scrollContainerRef = useRef(null);

  // Función para cambiar tema con efecto aura
  const handleThemeToggle = () => {
    setShowAuraEffect(true);
    setIsDarkMode(!isDarkMode);
    
    // Ocultar el efecto después de la animación
    setTimeout(() => {
      setShowAuraEffect(false);
    }, 1500);
  };

  const services = [
    { 
      title: 'ESTRATEGIA DIGITAL EN SALUD', 
      description: 'Diagnóstico integral y hoja de ruta personalizada para la transformación digital de tu institución.',
      shortDescription: 'Plan estratégico ejecutable con prioridades claras.',
      timeframe: '4-6 semanas',
      number: '01'
    },
    { 
      title: 'DATOS CONECTADOS', 
      description: 'Integramos tus sistemas para que hablen entre sí, creando flujos de información fluidos.',
      shortDescription: 'Información fluida entre departamentos y sistemas.',
      timeframe: '6-8 semanas',
      number: '02'
    },
    { 
      title: 'INTELIGENCIA HOSPITALARIA', 
      description: 'Tableros que transforman datos en decisiones con KPIs ejecutivos y clínicos en tiempo real.',
      shortDescription: 'KPIs ejecutivos y clínicos en tiempo real.',
      timeframe: '4-8 semanas',
      number: '03'
    },
    { 
      title: 'IA MÉDICA APLICADA', 
      description: 'Modelos predictivos para diagnóstico y gestión, con herramientas de IA validadas y operativas.',
      shortDescription: 'Herramientas de IA validadas y operativas.',
      timeframe: '8-12 semanas',
      number: '04'
    },
    { 
      title: 'PRODUCTOS AURAGARCIA', 
      description: 'Soluciones personalizadas para proyectos de investigación o desarrollos propios: Tecnología probada y adaptable a tus necesidades.',
      shortDescription: 'Tecnología personalizada y adaptable para investigación o desarrollos propios.',
      timeframe: '2-4 semanas',
      number: '05'
    },
    { 
      title: 'TRANSFORMACIÓN ORGANIZACIONAL', 
      description: 'Formación y cambio cultural para adopción exitosa con equipos capacitados y procesos optimizados.',
      shortDescription: 'Equipos capacitados y procesos optimizados.',
      timeframe: 'Continuo',
      number: '06'
    }
  ];

    const methodologySteps = [
      {
        letter: 'A',
        title: 'Analizar',
        subtitle: 'Entendemos tu realidad actual',
        description: 'Analizamos procesos, datos y equipos para detectar oportunidades de mejora.',
        result: 'Mapa claro de dónde estás y hacia dónde ir',
        color: 'blue-400',
        darkColor: 'blue-300'
      },
    {
      letter: 'U', 
      title: 'Unificar',
      subtitle: 'Conectamos tus sistemas',
      description: 'Estandarizamos datos y creamos flujos entre departamentos.',
      result: 'Información que fluye sin barreras',
      color: 'purple-400',
      darkColor: 'purple-300'
    },
      {
        letter: 'R',
        title: 'Reinventar', 
        subtitle: 'Construimos soluciones que funcionan',
        description: 'Desarrollamos herramientas centradas en casos de uso reales.',
        result: 'Tecnología que tu equipo realmente usa',
        color: 'blue-600',
        darkColor: 'blue-400'
      },
    {
      letter: 'A',
      title: 'Ampliar',
      subtitle: 'Escalamos y optimizamos', 
      description: 'Medimos impacto y expandimos lo que funciona.',
      result: 'Crecimiento sostenible con métricas claras',
      color: 'indigo-600',
      darkColor: 'indigo-400'
    }
  ];

  // Scroll handling
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

  // Scroll horizontal handling para servicios móviles
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleHorizontalScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.scrollWidth / services.length;
      const currentIndex = Math.round(scrollLeft / cardWidth);
      setActiveService(currentIndex);
    };

    container.addEventListener('scroll', handleHorizontalScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleHorizontalScroll);
  }, [services.length]);

  // Scroll handling para metodología
  useEffect(() => {
    const handleMethodologyScroll = () => {
      const methodologySection = methodologyRef.current;
      if (!methodologySection) return;

      const rect = methodologySection.getBoundingClientRect();
      const sectionHeight = rect.height;
      const sectionTop = rect.top;
      const windowHeight = window.innerHeight;

      // Calcular cuando la sección está visible
      const isVisible = sectionTop < windowHeight && sectionTop + sectionHeight > 0;
      
      if (!isVisible) {
        setActiveMethodologyStep(0);
        setMethodologyLineProgress(0);
        return;
      }

      // Calcular progreso basado en la posición de la sección
      const sectionStart = sectionTop;
      const sectionEnd = sectionTop + sectionHeight;
      const viewportCenter = windowHeight / 2;
      
      // Progreso basado en qué tan centrada está la sección
      const progress = Math.max(0, Math.min(1, (viewportCenter - sectionStart) / (sectionHeight * 0.8)));
      
      // Distribuir los pasos a lo largo del scroll de la sección
      const stepProgress = progress * methodologySteps.length;
      const activeStep = Math.min(methodologySteps.length - 1, Math.max(0, Math.floor(stepProgress)));
      
      // Progreso fluido de la línea
      const smoothLineProgress = Math.max(0, Math.min(1, stepProgress / methodologySteps.length));
      
      // Actualizar estados
      setActiveMethodologyStep(activeStep);
      setMethodologyLineProgress(smoothLineProgress);
    };

    // Ejecutar inmediatamente para estado inicial
    handleMethodologyScroll();
    
    window.addEventListener('scroll', handleMethodologyScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleMethodologyScroll);
  }, [methodologySteps.length]);

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}`} style={{ fontFamily: 'Girot, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      
      {/* Estilos para animaciones del efecto aura y gradientes móviles */}
      <style jsx>{`
        @keyframes aura-sweep {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        @keyframes aura-sweep-delayed {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          20% {
            opacity: 0;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        @keyframes wave-flow {
          0% {
            transform: translateX(0%) translateY(0%) scale(1);
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          }
          25% {
            transform: translateX(2%) translateY(-1%) scale(1.02);
            border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
          }
          50% {
            transform: translateX(-1%) translateY(2%) scale(1.01);
            border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
          }
          75% {
            transform: translateX(-2%) translateY(-1%) scale(1.02);
            border-radius: 30% 70% 70% 30% / 70% 30% 30% 70%;
          }
          100% {
            transform: translateX(0%) translateY(0%) scale(1);
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          }
        }
        
        @keyframes wave-flow-reverse {
          0% {
            transform: translateX(0%) translateY(0%) scale(1);
            border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
          }
          25% {
            transform: translateX(-2%) translateY(1%) scale(1.01);
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          }
          50% {
            transform: translateX(1%) translateY(-2%) scale(1.02);
            border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
          }
          75% {
            transform: translateX(2%) translateY(1%) scale(1.01);
            border-radius: 70% 30% 30% 70% / 30% 70% 70% 30%;
          }
          100% {
            transform: translateX(0%) translateY(0%) scale(1);
            border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
          }
        }
        
        .animate-aura-sweep {
          animation: aura-sweep 1.5s ease-out forwards;
        }
        
        .animate-aura-sweep-delayed {
          animation: aura-sweep-delayed 1.5s ease-out forwards;
        }
        
        .animate-wave-flow {
          animation: wave-flow 15s ease-in-out infinite;
        }
        
        .animate-wave-flow-reverse {
          animation: wave-flow-reverse 18s ease-in-out infinite;
        }
        
        @keyframes aura-breathe {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.15;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 0.25;
          }
        }
        
        @keyframes aura-orbit {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) translateX(100px) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) translateX(100px) rotate(-360deg);
          }
        }
        
        @keyframes aura-pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0.4;
          }
        }
        
        @keyframes line-flow {
          0%, 100% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 0.1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        @keyframes float-gentle {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-10px) translateX(5px);
            opacity: 0.4;
          }
        }
        
        @keyframes triangle-rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes diagonal-slide {
          0%, 100% {
            transform: translateX(-50px) rotate(15deg);
            opacity: 0;
          }
          50% {
            transform: translateX(0px) rotate(15deg);
            opacity: 0.1;
          }
        }
        
        @keyframes wave-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.05;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.1;
          }
        }
        
        @keyframes dot-pulse {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.5);
          }
        }
        
        @keyframes connect-line {
          0%, 100% {
            transform: rotate(30deg) scaleX(0);
            opacity: 0;
          }
          50% {
            transform: rotate(30deg) scaleX(1);
            opacity: 0.1;
          }
        }
        
        @keyframes focus-pulse {
          0%, 100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.3);
          }
        }
      `}</style>

      {/* Efecto Aura al cambiar tema */}
      {showAuraEffect && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent animate-aura-sweep"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/15 to-transparent animate-aura-sweep-delayed"></div>
        </div>
      )}

      {/* Header Minimalista y Transparente */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 50 ? (isDarkMode ? 'bg-black/90 backdrop-blur-xl border-b border-gray-800/50' : 'bg-white/80 backdrop-blur-xl border-b border-slate-200/30') : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex justify-between items-center">
          {/* Logo oficial */}
          <div className="flex items-center">
            <img 
              src="resources/logos/AuragarciaLogoVector-2.png" 
              alt="AuraGarcia" 
              className={`h-16 md:h-20 w-auto ${isDarkMode ? 'brightness-0 invert' : ''}`}
            />
          </div>
          
          {/* Navegación desktop - Solo enlaces principales */}
          <nav className="hidden md:flex space-x-8">
            <a href="#inicio" className={`text-xs uppercase tracking-[0.3em] transition-all duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Inicio</a>
            <a href="#servicios" className={`text-xs uppercase tracking-[0.3em] transition-all duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Servicios</a>
            <a href="#metodologia" className={`text-xs uppercase tracking-[0.3em] transition-all duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Metodología</a>
          </nav>
          
          {/* Controles */}
          <div className="flex items-center space-x-4">
            {/* Botón tema */}
            <button 
              onClick={handleThemeToggle}
              className={`w-8 h-8 rounded-full transition-all duration-500 flex items-center justify-center ${isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-900/10 hover:bg-gray-900/20 text-gray-900'}`}
            >
              <div className={`w-4 h-4 rounded-full transition-all duration-500 ${isDarkMode ? 'bg-white' : 'bg-gray-900'}`}></div>
            </button>
            
            {/* Menú hamburguesa desktop */}
            <button 
              onClick={() => setIsDesktopMenuOpen(!isDesktopMenuOpen)}
              className="hidden md:block w-8 h-8 flex flex-col justify-center items-center space-y-1"
            >
              <div className={`w-5 h-0.5 transition-all duration-300 ${isDarkMode ? 'bg-white' : 'bg-gray-900'} ${isDesktopMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-5 h-0.5 transition-all duration-300 ${isDarkMode ? 'bg-white' : 'bg-gray-900'} ${isDesktopMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-5 h-0.5 transition-all duration-300 ${isDarkMode ? 'bg-white' : 'bg-gray-900'} ${isDesktopMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </button>
            
            {/* Menú hamburguesa móvil */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1"
            >
              <div className={`w-5 h-0.5 transition-all duration-300 ${isDarkMode ? 'bg-white' : 'bg-gray-900'} ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-5 h-0.5 transition-all duration-300 ${isDarkMode ? 'bg-white' : 'bg-gray-900'} ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-5 h-0.5 transition-all duration-300 ${isDarkMode ? 'bg-white' : 'bg-gray-900'} ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </button>
          </div>
        </div>
        
        {/* Menú móvil con efecto transparente */}
        {isMobileMenuOpen && (
          <div className={`md:hidden absolute top-full left-0 right-0 transition-all duration-500 ease-out ${isDarkMode ? 'bg-black/80 backdrop-blur-2xl border-b border-gray-800/30' : 'bg-white/80 backdrop-blur-2xl border-b border-slate-200/20'}`}>
            <nav className="px-6 py-8 space-y-4">
              <a 
                href="#inicio" 
                className={`block text-sm uppercase tracking-[0.3em] transition-all duration-300 py-2 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-900/5'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inicio
              </a>
              <a 
                href="#servicios" 
                className={`block text-sm uppercase tracking-[0.3em] transition-all duration-300 py-2 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-900/5'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Servicios
              </a>
              <a 
                href="#testimonios" 
                className={`block text-sm uppercase tracking-[0.3em] transition-all duration-300 py-2 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-900/5'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Testimonios
              </a>
              <a 
                href="#metodologia" 
                className={`block text-sm uppercase tracking-[0.3em] transition-all duration-300 py-2 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-900/5'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Metodología
              </a>
              <a 
                href="#por-que-elegirnos" 
                className={`block text-sm uppercase tracking-[0.3em] transition-all duration-300 py-2 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-900/5'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Por qué Elegirnos
              </a>
              <a 
                href="#recursos" 
                className={`block text-sm uppercase tracking-[0.3em] transition-all duration-300 py-2 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-900/5'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Recursos
              </a>
              <a 
                href="#contacto" 
                className={`block text-sm uppercase tracking-[0.3em] transition-all duration-300 py-2 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-900/5'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contacto
              </a>
            </nav>
          </div>
        )}

        {/* Menú desktop con efecto transparente */}
        {isDesktopMenuOpen && (
          <div className={`hidden md:block absolute top-full left-0 right-0 transition-all duration-500 ease-out ${isDarkMode ? 'bg-black/80 backdrop-blur-2xl border-b border-gray-800/30' : 'bg-white/80 backdrop-blur-2xl border-b border-slate-200/20'}`}>
            <nav className="px-8 py-12">
              <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                  <h3 className={`text-xs uppercase tracking-[0.3em] mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Principal</h3>
                  <div className="space-y-3">
                    <a href="#inicio" className={`block text-sm transition-all duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`} onClick={() => setIsDesktopMenuOpen(false)}>Inicio</a>
                    <a href="#servicios" className={`block text-sm transition-all duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`} onClick={() => setIsDesktopMenuOpen(false)}>Servicios</a>
                    <a href="#metodologia" className={`block text-sm transition-all duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`} onClick={() => setIsDesktopMenuOpen(false)}>Metodología</a>
                  </div>
                </div>
                <div>
                  <h3 className={`text-xs uppercase tracking-[0.3em] mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Empresa</h3>
                  <div className="space-y-3">
                    <a href="#testimonios" className={`block text-sm transition-all duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`} onClick={() => setIsDesktopMenuOpen(false)}>Testimonios</a>
                    <a href="#por-que-elegirnos" className={`block text-sm transition-all duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`} onClick={() => setIsDesktopMenuOpen(false)}>Por qué Elegirnos</a>
                  </div>
                </div>
                <div>
                  <h3 className={`text-xs uppercase tracking-[0.3em] mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Recursos</h3>
                  <div className="space-y-3">
                    <a href="#recursos" className={`block text-sm transition-all duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`} onClick={() => setIsDesktopMenuOpen(false)}>Recursos</a>
                    <a href="https://calendly.com/avragarcia" target="_blank" rel="noopener noreferrer" className={`block text-sm transition-all duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Agendar Llamada</a>
                  </div>
                </div>
                <div>
                  <h3 className={`text-xs uppercase tracking-[0.3em] mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Contacto</h3>
                  <div className="space-y-3">
                    <a href="#contacto" className={`block text-sm transition-all duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`} onClick={() => setIsDesktopMenuOpen(false)}>Contacto</a>
                    <a href="mailto:hola@auragarcia.com" className={`block text-sm transition-all duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Email</a>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section - Fashion Editorial Style */}
      <section id="inicio" className="relative min-h-screen flex items-center px-4 md:px-8 pt-20 overflow-hidden">
        {/* Fondo con gradiente moderno y grano - Colores AuraGarcia */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Gradiente principal con colores oficiales AuraGarcia - Ondas fluidas */}
          <div className="absolute inset-0 animate-wave-flow" style={{
            background: isDarkMode 
              ? `linear-gradient(135deg, #000000 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)`
              : `linear-gradient(135deg, #6366F1 0%, #8B5CF6 25%, #3B82F6 50%, #E0E7FF 75%, #F8FAFC 100%)`
          }}></div>
          
          {/* Gradiente secundario con ondas inversas */}
          <div className="absolute inset-0 animate-wave-flow-reverse opacity-70" style={{
            background: isDarkMode 
              ? `linear-gradient(45deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #533483 100%)`
              : `linear-gradient(45deg, #8B5CF6 0%, #3B82F6 30%, #E0E7FF 60%, #F8FAFC 100%)`
          }}></div>
          
          {/* Efecto de grano */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }}></div>
          
          {/* Gradiente de overlay sutil - Ondas fluidas */}
          <div className="absolute inset-0 opacity-15 animate-wave-flow" style={{
            background: isDarkMode
              ? `radial-gradient(circle at 30% 20%, rgba(99,102,241,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(139,92,246,0.1) 0%, transparent 50%)`
              : `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(0,0,0,0.1) 0%, transparent 50%)`
          }}></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10 text-center px-4">
          <div className="max-w-3xl mx-auto">
            {/* Headline con énfasis según tema */}
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-light leading-[0.85] mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
              {isDarkMode ? (
                <>Salud más <span className="text-blue-300 font-medium">inteligente</span></>
              ) : (
                <>Salud más <span className="text-blue-600 font-medium">humana</span></>
              )}
            </h1>
            
            {/* Subheadline - 1 oración, < 18 palabras */}
            <p className={`text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto font-light ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>
              {isDarkMode ? (
                'Datos, interoperabilidad y KPIs que optimizan procesos hospitalarios en 4–8 semanas.'
              ) : (
                'Cuidado centrado en el paciente con adopción gradual y propósito claro.'
              )}
            </p>
            
            {/* CTA Principal - Orgánico y Transparente */}
            <div className="flex justify-center mb-16">
              <a 
                href="https://calendly.com/avragarcia" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`group relative px-8 py-4 font-light text-base transition-all duration-500 transform hover:scale-105 text-center overflow-hidden ${
                  isDarkMode 
                    ? 'text-white border border-white/20 hover:border-white/40 backdrop-blur-sm bg-white/5 hover:bg-white/10' 
                    : 'text-gray-900 border border-gray-900/20 hover:border-gray-900/40 backdrop-blur-sm bg-gray-900/5 hover:bg-gray-900/10'
                }`}
                style={{ borderRadius: '50px' }}
              >
                <span className="relative z-10">Conversemos</span>
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-blue-400/10' 
                    : 'bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10'
                }`}></div>
              </a>
            </div>

            {/* Nota de confianza */}
            <p className={`text-sm font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {isDarkMode ? 'Innovación en salud digital con metodología probada' : 'Consultora especializada en transformación hospitalaria'}
            </p>
          </div>
        </div>

        {/* Indicador de scroll sutil y elegante */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center space-y-3">
            {/* Texto indicador */}
            <p className={`text-xs font-light uppercase tracking-[0.3em] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Descubre más
            </p>
            
            {/* Línea vertical animada */}
            <div className="relative w-px h-16 overflow-hidden">
              <div 
                className={`absolute top-0 left-0 w-full transition-all duration-1000 ease-out ${
                  isDarkMode ? 'bg-gradient-to-b from-blue-400/60 to-transparent' : 'bg-gradient-to-b from-blue-600/60 to-transparent'
                }`}
                style={{
                  height: `${Math.min(scrollProgress * 2, 100)}%`,
                  filter: 'blur(0.5px)',
                  boxShadow: isDarkMode ? '0 0 8px rgba(99, 102, 241, 0.3)' : '0 0 8px rgba(59, 130, 246, 0.3)'
                }}
              ></div>
            </div>
            
            {/* Punto animado */}
            <div 
              className={`w-1 h-1 rounded-full transition-all duration-500 ${
                isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
              }`}
              style={{
                opacity: scrollProgress > 5 ? 0.3 : 1,
                transform: `scale(${scrollProgress > 5 ? 0.8 : 1})`
              }}
            ></div>
          </div>
        </div>

      </section>

      {/* Sección de Servicios - Diseño Minimalista */}
      <section id="servicios" className={`py-24 md:py-32 px-4 md:px-8 grainy-subtle section-organic-transition section-fade-in ${isDarkMode ? 'bg-gradient-to-b from-black via-gray-900/50 to-black' : ''}`} style={{ backgroundColor: isDarkMode ? '' : '#ffffff' }}>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className={`text-xs uppercase tracking-[0.3em] mb-8 ${isDarkMode ? 'text-gray-300' : 'text-blue-700'}`}>
              SERVICIOS
            </p>
            <h2 className={`text-4xl md:text-6xl font-light leading-tight mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Que mueven<br />
              <span className={`${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                la aguja
              </span>
            </h2>
            <p className={`text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Paquetes claros, entregables medibles, impacto en semanas
            </p>
            <div className={`w-24 h-0.5 mx-auto ${isDarkMode ? 'bg-blue-400' : 'bg-blue-700'}`}></div>
          </div>

          <div className="relative">
            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto md:overflow-visible no-scrollbar scroll-smooth" 
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitScrollbar: { display: 'none' },
                scrollSnapType: 'x mandatory'
              }}
            >
              <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 min-w-max md:min-w-0 px-4 md:px-0">
                {services.map((service, index) => (
                  <div 
                    key={index} 
                    className={`group relative p-6 md:p-8 min-w-[300px] md:min-w-0 transition-all duration-500 hover:scale-105 ${
                      isDarkMode 
                        ? 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/30 hover:border-blue-400/30' 
                        : 'bg-white/80 hover:bg-white/90 border border-gray-200/50 hover:border-blue-500/30'
                    }`}
                    style={{ scrollSnapAlign: 'start' }}
                  >
                    <div className={`text-5xl md:text-6xl font-light mb-4 md:mb-6 transition-colors duration-300 ${
                      isDarkMode ? 'text-blue-400/20 group-hover:text-blue-400/40' : 'text-blue-700/20 group-hover:text-blue-700/40'
                    }`}>
                      {service.number}
                    </div>
                    
                    <h3 className={`text-base md:text-lg font-light mb-3 md:mb-4 leading-tight ${
                      isDarkMode ? 'text-white group-hover:text-blue-300' : 'text-gray-900 group-hover:text-blue-700'
                    }`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
                      {service.title}
                    </h3>
                    
                    <p className={`text-xs md:text-sm leading-relaxed font-light mb-3 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <span className="md:hidden">{service.shortDescription}</span>
                      <span className="hidden md:inline">{service.description}</span>
                    </p>
                    
                    <div className={`text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-700'
                    }`}>
                      {service.timeframe}
                    </div>
                    
                    <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r transition-all duration-500 transform origin-left scale-x-0 group-hover:scale-x-100 ${
                      isDarkMode ? 'from-blue-400 to-transparent' : 'from-blue-700 to-transparent'
                    }`}></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Indicadores de progreso para móvil */}
            <div className="flex justify-center mt-8 space-x-2 md:hidden">
              {services.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === activeService 
                      ? `w-8 ${isDarkMode ? 'bg-blue-400' : 'bg-blue-700'}` 
                      : `w-2 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`
                  }`}
                ></div>
              ))}
            </div>
            
            {/* CTA de servicios */}
            <div className="flex justify-center mt-16">
              <a 
                href="https://calendly.com/avragarcia" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`group relative px-8 py-3 font-light text-sm transition-all duration-500 transform hover:scale-105 text-center overflow-hidden ${
                  isDarkMode 
                    ? 'text-white border border-white/20 hover:border-white/40 backdrop-blur-sm bg-white/5 hover:bg-white/10' 
                    : 'text-gray-900 border border-gray-900/20 hover:border-gray-900/40 backdrop-blur-sm bg-gray-900/5 hover:bg-gray-900/10'
                }`}
                style={{ borderRadius: '50px' }}
              >
                <span className="relative z-10">Solicitar propuesta personalizada</span>
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-blue-400/10' 
                    : 'bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10'
                }`}></div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Testimonios y Casos de Éxito */}
      <section id="testimonios" className={`py-24 md:py-32 px-4 md:px-8 relative overflow-hidden grainy-texture overlay-gradient-2 section-organic-transition section-fade-in ${isDarkMode ? 'bg-gradient-to-b from-black via-gray-900/50 to-black' : ''}`} style={{ backgroundColor: isDarkMode ? '' : '#ffffff' }}>
        
        {/* Efecto aura para testimonios */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Aura principal que se mueve por toda la pantalla */}
          <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full opacity-8" style={{
            background: `radial-gradient(circle, ${isDarkMode ? '#8B5CF6' : '#6366F1'} 0%, transparent 60%)`,
            animation: 'aura-drift 16s ease-in-out infinite',
            filter: 'blur(3px)'
          }}></div>
          
          {/* Aura secundario que flota y rota */}
          <div className="absolute bottom-1/4 left-1/3 w-56 h-56 rounded-full opacity-6" style={{
            background: `radial-gradient(circle, ${isDarkMode ? '#6366F1' : '#8B5CF6'} 0%, transparent 70%)`,
            animation: 'aura-float 14s ease-in-out infinite',
            filter: 'blur(2px)'
          }}></div>
          
          {/* Aura terciario que hace espiral */}
          <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full opacity-10" style={{
            background: `radial-gradient(circle, ${isDarkMode ? '#3B82F6' : '#8B5CF6'} 0%, transparent 80%)`,
            animation: 'aura-spiral 22s linear infinite',
            filter: 'blur(1px)'
          }}></div>
          
          {/* Aura cuarto que respira */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-5" style={{
            background: `radial-gradient(circle, ${isDarkMode ? '#8B5CF6' : '#6366F1'} 0%, transparent 75%)`,
            animation: 'aura-breathe 10s ease-in-out infinite',
            filter: 'blur(2px)'
          }}></div>
        </div>
        
        
        <div className="max-w-6xl mx-auto relative z-10 section-content">
          
          {/* Header */}
          <div className="text-center mb-20">
            <p className={`text-xs uppercase tracking-[0.3em] mb-8 ${isDarkMode ? 'text-gray-300' : 'text-blue-700'}`}>
              TESTIMONIOS
            </p>
            <h2 className={`text-4xl md:text-6xl font-light leading-tight mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Resultados que<br />
              <span className={`${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                hablan
              </span>
            </h2>
            <p className={`text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Hospitales que transformaron su operación con nuestra metodología
            </p>
            <div className={`w-24 h-0.5 mx-auto ${isDarkMode ? 'bg-blue-400' : 'bg-blue-700'}`}></div>
          </div>

          {/* Grid de testimonios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            
            {/* Testimonio 1 */}
            <div className={`group p-8 transition-all duration-500 hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800/30 hover:border-blue-400/30' 
                : 'bg-gray-50/80 hover:bg-white/90 border border-gray-200/50 hover:border-blue-500/30'
            }`}>
              <div className="mb-6">
                <div className={`text-4xl font-light mb-4 ${isDarkMode ? 'text-blue-400/20' : 'text-blue-700/20'}`}>
                  "40%"
                </div>
                <p className={`text-sm font-light leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  "Reducción en tiempo de diagnóstico con SALV.IA. Nuestros cardiólogos pueden identificar arritmias complejas en segundos."
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  isDarkMode ? 'bg-blue-400/20 text-blue-300' : 'bg-blue-700/20 text-blue-700'
                }`}>
                  DR
                </div>
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Dr. María González</p>
                  <p className={`text-xs font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Jefa de Cardiología, Hospital Madrid</p>
                </div>
              </div>
            </div>

            {/* Testimonio 2 */}
            <div className={`group p-8 transition-all duration-500 hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800/30 hover:border-blue-400/30' 
                : 'bg-gray-50/80 hover:bg-white/90 border border-gray-200/50 hover:border-blue-500/30'
            }`}>
              <div className="mb-6">
                <div className={`text-4xl font-light mb-4 ${isDarkMode ? 'text-blue-400/20' : 'text-blue-700/20'}`}>
                  "6 semanas"
                </div>
                <p className={`text-sm font-light leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  "De la idea a implementación. AuraGarcia nos ayudó a conectar todos nuestros sistemas en tiempo récord."
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  isDarkMode ? 'bg-blue-400/20 text-blue-300' : 'bg-blue-700/20 text-blue-700'
                }`}>
                  IT
                </div>
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Carlos Ruiz</p>
                  <p className={`text-xs font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>CTO, Clínica Barcelona</p>
                </div>
              </div>
            </div>

            {/* Testimonio 3 */}
            <div className={`group p-8 transition-all duration-500 hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800/30 hover:border-blue-400/30' 
                : 'bg-gray-50/80 hover:bg-white/90 border border-gray-200/50 hover:border-blue-500/30'
            }`}>
              <div className="mb-6">
                <div className={`text-4xl font-light mb-4 ${isDarkMode ? 'text-blue-400/20' : 'text-blue-700/20'}`}>
                  "85%"
                </div>
                <p className={`text-sm font-light leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  "Mejora en precisión de detección de cáncer de mama. MamRisk ha revolucionado nuestro screening."
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  isDarkMode ? 'bg-blue-400/20 text-blue-300' : 'bg-blue-700/20 text-blue-700'
                }`}>
                  DR
                </div>
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Dra. Ana Martín</p>
                  <p className={`text-xs font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Radióloga, Hospital Valencia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Métricas destacadas */}
          <div className={`p-8 md:p-12 text-center ${
            isDarkMode 
              ? 'bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-gray-800/30' 
              : 'bg-gradient-to-r from-gray-50/80 to-white/80 border border-gray-200/50'
          }`}>
            <h3 className={`text-2xl md:text-3xl font-light mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Impacto Medible
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className={`text-3xl md:text-4xl font-light mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>50+</div>
                <p className={`text-sm font-light ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Hospitales Transformados</p>
              </div>
              <div>
                <div className={`text-3xl md:text-4xl font-light mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>3M+</div>
                <p className={`text-sm font-light ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Pacientes Impactados</p>
              </div>
              <div>
                <div className={`text-3xl md:text-4xl font-light mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>6</div>
                <p className={`text-sm font-light ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Años de Experiencia</p>
              </div>
              <div>
                <div className={`text-3xl md:text-4xl font-light mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>98%</div>
                <p className={`text-sm font-light ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Satisfacción Cliente</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Metodología - Scrollytelling */}
      <section ref={methodologyRef} id="metodologia" className={`py-32 md:py-40 px-4 md:px-8 relative overflow-hidden grainy-dark overlay-gradient-1 section-transition section-fade-in-delayed ${isDarkMode ? 'bg-gradient-to-b from-black via-gray-900/50 to-black' : 'bg-gradient-to-b from-white via-gray-50/50 to-white'}`}>
        
        {/* Aura dinámico contextual para metodología */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Aura principal que se mueve por toda la pantalla */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10" style={{
            background: `radial-gradient(circle, ${isDarkMode ? '#6366F1' : '#3B82F6'} 0%, transparent 60%)`,
            animation: 'aura-drift 20s ease-in-out infinite',
            filter: 'blur(4px)'
          }}></div>
          
          {/* Aura secundario que flota y rota */}
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-8" style={{
            background: `radial-gradient(circle, ${isDarkMode ? '#8B5CF6' : '#6366F1'} 0%, transparent 70%)`,
            animation: 'aura-float 18s ease-in-out infinite',
            filter: 'blur(3px)'
          }}></div>
          
          {/* Aura terciario que hace espiral */}
          <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-12" style={{
            background: `radial-gradient(circle, ${isDarkMode ? '#3B82F6' : '#8B5CF6'} 0%, transparent 80%)`,
            animation: 'aura-spiral 25s linear infinite',
            filter: 'blur(2px)'
          }}></div>
          
          {/* Aura cuarto que respira */}
          <div className="absolute top-3/4 left-1/2 w-72 h-72 rounded-full opacity-6" style={{
            background: `radial-gradient(circle, ${isDarkMode ? '#8B5CF6' : '#6366F1'} 0%, transparent 75%)`,
            animation: 'aura-breathe 12s ease-in-out infinite',
            filter: 'blur(3px)'
          }}></div>
        </div>
        <div className="max-w-4xl mx-auto section-content">
          {/* Header */}
          <div className="text-center mb-24">
            <p className={`text-xs uppercase tracking-[0.3em] mb-8 ${isDarkMode ? 'text-gray-300' : 'text-blue-700'}`}>
              METODOLOGÍA
            </p>
            <h2 className={`text-4xl md:text-6xl font-light leading-tight mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Metodología<br />
              <span className={`${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                AURA
              </span>
            </h2>
            <p className={`text-lg md:text-xl font-light mb-8 max-w-3xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              De la idea a valor clínico medible, sin ruido
            </p>
            <div className={`w-32 h-0.5 mx-auto ${isDarkMode ? 'bg-blue-400' : 'bg-blue-700'}`}></div>
          </div>

          {/* Timeline Vertical con Scrollytelling */}
          <div className="relative max-w-3xl mx-auto">
            {/* Línea de progreso base - más sutil */}
            <div className={`absolute left-8 md:left-16 top-0 bottom-0 w-px ${
              isDarkMode ? 'bg-gradient-to-b from-transparent via-white/10 to-transparent' : 'bg-gradient-to-b from-transparent via-gray-300/30 to-transparent'
            }`}></div>
            
            {/* Línea de progreso activa - progresiva con scrollytelling fluido */}
            <div 
              className={`absolute left-8 md:left-16 top-0 w-px transition-all duration-300 ease-out ${
                isDarkMode ? 'bg-gradient-to-b from-blue-400/60 via-purple-400/40 to-blue-400/60' : 'bg-gradient-to-b from-blue-600/60 via-purple-600/40 to-blue-600/60'
              }`}
              style={{ 
                height: `${methodologyLineProgress * 100}%`,
                filter: 'blur(0.5px)',
                boxShadow: isDarkMode ? '0 0 10px rgba(99, 102, 241, 0.3)' : '0 0 10px rgba(59, 130, 246, 0.3)',
                transformOrigin: 'top',
                opacity: methodologyLineProgress > 0 ? 1 : 0
              }}
            ></div>

            {/* Pasos AURA */}
            {methodologySteps.map((step, index) => (
              <div 
                key={index}
                className={`relative flex items-start mb-20 md:mb-24 transition-all duration-1500 ease-out ${
                  index <= activeMethodologyStep 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-20 translate-y-4 scale-95'
                }`}
              >
                {/* Círculo con letra - Glassmorphism */}
                <div className={`relative z-10 flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl font-light transition-all duration-1500 ease-out backdrop-blur-md ${
                  index <= activeMethodologyStep
                    ? `${isDarkMode 
                        ? 'bg-white/10 border border-white/20 text-white shadow-2xl shadow-blue-400/20' 
                        : 'bg-white/80 border border-gray-200/50 text-gray-900 shadow-2xl shadow-blue-600/20'
                      }`
                    : `${isDarkMode 
                        ? 'bg-white/5 border border-white/10 text-gray-500' 
                        : 'bg-gray-100/50 border border-gray-200/30 text-gray-400'
                      }`
                }`} 
                style={{ 
                  fontFamily: 'Nortica, Girot, sans-serif',
                  ...(index <= activeMethodologyStep && {
                    background: isDarkMode 
                      ? `linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))` 
                      : `linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))`
                  })
                }}>
                  {step.letter}
                  
                  {/* Glow effect */}
                  {index <= activeMethodologyStep && (
                    <div className={`absolute inset-0 rounded-full ${
                      isDarkMode ? 'bg-blue-400/20' : 'bg-blue-600/20'
                    } blur-lg -z-10 animate-pulse`}></div>
                  )}
                </div>

                {/* Contenido */}
                <div className="ml-8 md:ml-12 flex-1 max-w-xl">
                  <h3 className={`text-2xl md:text-3xl font-light mb-3 transition-all duration-1500 ease-out ${
                    index <= activeMethodologyStep
                      ? `${isDarkMode ? 'text-white' : 'text-gray-900'}`
                      : `${isDarkMode ? 'text-gray-600' : 'text-gray-500'}`
                  }`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
                    {step.title}
                  </h3>
                  
                  <p className={`text-lg md:text-xl font-light mb-6 transition-all duration-1500 ease-out ${
                    index <= activeMethodologyStep
                      ? `${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`
                      : `${isDarkMode ? 'text-gray-700' : 'text-gray-500'}`
                  }`}>
                    {step.subtitle}
                  </p>
                  
                  <p className={`text-base md:text-lg font-light mb-6 transition-all duration-1500 ease-out ${
                    index <= activeMethodologyStep
                      ? `${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`
                      : `${isDarkMode ? 'text-gray-800' : 'text-gray-400'}`
                  }`}>
                    {step.description}
                  </p>
                  
                  <div className={`inline-flex items-center px-6 py-3 rounded-full text-sm font-light transition-all duration-1500 ease-out backdrop-blur-sm ${
                    index <= activeMethodologyStep
                      ? `${isDarkMode 
                          ? 'bg-white/5 border border-white/10 text-gray-300' 
                          : 'bg-white/60 border border-gray-200/30 text-gray-700'
                        }`
                      : `${isDarkMode 
                          ? 'bg-white/5 border border-white/5 text-gray-700' 
                          : 'bg-gray-100/30 border border-gray-200/20 text-gray-500'
                        }`
                  }`}>
                    <span className={`inline-block w-2 h-2 rounded-full mr-3 transition-all duration-1500 ${
                      index <= activeMethodologyStep
                        ? `${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'}`
                        : `${isDarkMode ? 'bg-gray-600' : 'bg-gray-400'}`
                    }`}></span>
                    {step.result}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Principios */}
          <div className="mt-32 text-center">
            <h3 className={`text-2xl md:text-3xl font-light mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Nuestros Principios
            </h3>
            <p className={`text-lg font-light ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Soluciones útiles · Datos conectados · Seguridad integrada · Resultados medibles · Enfoque clínico
            </p>
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-16">
            <a 
              href="https://calendly.com/avragarcia" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`group relative px-8 py-4 font-light text-base transition-all duration-500 transform hover:scale-105 text-center overflow-hidden ${
                isDarkMode 
                  ? 'text-white border border-white/20 hover:border-white/40 backdrop-blur-sm bg-white/5 hover:bg-white/10' 
                  : 'text-gray-900 border border-gray-900/20 hover:border-gray-900/40 backdrop-blur-sm bg-gray-900/5 hover:bg-gray-900/10'
              }`}
              style={{ borderRadius: '50px' }}
            >
              <span className="relative z-10">Ver cómo trabajamos en 6 semanas</span>
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-blue-400/10' 
                  : 'bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10'
              }`}></div>
            </a>
          </div>
        </div>
      </section>

      {/* Sección "Por qué elegirnos" */}
      <section id="por-que-elegirnos" className={`py-24 md:py-32 px-4 md:px-8 relative overflow-hidden grainy-subtle section-organic-transition section-fade-in-delayed`} style={{ backgroundColor: isDarkMode ? '#1a1a3a' : '#ffffff' }}>
        
        <div className="max-w-6xl mx-auto section-content">
          
          {/* Header */}
          <div className="text-center mb-20">
            <p className={`text-xs uppercase tracking-[0.3em] mb-8 ${isDarkMode ? 'text-gray-300' : 'text-blue-700'}`}>
              POR QUÉ ELEGIRNOS
            </p>
            <h2 className={`text-4xl md:text-6xl font-light leading-tight mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Diferenciación<br />
              <span className={`${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                que importa
              </span>
            </h2>
            <p className={`text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Lo que nos hace únicos en el ecosistema de salud digital
            </p>
            <div className={`w-24 h-0.5 mx-auto ${isDarkMode ? 'bg-blue-400' : 'bg-blue-700'}`}></div>
          </div>

          {/* Grid de diferenciadores */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            
            {/* Diferenciador 1 */}
            <div className={`group p-8 transition-all duration-500 hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/30 hover:border-blue-400/30' 
                : 'bg-white/80 hover:bg-white/90 border border-gray-200/50 hover:border-blue-500/30'
            }`}>
              <div className="mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${
                  isDarkMode ? 'bg-blue-400/20' : 'bg-blue-700/20'
                }`}>
                  <div className={`w-6 h-6 rounded-full ${isDarkMode ? 'bg-blue-400' : 'bg-blue-700'}`}></div>
                </div>
                <h3 className={`text-xl font-light mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
                  Experiencia Clínica Real
                </h3>
                <p className={`text-sm font-light leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Nuestro equipo combina expertise técnico con experiencia clínica directa. Entendemos los desafíos reales de los hospitales.
                </p>
              </div>
            </div>

            {/* Diferenciador 2 */}
            <div className={`group p-8 transition-all duration-500 hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/30 hover:border-blue-400/30' 
                : 'bg-white/80 hover:bg-white/90 border border-gray-200/50 hover:border-blue-500/30'
            }`}>
              <div className="mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${
                  isDarkMode ? 'bg-blue-400/20' : 'bg-blue-700/20'
                }`}>
                  <div className={`w-6 h-6 rounded-full ${isDarkMode ? 'bg-blue-400' : 'bg-blue-700'}`}></div>
                </div>
                <h3 className={`text-xl font-light mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
                  Productos Listos para Usar
                </h3>
                <p className={`text-sm font-light leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  SALV.IA, MamRisk y CLARA son soluciones probadas, no prototipos. Implementación inmediata con resultados medibles.
                </p>
              </div>
            </div>

            {/* Diferenciador 3 */}
            <div className={`group p-8 transition-all duration-500 hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/30 hover:border-blue-400/30' 
                : 'bg-white/80 hover:bg-white/90 border border-gray-200/50 hover:border-blue-500/30'
            }`}>
              <div className="mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${
                  isDarkMode ? 'bg-blue-400/20' : 'bg-blue-700/20'
                }`}>
                  <div className={`w-6 h-6 rounded-full ${isDarkMode ? 'bg-blue-400' : 'bg-blue-700'}`}></div>
                </div>
                <h3 className={`text-xl font-light mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
                  Metodología AURA Probada
                </h3>
                <p className={`text-sm font-light leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Proceso estructurado de 4 fases que garantiza resultados. De la idea a valor clínico medible en 6-12 semanas.
                </p>
              </div>
            </div>

            {/* Diferenciador 4 */}
            <div className={`group p-8 transition-all duration-500 hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/30 hover:border-blue-400/30' 
                : 'bg-white/80 hover:bg-white/90 border border-gray-200/50 hover:border-blue-500/30'
            }`}>
              <div className="mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${
                  isDarkMode ? 'bg-blue-400/20' : 'bg-blue-700/20'
                }`}>
                  <div className={`w-6 h-6 rounded-full ${isDarkMode ? 'bg-blue-400' : 'bg-blue-700'}`}></div>
                </div>
                <h3 className={`text-xl font-light mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
                  Compliance y Seguridad
                </h3>
                <p className={`text-sm font-light leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Cumplimiento total con RGPD, ISO 27001 y normativas sanitarias. Seguridad de datos como prioridad absoluta.
                </p>
              </div>
            </div>

            {/* Diferenciador 5 */}
            <div className={`group p-8 transition-all duration-500 hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/30 hover:border-blue-400/30' 
                : 'bg-white/80 hover:bg-white/90 border border-gray-200/50 hover:border-blue-500/30'
            }`}>
              <div className="mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${
                  isDarkMode ? 'bg-blue-400/20' : 'bg-blue-700/20'
                }`}>
                  <div className={`w-6 h-6 rounded-full ${isDarkMode ? 'bg-blue-400' : 'bg-blue-700'}`}></div>
                </div>
                <h3 className={`text-xl font-light mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
                  Soporte Continuo
                </h3>
                <p className={`text-sm font-light leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Acompañamiento post-implementación con formación, soporte técnico y optimización continua de resultados.
                </p>
              </div>
            </div>

            {/* Diferenciador 6 */}
            <div className={`group p-8 transition-all duration-500 hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/30 hover:border-blue-400/30' 
                : 'bg-white/80 hover:bg-white/90 border border-gray-200/50 hover:border-blue-500/30'
            }`}>
              <div className="mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${
                  isDarkMode ? 'bg-blue-400/20' : 'bg-blue-700/20'
                }`}>
                  <div className={`w-6 h-6 rounded-full ${isDarkMode ? 'bg-blue-400' : 'bg-blue-700'}`}></div>
                </div>
                <h3 className={`text-xl font-light mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
                  ROI Medible
                </h3>
                <p className={`text-sm font-light leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Retorno de inversión claro y medible. Reducción de costos operativos y mejora en calidad de atención documentada.
                </p>
              </div>
            </div>
          </div>

          {/* Equipo consolidado */}
          <div className="mt-20 mb-16">
            <h3 className={`text-2xl md:text-3xl font-light mb-12 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Nuestro Equipo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              
              {/* Miembro 1 */}
              <div className="group text-center">
                <div className="relative mb-6">
                  <div className={`w-32 h-32 mx-auto rounded-full overflow-hidden transition-all duration-500 group-hover:scale-110 ${
                    isDarkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'
                  }`}>
                    <img 
                      src="resources/manual_identidad/manual_identidad1.png" 
                      alt="Aura García" 
                      className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className={`w-full h-full flex items-center justify-center text-3xl font-light ${
                      isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-500'
                    }`} style={{ display: 'none' }}>
                      AG
                    </div>
                  </div>
                  
                  {/* Overlay de LinkedIn que aparece al hover */}
                  <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <a 
                      href="https://linkedin.com/in/auragarcia" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white text-sm font-light px-4 py-2 rounded-full border border-white/30 hover:border-white/60 transition-all duration-300"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
                
                <h4 className={`text-xl font-light mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
                  Aura García
                </h4>
                <p className={`text-sm font-light mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Fundadora & CEO
                </p>
                <p className={`text-xs font-light leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Experta en transformación digital sanitaria con más de 10 años liderando proyectos de IA médica.
                </p>
              </div>

              {/* Miembro 2 */}
              <div className="group text-center">
                <div className="relative mb-6">
                  <div className={`w-32 h-32 mx-auto rounded-full overflow-hidden transition-all duration-500 group-hover:scale-110 ${
                    isDarkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'
                  }`}>
                    <img 
                      src="resources/manual_identidad/manual_identidad2.png" 
                      alt="Dr. Carlos Ruiz" 
                      className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className={`w-full h-full flex items-center justify-center text-3xl font-light ${
                      isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-500'
                    }`} style={{ display: 'none' }}>
                      CR
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <a 
                      href="https://linkedin.com/in/carlosruiz" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white text-sm font-light px-4 py-2 rounded-full border border-white/30 hover:border-white/60 transition-all duration-300"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
                
                <h4 className={`text-xl font-light mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
                  Dr. Carlos Ruiz
                </h4>
                <p className={`text-sm font-light mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  CTO & Co-Fundador
                </p>
                <p className={`text-xs font-light leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Especialista en arquitectura de sistemas médicos y desarrollo de algoritmos de IA para diagnóstico.
                </p>
              </div>

              {/* Miembro 3 */}
              <div className="group text-center">
                <div className="relative mb-6">
                  <div className={`w-32 h-32 mx-auto rounded-full overflow-hidden transition-all duration-500 group-hover:scale-110 ${
                    isDarkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'
                  }`}>
                    <img 
                      src="resources/manual_identidad/manual_identidad3.png" 
                      alt="Dra. María González" 
                      className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className={`w-full h-full flex items-center justify-center text-3xl font-light ${
                      isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-500'
                    }`} style={{ display: 'none' }}>
                      MG
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <a 
                      href="https://linkedin.com/in/mariagonzalez" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white text-sm font-light px-4 py-2 rounded-full border border-white/30 hover:border-white/60 transition-all duration-300"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
                
                <h4 className={`text-xl font-light mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
                  Dra. María González
                </h4>
                <p className={`text-sm font-light mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Directora Médica
                </p>
                <p className={`text-xs font-light leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Cardióloga especializada en telemedicina y validación clínica de herramientas de IA médica.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center">
            <a 
              href="https://calendly.com/avragarcia" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`group relative px-8 py-4 font-light text-base transition-all duration-500 transform hover:scale-105 text-center overflow-hidden ${
                isDarkMode 
                  ? 'text-white border border-white/20 hover:border-white/40 backdrop-blur-sm bg-white/5 hover:bg-white/10' 
                  : 'text-gray-900 border border-gray-900/20 hover:border-gray-900/40 backdrop-blur-sm bg-gray-900/5 hover:bg-gray-900/10'
              }`}
              style={{ borderRadius: '50px' }}
            >
              <span className="relative z-10">Descubre cómo podemos ayudarte</span>
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-blue-400/10' 
                  : 'bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10'
              }`}></div>
            </a>
          </div>
        </div>
      </section>


      {/* Sección de Recursos/Content Marketing */}
      <section id="recursos" className={`py-24 md:py-32 px-4 md:px-8 relative overflow-hidden grainy-texture overlay-gradient-1 section-organic-transition section-fade-in`} style={{ backgroundColor: isDarkMode ? '#0f0f23' : '#ffffff' }}>
        
        <div className="max-w-6xl mx-auto section-content">
          
          {/* Header */}
          <div className="text-center mb-20">
            <p className={`text-xs uppercase tracking-[0.3em] mb-8 ${isDarkMode ? 'text-gray-300' : 'text-blue-700'}`}>
              RECURSOS
            </p>
            <h2 className={`text-4xl md:text-6xl font-light leading-tight mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Conocimiento<br />
              <span className={`${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                accionable
              </span>
            </h2>
            <p className={`text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Insights, casos de estudio y herramientas para transformar tu hospital
            </p>
            <div className={`w-24 h-0.5 mx-auto ${isDarkMode ? 'bg-blue-400' : 'bg-blue-700'}`}></div>
          </div>

          {/* Grid de recursos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Recurso 1 */}
            <div className={`group p-8 transition-all duration-500 hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800/30 hover:border-blue-400/30' 
                : 'bg-gray-50/80 hover:bg-white/90 border border-gray-200/50 hover:border-blue-500/30'
            }`}>
              <div className="mb-6">
                <div className={`text-xs uppercase tracking-[0.2em] mb-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                  WHITEPAPER
                </div>
                <h3 className={`text-lg font-light mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
                  Guía Completa de Transformación Digital Hospitalaria
                </h3>
                <p className={`text-sm font-light leading-relaxed mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Roadmap paso a paso para implementar IA médica en tu hospital. Incluye checklist, timeline y métricas de éxito.
                </p>
                <a href="#" className={`text-sm font-light transition-colors duration-300 ${
                  isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-700 hover:text-blue-600'
                }`}>
                  Descargar PDF →
                </a>
              </div>
            </div>

            {/* Recurso 2 */}
            <div className={`group p-8 transition-all duration-500 hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800/30 hover:border-blue-400/30' 
                : 'bg-gray-50/80 hover:bg-white/90 border border-gray-200/50 hover:border-blue-500/30'
            }`}>
              <div className="mb-6">
                <div className={`text-xs uppercase tracking-[0.2em] mb-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                  CASO DE ESTUDIO
                </div>
                <h3 className={`text-lg font-light mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
                  Hospital Madrid: 40% Reducción en Tiempo de Diagnóstico
                </h3>
                <p className={`text-sm font-light leading-relaxed mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Cómo implementamos SALV.IA en 6 semanas y logramos resultados medibles desde el primer día.
                </p>
                <a href="#" className={`text-sm font-light transition-colors duration-300 ${
                  isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-700 hover:text-blue-600'
                }`}>
                  Leer caso completo →
                </a>
              </div>
            </div>

            {/* Recurso 3 */}
            <div className={`group p-8 transition-all duration-500 hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800/30 hover:border-blue-400/30' 
                : 'bg-gray-50/80 hover:bg-white/90 border border-gray-200/50 hover:border-blue-500/30'
            }`}>
              <div className="mb-6">
                <div className={`text-xs uppercase tracking-[0.2em] mb-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                  WEBINAR
                </div>
                <h3 className={`text-lg font-light mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Nortica, Girot, sans-serif' }}>
                  IA en Cardiología: Casos de Uso Reales
                </h3>
                <p className={`text-sm font-light leading-relaxed mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Sesión en vivo con cardiólogos que implementaron SALV.IA. Preguntas y respuestas en directo.
                </p>
                <a href="#" className={`text-sm font-light transition-colors duration-300 ${
                  isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-700 hover:text-blue-600'
                }`}>
                  Registrarse →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Contacto con Formulario */}
      <section id="contacto" className={`py-24 md:py-32 px-4 md:px-8 relative overflow-hidden grainy-subtle overlay-gradient-2 section-organic-transition section-fade-in-delayed`} style={{ backgroundColor: isDarkMode ? '#1a1a2e' : '#ffffff' }}>
        
        <div className="max-w-4xl mx-auto section-content">
          
          {/* Header */}
          <div className="text-center mb-20">
            <p className={`text-xs uppercase tracking-[0.3em] mb-8 ${isDarkMode ? 'text-gray-300' : 'text-blue-700'}`}>
              CONTACTO
            </p>
            <h2 className={`text-4xl md:text-6xl font-light leading-tight mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Conversemos<br />
              <span className={`${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                sobre tu proyecto
              </span>
            </h2>
            <p className={`text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Cuéntanos sobre tu hospital y cómo podemos ayudarte a transformar la atención sanitaria
            </p>
            <div className={`w-24 h-0.5 mx-auto ${isDarkMode ? 'bg-blue-400' : 'bg-blue-700'}`}></div>
          </div>

          {/* Formulario de contacto */}
          <div className={`p-8 md:p-12 ${
            isDarkMode 
              ? 'bg-gray-800/50 border border-gray-700/30' 
              : 'bg-white/80 border border-gray-200/50'
          }`}>
            <form className="space-y-8">
              
              {/* Información del hospital */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-light mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Nombre del Hospital/Clínica *
                  </label>
                  <input 
                    type="text" 
                    required
                    className={`w-full px-4 py-3 text-sm font-light transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-900/50 border border-gray-700/50 text-white placeholder-gray-400 focus:border-blue-400/50 focus:bg-gray-900/70' 
                        : 'bg-white/80 border border-gray-300/50 text-gray-900 placeholder-gray-500 focus:border-blue-500/50 focus:bg-white'
                    }`}
                    placeholder="Hospital Madrid, Clínica Barcelona..."
                  />
                </div>
                <div>
                  <label className={`block text-sm font-light mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Tu Nombre *
                  </label>
                  <input 
                    type="text" 
                    required
                    className={`w-full px-4 py-3 text-sm font-light transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-900/50 border border-gray-700/50 text-white placeholder-gray-400 focus:border-blue-400/50 focus:bg-gray-900/70' 
                        : 'bg-white/80 border border-gray-300/50 text-gray-900 placeholder-gray-500 focus:border-blue-500/50 focus:bg-white'
                    }`}
                    placeholder="Dr. María González"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-light mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email *
                  </label>
                  <input 
                    type="email" 
                    required
                    className={`w-full px-4 py-3 text-sm font-light transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-900/50 border border-gray-700/50 text-white placeholder-gray-400 focus:border-blue-400/50 focus:bg-gray-900/70' 
                        : 'bg-white/80 border border-gray-300/50 text-gray-900 placeholder-gray-500 focus:border-blue-500/50 focus:bg-white'
                    }`}
                    placeholder="maria.gonzalez@hospital.com"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-light mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Teléfono
                  </label>
                  <input 
                    type="tel" 
                    className={`w-full px-4 py-3 text-sm font-light transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-900/50 border border-gray-700/50 text-white placeholder-gray-400 focus:border-blue-400/50 focus:bg-gray-900/70' 
                        : 'bg-white/80 border border-gray-300/50 text-gray-900 placeholder-gray-500 focus:border-blue-500/50 focus:bg-white'
                    }`}
                    placeholder="+34 600 123 456"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-light mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Tu Rol
                  </label>
                  <select className={`w-full px-4 py-3 text-sm font-light transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-900/50 border border-gray-700/50 text-white focus:border-blue-400/50 focus:bg-gray-900/70' 
                      : 'bg-white/80 border border-gray-300/50 text-gray-900 focus:border-blue-500/50 focus:bg-white'
                  }`}>
                    <option>Selecciona tu rol</option>
                    <option>Director Médico</option>
                    <option>CTO/Director IT</option>
                    <option>Director de Enfermería</option>
                    <option>Jefe de Servicio</option>
                    <option>Administrador</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-light mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Presupuesto Aproximado
                  </label>
                  <select className={`w-full px-4 py-3 text-sm font-light transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-900/50 border border-gray-700/50 text-white focus:border-blue-400/50 focus:bg-gray-900/70' 
                      : 'bg-white/80 border border-gray-300/50 text-gray-900 focus:border-blue-500/50 focus:bg-white'
                  }`}>
                    <option>Selecciona rango</option>
                    <option>€10K - €50K</option>
                    <option>€50K - €100K</option>
                    <option>€100K - €250K</option>
                    <option>€250K+</option>
                    <option>Por definir</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-light mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  ¿En qué podemos ayudarte? *
                </label>
                <textarea 
                  required
                  rows={4}
                  className={`w-full px-4 py-3 text-sm font-light transition-all duration-300 resize-none ${
                    isDarkMode 
                      ? 'bg-gray-900/50 border border-gray-700/50 text-white placeholder-gray-400 focus:border-blue-400/50 focus:bg-gray-900/70' 
                      : 'bg-white/80 border border-gray-300/50 text-gray-900 placeholder-gray-500 focus:border-blue-500/50 focus:bg-white'
                  }`}
                  placeholder="Cuéntanos sobre tu proyecto, desafíos actuales, timeline esperado..."
                ></textarea>
              </div>

              {/* Botón de envío */}
              <div className="flex justify-center pt-4">
                <button 
                  type="submit"
                  className={`group relative px-12 py-4 font-light text-base transition-all duration-500 transform hover:scale-105 text-center overflow-hidden ${
                    isDarkMode 
                      ? 'text-white border border-white/20 hover:border-white/40 backdrop-blur-sm bg-white/5 hover:bg-white/10' 
                      : 'text-gray-900 border border-gray-900/20 hover:border-gray-900/40 backdrop-blur-sm bg-gray-900/5 hover:bg-gray-900/10'
                  }`}
                  style={{ borderRadius: '50px' }}
                >
                  <span className="relative z-10">Enviar Mensaje</span>
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-blue-400/10' 
                      : 'bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10'
                  }`}></div>
                </button>
              </div>

              {/* Nota de privacidad */}
              <p className={`text-xs font-light text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Al enviar este formulario, aceptas nuestra política de privacidad. Nos comprometemos a no compartir tu información con terceros.
              </p>
            </form>
          </div>

          {/* Información de contacto alternativa */}
          <div className="mt-16 text-center">
            <p className={`text-sm font-light mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              ¿Prefieres una llamada directa?
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8">
              <a 
                href="mailto:hola@auragarcia.com" 
                className={`text-sm font-light transition-colors duration-300 ${
                  isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-700 hover:text-blue-600'
                }`}
              >
                hola@auragarcia.com
              </a>
              <a 
                href="https://calendly.com/avragarcia" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`text-sm font-light transition-colors duration-300 ${
                  isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-700 hover:text-blue-600'
                }`}
              >
                Agendar llamada de 15 min
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section - Diseño Minimalista y Profesional */}
      <footer className={`py-16 md:py-20 px-4 md:px-8 ${isDarkMode ? 'bg-black' : 'bg-gray-900'}`}>
        <div className="max-w-6xl mx-auto">
          {/* Grid de 5 columnas - Optimizado para móvil */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-12">
            
            {/* Columna 1: EMPRESA */}
            <div className="space-y-3 md:space-y-4">
              <h3 className={`text-xs md:text-sm font-medium uppercase tracking-[0.2em] ${isDarkMode ? 'text-white' : 'text-white'}`}>
                EMPRESA
              </h3>
              <nav className="space-y-2 md:space-y-3">
                <a href="#sobre-nosotros" className={`block text-xs md:text-sm font-light transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'}`}>
                  Sobre Nosotros
                </a>
                <a href="#equipo" className={`block text-xs md:text-sm font-light transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'}`}>
                  Equipo
                </a>
                <a href="#casos-exito" className={`block text-xs md:text-sm font-light transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'}`}>
                  Casos de Éxito
                </a>
                <a href="#prensa" className={`block text-xs md:text-sm font-light transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'}`}>
                  Prensa
                </a>
              </nav>
            </div>

            {/* Columna 2: TECNOLOGÍA */}
            <div className="space-y-3 md:space-y-4">
              <h3 className={`text-xs md:text-sm font-medium uppercase tracking-[0.2em] ${isDarkMode ? 'text-white' : 'text-white'}`}>
                TECNOLOGÍA
              </h3>
              <nav className="space-y-2 md:space-y-3">
                <a href="#plataforma" className={`block text-xs md:text-sm font-light transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'}`}>
                  Plataforma
                </a>
                <a href="#proceso" className={`block text-xs md:text-sm font-light transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'}`}>
                  Proceso
                </a>
                <a href="#casos-estudio" className={`block text-xs md:text-sm font-light transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'}`}>
                  Casos de Estudio
                </a>
                <a href="#investigacion" className={`block text-xs md:text-sm font-light transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'}`}>
                  Investigación
                </a>
              </nav>
            </div>

            {/* Columna 3: RECURSOS */}
            <div className="space-y-3 md:space-y-4">
              <h3 className={`text-xs md:text-sm font-medium uppercase tracking-[0.2em] ${isDarkMode ? 'text-white' : 'text-white'}`}>
                RECURSOS
              </h3>
              <nav className="space-y-2 md:space-y-3">
                <a href="#blog" className={`block text-xs md:text-sm font-light transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'}`}>
                  Blog
                </a>
                <a href="#whitepapers" className={`block text-xs md:text-sm font-light transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'}`}>
                  Whitepapers
                </a>
                <a href="#eventos" className={`block text-xs md:text-sm font-light transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'}`}>
                  Eventos
                </a>
                <a href="#webinars" className={`block text-xs md:text-sm font-light transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'}`}>
                  Webinars
                </a>
              </nav>
            </div>

            {/* Columna 4: LEGAL */}
            <div className="space-y-3 md:space-y-4">
              <h3 className={`text-xs md:text-sm font-medium uppercase tracking-[0.2em] ${isDarkMode ? 'text-white' : 'text-white'}`}>
                LEGAL
              </h3>
              <nav className="space-y-2 md:space-y-3">
                <a href="#privacidad" className={`block text-xs md:text-sm font-light transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'}`}>
                  Política de Privacidad
                </a>
                <a href="#terminos" className={`block text-xs md:text-sm font-light transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'}`}>
                  Términos de Servicio
                </a>
                <a href="#reportes" className={`block text-xs md:text-sm font-light transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'}`}>
                  Reportes de Campo
                </a>
                <a href="#compliance" className={`block text-xs md:text-sm font-light transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'}`}>
                  Compliance
                </a>
              </nav>
            </div>

            {/* Columna 5: CONECTAR */}
            <div className="space-y-3 md:space-y-4">
              <h3 className={`text-xs md:text-sm font-medium uppercase tracking-[0.2em] ${isDarkMode ? 'text-white' : 'text-white'}`}>
                CONECTAR
              </h3>
              <nav className="space-y-2 md:space-y-3">
                <a href="https://linkedin.com/company/auragarcia" target="_blank" rel="noopener noreferrer" className={`block text-xs md:text-sm font-light transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'}`}>
                  LinkedIn
                </a>
                <a href="https://twitter.com/auragarcia" target="_blank" rel="noopener noreferrer" className={`block text-xs md:text-sm font-light transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'}`}>
                  X (Twitter)
                </a>
                <a href="#seguridad-datos" className={`block text-xs md:text-sm font-light transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'}`}>
                  Seguridad de Datos
                </a>
                <a href="mailto:hola@auragarcia.com" className={`block text-xs md:text-sm font-light transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'}`}>
                  Contacto
                </a>
              </nav>
            </div>
          </div>

          {/* Línea divisoria sutil */}
          <div className={`mt-16 pt-8 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-700'}`}>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              
              {/* Logo y copyright */}
              <div className="flex items-center space-x-4">
                <img 
                  src="resources/logos/AuragarciaLogoVector-2.png" 
                  alt="AuraGarcia" 
                  className="h-6 w-auto brightness-0 invert"
                />
                <p className={`text-sm font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                  © 2024 AuraGarcia. Todos los derechos reservados.
                </p>
              </div>

              {/* Información adicional */}
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                <p className={`text-xs font-light ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Consultoría especializada en transformación digital sanitaria
                </p>
                <div className={`text-xs font-light ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Madrid, España
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Renderizar la aplicación
ReactDOM.render(<AuraGarciaApp />, document.getElementById('root'));