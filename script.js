const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let imagesDoneLoading = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 20;
const apiKey = 'OB1uJLGbWSJyWr3XOI1dwr7dlT_H5afftuqz3qv9Ss0';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    // Increment by one with every image loaded
    imagesLoaded ++;
    // console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        imagesDoneLoading = true;
        loader.hidden = true;
        // console.log('Images loaded =', imagesDoneLoading);
    }
}

// Helper function to Set Attributues on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for Links and Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0; // reset value
    totalImages = photosArray.length;
    // console.log('total images = ', totalImages);

    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        // Create <img> for photo
        const img = document.createElement('img');

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each image is finished loading
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photes from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        // console.log(photosArray);
    } catch (error) {
        // catch error here
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    // Subtracting 1000px to trigger event before bottom is reached
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && imagesDoneLoading) {
        imagesDoneLoading = false; // set to true when imagesLoaded equals totalImages
        getPhotos();

    }
});

// On load
getPhotos();