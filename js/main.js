
'use strict';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;


const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});

function initMap() {
    // Define the location (latitude and longitude)
    const location = { lat: 40.748817, lng: -73.985428 }; // Example: Empire State Building, NYC

    // Create the map and center it on the location
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 18, // Higher zoom level for 3D views
      center: location,
      mapTypeId: 'hybrid', // Use 'satellite' or 'hybrid' for 3D
      tilt: 45, // Enables 3D tilt (default: 0)
    });

    // Add a marker to the location
    const marker = new google.maps.Marker({
      position: location,
      map: map,
      title: "Empire State Building", // Optional: Add a title
    });

    // Allow map rotation using right-click drag
    map.setOptions({ rotateControl: true });
  }

  // Call initMap when the window loads
  window.onload = initMap;

  const webGLOverlayView = new google.maps.WebGLOverlayView();
webGLOverlayView.setMap(map);

const axios = require('axios');

// Replace these with your API key and secret
const API_KEY = 'acc_2d99193f4c80c48';
const API_SECRET = '1cf551ac473ac92d61f19db1029ca708';

// Base64 encode the API key and secret for Basic Authentication
const auth = Buffer.from(`${acc_2d99193f4c80c48}:${cf551ac473ac92d61f19db1029ca708}`).toString('base64');

// Function to analyze an image using Imagga
async function analyzeImage(imagePath) {
  try {
    // API endpoint for image tagging
    const endpoint = 'https://api.imagga.com/v2/tags';

    // Read the image as a binary file (e.g., from a local path)
    const imageBuffer = require('fs').readFileSync(imagePath);

    // Use FormData to upload the image
    const formData = new FormData();
    formData.append('image', imageBuffer, {
      filename: 'image.jpg',
    });

    // Make a POST request to Imagga's API
    const response = await axios.post(endpoint, formData, {
      headers: {
        Authorization: `Basic ${auth}`,
        ...formData.getHeaders(),
      },
    });

    // Process and return the response
    console.log('Image Analysis:', response.data);
  } catch (error) {
    console.error('Error analyzing image:', error.response?.data || error.message);
  }
}

// Call the function with your image path
analyzeImage('new-york-statue-of-liberty.png');