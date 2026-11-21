const animations = {
    fadeIn: {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
    fadeOut: {
      '0%': { opacity: 1 },
      '100%': { opacity: 0 },
    },
    slideIn: {
      '0%': { transform: 'translateX(-100%)', opacity: 0 },
      '100%': { transform: 'translateX(0)', opacity: 1 },
    },
    slideOut: {
      '0%': { transform: 'translateX(0)', opacity: 1 },
      '100%': { transform: 'translateX(100%)', opacity: 0 },
    },
    // Ajoute d'autres animations ici
  };
  
    module.exports = animations;
  