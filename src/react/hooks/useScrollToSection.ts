import { useCallback } from 'react';

interface ScrollOptions {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
  offset?: number;
}

export function useScrollToSection() {
  const scrollToSection = useCallback(
    (sectionId: string, options: ScrollOptions = {}) => {
      const {
        behavior = 'smooth',
        block = 'start',
        inline = 'nearest',
        offset = 0,
      } = options;

      // Remove # se presente
      const targetId = sectionId.replace('#', '');
      const element = document.getElementById(targetId);

      if (!element) {
        console.warn(`Section with id "${targetId}" not found`);
        return;
      }

      // Se há offset, calcular posição manualmente
      if (offset !== 0) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior,
        });
      } else {
        // Usar scrollIntoView padrão
        element.scrollIntoView({
          behavior,
          block,
          inline,
        });
      }

      // Adicionar foco para acessibilidade (opcional)
      if (element.tabIndex === -1) {
        element.tabIndex = -1;
      }
      element.focus({ preventScroll: true });
    },
    []
  );

  return scrollToSection;
}
