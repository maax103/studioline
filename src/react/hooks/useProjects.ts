import { useContext } from 'react';
import { ProjectsContext } from '../contexts/ProjectsContext';
import type { ProjectsContextType } from '../contexts/ProjectsContext';

export function useProjects(): ProjectsContextType {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
}