import { Box } from '@mui/material';
import React from 'react';
import { getPhotoAlbumByName } from '../../photos';
import ClosingMessage from '../ClosingMessage';
import { ContentFlowGrid } from '../ContentFlowGrid';
import Footer from '../Footer';
import PhotoViewer from '../PhotoViewer';

const Other = () => {
  return (
    <ContentFlowGrid>
      <Box>
        <h2>Other / Unknown origin</h2>
        <p>
          A holding area for images with unknown origin/context, plus a short
          note about the Holga.
        </p>
      </Box>

      <PhotoViewer album={getPhotoAlbumByName('unknown-origin-about-holga')} />

      <ClosingMessage />
      <Footer />
    </ContentFlowGrid>
  );
};

export { Other };

