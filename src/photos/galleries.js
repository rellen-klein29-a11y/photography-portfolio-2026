/*
  Notes:
  - All pageContent items need a unique name.
 */
import config from "../app.config";
import { AlbumPhotos } from "../components/galleries/AlbumPhotos";
import { AtlasCoalMine } from "../components/galleries/AtlasCoalMine";
import { BlackfootCrossing } from "../components/galleries/BlackfootCrossing";
import { DowntownDrumheller } from "../components/galleries/DowntownDrumheller";
import { FilmShots } from "../components/galleries/FilmShots";
import { Interactive } from "../components/galleries/Interactive";
import { InteractiveDescriptions } from "../components/galleries/InteractiveDescriptions";
import { LakeLouise } from "../components/galleries/LakeLouise";
import { LastChanceSaloon } from "../components/galleries/LastChanceSaloon";
import { MainStandard } from "../components/galleries/main/MainStandard";

const galleries = [
  {
    name: "main-standard",
    label: "Main",
    description: "A photography portfolio.",
    photoName: "last-chance-saloon",
    component: MainStandard,
  },

  // Stops
  {
    name: "last-chance-saloon",
    label: "Last Chance Saloon",
    description: "Last Chance Saloon.",
    photoName: "last-chance-saloon",
    component: LastChanceSaloon,
  },
  {
    name: "blackfoot-crossing",
    label: "Blackfoot Crossing",
    description: "Blackfoot Crossing.",
    photoName: "blackfoot-crossing",
    component: BlackfootCrossing,
  },
  {
    name: "atlas-coal-mine",
    label: "Atlas Coal Mine",
    description: "Atlas Coal Mine.",
    photoName: "atlas-coal-mine-2",
    component: AtlasCoalMine,
  },
  {
    name: "downtown-drumheller",
    label: "Downtown Drumheller",
    description: "Downtown Drumheller.",
    photoName: "downtown-drumheller",
    component: DowntownDrumheller,
  },
  {
    name: "lake-louise",
    label: "Lake Louise",
    description: "Lake Louise.",
    photoName: "lake-louise-building",
    component: LakeLouise,
  },
  {
    name: "film-shots",
    label: "Film Shots",
    description: "Film shots (scanned).",
    photoName: "album-blurry-6",
    component: FilmShots,
  },
  {
    name: "album-photos",
    label: "Album Photos",
    description: "Blurry, fungus, and other album photos.",
    photoName: "album-blurry-3",
    component: AlbumPhotos,
  },
  {
    name: "interactive-comparisons",
    label: "Interactive",
    description: "Then-and-now comparisons.",
    photoName: "lake-louise-with-people-3",
    component: Interactive,
  },
  {
    name: "interactive-descriptions",
    label: "Interactive Descriptions",
    description: "Full descriptions for interactive comparisons.",
    photoName: "lake-louise-with-people-3",
    component: InteractiveDescriptions,
  },
];

galleries.forEach((gg) => {
  gg.title = gg.label + " | " + config.title.main;
});

// see app.php
console.log("galleries");
const _galleries = galleries.map((item) => ({
  name: item.name,
  title: item.label,
  photoName: item.photoName,
  description: item.description,
}));
console.dir(_galleries);
console.log(JSON.stringify(_galleries).replace(/'/g, "\\'"));

export { galleries };
