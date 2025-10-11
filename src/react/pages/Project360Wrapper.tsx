import { Box, Loader, MantineProvider } from "@mantine/core";
import { theme } from "../../theme";
import { ProjectsProvider } from "../contexts/ProjectsContext";
import { ProjectDetailsPage } from "./ProjectDetailsPage";
import { Footer } from "../components/layout";
import { Suspense, useEffect, useState } from "react";
import { OrbitViewer3D } from "../components/3d/OrbitViewer3D";
import { useProjects } from "../hooks";

export const Project360Wrapper = ({
  id,
  currentPath,
}: {
  id: string;
  currentPath: string;
}) => {
  const Project360 = () => {
    const { getProjectById } = useProjects();
    const project = id ? getProjectById(id) : undefined;
    console.log(project);

    if (!project || !project.images360 || project.images360.length === 0) {
      return <h1>ola mundo 1</h1>;
    }

    return (
      <Box
        p={5}
        style={{
          height: "100dvh",
          width: "100dvh",
          maxWidth: "100%",
          margin: "0 auto",
          aspectRatio: "1 / 1",
        }}
      >
        <OrbitViewer3D
          photo360={project.images360[0]}
          photos360={project.images360}
          height="100%"
          enableZoom={true}
          minDistance={40}
          maxDistance={75}
        />
      </Box>
    );
  };

  return (
    <MantineProvider theme={theme}>
      <ProjectsProvider>
        <Project360 />
      </ProjectsProvider>
    </MantineProvider>
  );
};
