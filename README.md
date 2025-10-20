# AuraGarcia - Medical Data Science Consulting

> Consultoría especializada que transforma datos médicos complejos en insights estratégicos que revolucionan la atención sanitaria.

![AuraGarcia Brand](resources/AuragarciaLogoVector-2.png)

## 🎯 Descripción del Proyecto

Plataforma web corporativa para **AuraGarcia**, consultora especializada en ciencia de datos aplicada a salud. La empresa ofrece servicios de transformación digital sanitaria, análisis biomédicos avanzados e inteligencia artificial médica predictiva.

### ✨ Características Principales

- **Diseño minimalista** inspirado en las mejores prácticas de UX/UI
- **Responsive design** optimizado para móvil, tablet y desktop
- **Colores de marca** ámbar dorado con sistema de tema oscuro/claro
- **Performance optimizada** con React 18 y Tailwind CSS
- **SEO completo** con meta tags, structured data y optimización técnica

## 🏗️ Estructura del Proyecto

```
webpage/
├── src/                   # 📁 Código fuente
│   ├── app.js            # ⚛️  Componente React principal
│   └── config.js         # ⚙️  Configuración global
├── css/                   # 🎨 Estilos personalizados
│   └── main.css          # 💅 CSS principal con marca Aura García
├── docs/                  # 📚 Documentación
│   ├── README.md         # 📖 Documentación principal
│   ├── ARCHITECTURE.md   # 🏛️  Arquitectura técnica
│   ├── BRAND_GUIDE.md    # 🎨 Guía de marca y colores
│   └── CHANGELOG.md      # 📝 Historial de cambios
├── resources/            # 🖼️  Assets y recursos
│   ├── fonts/           # 🔤 Fuentes oficiales Aura García
│   │   ├── Girot-Regular.otf
│   │   ├── Girot-Bold.otf
│   │   └── NorticaTypeface-Medium.otf
│   ├── logos/           # 🎨 Logotipos en múltiples formatos
│   │   ├── Auragarcia-black.png
│   │   ├── Auragarcia-white.png
│   │   └── AuragarciaLogoVector-2.png
│   └── manual_identidad/ # 📋 Manual de identidad visual
│       ├── Manual de Identidad Aura Garcia (2).pdf
│       ├── manual_identidad1.png (screenshots)
│       └── mapa_aura.png
└── index.html           # 🌐 Página principal HTML
```

## 🚀 Inicio Rápido

### Desarrollo Local

1. **Clonar o descargar** el proyecto
2. **Abrir** `index.html` en un navegador moderno
3. **Listo!** No requiere build process ni dependencias

### Hosting en Producción

```bash
# Subir a hosting estático (Netlify, Vercel, GitHub Pages)
# Los archivos están listos para deployment directo
```

## 🎨 Sistema de Diseño

### Paleta de Colores Aura García

```css
/* Ámbar Dorado - Color Principal */
--aura-primary: #D97706;
--aura-secondary: #F59E0B;
--aura-accent: #92400E;
--aura-light: #FEF3C7;
```

### Typography
- **Fuentes Oficiales**: Nortica Typeface (headings), Girot Regular/Bold (body text)
- **Pesos**: Regular (400), Medium (500), Bold (700)
- **Espaciado**: Letter-spacing expandido para headers elegantes
- **Fallbacks**: System fonts stack para máxima compatibilidad

## 📱 Responsive Features

### Breakpoints
- **Mobile**: 320px - 768px (scroll horizontal en servicios)
- **Tablet**: 768px - 1024px (layout híbrido)
- **Desktop**: 1024px+ (grid completo)

### Mobile Optimizations
- **Scroll indicators dinámicos** que crecen según posición
- **Navigation drawer** optimizada para touch
- **Typography escalable** para legibilidad perfecta

## ⚡ Performance

### Métricas Objetivo
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

### Optimizaciones Implementadas
- ✅ Preload de recursos críticos
- ✅ DNS Prefetch para CDNs
- ✅ CSS optimizado para GPU animations
- ✅ JavaScript modular y eficiente

## 🔧 Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 18.x | UI Library principal |
| **Tailwind CSS** | 2.2.19 | Framework de utilidades CSS |
| **Babel Standalone** | Latest | Transpilación JSX en tiempo real |
| **Lucide Icons** | Latest | Iconografía moderna |

## 📊 Secciones Implementadas

### 🏠 Hero Section
- Mensaje principal centrado en impacto
- Métricas destacadas (95% precisión, 40% reducción tiempos, 24/7 monitoreo)
- CTAs optimizados para conversión

### 💼 Servicios
- **IA Médica Predictiva**: Algoritmos avanzados de diagnóstico
- **Analytics Clínicos**: Análisis biomédicos en tiempo real
- **Integración Digital**: Ecosistemas hospitalarios unificados
- **Transformación Sanitaria**: Humanización + tecnología

### 📱 Mobile Experience
- Scroll horizontal en servicios con snap points
- Indicadores dinámicos que responden al scroll
- Navigation touch-optimizada

## 🔒 SEO & Meta Tags

### Structured Data
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AuraGarcia",
  "description": "Consultoría especializada en transformación digital sanitaria",
  "url": "https://auragarcia.com"
}
```

### Open Graph
- Complete Facebook/LinkedIn sharing optimization
- Twitter Cards implementation
- Canonical URLs y meta descriptions

## 📈 Analytics Ready

### Tracking Events Configurados
- Page views y sessions
- Scroll depth tracking
- CTA click tracking
- Mobile vs Desktop usage
- Performance metrics

## 🧪 Testing

### Cross-browser Support
- ✅ Chrome/Edge (Chromium) 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Device Testing
- ✅ iPhone 12/13/14 series
- ✅ Android flagship devices
- ✅ iPad Pro/Air
- ✅ Desktop 1920x1080+

## 📚 Documentación Adicional

- 📖 **[Arquitectura Técnica](docs/ARCHITECTURE.md)** - Estructura y decisiones técnicas
- 🎨 **[Guía de Marca](docs/BRAND_GUIDE.md)** - Colores, tipografía y uso de brand
- 📝 **[Changelog](docs/CHANGELOG.md)** - Historial completo de cambios

## 🤝 Contribución

### Para Mejoras
1. Fork del proyecto
2. Crear feature branch (`git checkout -b feature/amazing-feature`)
3. Commit cambios (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Estándares de Código
- ES6+ JavaScript con JSX
- CSS siguiendo metodología BEM cuando aplique
- Comentarios descriptivos en funciones complejas
- Mobile-first approach siempre

## 📄 Licencia

Proyecto propietario de **AuraGarcia Consulting**. Todos los derechos reservados.

---

**Desarrollado con ❤️ para revolucionar la medicina con datos**

[![AuraGarcia](https://img.shields.io/badge/Powered%20by-AuraGarcia-D97706)](https://auragarcia.com)
[![React](https://img.shields.io/badge/React-18-61DAFB)](https://reactjs.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-2.2-38B2AC)](https://tailwindcss.com/)
[![Mobile Optimized](https://img.shields.io/badge/Mobile-Optimized-green)](https://developers.google.com/web/fundamentals/design-and-ux/responsive)
