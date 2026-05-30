import { Box } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import React, { useCallback, useMemo, useState } from 'react';
import { Eyes } from 'react-halloween';
import { useLocation } from 'react-router-dom';
import { GalleryLink } from './GalleryLink';
import { getPhotoAlbumByName } from '../../photos';
import { galleries } from '../../photos/galleries';

/*
TODO: Ugh, this file is ugly and needs to be refactored
 */

const GalleryBar = () => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const [eyesOpen, setEyesOpen] = useState(false);
  const defaultGlowOptions = useMemo(
    () => ({
      boxShadowOff: `0px 0px 0px ${alpha(theme.palette.primary.main, 0)}`,
      boxShadowOn: `0px 0px 40px ${alpha(theme.palette.primary.main, 1)}`,
    }),
    [theme.palette.primary.main]
  );

  const getGlowOptions = (galleryName) => {
    const colorMap = {
      'last-chance-saloon': '#D2B48C',
      'blackfoot-crossing': '#6389BC',
      'downtown-drumheller': '#94CCE9',
      'lake-louise': '#38380E',
      'album-photos': '#2D371E',
    };
    const color = colorMap[galleryName] || theme.palette.primary.main;
    return {
      boxShadowOff: `0px 0px 0px ${alpha(color, 0)}`,
      boxShadowOn: `0px 0px 40px ${alpha(color, 1)}`,
    };
  };

  const onMouseEnter = useCallback(() => {
    setEyesOpen(true);
  }, [setEyesOpen]);
  const onMouseLeave = useCallback(() => {
    setEyesOpen(false);
  }, [setEyesOpen]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '40px',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Eyes
        width={200}
        irisColor={'crimson'}
        eyeBallColor={'rgb(255,220,220)'}
        pupilColor={'rgb(70,0,0)'}
        pupilSize={0.7}
        eyeShape={1}
        open={eyesOpen}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
          gap: '3rem',
        }}
      >
        {galleries
          .filter((g) => !g.name.startsWith('main-'))
          .filter((g) => pathname.indexOf(`/gallery/${g.name}`) === -1)
          .map((g) => {
            const album = getPhotoAlbumByName(g.photoName) || {};
            const imgSrc = album.photosNormalSize?.[0]?.['600'] || '';
            return (
              <GalleryLink
                key={g.name}
                glowOptions={getGlowOptions(g.name)}
                gallery={g.name}
                imgSrc={imgSrc}
                galleryName={g.label}
              />
            );
          })}
      </Box>
    </Box>
  );
};
export { GalleryBar };
export default GalleryBar;
