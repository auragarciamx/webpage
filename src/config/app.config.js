// Configuración global de la aplicación Aura Garcia
window.AuraConfig = {
  // Configuración de performance
  performance: {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    isLowPerformance: false, // Se detectará dinámicamente
    enableAnalytics: false, // Cambiar a true en producción
    lazyLoadOffset: 100
  },
  
  // Configuración de UI
  ui: {
    animationDurations: {
      fast: 200,
      normal: 300,
      slow: 500
    },
    breakpoints: {
      mobile: 768,
      tablet: 1024,
      desktop: 1280
    }
  },
  
  // Colores de marca AuraGarcia - Manual de Identidad
  brandColors: {
    primary: '#6366F1',    // Azul principal AuraGarcia
    secondary: '#8B5CF6',  // Violeta secundario
    accent: '#3B82F6',     // Azul accent
    light: '#E0E7FF',      // Azul muy claro
    dark: '#312E81',       // Azul oscuro
    neutral: '#F8FAFC',    // Fondo neutro
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  },
  
  // Configuración SEO
  seo: {
    siteName: 'AuraGarcia',
    siteUrl: 'https://auragarcia.com',
    author: 'AuraGarcia Consulting',
    language: 'es',
    defaultTitle: 'AuraGarcia - Transformación Digital en Salud',
    defaultDescription: 'Transformamos hospitales e instituciones en organizaciones "líquidas" con productos de datos, automatizaciones inteligentes y agentes de IA médica.'
  },
  
  // Configuración de transformación digital en salud
  healthTransformation: {
    maxVisualizationPoints: 1000,
    animationFrameRate: 60,
    dataUpdateInterval: 50,
    liquidHospitalFeatures: [
      'Adaptabilidad de procesos',
      'Flujo de datos en tiempo real',
      'Automatización inteligente',
      'Agentes de IA médica'
    ],
    services: [
      'Consultoría en Ciencia de Datos',
      'Productos de Datos Médicos',
      'Automatizaciones Inteligentes',
      'Agentes de IA Médica'
    ]
  }
};

// Detección automática de performance
(function() {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const slowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
  const lowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
  
  window.AuraConfig.performance.isLowPerformance = slowConnection || lowMemory || false;
})();

// Utilidades globales
window.AuraUtils = {
  // Función de debounce optimizada
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // Función de throttle optimizada
  throttle: (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  // Lazy loading de imágenes
  lazyLoadImage: (src, placeholder = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="%23f3f4f6"/></svg>') => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(src);
      img.onerror = reject;
      img.src = src;
    });
  },
  
  // Formateo de números para visualizaciones
  formatNumber: (num, decimals = 0) => {
    return new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(num);
  }
};

console.log('🏥 AuraGarcia - Transformación Digital en Salud - Configuración cargada correctamente');
