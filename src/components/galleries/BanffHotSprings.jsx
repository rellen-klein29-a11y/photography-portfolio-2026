import { Box } from "@mui/material";
import React from "react";
import { getPhotoAlbumByName } from "../../photos";
import ClosingMessage from "../ClosingMessage";
import { ContentFlowGrid } from "../ContentFlowGrid";
import Footer from "../Footer";
import PhotoViewer from "../PhotoViewer";

const BanffHotSprings = () => {
  return (
    <ContentFlowGrid>
      <Box>
        <h2>Banff Hot Springs</h2>
      </Box>

      <PhotoViewer album={getPhotoAlbumByName("banff-hot-springs-sunset")} />
      <PhotoViewer
        album={getPhotoAlbumByName("film-banff-hot-springs-sunset")}
      />

      <PhotoViewer
        album={getPhotoAlbumByName("interactive-banff-hot-springs")}
      />

      <ClosingMessage />
      <Footer />
    </ContentFlowGrid>
  );
};

export { BanffHotSprings };
