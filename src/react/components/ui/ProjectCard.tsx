import { useState } from 'react';
import {
  Card,
  Image,
  Text,
  Badge,
  Stack,
  Group,
  Box,
  // Tooltip,
} from '@mantine/core';
import {
  IconEye,
  IconCalendar,
  IconMapPin,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import type { Project } from '../../types';
import { getRealPath } from '../../../utils/assets';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'residential':
        return 'sage';
      case 'commercial':
        return 'blush';
      default:
        return 'sage';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'residential':
        return 'Residencial';
      case 'commercial':
        return 'Comercial';
      default:
        return category;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
      }}
    >
      <Card
        component='a'
        href={getRealPath(`/projeto/${project.id}`)}
        shadow="sm"
        padding="0"
        radius="lg"
        style={{
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          border: '1px solid var(--mantine-color-neutral-2)',
          overflow: 'hidden',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        }}
      >
        {/* Image Section */}
        <Box style={{ position: 'relative', overflow: 'hidden' }}>
          {!imageError ? (
            <Image
              src={project.thumbnail}
              height={250}
              alt={project.title}
              style={{
                transition: 'transform 0.3s ease',
                willChange: 'transform',
                opacity: 1,
              }}
              onError={() => setImageError(true)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />
          ) : (
            <Box
              h={250}
              style={{
                background: `linear-gradient(135deg, 
                  var(--mantine-color-${getCategoryColor(project.category)}-1) 0%, 
                  var(--mantine-color-${getCategoryColor(project.category)}-2) 100%
                )`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Stack align="center" gap="xs">
                <IconEye
                  size={32}
                  color={`var(--mantine-color-${getCategoryColor(project.category)}-6)`}
                />
                <Text
                  size="sm"
                  c={`${getCategoryColor(project.category)}.6`}
                  fw={500}
                >
                  {project.title}
                </Text>
              </Stack>
            </Box>
          )}

          {/* Category Badge */}
          <Badge
            variant="filled"
            color={getCategoryColor(project.category)}
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              textTransform: 'none',
            }}
          >
            {getCategoryLabel(project.category)}
          </Badge>
        </Box>

        {/* Content Section */}
        <Stack gap="md" p="lg">
          <Stack gap="xs">
            <Text fw={600} size="lg" c="neutral.8" lineClamp={2}>
              {project.title}
            </Text>
            <Text size="sm" c="neutral.6" lineClamp={3} lh={1.5}>
              {project.description}
            </Text>
          </Stack>

          <Group justify="space-between" align="center">
            <Group gap="xs">
              <IconCalendar size={14} color="var(--mantine-color-neutral-5)" />
              <Text size="xs" c="neutral.5">
                {project.year}
              </Text>
            </Group>

            {project.location && (
              <Group gap="xs">
                <IconMapPin size={14} color="var(--mantine-color-neutral-5)" />
                <Text size="xs" c="neutral.5">
                  {project.location}
                </Text>
              </Group>
            )}
          </Group>

          {project.area && (
            <Text
              size="xs"
              c={`${getCategoryColor(project.category)}.6`}
              fw={500}
            >
              {project.area}
            </Text>
          )}
        </Stack>
      </Card>
    </motion.div>
  );
}
