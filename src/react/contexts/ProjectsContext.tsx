import type { ReactNode } from 'react';
import { createContext } from 'react';
import type { Project } from '../types';
import { allProjects } from '../data';

export interface ProjectsContextType {
  projects: Project[];
  getProjectById: (id: string) => Project | undefined;
  getRandomHighlightProject: () => Project;
}

export const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined
);

interface ProjectsProviderProps {
  children: ReactNode;
}

export function ProjectsProvider({ children }: ProjectsProviderProps) {
  const getProjectById = (id: string): Project | undefined => {
    return allProjects.find((project) => project.id === id);
  };

  const value: ProjectsContextType = {
    projects: allProjects,
    getProjectById,
    getRandomHighlightProject: () => {
      const highlightedProjects = allProjects.filter(
        (project) => project.highlight
      );
      const randomIndex = Math.floor(Math.random() * highlightedProjects.length);
      return highlightedProjects[randomIndex];
    },
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}
