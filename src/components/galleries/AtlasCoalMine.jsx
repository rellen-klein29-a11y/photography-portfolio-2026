import { Box } from "@mui/material";
import React from "react";
import { getPhotoAlbumByName } from "../../photos";
import ClosingMessage from "../ClosingMessage";
import { ContentFlowGrid } from "../ContentFlowGrid";
import Footer from "../Footer";
import PhotoViewer from "../PhotoViewer";

const AtlasCoalMine = () => {
  return (
    <ContentFlowGrid>
      <Box>
        <h2>Atlas Coal Mine</h2>
      </Box>

      <PhotoViewer album={getPhotoAlbumByName("interactive-atlas-coal-mine")} />

      <PhotoViewer album={getPhotoAlbumByName("atlas-coal-mine")} />
      <PhotoViewer album={getPhotoAlbumByName("atlas-coal-mine-split")} />
      <PhotoViewer album={getPhotoAlbumByName("atlas-h-way")} />
      <PhotoViewer album={getPhotoAlbumByName("wildfire-coal")} />
      <PhotoViewer album={getPhotoAlbumByName("atlas-coal-mine-downtown-drum")} />
      <PhotoViewer album={getPhotoAlbumByName("atlas-truck")} />

      <ClosingMessage />
      <Footer />
    </ContentFlowGrid>
  );
};

export { AtlasCoalMine };
