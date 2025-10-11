import { MantineProvider } from "@mantine/core";
import { theme } from "../../theme";
import { ProjectsProvider } from "../contexts/ProjectsContext";
import { ProjectDetailsPage } from "./ProjectDetailsPage";
import { Footer } from "../components/layout";
import { useEffect, useState } from "react";

export const ProjectDetailsWrapper = ({
  id,
  currentPath,
}: {
  id: string;
  currentPath: string;
}) => {
  const [isEmbed, setIsEmbed] = useState(false);

  useEffect(() => {
    // Check for embed parameter on the client side
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const embedParam = urlParams.get("embed");
      setIsEmbed(embedParam !== null && embedParam !== "false");
    }
  }, []);

  return (
    <MantineProvider theme={theme}>
      <ProjectsProvider>
        <ProjectDetailsPage id={id} isEmbed={isEmbed} />
        {!isEmbed && <Footer currentPath={currentPath} />}
      </ProjectsProvider>
    </MantineProvider>
  );
};
