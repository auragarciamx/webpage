// PaulaSection — sección bento premium para Paula, la agente de IA de AuraGarcia
// Componente reutilizable, expuesto como window.PaulaSection.
// Adaptado al stack del proyecto: React UMD + Babel standalone (sin build), lucide UMD.
(function () {
  'use strict';

  // --- Renderizador de iconos lucide (UMD exporta arrays [tag, attrs]) ---
  const _psIconCache = {};
  const PsIcon = ({ name, size = 20, color = 'currentColor', strokeWidth = 1.5, className = '' }) => {
    if (!_psIconCache[name] && typeof lucide !== 'undefined' && Array.isArray(lucide[name])) {
      try {
        _psIconCache[name] = lucide[name].map(([tag, attrs]) => {
          const attrStr = Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ');
          return `<${tag} ${attrStr}/>`;
        }).join('');
      } catch (_) { /* noop */ }
    }
    const inner = _psIconCache[name];
    if (!inner) return <span className={className} style={{ display: 'inline-block', width: size, height: size }} />;
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
        strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
        className={className} aria-hidden="true" dangerouslySetInnerHTML={{ __html: inner }} />
    );
  };

  // --- Etiqueta pequeña con sparkles a los lados ---
  const PsLabel = ({ children }) => (
    <div className="flex items-center justify-center gap-2 text-white/70">
      <PsIcon name="Sparkle" size={11} />
      <span className="uppercase tracking-[0.22em] text-[11px] font-light whitespace-nowrap">{children}</span>
      <PsIcon name="Sparkle" size={11} />
    </div>
  );

  const PsPill = ({ children }) => (
    <span className="px-3 py-1 rounded-full text-[11px] font-light text-white/70 border border-white/10 bg-white/[0.04] whitespace-nowrap">
      {children}
    </span>
  );

  // Textura de fondo opcional (si el PNG no existe, el gradiente encima lo cubre con gracia)
  const PS_TEXTURE = "resources/u9313381789_Premium_dark_glassmorphism_card_background_for_Pa_07c10262-6bc7-4d82-810f-a1d3c3a056f9_0.png";

  const PS_ROW1 = ['Mic', 'MessageCircle', 'Search', 'FileText', 'Database', 'Brain', 'Workflow', 'PlugZap'];
  const PS_ROW2 = ['Headphones', 'AudioLines', 'Bot', 'ShieldCheck', 'Sparkles', 'ClipboardList', 'Send', 'Network'];

  const PsIconTile = ({ name }) => (
    <div className="liquid-glass h-14 w-14 md:h-16 md:w-16 flex-shrink-0 rounded-xl border border-white/10 flex items-center justify-center">
      <PsIcon name={name} size={22} color="rgba(255,255,255,0.75)" />
    </div>
  );

  const PsMarqueeRow = ({ icons, direction }) => (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className={`flex w-max gap-3 ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}>
        {[...icons, ...icons].map((n, i) => <PsIconTile key={`${n}-${i}`} name={n} />)}
      </div>
    </div>
  );

  const PaulaSection = () => (
    <section
      id="paula-producto"
      className="relative w-full text-white antialiased px-4 sm:px-6 md:px-10 lg:px-14 py-6 sm:py-8 md:py-10 lg:min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: '#0a0a0a', fontFamily: "'Inter', Girot, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      {/* fugas de luz suaves de fondo */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 left-1/4 w-[480px] h-[480px] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.10) 0%, transparent 65%)', filter: 'blur(70px)' }} />
        <div className="absolute bottom-0 right-1/5 w-[420px] h-[420px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 65%)', filter: 'blur(70px)' }} />
      </div>

      {/* ── Header row ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full mb-6 md:mb-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
        <div>
          <p className="uppercase tracking-[0.3em] text-[11px] text-cyan-300/80 mb-4 font-light">Paula</p>
          <h2 className="text-[28px] sm:text-3xl md:text-4xl lg:text-[44px] leading-[1.15] font-normal tracking-tight max-w-2xl">
            Una agente inteligente para escuchar, entender y actuar.
          </h2>
          <p className="mt-4 text-sm md:text-[15px] leading-[1.6] text-white/60 max-w-3xl font-light">
            Paula conecta voz, documentos, procesos y datos internos para convertir la interacción con tu empresa en una experiencia conversacional.
          </p>
        </div>
        <a href="#contacto"
          className="liquid-glass self-start lg:self-auto inline-flex items-center gap-2 rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-light text-white border border-white/10 transition-transform duration-300 hover:scale-105 flex-shrink-0">
          Hablar con Paula
          <PsIcon name="ArrowUpRight" size={16} />
        </a>
      </div>

      {/* ── Bento grid ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">

        {/* Columna 1 — Paula Aura video */}
        <div className="relative rounded-[2rem] bg-black overflow-hidden border border-white/10 min-h-[420px] md:min-h-[520px] lg:min-h-0 flex flex-col">
          {/* aura CSS de respaldo detrás del video (visible si el stream no carga) */}
          <div className="absolute inset-0" aria-hidden="true"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(139,92,246,0.35) 0%, rgba(34,211,238,0.12) 45%, transparent 70%), #050508' }} />
          <iframe
            title="Paula Aura"
            src="https://customer-el3ebyllt1dmjarj.cloudflarestream.com/8d23265b212846b46cbcc39afccd4fbd/iframe?autoplay=true&muted=true&loop=true&controls=false"
            className="absolute inset-0 h-full w-full scale-110 pointer-events-none"
            style={{ border: 'none' }}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30 pointer-events-none" />

          <div className="relative z-10 flex flex-col justify-between h-full p-5 md:p-6 flex-1">
            <PsLabel>Paula Aura</PsLabel>
            <div className="space-y-4">
              <p className="text-sm md:text-[15px] leading-[1.6] text-white/80 font-light max-w-[260px]">
                Una presencia inteligente que responde, aprende y acompaña.
              </p>
              <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-light text-white/70 border border-white/10 bg-black/40 backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-70" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
                </span>
                live voice agent
              </span>
            </div>
          </div>
        </div>

        {/* Columna 2 — inteligencia operativa + 24/7 */}
        <div className="flex flex-col gap-4 md:gap-5">
          {/* Paula entiende tu operación */}
          <div className="noise-overlay liquid-glass relative rounded-[2rem] p-5 md:p-6 border border-white/10 overflow-hidden"
            style={{ backgroundColor: '#243a3a' }}>
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
              style={{ backgroundImage: `linear-gradient(rgba(10,10,10,0.2), rgba(10,10,10,0.2)), url('${PS_TEXTURE}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className="relative z-10">
              <div className="flex justify-start mb-5">
                <PsLabel>Inteligencia operativa</PsLabel>
              </div>
              <p className="text-[15px] md:text-base leading-[1.5] text-white/90 font-light mb-3">
                Paula entiende la operación de tu empresa: documentos, procesos, conversaciones y datos internos.
              </p>
              <p className="text-sm leading-[1.6] text-white/55 font-light mb-5">
                No es solo un chatbot. Es una capa inteligente sobre el conocimiento y los flujos de trabajo de tu organización.
              </p>
              <div className="flex flex-wrap gap-2">
                <PsPill>Contexto</PsPill>
                <PsPill>Memoria</PsPill>
                <PsPill>Acción</PsPill>
              </div>
            </div>
          </div>

          {/* 24/7 agente activo */}
          <div className="relative rounded-[2rem] overflow-hidden border border-white/10 flex-1 min-h-[300px] flex flex-col items-center justify-center p-5 md:p-6"
            style={{ backgroundColor: '#050505' }}>
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
              background: [
                'radial-gradient(ellipse 55% 45% at 25% 20%, rgba(34,211,238,0.16) 0%, transparent 60%)',
                'radial-gradient(ellipse 50% 40% at 80% 35%, rgba(254,243,199,0.10) 0%, transparent 60%)',
                'radial-gradient(ellipse 60% 45% at 60% 95%, rgba(251,146,60,0.14) 0%, transparent 60%)'
              ].join(', ')
            }} />
            <div className="relative z-10 flex flex-col items-center text-center gap-4 w-full">
              <p className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-light tracking-tight leading-none">24/7</p>
              <p className="text-xs md:text-sm leading-[1.6] text-white/55 font-light max-w-[300px]">
                Agente activo para escuchar, responder y orientar procesos cuando tu equipo lo necesita.
              </p>
              <div className="flex items-center justify-center gap-4 mt-1 flex-wrap">
                {[
                  { label: 'Idle', cls: 'bg-white/25' },
                  { label: 'Listening', cls: 'bg-cyan-400 animate-pulse' },
                  { label: 'Thinking', cls: 'bg-amber-200/80' },
                  { label: 'Speaking', cls: 'bg-orange-400' },
                ].map(s => (
                  <span key={s.label} className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-white/45 font-light">
                    <span className={`inline-block h-1 w-1 rounded-full ${s.cls}`} />
                    {s.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Columna 3 — interfaz / capacidades + conecta */}
        <div className="flex flex-col gap-4 md:gap-5 md:col-span-2 lg:col-span-1">
          {/* Interfaz / capacidades */}
          <div className="relative rounded-[2rem] overflow-hidden border border-white/10 flex-1 min-h-[380px] flex flex-col"
            style={{ backgroundColor: '#0d0d0f' }}>
            <div className="absolute inset-0 opacity-60 pointer-events-none"
              style={{ backgroundImage: `radial-gradient(ellipse 70% 55% at 50% 20%, rgba(36,58,58,0.85) 0%, rgba(10,10,12,0.4) 70%), url('${PS_TEXTURE}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/20 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full p-5 md:p-6 gap-5">
              <PsLabel>Interfaz / Capacidades</PsLabel>
              <p className="text-[15px] md:text-base leading-[1.5] text-white/85 font-light">
                Paula convierte preguntas en respuestas, resúmenes, búsquedas y acciones conectadas a tus sistemas.
              </p>
              <div className="space-y-3 mt-auto">
                <PsMarqueeRow icons={PS_ROW1} direction="left" />
                <PsMarqueeRow icons={PS_ROW2} direction="right" />
              </div>
              <div className="flex flex-wrap gap-2">
                {['Voz', 'Documentos', 'Búsqueda interna', 'Automatización', 'Resúmenes', 'Integraciones'].map(c => (
                  <PsPill key={c}>{c}</PsPill>
                ))}
              </div>
            </div>
          </div>

          {/* Conecta Paula */}
          <div className="noise-overlay relative rounded-[2rem] p-5 md:p-6 border border-white/10 overflow-hidden"
            style={{ backgroundColor: '#243a3a' }}>
            <a href="#integraciones" aria-label="Ver integraciones de Paula"
              className="liquid-glass z-20 h-9 w-9 rounded-full border border-white/10 flex items-center justify-center transition-transform duration-300 hover:scale-110"
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}>
              <PsIcon name="ArrowUpRight" size={15} />
            </a>
            <div className="relative z-10">
              <p className="uppercase tracking-[0.22em] text-[11px] text-white/70 font-light mb-4">Conecta Paula</p>
              <p className="text-sm leading-[1.6] text-white/70 font-light mb-5 max-w-[340px]">
                Diseñada para integrarse con tus fuentes de conocimiento, herramientas internas y flujos operativos.
              </p>
              <div className="flex flex-wrap gap-2">
                {['CRM', 'ERP', 'Drive', 'Notion', 'Slack', 'APIs'].map(t => (
                  <PsPill key={t}>{t}</PsPill>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  window.PaulaSection = PaulaSection;
})();
