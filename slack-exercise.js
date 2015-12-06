/* Get flickr json using http://youmightnotneedjquery.com/#json*/
window.onload = function(){
  var request = new XMLHttpRequest();
  var api_key = '6ad7daff7bc3d523f7643c280f94ed11';
  var photosrc = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key='+api_key+'&photoset_id=72157649984729164&user_id=123944951%40N02&format=json&nojsoncallback=1'
 
  request.open('GET', photosrc, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success! the request worked
      var data = JSON.parse(request.responseText);
      var photocounter = 0;
      //console.log(data);
      var photos = data.photoset.photo;
      //console.log(photos);
      var numPhotos = photos.length;  

      // Show photo
      var showPhoto = function(){
        // Grab all the variables we need to grab the static png
        var itemToShow = photocounter;
        var id = photos[itemToShow].id;
        var photo = photos[itemToShow];
        var caption = photo.title;
        var ownername = data.photoset.ownername;
        var farmid = photo.farm;
        var serverid = photo.server;
        var secret = photo.secret;

        // Concat components '
        var photosrc = "https://farm"+farmid+".staticflickr.com/"+serverid+"/"+id+"_"+secret+".jpg";
        
        // Set the image and the caption (using title as the caption since these photos don't have any captions)
        document.getElementById('slack-exercise-photo').setAttribute('src',photosrc);
        //document.querySelector('body .lightbox figure img').setAttribute('src',photosrc);
        document.getElementById('slack-exercise-caption').innerHTML = caption;  
      };

      showPhoto();
    };
    
    // Click event when 'next' button clicked
    document.getElementById('slack-exercise-next').addEventListener('click', function() {
      var tempcounter = photocounter + 1;
      if (tempcounter >= numPhotos) {
        photocounter = numPhotos-1;
        // debugger;
      }
      else{
         photocounter++;
         // debugger;
      }
      showPhoto();
    }, false);

    // Click event when 'prev' button clicked 
    document.getElementById('slack-exercise-prev').addEventListener('click', function() {
      var tempcounter = photocounter - 1;
      if (tempcounter < 0) {
        photocounter = 0;
      }
      else{
         photocounter--;
      }
      showPhoto();
    }, false);
  };

  // Need this to send the request!
  request.send();
};