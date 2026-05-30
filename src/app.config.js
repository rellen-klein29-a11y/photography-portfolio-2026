let settings = {};

settings.title = {};
settings.title.main = "Roscoe Ellen-Klein Photography";
settings.title.about = "About Roscoe";

settings.urls = {};
settings.urls.flickr = "https://www.flickr.com/people/40423570@N07/";
settings.urls.instagram = "https://www.instagram.com/shotsby.roscoe/";

settings.googleAnalyticsId = "UA-76058158-1";

// category code is legacy, will be removed later
settings.defaultCategory = "main";
settings.categories = [
  {
    name: "main",
    display: "Main",
    path: "/",
    randomize: false,
  },
  {
    name: "sunrise",
    display: "Sunrises",
    path: "/sunrises",
    randomize: true,
  },
  {
    name: "misc",
    display: "Misc",
    path: "/misc",
    randomize: true,
  },
];

export default settings;
