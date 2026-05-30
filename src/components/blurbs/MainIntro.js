import { Box } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";

export default function MainIntro() {
  const { t } = useTranslation();
  return (
    <Box>
      <p>{t("blurb.introText")}</p>
    </Box>
  );
}
