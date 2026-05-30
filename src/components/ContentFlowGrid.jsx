import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import { useContentSize } from '../hooks/useContentSize';

const ContentFlowGrid = ({ children }) => {
  const contentSize = useContentSize();
  return (
    <Box
      sx={{
        display: 'grid',
        gap: '50px',
        gridTemplateColumns: contentSize,
        justifyContent: 'center',
        color: (theme) => theme.palette.text.secondary,
      }}
    >
      {children}
    </Box>
  );
};

ContentFlowGrid.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ContentFlowGrid };
