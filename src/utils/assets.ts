// Simple utility to handle production vs development asset paths
export function getRealPath(path: string): string {
  // Remove leading slash if present
  if (path === "#") return path; // special case for just "#"
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // For production GitHub Pages, always use the studioline base path
  if (typeof window !== 'undefined' && window.location.hostname === 'maax103.github.io') {
    return `/studioline/${cleanPath}`;
  }
  
  // For local development
  return `/${cleanPath}`;
}