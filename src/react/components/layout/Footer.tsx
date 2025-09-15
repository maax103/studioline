import {
  Box,
  Container,
  Grid,
  Group,
  Text,
  Anchor,
  Stack,
  Divider,
  ActionIcon,
} from '@mantine/core';
import {
  // IconBrandWhatsapp,
  IconBrandInstagram,
  IconMail,
} from '@tabler/icons-react';
import { useScrollToSection } from '../../hooks';

export function Footer({currentPath} : {currentPath: string}) {
  const shouldRenderNavigation = !currentPath.startsWith('/projeto/');
  const currentYear = new Date().getFullYear();
  const scrollToSection = useScrollToSection();

  const contactInfo = {
    email: 'contato@studioline.com.br',
    // whatsapp: '+55 47 9 9172-8142',
    instagram: '@studiolinedetalhamentos',
  };

  // const handleWhatsAppClick = () => {
  //   const message = encodeURIComponent(
  //     'Olá! Gostaria de saber mais sobre os serviços da Studio Line.'
  //   );
  //   const phoneNumber = contactInfo.whatsapp.replace(/\D/g, '');
  //   window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  // };

  const handleEmailClick = () => {
    window.open(`mailto:${contactInfo.email}`, '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://instagram.com/studioline.arquitetura', '_blank');
  };

  return (
    <Box
      component="footer"
      style={{
        backgroundColor: 'var(--mantine-color-neutral-0)',
        borderTop: '1px solid var(--mantine-color-neutral-2)',
      }}
    >
      <Container size="xl" py="xl">
        <Grid gutter="xl">
          {/* Logo e Descrição */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              <Text size="xl" fw={600} c="sage.6">
                Studio Line
              </Text>
              {/* <Text size="sm" c="neutral.6" lh={1.6}>
                Escritório de arquitetura especializado em projetos residenciais
                e comerciais. Transformamos ideias em espaços únicos e
                funcionais.
              </Text> */}
               <Text size="sm" c="neutral.6" lh={1.6}>
                Sua essência é nossa arquitetura.
              </Text>
            </Stack>
          </Grid.Col>

          {/* Links Rápidos */}
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            {shouldRenderNavigation && (
              <Stack gap="md">
                <Text fw={600} c="neutral.8">
                  Navegação
                </Text>
                <Stack gap="xs">
                  <Anchor
                    onClick={() => scrollToSection('services', { offset: 70 })}
                    style={{
                      textDecoration: 'none',
                      color: 'var(--mantine-color-neutral-6)',
                      cursor: 'pointer',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color =
                        'var(--mantine-color-sage-6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color =
                        'var(--mantine-color-neutral-6)';
                    }}
                  >
                    Serviços
                  </Anchor>
                  <Anchor
                    onClick={() => scrollToSection('gallery', { offset: 70 })}
                    style={{
                      textDecoration: 'none',
                      color: 'var(--mantine-color-neutral-6)',
                      cursor: 'pointer',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color =
                        'var(--mantine-color-sage-6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color =
                        'var(--mantine-color-neutral-6)';
                    }}
                  >
                    Galeria
                  </Anchor>
                  <Anchor
                    onClick={() => scrollToSection('contact', { offset: 70 })}
                    style={{
                      textDecoration: 'none',
                      color: 'var(--mantine-color-neutral-6)',
                      cursor: 'pointer',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color =
                        'var(--mantine-color-sage-6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color =
                        'var(--mantine-color-neutral-6)';
                    }}
                  >
                    Contato
                  </Anchor>
                </Stack>
              </Stack>
            )}
          </Grid.Col>

          {/* Contato */}
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <Stack gap="md">
              <Text fw={600} c="neutral.8">
                Contato
              </Text>
              <Stack gap="sm">
                <Group gap="xs">
                  <ActionIcon
                    variant="subtle"
                    color="sage"
                    size="sm"
                    onClick={handleEmailClick}
                    style={{ cursor: 'pointer' }}
                  >
                    <IconMail size={16} />
                  </ActionIcon>
                  <Anchor
                    onClick={handleEmailClick}
                    style={{
                      textDecoration: 'none',
                      color: 'var(--mantine-color-neutral-6)',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                    }}
                  >
                    {contactInfo.email}
                  </Anchor>
                </Group>

                {/* <Group gap="xs">
                  <ActionIcon
                    variant="subtle"
                    color="sage"
                    size="sm"
                    onClick={handleWhatsAppClick}
                    style={{ cursor: 'pointer' }}
                  >
                    <IconBrandWhatsapp size={16} />
                  </ActionIcon>
                  <Anchor
                    onClick={handleWhatsAppClick}
                    style={{
                      textDecoration: 'none',
                      color: 'var(--mantine-color-neutral-6)',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                    }}
                  >
                    {contactInfo.whatsapp}
                  </Anchor>
                </Group> */}

                <Group gap="xs">
                  <ActionIcon
                    variant="subtle"
                    color="blush"
                    size="sm"
                    onClick={handleInstagramClick}
                    style={{ cursor: 'pointer' }}
                  >
                    <IconBrandInstagram size={16} />
                  </ActionIcon>
                  <Anchor
                    onClick={handleInstagramClick}
                    style={{
                      textDecoration: 'none',
                      color: 'var(--mantine-color-neutral-6)',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                    }}
                  >
                    {contactInfo.instagram}
                  </Anchor>
                </Group>
              </Stack>
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider my="xl" color="neutral.2" />

        <Group justify="center" align="center">
          <Text size="sm" c="neutral.5">
            © {currentYear} Studio Line Arquitetura. Todos os direitos
            reservados.
          </Text>
          <Group gap="md">
            {/* <ActionIcon
              variant="subtle"
              color="sage"
              size="lg"
              onClick={handleWhatsAppClick}
              style={{ cursor: 'pointer' }}
            >
              <IconBrandWhatsapp size={20} />
            </ActionIcon> */}
            {/* <ActionIcon
              variant="subtle"
              color="blush"
              size="lg"
              onClick={handleInstagramClick}
              style={{ cursor: 'pointer' }}
            >
              <IconBrandInstagram size={20} />
            </ActionIcon> */}
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
