import { MantineProvider } from "@mantine/core";
import { theme } from "../../theme";
import { ProjectsProvider } from "../contexts/ProjectsContext";
import { ProjectDetailsPage } from "./ProjectDetailsPage";
import { Footer } from "../components/layout";

export const ProjectDetailsWrapper = ({
  id,
  currentPath,
  isEmbed,
}: {
  id: string;
  currentPath: string;
  isEmbed: boolean;
}) => {
  return (
    <MantineProvider theme={theme}>
      <ProjectsProvider>
        <ProjectDetailsPage id={id} isEmbed={isEmbed} />
        {!isEmbed && <Footer currentPath={currentPath} />}
      </ProjectsProvider>
    </MantineProvider>
  );
};
