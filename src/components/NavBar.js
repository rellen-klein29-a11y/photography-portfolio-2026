import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Menu, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";
import MediaQuery from "react-responsive";
import { Link } from "react-router-dom";
import config from "../app.config.js";
import { useDesktop } from "../hooks/useDesktop";
import { ReactComponent as CameraIcon } from "../images/camera.svg";
import { galleries } from "../photos/galleries";

function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();

  const isDesktopOrLaptop = useDesktop();

  const openGalleryMenu = (event) => setAnchorEl(event.currentTarget);
  const hideGalleryMenu = () => setAnchorEl(null);

  const middleStyle = {
    marginLeft: "auto",
  };

  const rightItemStyle = {
    marginRight: "15px",
  };

  const titleStyle = {
    textDecoration: "none",
  };

  return (
    <AppBar position={isDesktopOrLaptop ? "fixed" : "static"}>
      <Toolbar>
        <Tooltip title={t("toolbar.title")}>
          <Box
            sx={{
              position: "relative",
              paddingTop: "4px",
              marginRight: "0.5rem",
            }}
          >
            <Link to="/" style={titleStyle}>
              <CameraIcon width={48} height={48} />
            </Link>
          </Box>
        </Tooltip>

        <Button
          id="gallery-button"
          aria-controls={open ? "gallery-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={openGalleryMenu}
        >
          {t("toolbar.galleries")} <ArrowDropDownIcon />
        </Button>
        <Menu
          id="gallery-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={hideGalleryMenu}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {galleries
            .filter((g) => !g.name.startsWith("main-"))
            .map((g) => (
              <MenuItem
                key={g.name}
                onClick={hideGalleryMenu}
                to={`/gallery/${g.name}`}
                component={Link}
              >
                {g.label}
              </MenuItem>
            ))}
        </Menu>

        <Button to="/about" component={Link}>
          {t("toolbar.about")}
        </Button>

        <div style={middleStyle} />

        <MediaQuery minWidth={700}>
          <div style={rightItemStyle} />
        </MediaQuery>

        <Box
          sx={{
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <a href={config.urls.instagram}>
            <Tooltip title={t("toolbar.tooltipInstagram")}>
              <img
                src={require("../images/instagram.png")}
                width={32}
                alt="Instagram"
              />
            </Tooltip>
          </a>
        </Box>
        {/* The settings button isn't needed and is just a distraction */}
        {/*
        <IconButton sx={{marginLeft:'10px'}} onClick={() => setSettingsOpen(true)}>
          <Tooltip title={t('toolbar.tooltipSettings')}>
            <SettingsIcon />
          </Tooltip>
        </IconButton>
        <SettingsDialog
          open={settingsOpen}
          handleClose={handleSettingsClose}
          theme={theme}
          setTheme={setTheme}
        />
        */}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
