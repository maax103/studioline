import { Box, Container, Stack, Title, Text, SimpleGrid } from '@mantine/core';
import { motion } from 'framer-motion';
import { useProjects } from '../../hooks';
import { ProjectCard } from '../ui';


export function GallerySection() {
  const { projects } = useProjects();

  // Animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };


  return (
    <Box
      component="section"
      id="gallery"
      py="xl"
      style={{ backgroundColor: '#f8f9fa' }}
    >
      <Container size="xl">
        <Stack gap="xl">
          {/* Header */}
          <Stack align="center" gap="md">
            <Title order={2} ta="center" c="neutral.8" size="2.5rem">
              Galeria de Projetos
            </Title>
            <Text ta="center" c="neutral.6" size="lg" maw={700} lh={1.6}>
              Conheça alguns dos nossos projetos mais recentes e inspire-se com
              nossas soluções arquitetônicas. Cada projeto reflete nossa
              dedicação à excelência e inovação.
            </Text>
          </Stack>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <SimpleGrid
              cols={{ base: 1, sm: 2, lg: 3 }}
              spacing="xl"
              style={{ marginTop: '2rem' }}
            >
              {projects.filter(project => project.state === "public").map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </SimpleGrid>
          </motion.div>
        </Stack>
      </Container>
    </Box>
  );
}
