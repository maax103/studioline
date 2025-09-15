import {
  Container,
  Stack,
  Title,
  Text,
  Group,
  Button,
  Breadcrumbs,
  Anchor,
  SimpleGrid,
  Image,
  Card,
  Badge,
  Divider,
  Box,
  ActionIcon,
  Modal,
  Flex,
  Loader,
  AspectRatio,
  MantineProvider,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconCalendar,
  IconMapPin,
  IconRuler,
  IconView360Arrow,
  IconHome,
  IconArrowRight,
  IconX,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useProjects } from "../hooks";
import { useScrollToSection } from "../hooks";
import { useDisclosure } from "@mantine/hooks";
import { Suspense, useCallback, useEffect, useState } from "react";
import type { Project } from "../types";
import { OrbitViewer3D } from "../components/3d/OrbitViewer3D";
import { theme } from "../../theme";
import { ProjectsProvider } from "../contexts/ProjectsContext";

export function ProjectDetailsPage({ id }: { id: string }) {
  const { getProjectById } = useProjects();
  const project = id ? getProjectById(id) : undefined;
  const scrollToSection = useScrollToSection();
  const [modelOpen, { open, close }] = useDisclosure();
  const [isImageOpen, { open: openImage, close: closeImage }] = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<Project["images"][0]>();

  const nextImage = useCallback(() => {
    if (!project || !selectedImage) return;
    const currentIndex = project.images.findIndex(
      (image) => image === selectedImage
    );
    const nextIndex = (currentIndex + 1) % project.images.length;
    setSelectedImage(project.images[nextIndex]);
  }, [project, selectedImage]);

  const prevImage = useCallback(() => {
    if (!project || !selectedImage) return;
    const currentIndex = project.images.findIndex(
      (image) => image === selectedImage
    );
    const prevIndex =
      (currentIndex - 1 + project.images.length) % project.images.length;
    setSelectedImage(project.images[prevIndex]);
  }, [project, selectedImage]);

  // 3. Adicione o useEffect para controlar os eventos do teclado
  useEffect(() => {
    // Função que será chamada quando uma tecla for pressionada
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        prevImage();
      } else if (event.key === "ArrowRight") {
        nextImage();
      }
    };

    // Adiciona o listener APENAS se o modal estiver aberto
    if (isImageOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    // Função de limpeza: remove o listener quando o modal fecha ou o componente é desmontado
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isImageOpen, prevImage, nextImage]); // Dependências do hook

  const handle3DViewClick = () => {
    open();
  };

  if (!project) {
    return (
      <Container size="md" py="xl">
        <Stack align="center" gap="xl">
          <Title order={2} c="neutral.8">
            Projeto não encontrado
          </Title>
          <Text c="neutral.6" ta="center">
            O projeto que você está procurando não existe ou foi removido.
          </Text>
          <Button variant="outline" color="sage" component="a" href="/#gallery">
            Voltar à galeria
          </Button>
        </Stack>
      </Container>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "residential":
        return "sage";
      case "commercial":
        return "blush";
      default:
        return "sage";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "residential":
        return "Residencial";
      case "commercial":
        return "Comercial";
      default:
        return category;
    }
  };

  const breadcrumbItems = [
    { title: "Início", href: "/" },
    { title: "Galeria", href: "/#gallery" },
    { title: project.title, href: "#" },
  ].map((item, index) => (
    <Anchor
      key={index}
      href={item.href}
    >
      {item.title}
    </Anchor>
  ));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Container size="xl" py={"xl"}>
        <Stack gap="xl">
          {/* Breadcrumbs and Back Button */}
          <Group justify="space-between" align="center">
            <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
            <Button
              variant="subtle"
              color="sage"
              leftSection={<IconArrowLeft size={18} />}
              component="a"
              href="/#gallery"
            >
              Voltar à galeria
            </Button>
          </Group>

          {/* Project Header */}
          <Stack gap="md">
            <Group justify="space-between" align="flex-start">
              <Stack gap="xs">
                <Group gap="md">
                  <Title order={1} size="2.5rem" c="neutral.8">
                    {project.title}
                  </Title>
                  <Badge
                    variant="light"
                    color={getCategoryColor(project.category)}
                    size="lg"
                  >
                    {getCategoryLabel(project.category)}
                  </Badge>
                </Group>

                <Group gap="xl">
                  <Group gap="xs">
                    <IconCalendar
                      size={16}
                      color="var(--mantine-color-neutral-5)"
                    />
                    <Text size="sm" c="neutral.6">
                      {project.year}
                    </Text>
                  </Group>

                  {project.location && (
                    <Group gap="xs">
                      <IconMapPin
                        size={16}
                        color="var(--mantine-color-neutral-5)"
                      />
                      <Text size="sm" c="neutral.6">
                        {project.location}
                      </Text>
                    </Group>
                  )}

                  {project.area && (
                    <Group gap="xs">
                      <IconRuler
                        size={16}
                        color="var(--mantine-color-neutral-5)"
                      />
                      <Text size="sm" c="neutral.6">
                        {project.area}
                      </Text>
                    </Group>
                  )}
                </Group>
              </Stack>

              {project.images360 && (
                <Button
                  variant="filled"
                  color={getCategoryColor(project.category)}
                  leftSection={<IconView360Arrow size={18} />}
                  onClick={handle3DViewClick}
                >
                  Experiência 360º
                </Button>
              )}
            </Group>

            <Text size="lg" c="neutral.7" lh={1.6} maw={800}>
              {project.description}
            </Text>
          </Stack>

          <Divider />

          {/* Project Images */}
          <Stack gap="md">
            <Title order={3} c="neutral.8">
              Galeria de Imagens
            </Title>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 2 }} spacing="lg">
              {project.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Box
                    style={{
                      borderRadius: "12px",
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                  >
                    <Image
                      src={image}
                      alt={`${project.title} - Imagem ${index + 1}`}
                      height={500}
                      style={{
                        transition: "transform 0.3s ease",
                        willChange: "transform",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                      fallbackSrc={`https://via.placeholder.com/400x250/abc6ab/ffffff?text=${project.title}`}
                      onClick={() => {
                        setSelectedImage(image);
                        openImage();
                      }}
                    />
                  </Box>
                </motion.div>
              ))}
            </SimpleGrid>
          </Stack>

          {/* Project Specifications */}
          {project.specifications && (
            <>
              <Divider />
              <Stack gap="md">
                <Title order={3} c="neutral.8">
                  Especificações Técnicas
                </Title>
                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
                  {Object.entries(project.specifications).map(
                    ([key, value]) => (
                      <Card key={key} padding="lg" radius="md" withBorder>
                        <Stack gap="xs">
                          <Text fw={600} c="neutral.7" size="sm">
                            {key}
                          </Text>
                          <Text c="neutral.8" size="md">
                            {value}
                          </Text>
                        </Stack>
                      </Card>
                    )
                  )}
                </SimpleGrid>
              </Stack>
            </>
          )}

          {/* Call to Action */}
          <Card
            padding="xl"
            radius="lg"
            style={{ backgroundColor: "var(--mantine-color-sage-0)" }}
          >
            <Stack align="center" gap="md">
              <Group gap="xs">
                <ActionIcon variant="light" color="sage" size="lg">
                  <IconHome size={20} />
                </ActionIcon>
                <Title order={4} c="sage.7">
                  Gostou deste projeto?
                </Title>
              </Group>
              <Text ta="center" c="neutral.7" maw={500}>
                Entre em contato conosco para desenvolvermos um projeto
                personalizado para você, com a mesma qualidade e atenção aos
                detalhes.
              </Text>
              <Button
                variant="filled"
                color="sage"
                size="lg"
                onClick={() => {
                  // navigate('/');
                  setTimeout(() => {
                    scrollToSection("contact", { offset: 70 });
                  }, 100);
                }}
              >
                Falar com nossa equipe
              </Button>
            </Stack>
          </Card>
        </Stack>
      </Container>

      <Modal
        opened={isImageOpen}
        onClose={closeImage}
        withCloseButton={false}
        fullScreen
      >
        <motion.div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Group justify="space-between" align="center" mb={16}>
            <Title order={3} c="neutral.8">
              {project.title}
            </Title>

            {/* Grupo para os botões de controle */}
            <Group>
              <ActionIcon
                variant="subtle"
                color="sage"
                onClick={prevImage}
                aria-label="Imagem anterior"
              >
                <IconArrowLeft size={22} />
              </ActionIcon>

              <ActionIcon
                variant="subtle"
                color="sage"
                onClick={nextImage}
                aria-label="Próxima imagem"
              >
                <IconArrowRight size={22} />
              </ActionIcon>
            </Group>

            <Group>
              <ActionIcon variant="subtle" color="sage" onClick={closeImage}>
                <IconX size={22} />
              </ActionIcon>
            </Group>
          </Group>

          <AspectRatio ratio={20 / 9} maw={"100%"}>
            <Image
              src={selectedImage}
              alt={`${project.title} - Imagem`}
              style={{
                borderRadius: "30px",
                transition: "transform 0.3s ease",
                willChange: "transform",
                // height: 'calc(100% - 200px)',
                // width: '100%',
                objectFit: "contain", // Essencial para não distorcer a imagem
              }}
              fallbackSrc={`https://via.placeholder.com/400x250/abc6ab/ffffff?text=${project.title}`}
            />
          </AspectRatio>
        </motion.div>
      </Modal>

      {/* Modal 3D Viewer */}
      {project.images360 && (
        <Modal
          opened={modelOpen}
          onClose={close}
          withCloseButton={false}
          fullScreen
          styles={{
            body: { height: "calc(100% - 60px)" },
          }}
        >
          <Flex direction="column" h="100%">
            <Group justify="space-between" align="center" mb={16}>
              <Title order={3} c="neutral.8">
                {project.title}
              </Title>
              <Button
                variant="subtle"
                color="sage"
                leftSection={<IconArrowLeft size={18} />}
                onClick={close}
              >
                Voltar
              </Button>
            </Group>
            <Suspense fallback={<Loader />}>
              <OrbitViewer3D
                photo360={project.images360[0]}
                photos360={project.images360}
                height="100%"
                enableZoom={true}
                minDistance={40}
                maxDistance={75}
                style={{
                  border: "2px solid #abc6ab",
                }}
              />
            </Suspense>
          </Flex>
        </Modal>
      )}
    </motion.div>
  );
}
