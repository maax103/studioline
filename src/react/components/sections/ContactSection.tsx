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

  // const handleWhatsAppClick = () => {
  //   const message = encodeURIComponent(
  //     'Olá! Gostaria de saber mais sobre os serviços da Studio Line Arquitetura.'
  //   );
  //   const phoneNumber = contactInfo.whatsapp.replace(/\D/g, '');
  //   window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  // };

  const handleEmailClick = () => {
    window.open(`mailto:${contactInfo.email}`, '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://instagram.com/studiolinedetalhamentos', '_blank');
  };

  // const handlePhoneClick = () => {
  //   window.open(`tel:${contactInfo.phone}`, '_blank');
  // };

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
            {/* WhatsApp Card */}
            {/* <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
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
                onClick={handleWhatsAppClick}
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
                    <IconBrandWhatsapp size={24} />
                  </ActionIcon>
                  <Stack align="center" gap="xs">
                    <Text fw={600} c="neutral.8">
                      WhatsApp
                    </Text>
                    <Text size="sm" c="neutral.6" ta="center">
                      {contactInfo.whatsapp}
                    </Text>
                    <Text size="xs" c="sage.6" ta="center">
                      Resposta rápida
                    </Text>
                  </Stack>
                </Stack>
              </Card>
            </Grid.Col> */}

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

            {/* Phone Card */}
            {/* <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
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
                onClick={handlePhoneClick}
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
                    <IconPhone size={24} />
                  </ActionIcon>
                  <Stack align="center" gap="xs">
                    <Text fw={600} c="neutral.8">
                      Telefone
                    </Text>
                    <Text size="sm" c="neutral.6" ta="center">
                      {contactInfo.phone}
                    </Text>
                    <Text size="xs" c="sage.6" ta="center">
                      Horário comercial
                    </Text>
                  </Stack>
                </Stack>
              </Card>
            </Grid.Col> */}

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

          {/* Call to Action
          <Stack align="center" gap="lg">
            <Text ta="center" c="neutral.7" size="md" maw={500}>
              Prefere um contato mais direto? Escolha a forma que for mais
              conveniente para você.
            </Text>
            <Group gap="lg">
              <Button
                variant="filled"
                color="sage"
                size="lg"
                leftSection={<IconBrandWhatsapp size={20} />}
                onClick={handleWhatsAppClick}
              >
                Conversar no WhatsApp
              </Button>
              <Button
                variant="outline"
                color="blush"
                size="lg"
                leftSection={<IconMail size={20} />}
                onClick={handleEmailClick}
              >
                Enviar E-mail
              </Button>
            </Group>
          </Stack> */}
        </Stack>
      </Container>
    </Box>
  );
}
