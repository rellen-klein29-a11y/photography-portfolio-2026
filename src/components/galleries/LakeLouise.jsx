import { Box } from "@mui/material";
import React from "react";
import { getPhotoAlbumByName } from "../../photos";
import ClosingMessage from "../ClosingMessage";
import { ContentFlowGrid } from "../ContentFlowGrid";
import Footer from "../Footer";
import PhotoViewer from "../PhotoViewer";

const LakeLouise = () => {
  return (
    <ContentFlowGrid>
      <Box>
        <h2>Lake Louise</h2>
      </Box>

      <PhotoViewer album={getPhotoAlbumByName("interactive-lake-louise")} />

      <PhotoViewer album={getPhotoAlbumByName("lake-louise-building")} />

      <Box>
        <h3>Lake Shots</h3>
      </Box>
      <PhotoViewer album={getPhotoAlbumByName("lake-louise")} />
      <PhotoViewer album={getPhotoAlbumByName("lake-louise-with-people")} />
      <PhotoViewer album={getPhotoAlbumByName("lake-louise-with-people-2")} />
      <PhotoViewer album={getPhotoAlbumByName("lake-louise-wide-best")} />
      <PhotoViewer album={getPhotoAlbumByName("lake-louise-wide")} />
      <PhotoViewer album={getPhotoAlbumByName("lake-louise-wide-2")} />
      <PhotoViewer album={getPhotoAlbumByName("lake-louise-wide-3")} />
      <PhotoViewer album={getPhotoAlbumByName("lake-louise-wide-4")} />
      <PhotoViewer album={getPhotoAlbumByName("lake-louise-wide-5")} />
      <PhotoViewer album={getPhotoAlbumByName("lake-louise-wide-6")} />
      <PhotoViewer album={getPhotoAlbumByName("lake-louise-wide-7")} />
      <PhotoViewer album={getPhotoAlbumByName("lake-louise-wide-8")} />
      <PhotoViewer album={getPhotoAlbumByName("lake-louise-wide-9")} />
      <PhotoViewer album={getPhotoAlbumByName("lake-louise-wide-10")} />

      <ClosingMessage />
      <Footer />
    </ContentFlowGrid>
  );
};

export { LakeLouise };
