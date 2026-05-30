import { Box } from "@mui/material";
import React from "react";
import { getPhotoAlbumByName } from "../../photos";
import ClosingMessage from "../ClosingMessage";
import { ContentFlowGrid } from "../ContentFlowGrid";
import Footer from "../Footer";
import PhotoViewer from "../PhotoViewer";

const BlackfootCrossing = () => {
  return (
    <ContentFlowGrid>
      <Box>
        <h2>Blackfoot Crossing</h2>
      </Box>

      <PhotoViewer
        album={getPhotoAlbumByName("interactive-blackfoot-crossing")}
      />
      <PhotoViewer album={getPhotoAlbumByName("blackfoot-crossing-bnw")} />

      <ClosingMessage />
      <Footer />
    </ContentFlowGrid>
  );
};

export { BlackfootCrossing };
