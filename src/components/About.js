import { Link } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ClosingMessage from "./ClosingMessage";
import { ContentFlowGrid } from "./ContentFlowGrid";
import Footer from "./Footer";
import PhotoViewer from "./PhotoViewer.js";
import { createPhotoAlbum, getPhotoAlbumByName } from "../photos";

function About() {
  let aboutAlbum = {
    photoFolders: [
      "roscoe niche",
    ],
    descriptions: [
      "Roscoe niche",
    ],
    aspect: "6x4",
    altText: "Roscoe niche",
    showShareLink: false,
    flickr: [],
  };
  aboutAlbum = createPhotoAlbum(aboutAlbum);

  return (
    <ContentFlowGrid>
      <PhotoViewer album={aboutAlbum} />

      <Box>
        <h3>About</h3>
        <p>
          {/* eslint-disable-next-line max-len */}
          My name is Roscoe, I'm an amateur photographer. I setup this site to show some of my work. If you're interested in more of my work you can find me on <Link href="https://www.instagram.com/shotsby.roscoe/">Instagram</Link>.
        </p>
        <p>
          {/* eslint-disable-next-line max-len */}
          The above image is a self portrait from my yearly trip down to the Banff in Alberta to see the Lake. I rarely take photos of myself but on one visit I decided it was such a nice morning that I should take a photo to remember it.
        </p>
      </Box>
      <Box>
        <h3>FAQ</h3>
        <h4>How can I contact you?</h4>
        <p>
          Email: rellen-klein29@yorkschool.com. Don't DM me on social media, I don't read those and usually only see them months later.
        </p>
        <h4>What kind of camera do you use?</h4>
        <p>Post-2026, Holga 120 CFN. Before that: Canon EOS Rebel T7.</p>
        <h4>Favorite lens?</h4>
        <p>
          The 60mm (f/8) plastic meniscus lens is the most practical, but I've grown to love the Canon EF-S 18-55mm f/3.5-5.6 IS II standard zoom lens the most. The depth of field, compression, colors - just everything about it is great. However, after reviewing what I selected for this site, not a single shot was done with the 18-55mm.
        </p>
      </Box>

      <Box>
        <h3>Unknown origin</h3>
        <p>
          The Holga 120 CFN that I used to take the film shots in Alberta has been in my attic since before I was alive. Below you'll see a few images that were in the camera that neither I nor anyone else in my family recognizes. If you checked out the Album Photos gallery before this, you may recognize some of the weird, galaxy-like spots on a few of the images. If you're viewing this along with my negatives, you'll be able to find those weird spots on the negatives as well. According to <Link href="https://www.mementofilmlab.com/">the film lab I got them developed at</Link>, these are fungi that grew on the film after sitting in the camera for 20+ years. You may also notice some of the weird lines in a few of the film shots. These are called light leaks. First, a quick backstory on the Holga: it was developed in the soviet union during the Cold War and, at the time, was the cheapest camera you could buy on the market. It contains absolutely no metal (except for the side clips, again, if you're reading this in person, you can see them on the side of the camera) and is completely made of plastic (even the lens is made of plastic). Because of the cheap material, it is extremely prone to light leaks from the outside of the camera that "ruin" the film. Some prefer it, as it gives a sort of dreamy look to your photos. Again, if you're viewing this in person, you can see the remains of a bit of electrical tape I put on the camera to keep light leaks away. During the actual trip, the entire camera was covered, basically head to toe in electrical tape, as I wanted to ensure my film was usable for my RAFT. However, I was a bit less careful on my first role of film, which is why on some of the earlier stops in the trip (e.g, Atlas Coal Mine) you can see these weird reflecting beams of light along the image (these are the light leaks).
        </p>
      </Box>
      <PhotoViewer album={getPhotoAlbumByName("unknown-origin-1")} />
      <PhotoViewer album={getPhotoAlbumByName("unknown-origin-2")} />
      <PhotoViewer album={getPhotoAlbumByName("unknown-origin-3")} />
      <PhotoViewer album={getPhotoAlbumByName("unknown-origin-4")} />
      <PhotoViewer album={getPhotoAlbumByName("unknown-origin-5")} />

      <Box>
        <h3>Other</h3>
      </Box>
      <Box>
        <h4>Badlands</h4>
      </Box>
      <PhotoViewer album={getPhotoAlbumByName("badlands-flatlands-wideshot")} />
      <PhotoViewer album={getPhotoAlbumByName("badlands-hole")} />
      <PhotoViewer album={getPhotoAlbumByName("badlands-small-zac")} />
      <PhotoViewer album={getPhotoAlbumByName("badlands-steep")} />
      <PhotoViewer album={getPhotoAlbumByName("badlands-vast")} />
      <PhotoViewer album={getPhotoAlbumByName("hoodoos")} />
      <PhotoViewer album={getPhotoAlbumByName("hoodoos-wide")} />
      <PhotoViewer album={getPhotoAlbumByName("hoodoos-wide-2")} />
      <PhotoViewer album={getPhotoAlbumByName("hoodoos-birds-eye")} />
      <PhotoViewer album={getPhotoAlbumByName("hoodoo-2")} />
      <PhotoViewer album={getPhotoAlbumByName("hoodoo-3")} />
      <PhotoViewer album={getPhotoAlbumByName("dino-fossil-1")} />

      <PhotoViewer album={getPhotoAlbumByName("other-sunset-hot-springs")} />

      <Box>
        <h4>Royal Tyrell Museum</h4>
      </Box>
      <PhotoViewer album={getPhotoAlbumByName("other-tyrell-sky")} />
      <PhotoViewer album={getPhotoAlbumByName("other-tyrell-wide-eaton")} />
      <PhotoViewer album={getPhotoAlbumByName("other-tyrell-wide-2")} />
      <PhotoViewer album={getPhotoAlbumByName("other-tyrell-wide-3")} />
      <PhotoViewer album={getPhotoAlbumByName("other-tyrell-wide-4")} />
      <PhotoViewer album={getPhotoAlbumByName("other-tyrell-wide")} />

      <PhotoViewer album={getPhotoAlbumByName("other-fake-vintage-nightmare")} />
      <PhotoViewer album={getPhotoAlbumByName("other-old-mountains")} />
      <PhotoViewer album={getPhotoAlbumByName("other-spin-shots")} />
      <PhotoViewer album={getPhotoAlbumByName("other-up-in-the-mountains")} />
      <PhotoViewer album={getPhotoAlbumByName("other-hes-missing")} />

      <ClosingMessage />
      <Footer />
    </ContentFlowGrid>
  );
}

export default About;
