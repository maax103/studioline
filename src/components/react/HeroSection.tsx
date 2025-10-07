import {
  Box,
  Container,
  Grid,
  Stack,
  Title,
  Text,
  Group,
  Button,
  ThemeIcon,
  AspectRatio,
} from "@mantine/core";
import { motion } from "framer-motion";
import { IconArrowRight, IconArrowsMove } from "@tabler/icons-react";
import {
  useScrollToSection,
  useReducedMotion,
  useProjects,
} from "../../react/hooks";
import { OrbitViewer3D } from "../../react/components/3d/OrbitViewer3D";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
}

export function HeroSection({
  title = "Studio Line Arquitetura",
  subtitle = "Transformamos ideias em espaços únicos e funcionais. Especialistas em projetos residenciais e comerciais de alto padrão.",
}: HeroSectionProps) {
  const scrollToSection = useScrollToSection();
  const prefersReducedMotion = useReducedMotion();
  const { getRandomHighlightProject } = useProjects();
  const project = getRandomHighlightProject(true);

  const handleScrollToGallery = () => {
    scrollToSection("gallery", { offset: 70 });
  };

  const handleScrollToContact = () => {
    scrollToSection("contact", { offset: 70 });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.8,
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <Box
      component="section"
      id="hero"
      style={{
        minHeight: "calc(100vh - 4.4rem)",
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container size="xl" py="xl" style={{ position: "relative", zIndex: 2 }}>
        <Grid gutter="xl" align="center">
          {/* Conteúdo de Texto */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Stack gap="xl">
                <motion.div variants={itemVariants}>
                  <Title
                    order={1}
                    size="clamp(2.5rem, 5vw, 4rem)"
                    c="sage.6"
                    style={{
                      lineHeight: 1.1,
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {title}
                  </Title>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Text
                    size="xl"
                    c="neutral.7"
                    style={{
                      lineHeight: 1.6,
                      fontSize: "clamp(1.1rem, 2.5vw, 1.25rem)",
                    }}
                  >
                    {subtitle}
                  </Text>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Stack gap="md">
                    <Group gap="lg">
                      <Button
                        variant="filled"
                        color="sage"
                        size="lg"
                        rightSection={<IconArrowRight size={18} />}
                        onClick={handleScrollToGallery}
                        style={{
                          borderRadius: "2rem",
                          paddingLeft: "2rem",
                          paddingRight: "2rem",
                          fontWeight: 600,
                        }}
                      >
                        Ver Projetos
                      </Button>
                    </Group>

                    <Text size="sm" c="neutral.5" mt="xs">
                      Ou{" "}
                      <Text
                        component="span"
                        c="sage.6"
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                          fontWeight: 500,
                        }}
                        onClick={handleScrollToContact}
                      >
                        entre em contato
                      </Text>{" "}
                      para uma consulta gratuita
                    </Text>
                  </Stack>
                </motion.div>
              </Stack>
            </motion.div>
          </Grid.Col>

          {/* Foto 360° */}
          {project?.images360 && project.images360.length > 0 && (
            <Grid.Col p={0} span={{ base: 12, md: 6 }}>
              <Stack>
                <AspectRatio ratio={10 / 8} miw={'100dhw'}>
                  <OrbitViewer3D
                    photo360={project.images360[0]}
                    photos360={project.images360}
                    height="100%"
                    enableZoom={true}
                    minDistance={40}
                    maxDistance={75}
                    style={{
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    }}
                  />
                </AspectRatio>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Group justify="center" gap="xl">
                    <Group gap="xs">
                      <ThemeIcon variant="light" color="sage" size="sm">
                        <IconArrowsMove size={14} />
                      </ThemeIcon>
                      <Text size="sm" c="neutral.6">
                        Experimente o tour 360°
                      </Text>
                    </Group>
                  </Group>
                </motion.div>
              </Stack>
            </Grid.Col>
          )}
        </Grid>
      </Container>

      <Box
        style={{
          position: "absolute",
          top: "10%",
          left: "-5%",
          width: "200px",
          height: "200px",
          background: "var(--mantine-color-sage-2)",
          borderRadius: "50%",
          opacity: 0.3,
          zIndex: 1,
        }}
      />
      <Box
        style={{
          position: "absolute",
          bottom: "15%",
          right: "-3%",
          width: "150px",
          height: "150px",
          background: "var(--mantine-color-blush-2)",
          borderRadius: "50%",
          opacity: 0.4,
          zIndex: 1,
        }}
      />
    </Box>
  );
}
