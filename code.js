
let body = document.querySelector("body");
let main = document.createElement("main");
document.body.appendChild(main);

const startButton = document.createElement("button");
startButton.style.top = "175px";
startButton.style.left = "725px";
startButton.innerHTML = `Click`;
startButton.classList.add('.start-btn');
document.body.appendChild(startButton);

const replayButton = document.createElement("button");
replayButton.style.top = "175px";
replayButton.style.left = "775px"
replayButton.innerHTML = `Replay`;
replayButton.classList.add('.replay-btn');
document.body.appendChild(replayButton);


let start = startButton.addEventListener(`click`, () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
      requestPhotos(position.coords);
    },
    (positionError) => {
      alert(`Could not get your position`);
      requestPhotos(fallBackLocation);
      console.log(positionError);
    }
  );
});

const trackUser = navigator.geolocation.watchPosition((success) => {
  console.log(success);
  requestPhotos(success.coords);
});

navigator.geolocation.clearWatch(trackUser);

const fallBackLocation = { latitude: 28.474386, longitude: -81.468193 };

function requestPhotos(location) {
  console.log(
    `Requesting Photos near me ${location.latitude}, ${location.longitude}`
  );
  let url = `https://shrouded-mountain-15003.herokuapp.com/https://api.flickr.com/services/rest/?api_key=0f1a62f39c3f42f6f76b15680e600792&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&${location.latitude}&${location.longitude}&text=supercar`;

  let fetchPromise = fetch(url);
  fetchPromise.then(processResponse);
}

function assembleUrlSourceImage(photoObj) {
  return `https://farm${photoObj.farm}.staticflickr.com/${photoObj.server}/${photoObj.id}_${photoObj.secret}.jpg`;
}

function processResponse(response) {
  let responsePromise = response.json();
  responsePromise.then(showPhotos);
}

var photosArray = [];
var index = -1;

function showPhotos(data) {
  console.log(data);
  photosArray = data.photos.photo;
  console.log(photosArray);
  
  if (index < photosArray.length) {
    index++;
    let img = document.createElement("img");
    img.src = assembleUrlSourceImage(photosArray[index]);
    main.innerHTML = `<a href="${assembleUrlSourceImage(photosArray[index])}"><b>Show Image</b></a>`;
    main.append(img);
  } else {
    let img = document.createElement("img");
    img.src = "replayimg.jpg";
    main.append(img);
    console.log("Done")
  }
}

let replay = replayButton.addEventListener(`click`, () => {
location.reload()
})
