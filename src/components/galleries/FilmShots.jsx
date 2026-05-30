import { Box } from "@mui/material";
import React from "react";
import { getPhotoAlbumByName } from "../../photos";
import ClosingMessage from "../ClosingMessage";
import { ContentFlowGrid } from "../ContentFlowGrid";
import Footer from "../Footer";
import PhotoViewer from "../PhotoViewer";

const FilmShots = () => {
  return (
    <ContentFlowGrid>
      <Box>
        <h2>Film Shots</h2>
        <p>A small selection of my favourite film shots from a few of the stops.</p>
      </Box>

      <PhotoViewer album={getPhotoAlbumByName("lake-louise")} />
      <PhotoViewer album={getPhotoAlbumByName("album-blurry-1")} />
      <PhotoViewer album={getPhotoAlbumByName("album-blurry-3")} />
      <PhotoViewer album={getPhotoAlbumByName("album-blurry-6")} />
      <PhotoViewer album={getPhotoAlbumByName("downtown-drumheller")} />

      <ClosingMessage />
      <Footer />
    </ContentFlowGrid>
  );
};

export { FilmShots };
