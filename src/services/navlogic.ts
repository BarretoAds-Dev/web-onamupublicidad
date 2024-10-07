// src/services/navlogic.ts

// Exporta una función que inicializa la lógica del menú
export const initMenu = () => {
  // El script se puede colocar antes de la etiqueta </body> para evitar `DOMContentLoaded`
  const menuToggle = document.getElementById('menu-toggle') as HTMLElement | null;
  const menu = document.getElementById('menu') as HTMLElement | null;
  const openIcon = document.getElementById('menu-open-icon') as HTMLElement | null;
  const closeIcon = document.getElementById('menu-close-icon') as HTMLElement | null;

  if (!menuToggle || !menu || !openIcon || !closeIcon) {
    console.error('Error: No se pudo encontrar uno o más elementos del menú.');
    return; // Salir de la función si faltan elementos
  }

  // Variables de estado
  let isMenuOpen = false;
  let resizeTimeout: number | null = null; // Definición explícita del tipo

  // Función para alternar menú
  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;

    // Actualiza visibilidad del menú
    menu.classList.toggle('hidden', !isMenuOpen);
    document.body.classList.toggle('overflow-hidden', isMenuOpen);

    // Cambia iconos de abrir/cerrar
    openIcon.classList.toggle('hidden', isMenuOpen);
    closeIcon.classList.toggle('hidden', !isMenuOpen);

    // Añade o elimina clases de posición del botón hamburguesa
    menuToggle.classList.toggle('fixed', isMenuOpen);
    menuToggle.classList.toggle('top-10', isMenuOpen);
    menuToggle.classList.toggle('right-10', isMenuOpen);

    // Actualiza el atributo `aria-expanded`
    menuToggle.setAttribute('aria-expanded', String(isMenuOpen));
  };

  menuToggle.addEventListener('click', toggleMenu);

  // Función para manejar el redimensionamiento de la pantalla
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      if (!isMenuOpen) {
        menu.classList.remove('hidden');
      }
      document.body.classList.remove('overflow-hidden');
      openIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      menuToggle.classList.remove('fixed', 'top-10', 'right-10');
    } else {
      if (!isMenuOpen) {
        menu.classList.add('hidden');
      }
      openIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
    menuToggle.setAttribute('aria-expanded', String(isMenuOpen));
  };

  // Optimización del evento `resize` para reducir recálculos innecesarios
  const optimizedResize = () => {
    if (resizeTimeout !== null) {
      window.cancelAnimationFrame(resizeTimeout);
    }
    resizeTimeout = window.requestAnimationFrame(() => {
      handleResize();
      resizeTimeout = null; // Reinicia a null después de usar
    });
  };

  window.addEventListener('resize', optimizedResize, { passive: true });

  // Inicializa el estado correcto del menú
  handleResize();
};
