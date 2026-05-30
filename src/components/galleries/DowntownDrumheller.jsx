import { Box } from "@mui/material";
import React from "react";
import { getPhotoAlbumByName } from "../../photos";
import ClosingMessage from "../ClosingMessage";
import { ContentFlowGrid } from "../ContentFlowGrid";
import Footer from "../Footer";
import PhotoViewer from "../PhotoViewer";

const DowntownDrumheller = () => {
  return (
    <ContentFlowGrid>
      <Box>
        <h2>Downtown Drumheller</h2>
      </Box>

      <PhotoViewer album={getPhotoAlbumByName("downtown-drumheller")} />
      <PhotoViewer album={getPhotoAlbumByName("drum-big-dino")} />
      <PhotoViewer album={getPhotoAlbumByName("drum-black-dino")} />
      <PhotoViewer album={getPhotoAlbumByName("atlas-coal-mine-downtown-drum")} />

      <ClosingMessage />
      <Footer />
    </ContentFlowGrid>
  );
};

export { DowntownDrumheller };
