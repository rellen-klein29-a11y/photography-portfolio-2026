import { Box } from '@mui/material';
import React from 'react';
import { getPhotoAlbumByName } from '../../photos';
import ClosingMessage from '../ClosingMessage';
import { ContentFlowGrid } from '../ContentFlowGrid';
import Footer from '../Footer';
import PhotoViewer from '../PhotoViewer';

const AlbumPhotos = () => {
  return (
    <ContentFlowGrid>
      <Box>
        <h2>Album Photos</h2>
        <p>These are a selection of photos I thought would look great as album covers. For more information about the shots of the fungus, see <a href="/about">About</a>.</p>
      </Box>

      <PhotoViewer album={getPhotoAlbumByName('album-blurry-1')} />
      <PhotoViewer album={getPhotoAlbumByName('album-blurry-2')} />
      <PhotoViewer album={getPhotoAlbumByName('album-blurry-4')} />
      <PhotoViewer album={getPhotoAlbumByName('album-blurry-5')} />
      <PhotoViewer album={getPhotoAlbumByName('album-blurry-6')} />
      <PhotoViewer album={getPhotoAlbumByName('album-fungus-1')} />
      <PhotoViewer album={getPhotoAlbumByName('album-fungus-2')} />
      <PhotoViewer album={getPhotoAlbumByName('album-fungus-3')} />
      <PhotoViewer album={getPhotoAlbumByName('album-fungus-4')} />
      <PhotoViewer album={getPhotoAlbumByName('album-fungus-5')} />

      <ClosingMessage />
      <Footer />
    </ContentFlowGrid>
  );
};

export { AlbumPhotos };

