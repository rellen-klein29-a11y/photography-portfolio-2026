import { Box } from '@mui/material';
import React from 'react';
import { getPhotoAlbumByName } from '../../photos';
import ClosingMessage from '../ClosingMessage';
import { ContentFlowGrid } from '../ContentFlowGrid';
import Footer from '../Footer';
import PhotoViewer from '../PhotoViewer';

const Interactive = () => {
  return (
    <ContentFlowGrid>
      <Box>
        <h2>Interactive</h2>
        <p>
          Then-and-now comparisons. Flip the toggle to compare old images with
          new photos.
        </p>
        <p>
          <a href="/interactive-descriptions">Click here to read full descriptions</a>
        </p>
      </Box>

      <PhotoViewer
        album={getPhotoAlbumByName('interactive-blackfoot-crossing')}
        slimDescription={false}
      />

      <PhotoViewer
        album={getPhotoAlbumByName('interactive-atlas-coal-mine')}
        slimDescription={false}
      />

      <PhotoViewer
        album={getPhotoAlbumByName('interactive-lake-louise')}
        slimDescription={false}
      />

      <ClosingMessage />
      <Footer />
    </ContentFlowGrid>
  );
};

export { Interactive };
