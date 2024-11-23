
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
