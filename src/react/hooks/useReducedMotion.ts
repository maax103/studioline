import { useState, useEffect } from 'react';

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Verificar se o usuário prefere movimento reduzido
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Definir estado inicial
    setPrefersReducedMotion(mediaQuery.matches);

    // Listener para mudanças na preferência
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Adicionar listener
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}