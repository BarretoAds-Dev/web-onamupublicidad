// tailwind.config.cjs
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}', // Ajusta estas rutas según la estructura de tu proyecto
  ],
  theme: {
    extend: {
      colors: {
        bodydark: '#131a26',
        
        fontlight: '#F9EBE0',
        
        colorcaution: '#DD0426',
      },
      fontFamily: {
        bricolage: ['"Bricolage Grotesque Variable"', 'sans-serif'],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true, // Incluye los estilos básicos
  },
  mode: 'jit', // Activa el modo Just-In-Time para reducir el tamaño del CSS generado
};