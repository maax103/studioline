import type { Project } from '../types';

// 1. Vite encontra todos os arquivos .ts dentro da pasta 'projects'.
// A opção { eager: true } faz com que os módulos sejam importados imediatamente.
const projectModules = import.meta.glob('./projects/*.tsx', { eager: true }) as Record<string, { default: Project }>;

// 2. O resultado de projectModules é um objeto como:
// {
//   './projects/casa.ts': { default: { ...dados do projeto casa } },
//   './projects/ex-casa-renata.ts': { default: { ...dados do outro projeto } }
// }

// 3. Extraímos os valores (os módulos) e pegamos a exportação 'default' de cada um.
export const allProjects: Project[] = Object.values(projectModules).map(
  (module) => module.default
);

// Opcional: Você pode querer ordenar os projetos por ID ou outro critério.
allProjects.sort((a, b) => parseInt(a.id) - parseInt(b.id));