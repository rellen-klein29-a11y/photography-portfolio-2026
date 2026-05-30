import { Box } from "@mui/material";
import React from "react";
import { getPhotoAlbumByName } from "../../photos";
import ClosingMessage from "../ClosingMessage";
import { ContentFlowGrid } from "../ContentFlowGrid";
import Footer from "../Footer";
import PhotoViewer from "../PhotoViewer";

const LastChanceSaloon = () => {
  return (
    <ContentFlowGrid>
      <Box>
        <h2>Last Chance Saloon</h2>
      </Box>

      <PhotoViewer album={getPhotoAlbumByName("last-chance-saloon")} />
      <PhotoViewer album={getPhotoAlbumByName("henry-last-chance-saloon")} />

      <ClosingMessage />
      <Footer />
    </ContentFlowGrid>
  );
};

export { LastChanceSaloon };
