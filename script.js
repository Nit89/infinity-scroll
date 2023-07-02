const imageContainer = document.getElementById("image-cintainer");
const count = 30;
const apikey = "_9lmQZLeP_9XbnO0WknZRxCg_dJUpN4BHSEuLUC2-hU";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

let ready = false;
let imagesLoaded = 0; // Renamed from 'imageloaded' to 'imagesLoaded'
let totalImages = 0;

let photoArray = [];

//helper function
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Renamed function 'imageloaded' to 'imageIsLoaded'
function imageIsLoaded() {
  imagesLoaded++; // Also changed here from 'imageloaded' to 'imagesLoaded'
  if (imagesLoaded === totalImages) {
    ready = true;
  }
}
function displayPhotos() {
  imagesLoaded = 0; // Changed from 'imageloaded' to 'imagesLoaded'
  totalImages = photoArray.length;

  photoArray.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.addEventListener("load", imageIsLoaded); // Also changed here from 'imageloaded' to 'imageIsLoaded'

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    displayPhotos();
  } catch {}
}

// check to see if scrolling near bottom of page
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
getPhotos();
