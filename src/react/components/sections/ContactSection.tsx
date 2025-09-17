import {
  Box,
  Container,
  Stack,
  Title,
  Text,
  Grid,
  Card,
  ActionIcon,
  Divider,
} from '@mantine/core';
import {
  IconBrandInstagram,
  IconListDetails,
  IconMail,
} from '@tabler/icons-react';

import type { ContactInfo } from '../../types';

export function ContactSection() {
  const contactInfo: ContactInfo = {
    email: 'contato@studioline.com.br',
    whatsapp: '+55 11 99999-9999',
    instagram: '@studiolinedetalhamentos',
    address: 'São Paulo, SP - Brasil',
    phone: '+55 11 3333-4444',
  };

  const handleEmailClick = () => {
    window.open(`mailto:${contactInfo.email}`, '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://instagram.com/studiolinedetalhamentos', '_blank');
  };

  return (
    <Box component="section" id="contact" py="xl" bg="white">
      <Container size="xl">
        <Stack align='center' gap="xl">
          {/* Header */}
          <Stack align="center" gap="md">
            <Title order={2} ta="center" c="neutral.8" size="2.5rem">
              Entre em Contato
            </Title>
            <Text ta="center" c="neutral.6" size="lg" maw={700} lh={1.6}>
              Pronto para transformar seu espaço? Entre em contato conosco e
              vamos conversar sobre seu projeto. Nossa equipe está pronta para
              criar soluções únicas e personalizadas.
            </Text>
          </Stack>

          {/* Contact Cards */}
          <Grid gutter="xl" mt="md">

           {/* Phone Card */}
            <Grid.Col span={{ base: 12 }}>
              <Card
                shadow="sm"
                padding="xl"
                radius="lg"
                style={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: '1px solid var(--mantine-color-neutral-2)',
                }}
                onClick={() => {window.open(import.meta.env.PUBLIC_FORM_URL, '_blank')}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow =
                    '0 8px 25px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                }}
              >
                <Stack align="center" gap="md">
                  <ActionIcon
                    variant="light"
                    color="gray"
                    size="xl"
                    radius="xl"
                  >
                    <IconListDetails size={24} />
                  </ActionIcon>
                  <Stack align="center" gap="xs">
                    <Text fw={600} c="neutral.8">
                      Faça um orçamento sem compromisso
                    </Text>
                    <Text size="sm" c="neutral.6" ta="center">
                      Nossa equipe entrará em contato com você o mais breve possível
                    </Text>
                    <Text size="xs" c="sage.6" ta="center">
                      {/* Horário comercial */}
                    </Text>
                  </Stack>
                </Stack>
              </Card>
            </Grid.Col>

            {/* Email Card */}
            <Grid.Col span={{ base: 12, sm: 6, md: 6 }}>
              <Card
                shadow="sm"
                padding="xl"
                radius="lg"
                style={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: '1px solid var(--mantine-color-neutral-2)',
                }}
                onClick={handleEmailClick}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow =
                    '0 8px 25px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                }}
              >
                <Stack align="center" gap="md">
                  <ActionIcon
                    variant="light"
                    color="sage"
                    size="xl"
                    radius="xl"
                  >
                    <IconMail size={24} />
                  </ActionIcon>
                  <Stack align="center" gap="xs">
                    <Text fw={600} c="neutral.8">
                      E-mail
                    </Text>
                    <Text size="sm" c="neutral.6" ta="center">
                      {contactInfo.email}
                    </Text>
                    <Text size="xs" c="sage.6" ta="center">
                      Contato formal
                    </Text>
                  </Stack>
                </Stack>
              </Card>
            </Grid.Col>

            {/* Instagram Card */}
            <Grid.Col span={{ base: 12, sm: 6, md: 6 }}>
              <Card
                shadow="sm"
                padding="xl"
                radius="lg"
                style={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: '1px solid var(--mantine-color-neutral-2)',
                }}
                onClick={handleInstagramClick}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow =
                    '0 8px 25px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                }}
              >
                <Stack align="center" gap="md">
                  <ActionIcon
                    variant="light"
                    color="blush"
                    size="xl"
                    radius="xl"
                  >
                    <IconBrandInstagram size={24} />
                  </ActionIcon>
                  <Stack align="center" gap="xs">
                    <Text fw={600} c="neutral.8">
                      Instagram
                    </Text>
                    <Text size="sm" c="neutral.6" ta="center">
                      {contactInfo.instagram}
                    </Text>
                    <Text size="xs" c="blush.6" ta="center">
                      Nossos projetos
                    </Text>
                  </Stack>
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>
          <Divider my="xl" />
        </Stack>
      </Container>
    </Box>
  );
}
