import { AppShell, Box, MantineProvider } from '@mantine/core';
import { Header } from '../../components/react/Header';
import { theme } from '../../theme';
import { HeroSection } from '../../components/react/HeroSection';
import { ProjectsProvider } from '../../react/contexts/ProjectsContext';
import { ContactSection, GallerySection, ServicesSection } from '../../react/components/sections';
import { Footer } from '../../react/components/layout';

export function HomePage({currentPath}: {currentPath: string}) {
  return (
    <MantineProvider theme={theme}>
      <ProjectsProvider>
        <AppShell header={{ height: 70 }}>
            <AppShell.Main>
                <Box>
                    <Header />
                    <HeroSection />
                    <ServicesSection />
                    <GallerySection />
                    <ContactSection />
                    <Footer currentPath={currentPath}/>
                </Box>
            </AppShell.Main>
        </AppShell>
      </ProjectsProvider>
    </MantineProvider>
  );
}
