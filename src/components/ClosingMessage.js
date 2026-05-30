import { Box } from '@mui/material';
import React from 'react';
import GalleryBar from './gallery-bar/GalleryBar';

function ClosingMessage() {
  return (
    <Box sx={{ textAlign: 'left', marginTop: '-60px' }}>
      <Box
        sx={{
          padding: '0 12px',
        }}
      >
        <GalleryBar />
      </Box>
      <h3 style={{ textAlign: 'center', letterSpacing: '4px' }}>***</h3>
      <p style={{ padding: '0 12px' }}>
        {`Thanks for checking out the galleries. You can use the social links at the top to find more work, and share any image directly using the "Share Link" option in the photo viewer.`}
      </p>
    </Box>
  );
}

export default ClosingMessage;
