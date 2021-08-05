// To run this assignment, right click on index.html in the Visual Studio file explorer to the left
// and select "Open with Live Server"

// Your Code Here.
let body = document.querySelector("body")
let main = document.createElement('main')
document.body.appendChild(main)
// let div1 = document.createElement(`div`)
// div1.append(body);
// let div2 = document.createElement(`div`)
// div2.append(body);

const startButton = document.createElement("button")
startButton.innerHTML = `Start Tracker`
document.body.appendChild(startButton);
const stopButton = document.createElement("button")
stopButton.innerHTML = `Stop Tracker`
document.body.appendChild(stopButton);

let start = startButton.addEventListener(`click`,() =>{
    navigator.geolocation.watchPosition(
        position => {
            console.log(position)
            requestPhotos(position.coords);
        },
        positionError => {
            alert(`Could not get your position`);
            requestPhotos(fallBackLocation);
            console.log(positionError)
        }
    );
});

stopButton.addEventListener(`click`,() =>{
    navigator.geolocation.clearWatch(start);
    console.log("Ending Tracking")
});

const fallBackLocation = {latitude: 28.474386, longitude: -81.468193}

function requestPhotos(location){
    console.log(`Requesting Photos near me ${location.latitude}, ${location.longitude}`)
    let url = (`https://shrouded-mountain-15003.herokuapp.com/https://api.flickr.com/services/rest/?api_key=0f1a62f39c3f42f6f76b15680e600792&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&${location.latitude}&${location.longitude}&text=car`)

    let fetchPromise = fetch(url)
    fetchPromise.then(processResponse)
}

function assembleUrlSourceImage (photoObj){
    return `https://farm${photoObj.farm}.staticflickr.com/${photoObj.server}/${photoObj.id}_${photoObj.secret}.jpg`;
}

function processResponse (response) {
    let responsePromise = response.json()
    responsePromise.then(showPhotos)
}

function showPhotos (data){
    console.log(data)
    photosArray = data.photos.photo
    var img = document.createElement('img');
    photosArray.forEach(element => 
    img.src =(assembleUrlSourceImage(photosArray[currentPhotoIndex])))
    main.append(img)
}

var photosArray = []
var currentPhotoIndex = 0

let morePhotos = document.createElement('button')
morePhotos.innerHTML = "More Photos"
morePhotos.addEventListener('click', () =>{
    showPhotos()
});
main.append(morePhotos);
// if(navigator.geolocation)
//     navigator.geolocation.getCurrentPosition(
//         function(position) {
//             const { latitude } = position.coords;
//             const { longitude } = position.coords;
//             console.log(latitude,latitude)
//         },
//         function () {
//             alert(`Could not get your position`);
//         }
//     )