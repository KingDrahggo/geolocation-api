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
// const stopButton = document.createElement("button")
// stopButton.innerHTML = `Stop Tracker`
// document.body.appendChild(stopButton);

let start = startButton.addEventListener(`click`,() =>{
    navigator.geolocation.getCurrentPosition(
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

const trackUser = navigator.geolocation.watchPosition(
    success => {
            console.log(success)
            requestPhotos(success.coords);
        },
);

navigator.geolocation.clearWatch(trackUser);

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

var photosArray = []
var index = 0

function showPhotos (data){
    console.log(data)
    photosArray = data.photos.photo
    console.log(photosArray)
    
    for(const index in photosArray){
    let div = document.createElement('div')
    var img = document.createElement('img');
    div.innerHTML = assembleUrlSourceImage(photosArray[index])
    div.append(img)
    img.src =(assembleUrlSourceImage(photosArray[index]))
    main.append(div)
    }
}


// let morePhotos = document.createElement('button')
// morePhotos.innerHTML = "More Photos"
// morePhotos.addEventListener('click', () =>{
//     showPhotos()
// });
// main.append(morePhotos);
// displayPhotoObject(photoObj) {
//     let imageUrl = this.assembleUrlSourceImage(photoObj);
//     let img = document.createElement('img')
//     img.src = imageUrl
//     main.innerHTML = ''
//     main.append(img)
// }