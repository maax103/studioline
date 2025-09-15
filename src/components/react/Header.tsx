import {
  AppShell,
  Group,
  Text,
  Burger,
  Drawer,
  Stack,
  Anchor,
  Container,
  Box,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useScrollToSection } from '../../react/hooks';

interface HeaderProps {
  activeSection?: string;
}

const navigationItems = [
  { label: 'Serviços', href: '#services' },
  { label: 'Galeria', href: '#gallery' },
  { label: 'Contato', href: '#contact' },
];

export function Header({ activeSection }: HeaderProps) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const scrollTo = useScrollToSection();

  const handleSmoothScroll = (href: string) => {
    const targetId = href.replace('#', '');

    scrollTo(targetId);
    closeDrawer();
  };

  const isActive = (href: string) => {
    const sectionId = href.replace('#', '');
    return activeSection === sectionId;
  };

  return (
    <>
      <AppShell.Header
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid #e9ecef',
        }}
      >
        <Container size="xl" h="100%">
          <Group h="100%" justify="space-between" align="center">
            {/* Logo */}
            <Text
              size="xl"
              fw={600}
              c="sage.6"
              style={{ cursor: 'pointer' }}
              onClick={() => handleSmoothScroll('#hero')}
            >
              Studio Line
            </Text>

            {/* Desktop Navigation */}
            <Group gap="xl" visibleFrom="sm">
              {navigationItems.map((item) => (
                <Anchor
                  key={item.href}
                  onClick={() => handleSmoothScroll(item.href)}
                  style={{
                    textDecoration: 'none',
                    color: isActive(item.href)
                      ? 'var(--mantine-color-sage-6)'
                      : 'var(--mantine-color-neutral-7)',
                    fontWeight: isActive(item.href) ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.href)) {
                      e.currentTarget.style.color =
                        'var(--mantine-color-sage-5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.href)) {
                      e.currentTarget.style.color =
                        'var(--mantine-color-neutral-7)';
                    }
                  }}
                >
                  {item.label}
                </Anchor>
              ))}
            </Group>

            {/* Mobile Menu Button */}
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
              size="sm"
              color="sage.6"
            />
          </Group>
        </Container>
      </AppShell.Header>

      {/* Mobile Drawer */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        title={
          <Text size="lg" fw={600} c="sage.6">
            Studio Line
          </Text>
        }
        padding="md"
        size="xs"
        position="right"
      >
        <Stack gap="lg" mt="md">
          {navigationItems.map((item) => (
            <Box key={item.href}>
              <Anchor
                onClick={() => handleSmoothScroll(item.href)}
                style={{
                  textDecoration: 'none',
                  color: isActive(item.href)
                    ? 'var(--mantine-color-sage-6)'
                    : 'var(--mantine-color-neutral-7)',
                  fontWeight: isActive(item.href) ? 600 : 500,
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  display: 'block',
                  padding: '0.5rem 0',
                }}
              >
                {item.label}
              </Anchor>
            </Box>
          ))}
        </Stack>
      </Drawer>
    </>
  );
}
