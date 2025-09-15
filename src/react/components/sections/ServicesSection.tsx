import {
  Box,
  Container,
  Stack,
  Title,
  Text,
  SimpleGrid,
  Card,
  Group,
  ThemeIcon,
  List,
  Divider,
} from '@mantine/core';
import {
  IconBuilding,
  IconUsers,
  IconRuler2,
  IconPalette,
  IconClipboardCheck,
  IconBulb,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useScrollToSection } from '../../hooks';

import type { Service } from '../../types';

interface ServicesSectionProps {
  services?: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const scrollToSection = useScrollToSection();

  const defaultServices: Service[] = [
    {
      id: 'projects',
      title: 'Projetos de Interiores',
      description:
        'Desenvolvemos projetos completos para residências e estabelecimentos comerciais, desde o conceito inicial até a execução final.',
      icon: 'building',
    },
    {
      id: 'consulting',
      title: 'Consultoria Especializada',
      description:
        'Oferecemos consultoria técnica para otimização de espaços, adequação de projetos e soluções personalizadas para suas necessidades.',
      icon: 'users',
    },
  ];

  const servicesData = services || defaultServices;

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'building':
        return <IconBuilding size={28} />;
      case 'users':
        return <IconUsers size={28} />;
      case 'ruler':
        return <IconRuler2 size={28} />;
      case 'palette':
        return <IconPalette size={28} />;
      case 'check':
        return <IconClipboardCheck size={28} />;
      case 'bulb':
        return <IconBulb size={28} />;
      default:
        return <IconBuilding size={28} />;
    }
  };

  const serviceDetails = {
    projects: [
      'Projetos residenciais completos',
      'Arquitetura comercial e corporativa',
      'Reformas e ampliações',
      'Acompanhamento de obra',
    ],
    consulting: [
      'Análise de viabilidade técnica',
      'Otimização de espaços existentes',
      'Consultoria em sustentabilidade',
      'Adequação às normas técnicas',
      'Assessoria em aprovações',
    ],
  };

  // Animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <Box component="section" id="services" py="xl" bg="white">
      <Container size="xl">
        <Stack gap="xl">
          {/* Header */}
          <Stack align="center" gap="md">
            <Title order={2} ta="center" c="neutral.8" size="2.5rem">
              Nossos Serviços
            </Title>
            <Text ta="center" c="neutral.6" size="lg" maw={600} lh={1.6}>
              Oferecemos soluções completas em arquitetura, desde o conceito
              inicial até a execução final do projeto.
            </Text>
          </Stack>

          {/* Services Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
              {servicesData.map((service, index) => (
                <motion.div key={service.id} variants={cardVariants}>
                  <Card
                    shadow="sm"
                    padding="xl"
                    radius="lg"
                    style={{
                      height: '100%',
                      border: '1px solid var(--mantine-color-neutral-2)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow =
                        '0 12px 30px rgba(0,0,0,0.12)';
                      e.currentTarget.style.borderColor =
                        index === 0
                          ? 'var(--mantine-color-sage-3)'
                          : 'var(--mantine-color-blush-3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow =
                        '0 1px 3px rgba(0,0,0,0.1)';
                      e.currentTarget.style.borderColor =
                        'var(--mantine-color-neutral-2)';
                    }}
                  >
                    <Stack gap="lg">
                      {/* Icon and Title */}
                      <Group gap="md">
                        <ThemeIcon
                          size="xl"
                          radius="xl"
                          variant="light"
                          color={index === 0 ? 'sage' : 'blush'}
                        >
                          {getIcon(service.icon)}
                        </ThemeIcon>
                        <Title order={3} c="neutral.8" size="1.5rem">
                          {service.title}
                        </Title>
                      </Group>

                      {/* Description */}
                      <Text c="neutral.6" lh={1.6} size="md">
                        {service.description}
                      </Text>

                      <Divider color="neutral.2" />

                      {/* Service Details */}
                      <Stack gap="xs">
                        <Text fw={600} c="neutral.7" size="sm">
                          Inclusos no serviço:
                        </Text>
                        <List
                          spacing="xs"
                          size="sm"
                          center
                          icon={
                            <ThemeIcon
                              color={index === 0 ? 'sage' : 'blush'}
                              size={16}
                              radius="xl"
                              variant="light"
                            >
                              <IconClipboardCheck size={12} />
                            </ThemeIcon>
                          }
                        >
                          {serviceDetails[
                            service.id as keyof typeof serviceDetails
                          ]?.map((item, idx) => (
                            <List.Item key={idx}>
                              <Text c="neutral.6" size="sm">
                                {item}
                              </Text>
                            </List.Item>
                          ))}
                        </List>
                      </Stack>
                    </Stack>
                  </Card>
                </motion.div>
              ))}
            </SimpleGrid>
          </motion.div>

          {/* Call to Action */}
          <Stack align="center" gap="md" mt="lg">
            <Text ta="center" c="neutral.7" size="md" maw={500}>
              Interessado em nossos serviços? Entre em contato para uma consulta
              personalizada e gratuita.
            </Text>
            <Text
              component="span"
              c="sage.6"
              fw={600}
              style={{
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '1.1rem',
              }}
              onClick={() => scrollToSection('contact', { offset: 70 })}
            >
              Falar com nossa equipe →
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
