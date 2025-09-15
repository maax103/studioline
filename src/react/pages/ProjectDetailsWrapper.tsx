import { MantineProvider } from "@mantine/core";
import { theme } from "../../theme";
import { ProjectsProvider } from "../contexts/ProjectsContext";
import { ProjectDetailsPage } from "./ProjectDetailsPage";
import { Footer } from "../components/layout";

export const ProjectDetailsWrapper = ({
  id,
  currentPath,
}: {
  id: string;
  currentPath: string;
}) => {
  return (
    <MantineProvider theme={theme}>
      <ProjectsProvider>
        <ProjectDetailsPage id={id} />
        <Footer currentPath={currentPath} />
      </ProjectsProvider>
    </MantineProvider>
  );
};
