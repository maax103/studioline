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
  Collapse,
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
import { Suspense, useCallback, useEffect, useState, useMemo } from "react";
import type { Project, GalleryImage } from "../types";
import { OrbitViewer3D } from "../components/3d/OrbitViewer3D";
import { getRealPath } from "../../utils/assets";

export function ProjectDetailsPage({
  id,
  isEmbed,
}: {
  id: string;
  isEmbed: boolean;
}) {
  const { getProjectById } = useProjects();
  const project = id ? getProjectById(id) : undefined;
  const scrollToSection = useScrollToSection();
  const [modelOpen, { open, close }] = useDisclosure();
  const [isImageOpen, { open: openImage, close: closeImage }] = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<GalleryImage>();
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasDragged, setHasDragged] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);
  const [mousePressed, setMousePressed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [pinchCenter, setPinchCenter] = useState({ x: 0, y: 0 });
  const [openedSections, setOpenedSections] = useState<Record<string, boolean>>(
    {}
  );

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Group gallery images by section
  const imagesBySection = useMemo(() => {
    if (!project?.gallery) return {};

    return project.gallery.reduce((acc, image) => {
      if (!acc[image.section]) {
        acc[image.section] = [];
      }
      acc[image.section].push(image);
      return acc;
    }, {} as Record<string, GalleryImage[]>);
  }, [project?.gallery]);

  // Initialize opened sections (all sections open by default)
  useEffect(() => {
    if (project?.gallery && Object.keys(openedSections).length === 0) {
      const sections = Object.keys(imagesBySection);
      const initialState: Record<string, boolean> = {};
      sections.forEach((section, index) => {
        initialState[section] = true; // All sections open by default
      });
      setOpenedSections(initialState);
    }
  }, [project?.gallery, imagesBySection, openedSections]);

  const toggleSection = (section: string) => {
    setOpenedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const nextImage = useCallback(() => {
    if (!project || !selectedImage) return;
    const currentIndex = project.gallery.findIndex(
      (image) => image === selectedImage
    );
    const nextIndex = (currentIndex + 1) % project.gallery.length;
    setSelectedImage(project.gallery[nextIndex]);
  }, [project, selectedImage]);

  const prevImage = useCallback(() => {
    if (!project || !selectedImage) return;
    const currentIndex = project.gallery.findIndex(
      (image) => image === selectedImage
    );
    const prevIndex =
      (currentIndex - 1 + project.gallery.length) % project.gallery.length;
    setSelectedImage(project.gallery[prevIndex]);
  }, [project, selectedImage]);

  const handleImageClick = useCallback(
    (e: React.MouseEvent) => {
      // Prevent zoom if mouse was pressed down for dragging (even without movement)
      if (mousePressed) {
        setMousePressed(false);
        setDragDistance(0);
        return;
      }

      // Only prevent zoom if user dragged more than 5 pixels (threshold for intentional drag)
      if (dragDistance > 5) {
        // Reset drag distance after checking
        setTimeout(() => setDragDistance(0), 0);
        return;
      }

      if (zoom === 1) {
        // Different initial zoom levels for mobile vs desktop
        const initialZoom = isMobile ? 1.01 : 2;
        setZoom(initialZoom);
      } else {
        // Reset position when zooming out to prevent image from disappearing
        setZoom(1);
        setPosition({ x: 0, y: 0 });
      }
      // Reset drag distance after action
      setTimeout(() => setDragDistance(0), 0);
    },
    [zoom, dragDistance, mousePressed, isMobile]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
            Math.pow(touch2.clientY - touch1.clientY, 2)
        );

        // Calculate center of pinch gesture relative to container
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = (touch1.clientX + touch2.clientX) / 2 - rect.left;
        const centerY = (touch1.clientY + touch2.clientY) / 2 - rect.top;
        setPinchCenter({ x: centerX, y: centerY });

        setDragStart({ x: distance, y: 0 });
      } else if (e.touches.length === 1 && zoom > 1) {
        setIsDragging(true);
        setDragStart({
          x: e.touches[0].clientX - position.x,
          y: e.touches[0].clientY - position.y,
        });
      }
    },
    [zoom, position]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
            Math.pow(touch2.clientY - touch1.clientY, 2)
        );
        const scale = distance / dragStart.x;
        const currentZoom = zoom;
        const newZoom = Math.max(1, Math.min(4, currentZoom * scale));

        // Reset position if zooming out completely to prevent image disappearing
        if (newZoom === 1) {
          setZoom(1);
          setPosition({ x: 0, y: 0 });
          setDragStart({ x: distance, y: 0 });
          return;
        }

        // Only apply zoom-to-center logic if we have a valid pinch center and container
        try {
          const rect = e.currentTarget?.getBoundingClientRect();
          if (
            rect &&
            pinchCenter.x !== undefined &&
            pinchCenter.y !== undefined
          ) {
            // Get the current transform values
            const currentPos = position;

            // Calculate the pinch center position in the image coordinate system
            const imageX =
              (pinchCenter.x - rect.width / 2 - currentPos.x) / currentZoom;
            const imageY =
              (pinchCenter.y - rect.height / 2 - currentPos.y) / currentZoom;

            // Calculate where this point should be after the new zoom
            const newImageX = imageX * newZoom;
            const newImageY = imageY * newZoom;

            // Calculate the new pan position to keep the pinch center fixed
            const newPanX = pinchCenter.x - rect.width / 2 - newImageX;
            const newPanY = pinchCenter.y - rect.height / 2 - newImageY;

            // Apply mobile constraints
            let constrainedX = newPanX;
            let constrainedY = newPanY;

            if (isMobile && newZoom > 1) {
              const containerWidth = rect.width;
              const containerHeight = rect.height;
              const maxOffsetX = containerWidth * newZoom * 1.5;
              const maxOffsetY = containerHeight * newZoom * 0.9;

              constrainedX = Math.max(
                -maxOffsetX,
                Math.min(maxOffsetX, newPanX)
              );
              constrainedY = Math.max(
                -maxOffsetY,
                Math.min(maxOffsetY, newPanY)
              );
            }

            setZoom(newZoom);
            setPosition({ x: constrainedX, y: constrainedY });
          } else {
            // Fallback if pinch center is not available
            setZoom(newZoom);
          }
        } catch (error) {
          // Fallback: just update zoom without position adjustment
          console.warn("Pinch zoom position adjustment failed:", error);
          setZoom(newZoom);
        }
        setDragStart({ x: distance, y: 0 });
      } else if (e.touches.length === 1 && isDragging && zoom > 1) {
        // Calculate new position
        const newX = e.touches[0].clientX - dragStart.x;
        const newY = e.touches[0].clientY - dragStart.y;

        // For mobile, use more generous panning bounds
        if (isMobile) {
          // On mobile when zoomed, image uses full height (100vh)
          // For horizontal images, this means the width will be much larger than screen
          const containerWidth = window.innerWidth;
          const containerHeight = window.innerHeight - 60;

          // For very horizontal images at full height, allow much more horizontal panning
          // This accounts for images that might be 2-3x wider than the screen when at full height
          const maxOffsetX = containerWidth * zoom * 1.5; // Increased for very wide images
          const maxOffsetY = containerHeight * zoom * 0.8; // More generous vertical movement

          const constrainedX = Math.max(
            -maxOffsetX,
            Math.min(maxOffsetX, newX)
          );
          const constrainedY = Math.max(
            -maxOffsetY,
            Math.min(maxOffsetY, newY)
          );

          setPosition({
            x: constrainedX,
            y: constrainedY,
          });
        } else {
          // Desktop constraints (original logic)
          const containerWidth = window.innerWidth;
          const containerHeight = window.innerHeight - 100;

          const imageWidth = containerWidth * zoom;
          const imageHeight = containerHeight * zoom;

          const maxOffsetX =
            (imageWidth - containerWidth) / 2 + containerWidth * 0.1;
          const maxOffsetY =
            (imageHeight - containerHeight) / 2 + containerHeight * 0.1;

          const constrainedX = Math.max(
            -maxOffsetX,
            Math.min(maxOffsetX, newX)
          );
          const constrainedY = Math.max(
            -maxOffsetY,
            Math.min(maxOffsetY, newY)
          );

          setPosition({
            x: constrainedX,
            y: constrainedY,
          });
        }
      }
    },
    [isDragging, dragStart, zoom, isMobile]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Mouse event handlers for desktop
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (zoom > 1) {
        setIsDragging(true);
        setHasDragged(false);
        setDragDistance(0);
        // Only set mousePressed when we actually start dragging, not on every mouse down
        setDragStart({
          x: e.clientX - position.x,
          y: e.clientY - position.y,
        });
        e.preventDefault();
      }
    },
    [zoom, position]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging && zoom > 1) {
        // Calculate distance moved from start position
        const deltaX = e.clientX - (dragStart.x + position.x);
        const deltaY = e.clientY - (dragStart.y + position.y);
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        setDragDistance(distance);

        // Set mousePressed when we actually start moving (indicating intent to drag)
        if (distance > 1) {
          setMousePressed(true);
        }

        // Only start actual dragging if moved more than threshold
        if (distance > 5) {
          setHasDragged(true);

          // Calculate new position
          const newX = e.clientX - dragStart.x;
          const newY = e.clientY - dragStart.y;

          // Different constraints for mobile vs desktop
          if (isMobile && zoom > 1) {
            // Mobile: Image uses full height, allow horizontal panning for wide images
            const containerWidth = window.innerWidth;
            const containerHeight = window.innerHeight - 60;

            // Increased horizontal bounds for very wide images
            const maxOffsetX = containerWidth * zoom * 1.5; // Match the touch handler
            const maxOffsetY = containerHeight * zoom * 0.9; // More generous vertical movement

            const constrainedX = Math.max(
              -maxOffsetX,
              Math.min(maxOffsetX, newX)
            );
            const constrainedY = Math.max(
              -maxOffsetY,
              Math.min(maxOffsetY, newY)
            );

            setPosition({
              x: constrainedX,
              y: constrainedY,
            });
          } else {
            // Desktop: Original constrained panning
            const containerWidth = window.innerWidth;
            const containerHeight = window.innerHeight - 100;

            const imageWidth = containerWidth * zoom;
            const imageHeight = containerHeight * zoom;

            const maxOffsetX =
              (imageWidth - containerWidth) / 2 + containerWidth * 0.1;
            const maxOffsetY =
              (imageHeight - containerHeight) / 2 + containerHeight * 0.1;

            const constrainedX = Math.max(
              -maxOffsetX,
              Math.min(maxOffsetX, newX)
            );
            const constrainedY = Math.max(
              -maxOffsetY,
              Math.min(maxOffsetY, newY)
            );

            setPosition({
              x: constrainedX,
              y: constrainedY,
            });
          }
        }

        e.preventDefault();
      }
    },
    [isDragging, dragStart, zoom, position]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    // Don't reset mousePressed here - let the click handler check it first
  }, []);

  // Handle mouse leave to stop dragging when mouse leaves the container
  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
    setMousePressed(false);
    // Reset drag distance when mouse leaves to prevent stuck state
    setDragDistance(0);
  }, []);

  // Wheel zoom for desktop
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      const delta = e.deltaY > 0 ? -0.1 : 0.1;

      try {
        // Get mouse position relative to the container
        const rect = e.currentTarget?.getBoundingClientRect();
        if (!rect) return;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const currentZoom = zoom;
        const newZoom = Math.max(1, Math.min(4, currentZoom + delta));

        // Reset position if zooming out completely
        if (newZoom === 1) {
          setZoom(1);
          setPosition({ x: 0, y: 0 });
          return;
        }

        // Get the current transform values
        const currentPos = position;
        const zoomRatio = newZoom / currentZoom;

        // Calculate the mouse position in the image coordinate system
        // This accounts for current pan and zoom
        const imageX = (mouseX - rect.width / 2 - currentPos.x) / currentZoom;
        const imageY = (mouseY - rect.height / 2 - currentPos.y) / currentZoom;

        // Calculate where this point should be after the new zoom
        const newImageX = imageX * newZoom;
        const newImageY = imageY * newZoom;

        // Calculate the new pan position to keep the mouse point fixed
        const newPanX = mouseX - rect.width / 2 - newImageX;
        const newPanY = mouseY - rect.height / 2 - newImageY;

        // Apply constraints if needed (for mobile)
        let constrainedX = newPanX;
        let constrainedY = newPanY;

        if (isMobile && newZoom > 1) {
          const containerWidth = rect.width;
          const containerHeight = rect.height;
          const maxOffsetX = containerWidth * newZoom * 1.5;
          const maxOffsetY = containerHeight * newZoom * 0.9;

          constrainedX = Math.max(-maxOffsetX, Math.min(maxOffsetX, newPanX));
          constrainedY = Math.max(-maxOffsetY, Math.min(maxOffsetY, newPanY));
        } else if (!isMobile && newZoom > 1) {
          // Desktop constraints
          const containerWidth = rect.width;
          const containerHeight = rect.height;
          const imageWidth = containerWidth * newZoom;
          const imageHeight = containerHeight * newZoom;
          const maxOffsetX =
            (imageWidth - containerWidth) / 2 + containerWidth * 0.1;
          const maxOffsetY =
            (imageHeight - containerHeight) / 2 + containerHeight * 0.1;

          constrainedX = Math.max(-maxOffsetX, Math.min(maxOffsetX, newPanX));
          constrainedY = Math.max(-maxOffsetY, Math.min(maxOffsetY, newPanY));
        }

        // Update both zoom and position
        setZoom(newZoom);
        setPosition({ x: constrainedX, y: constrainedY });
      } catch (error) {
        console.warn("Wheel zoom failed:", error);
        // Fallback to simple zoom without position adjustment
        const newZoom = Math.max(1, Math.min(4, zoom + delta));
        setZoom(newZoom);
        if (newZoom === 1) {
          setPosition({ x: 0, y: 0 });
        }
      }
    },
    [zoom, position, isMobile]
  );

  const resetZoom = useCallback(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setHasDragged(false);
    setDragDistance(0);
    setMousePressed(false);
  }, []);

  const handleCloseImage = useCallback(() => {
    resetZoom();
    closeImage();
  }, [resetZoom, closeImage]);

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
          <Button
            variant="outline"
            color="sage"
            component="a"
            href={getRealPath("/#gallery")}
          >
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
    <Anchor key={index} href={getRealPath(item.href)}>
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
          {!isEmbed && (
            <Group justify="space-between" align="center">
              <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
              <Button
                variant="subtle"
                color="sage"
                leftSection={<IconArrowLeft size={18} />}
                component="a"
                href={getRealPath("/#gallery")}
              >
                Voltar à galeria
              </Button>
            </Group>
          )}

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
            <project.longDescription />
          </Stack>

          <Divider />

          {/* Project Images */}
          <Stack gap="md">
            <Title order={3} c="neutral.8">
              Galeria de Imagens
            </Title>

            {Object.entries(imagesBySection).map(([section, images]) => (
              <Stack key={section} gap="sm">
                <Group
                  justify="space-between"
                  style={{
                    cursor: "pointer",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    backgroundColor: openedSections[section]
                      ? "#f8f9fa"
                      : "#ffffff",
                    border: "1px solid #e9ecef",
                    transition: "all 0.2s ease",
                  }}
                  onClick={() => toggleSection(section)}
                >
                  <Title order={4} c="neutral.8" size="lg">
                    {section} ({images.length}{" "}
                    {images.length === 1 ? "imagem" : "imagens"})
                  </Title>
                  <ActionIcon
                    variant="subtle"
                    size="sm"
                    style={{
                      transform: openedSections[section]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <IconArrowRight size={16} />
                  </ActionIcon>
                </Group>

                <Collapse in={openedSections[section]}>
                  <SimpleGrid cols={{ base: 1, sm: 2, md: 2 }} spacing="lg">
                    {images.map((galleryImage, index) => (
                      <motion.div
                        key={`${section}-${index}`}
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
                            src={galleryImage.path}
                            alt={galleryImage.description}
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
                            // fallbackSrc={`https://via.placeholder.com/400x250/abc6ab/ffffff?text=${project.title}`}
                            onClick={() => {
                              setSelectedImage(galleryImage);
                              openImage();
                            }}
                          />
                        </Box>
                      </motion.div>
                    ))}
                  </SimpleGrid>
                </Collapse>
              </Stack>
            ))}
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
          {!isEmbed && (
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
              </Stack>
            </Card>
          )}
        </Stack>
      </Container>

      <Modal
        opened={isImageOpen}
        onClose={handleCloseImage}
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
              {selectedImage?.description || project.title}
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

              <ActionIcon
                variant="subtle"
                color="sage"
                onClick={resetZoom}
                aria-label="Reset zoom"
              >
                <IconHome size={22} />
              </ActionIcon>

              <ActionIcon
                variant="subtle"
                color="sage"
                onClick={handleCloseImage}
              >
                <IconX size={22} />
              </ActionIcon>
            </Group>
          </Group>
          <Box
            style={{
              flex: 1,
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "pointer",
              touchAction: "none",
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onWheel={handleWheel}
            onClick={handleImageClick}
          >
            <Image
              src={selectedImage?.path}
              alt={selectedImage?.description || `${project.title} - Imagem`}
              style={{
                borderRadius: "8px",
                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${
                  position.y / zoom
                }px)`,
                transition: isDragging ? "none" : "transform 0.3s ease",
                // On mobile when zoomed (even at lower levels), use full height and allow horizontal panning
                // When not zoomed, respect viewport height limits
                width: zoom > 1 && isMobile ? "auto" : "100%",
                height: zoom > 1 && isMobile ? "100vh" : "auto",
                maxWidth: zoom > 1 && isMobile ? "none" : "100%",
                maxHeight:
                  zoom > 1 && isMobile ? "100vh" : "calc(100vh - 120px)", // Account for header on desktop
                minHeight: zoom > 1 && isMobile ? "100vh" : "auto",
                objectFit: "contain",
                userSelect: "none",
                pointerEvents: "none",
              }}
              fallbackSrc={`https://via.placeholder.com/400x250/abc6ab/ffffff?text=${project.title}`}
            />
          </Box>
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
              <Box
                mb={16}
                style={{
                  height: "calc(100vh - 120px)", // Use available height minus header/margins
                  width: "calc(100vh - 120px)", // Make width equal to height
                  maxWidth: "100%", // Prevent overflow on smaller screens
                  margin: "0 auto", // Center the square
                  aspectRatio: "1 / 1", // Fallback for modern browsers
                }}
              >
                <OrbitViewer3D
                  photo360={project.images360[0]}
                  photos360={project.images360}
                  height="100%"
                  enableZoom={true}
                  minDistance={40}
                  maxDistance={75}
                  style={{
                    border: "2px solid #abc6ab",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
            </Suspense>
          </Flex>
        </Modal>
      )}
    </motion.div>
  );
}
