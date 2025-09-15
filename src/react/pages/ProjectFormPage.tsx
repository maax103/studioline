import { useState } from "react";
import {
  Container,
  Title,
  TextInput,
  Textarea,
  Switch,
  Select,
  NumberInput,
  Button,
  Group,
  Stack,
  ActionIcon,
  Paper,
  Code,
  ScrollArea,
  Divider,
  MantineProvider
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconPlus, IconTrash, IconCopy } from "@tabler/icons-react";
import type { Project, Photo360, HotspotNode } from "../types/Project";
import { theme } from "../../theme";
import { ProjectsProvider } from "../contexts/ProjectsContext";

interface FormData {
  id: string;
  title: string;
  description: string;
  highlight: boolean;
  thumbnail: string;
  images: string[];
  images360: Photo360[];
  category: "residential" | "commercial";
  year?: number;
  location?: string;
  area?: string;
  specifications?: Record<string, string>;
  specificationEntries?: Array<{ id: string; key: string; value: string }>;
}

export function ProjectFormPage() {
  const [jsonOutput, setJsonOutput] = useState<string>("");

  const form = useForm<FormData>({
    initialValues: {
      id: "",
      title: "",
      description: "",
      highlight: false,
      thumbnail: "",
      images: [""],
      images360: [],
      category: "residential",
      year: undefined,
      location: "",
      area: "",
      specifications: {},
      specificationEntries: [],
    },
    validate: {
      id: (value) => (!value ? "ID é obrigatório" : null),
      title: (value) => (!value ? "Título é obrigatório" : null),
      description: (value) => (!value ? "Descrição é obrigatória" : null),
      thumbnail: (value) => (!value ? "Thumbnail é obrigatório" : null),
      images: (value) =>
        value.length === 0 || !value[0]
          ? "Pelo menos uma imagem é obrigatória"
          : null,
    },
  });

  const addImage = () => {
    form.setFieldValue("images", [...form.values.images, ""]);
  };

  const removeImage = (index: number) => {
    const newImages = form.values.images.filter((_, i) => i !== index);
    form.setFieldValue("images", newImages.length ? newImages : [""]);
  };

  const addPhoto360 = () => {
    const newPhoto: Photo360 = {
      id: "",
      name: "",
      imageUrl: "",
      defaultCameraPosition: [0, 0],
      nodes: [],
    };
    form.setFieldValue("images360", [...form.values.images360, newPhoto]);
  };

  const removePhoto360 = (index: number) => {
    form.setFieldValue(
      "images360",
      form.values.images360.filter((_, i) => i !== index)
    );
  };

  const addHotspot = (photoIndex: number) => {
    const newNode: HotspotNode = {
      id: "",
      label: "",
      spherical: { theta: 0, phi: 0 },
      scale: 1,
      targetPhotoId: "",
      cameraPosition: [0, 0],
    };
    const updatedPhotos = [...form.values.images360];
    updatedPhotos[photoIndex].nodes = [
      ...(updatedPhotos[photoIndex].nodes || []),
      newNode,
    ];
    form.setFieldValue("images360", updatedPhotos);
  };

  const removeHotspot = (photoIndex: number, nodeIndex: number) => {
    const updatedPhotos = [...form.values.images360];
    updatedPhotos[photoIndex].nodes = updatedPhotos[photoIndex].nodes?.filter(
      (_, i) => i !== nodeIndex
    );
    form.setFieldValue("images360", updatedPhotos);
  };

  const addSpecification = () => {
    const newEntry = { id: `spec_${Date.now()}`, key: "", value: "" };
    form.setFieldValue("specificationEntries", [
      ...(form.values.specificationEntries || []),
      newEntry,
    ]);
  };

  const removeSpecification = (id: string) => {
    form.setFieldValue(
      "specificationEntries",
      form.values.specificationEntries?.filter((entry) => entry.id !== id) || []
    );
  };

  const updateSpecificationKey = (id: string, newKey: string) => {
    const entries =
      form.values.specificationEntries?.map((entry) =>
        entry.id === id ? { ...entry, key: newKey } : entry
      ) || [];
    form.setFieldValue("specificationEntries", entries);
  };

  const updateSpecificationValue = (id: string, newValue: string) => {
    const entries =
      form.values.specificationEntries?.map((entry) =>
        entry.id === id ? { ...entry, value: newValue } : entry
      ) || [];
    form.setFieldValue("specificationEntries", entries);
  };

  const generateJson = () => {
    // Convert specificationEntries back to specifications object
    const specifications = form.values.specificationEntries?.reduce(
      (acc, entry) => {
        if (entry.key.trim()) {
          acc[entry.key] = entry.value;
        }
        return acc;
      },
      {} as Record<string, string>
    );

    const cleanData: Project = {
      ...form.values,
      images: form.values.images.filter((img) => img.trim()),
      year: form.values.year || undefined,
      location: form.values.location || undefined,
      area: form.values.area || undefined,
      specifications:
        specifications && Object.keys(specifications).length
          ? specifications
          : undefined,
    };

    const output = JSON.stringify(cleanData, null, 2);

    const jsOutput = `import type { Project } from '../../types';

const project: Project = ${output};

export default project;`;

    setJsonOutput(jsOutput);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput);
    notifications.show({ message: "Código copiado!", color: "green" });
  };

  return (
    <MantineProvider theme={theme}>
      <ProjectsProvider>
        <Container size="lg" py="xl">
          <Title order={1} mb="xl">
            Formulário de Projeto
          </Title>

          <form onSubmit={form.onSubmit(generateJson)}>
            <Stack gap="md">
              <Group grow>
                <TextInput label="ID" required {...form.getInputProps("id")} />
                <TextInput
                  label="Título"
                  required
                  {...form.getInputProps("title")}
                />
              </Group>

              <Textarea
                label="Descrição"
                required
                {...form.getInputProps("description")}
              />

              <Group>
                <Switch
                  label="Destacar na home"
                  {...form.getInputProps("highlight", { type: "checkbox" })}
                />
                <Select
                  label="Categoria"
                  data={[
                    { value: "residential", label: "Residencial" },
                    { value: "commercial", label: "Comercial" },
                  ]}
                  {...form.getInputProps("category")}
                />
              </Group>

              <TextInput
                label="Thumbnail"
                required
                {...form.getInputProps("thumbnail")}
              />

              <Group grow>
                <NumberInput label="Ano" {...form.getInputProps("year")} />
                <TextInput
                  label="Localização"
                  {...form.getInputProps("location")}
                />
                <TextInput label="Área" {...form.getInputProps("area")} />
              </Group>

              <Paper p="md" withBorder>
                <Group justify="space-between" mb="sm">
                  <Title order={4}>Imagens</Title>
                  <ActionIcon onClick={addImage} variant="light">
                    <IconPlus size={16} />
                  </ActionIcon>
                </Group>
                {form.values.images.map((_, index) => (
                  <Group key={index} mb="xs">
                    <TextInput
                      placeholder="URL da imagem"
                      style={{ flex: 1 }}
                      {...form.getInputProps(`images.${index}`)}
                    />
                    <ActionIcon
                      onClick={() => removeImage(index)}
                      variant="light"
                      color="red"
                      disabled={form.values.images.length === 1}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                ))}
              </Paper>

              <Paper p="md" withBorder>
                <Group justify="space-between" mb="sm">
                  <Title order={4}>Especificações</Title>
                  <ActionIcon onClick={addSpecification} variant="light">
                    <IconPlus size={16} />
                  </ActionIcon>
                </Group>
                {(form.values.specificationEntries || []).map((entry) => (
                  <Group key={entry.id} mb="xs">
                    <TextInput
                      placeholder="Chave"
                      value={entry.key}
                      onChange={(e) =>
                        updateSpecificationKey(entry.id, e.target.value)
                      }
                    />
                    <TextInput
                      placeholder="Valor"
                      value={entry.value}
                      onChange={(e) =>
                        updateSpecificationValue(entry.id, e.target.value)
                      }
                      style={{ flex: 1 }}
                    />
                    <ActionIcon
                      onClick={() => removeSpecification(entry.id)}
                      variant="light"
                      color="red"
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                ))}
              </Paper>

              <Paper p="md" withBorder>
                <Group justify="space-between" mb="sm">
                  <Title order={4}>Fotos 360°</Title>
                  <ActionIcon onClick={addPhoto360} variant="light">
                    <IconPlus size={16} />
                  </ActionIcon>
                </Group>
                {form.values.images360.map((photo, photoIndex) => (
                  <Paper key={photoIndex} p="sm" withBorder mb="md">
                    <Group justify="space-between" mb="sm">
                      <Title order={5}>Foto 360° #{photoIndex + 1}</Title>
                      <ActionIcon
                        onClick={() => removePhoto360(photoIndex)}
                        variant="light"
                        color="red"
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                    <Stack gap="xs">
                      <Group grow>
                        <TextInput
                          label="ID"
                          {...form.getInputProps(`images360.${photoIndex}.id`)}
                        />
                        <TextInput
                          label="Nome"
                          {...form.getInputProps(
                            `images360.${photoIndex}.name`
                          )}
                        />
                      </Group>
                      <TextInput
                        label="URL da Imagem"
                        {...form.getInputProps(
                          `images360.${photoIndex}.imageUrl`
                        )}
                      />
                      <Group grow>
                        <NumberInput
                          label="Theta"
                          step={0.1}
                          {...form.getInputProps(
                            `images360.${photoIndex}.defaultCameraPosition.0`
                          )}
                        />
                        <NumberInput
                          label="Phi"
                          step={0.1}
                          {...form.getInputProps(
                            `images360.${photoIndex}.defaultCameraPosition.1`
                          )}
                        />
                      </Group>

                      <Divider label="Hotspots" />
                      <Group justify="space-between">
                        <Title order={6}>Hotspots</Title>
                        <ActionIcon
                          onClick={() => addHotspot(photoIndex)}
                          variant="light"
                          size="sm"
                        >
                          <IconPlus size={14} />
                        </ActionIcon>
                      </Group>
                      {photo.nodes?.map((_, nodeIndex) => (
                        <Paper key={nodeIndex} p="xs" withBorder>
                          <Group justify="space-between" mb="xs">
                            <Title order={6} size="sm">
                              Hotspot #{nodeIndex + 1}
                            </Title>
                            <ActionIcon
                              onClick={() =>
                                removeHotspot(photoIndex, nodeIndex)
                              }
                              variant="light"
                              color="red"
                              size="sm"
                            >
                              <IconTrash size={12} />
                            </ActionIcon>
                          </Group>
                          <Group grow>
                            <TextInput
                              label="ID"
                              size="xs"
                              {...form.getInputProps(
                                `images360.${photoIndex}.nodes.${nodeIndex}.id`
                              )}
                            />
                            <TextInput
                              label="Label"
                              size="xs"
                              {...form.getInputProps(
                                `images360.${photoIndex}.nodes.${nodeIndex}.label`
                              )}
                            />
                          </Group>
                          <Group grow>
                            <NumberInput
                              label="Theta"
                              size="xs"
                              step={0.1}
                              {...form.getInputProps(
                                `images360.${photoIndex}.nodes.${nodeIndex}.spherical.theta`
                              )}
                            />
                            <NumberInput
                              label="Phi"
                              size="xs"
                              step={0.1}
                              {...form.getInputProps(
                                `images360.${photoIndex}.nodes.${nodeIndex}.spherical.phi`
                              )}
                            />
                          </Group>
                          <Group grow>
                            <NumberInput
                              label="Scale"
                              size="xs"
                              step={0.1}
                              {...form.getInputProps(
                                `images360.${photoIndex}.nodes.${nodeIndex}.scale`
                              )}
                            />
                            <TextInput
                              label="Target Photo ID"
                              size="xs"
                              {...form.getInputProps(
                                `images360.${photoIndex}.nodes.${nodeIndex}.targetPhotoId`
                              )}
                            />
                          </Group>
                        </Paper>
                      ))}
                    </Stack>
                  </Paper>
                ))}
              </Paper>

              <Button type="submit" size="lg">
                Gerar Código JavaScript
              </Button>
            </Stack>
          </form>

          {jsonOutput && (
            <Paper p="md" withBorder mt="xl">
              <Group justify="space-between" mb="sm">
                <Title order={4}>Código JavaScript Gerado</Title>
                <ActionIcon onClick={copyToClipboard} variant="light">
                  <IconCopy size={16} />
                </ActionIcon>
              </Group>
              <ScrollArea h={300}>
                <Code block>{jsonOutput}</Code>
              </ScrollArea>
            </Paper>
          )}
        </Container>
      </ProjectsProvider>
    </MantineProvider>
  );
}
