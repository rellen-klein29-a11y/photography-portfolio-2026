import React from "react";
import { getPhotoAlbumByName } from "../../../photos";
import MainIntro from "../../blurbs/MainIntro";
import { ContentFlowGrid } from "../../ContentFlowGrid";
import Footer from "../../Footer";
import PhotoViewer from "../../PhotoViewer";
import { Box } from "@mui/material";

const MainStandard = () => {
  return (
    <ContentFlowGrid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <PhotoViewer
          album={getPhotoAlbumByName("album-blurry-3")}
          slimDescription={false}
        />
      </Box>

      <PhotoViewer album={getPhotoAlbumByName("lake-louise-building")} slimDescription={true} />

      <MainIntro />
      <Footer />
    </ContentFlowGrid>
  );
};

export { MainStandard };
