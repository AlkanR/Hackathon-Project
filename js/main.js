
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

 //Google Maps API
function initMap() {
    const location = { lat: 40.748817, lng: -73.985428 };

    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 18,
      center: location,
      mapTypeId: 'hybrid',
      tilt: 45,
    });

    const marker = new google.maps.Marker({
      position: location,
      map: map,
      title: "Empire State Building",
    });

    map.setOptions({ rotateControl: true });
  }

  window.onload = initMap;

  const webGLOverlayView = new google.maps.WebGLOverlayView();
webGLOverlayView.setMap(map);


// Image API
const SearchForm = document.getElementById("search-form");
const SearchBox = document.getElementById("search-box");
const SearchResult = document.getElementById("search-result");
const ShowMoreBtn = document.getElementById("show-more-btn");
const accessKey = "U3uSGZihDLmmcb7gFBzGKMKELoKjX9egH_wR8mvUtug";

let keyword = "";
let page = 1;

async function searchImages(){
  keyword = SearchBox.value;
  const url =`https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  console.log(data)

  

SearchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
})

if(page === 1){
  SearchResult.innerHTML = "";
}

results.map((result) => {
  const image = document.createElement("img");
  image.src = result.urls.regular;
  const imageLink = document.createElement("a");
  imageLink.href = result.links.html;
  imageLink.target = "_blank";

  imageLink.appendChild(image);
  SearchResult.appendChild(imageLink);
})
ShowMoreBtn.style.display = "block";
}

ShowMoreBtn.addEventListener("click", ()=>{
  page++;
  searchImages();
})