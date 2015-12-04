/* Get flickr json using http://youmightnotneedjquery.com/#json*/
var request = new XMLHttpRequest();
var photosrc = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=a5aae11361b3b7a76167801900438385&photoset_id=72157649984729164&user_id=123944951%40N02&format=json&nojsoncallback=1'

request.open('GET', photosrc, true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var data = JSON.parse(request.responseText);
    var photocounter = 0;
    console.log(data);
    var photos = data.photoset.photo;
    console.log(photos);
    var numPhotos = photos.length;
    // DELETE document.querySelector('#photo').innerHTML(photos);

    // Load photo
    var showCurrent = function(){
      var itemToShow = Math.abs(photocounter%numItems);
      var photoID = photos[itemToShow].id;
      var caption = photos[itemToShow].title;
      var page = data.photoset.ownername;
      var photosrc = "https://www.flickr.com/photos/"+page+"/"+photoID;
      window.querySelector('#photo').innerHTML(src=photosrc);
    };
  };
};
  
// Add click events for prev and next buttons 
document.querySelector('.next').addEventListener('click', function() {
  photocounter++;
  showCurrent();
}, false);
 
document.querySelector('.prev').addEventListener('click', function() {
  photocounter--;
  showCurrent();
}, false);