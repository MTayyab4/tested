// Import Gallery from image-list.js
import { Gallery } from './image-list.js';

// Define function to fetch image blob
const getImageBlob = async (url) => {
  const imageResponse = await fetch(url);
  if (!imageResponse.ok) {
    throw new Error(
      `Image didn't load successfully; error code: ${
        imageResponse.statusText || imageResponse.status
      }`
    );
  }
  return imageResponse.blob();
};

// Define function to create gallery figure
const createGalleryFigure = async (galleryImage) => {
  try {
    const imageBlob = await getImageBlob(galleryImage.url);
    const myImage = document.createElement('img');
    const myCaption = document.createElement('caption');
    const myFigure = document.createElement('figure');
    myCaption.textContent = `${galleryImage.name}: Taken by ${galleryImage.credit}`;
    myImage.src = window.URL.createObjectURL(imageBlob);
    myImage.setAttribute('alt', galleryImage.alt);
    myFigure.append(myImage, myCaption);
    imgSection.append(myFigure);
  } catch (error) {
    console.error(error);
  }
};

// Wait for the DOM content to load
document.addEventListener('DOMContentLoaded', async () => {
  // Select the image section
  const imgSection = document.querySelector('section');

  // Register the service worker
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('./sw.js', {
        scope: '/'
      });
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }

  // Iterate over images in Gallery and create gallery figures
  Gallery.images.forEach(createGalleryFigure);
});
