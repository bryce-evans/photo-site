const FLICKR = {
  URL : 'https://api.flickr.com/services/rest/',
  KEY : 'd86d9b82925db25bbeb0bf49d7e97e13',
  SECRET : 'b31fc7c4e096aa0e',
  ID : '96143629@N07'
};

getFlickrStreamURL = function(id) {
  return 'https://www.flickr.com/photos/' + FLICKR.ID + "/" + id;
}

Photo = function(id, url) {
  this.id = id;
  this.url = url;
  this.getStreamURL = function() {
    return 'https://www.flickr.com/photos/' + FLICKR.ID + "/" + id;
  };
}

// {<string> photo_id, <string> url}
var allLinks = {};

const sets = {
  performances : {
    name : 'performances',
    id : '72157641927940914',
    photos : []
  },
  featured50 : {
    name : 'featured50',
    id : '72157635671751723',
    photos : []
  },
  portraits : {
    name : 'portraits',
    id : '72157635020065114',
    photos : []
  },
  international : {
    name : 'international',
    id : '72157648728240922',
    photos : []
  },
  cats : {
    name : 'cats',
    id : '72157638337318724',
    photos : []
  },
  bw : {
    name : 'bw',
    id : '72157639080128075',
    photos : []
  },
  skies : {
    name : 'skies',
    id : '72157637070898063',
    photos : []
  },
  macro : {
    name : 'macro',
    id : '72157635013739675',
    photos : []
  },
  wildlife : {
    name : 'wildlife',
    id : '72157635015093339',
    photos : []
  },
  food : {
    name : 'food',
    id : '72157635020081930',
    photos : []
  },
  stream : {
    name : 'stream',
    current_page : '1',
    pages : '1',
    photos : []
  }
};

// gets the most recent photos in Flickr Stream
genLinksFromStream = function(display) {
  $.ajax({
    type : 'POST',
    url : FLICKR.URL,
    data : {
      method : 'flickr.people.getPhotos',
      api_key : FLICKR.KEY,
      format : 'json',
      dataType : 'jsonp',
      user_id : FLICKR.ID,
    }
  }).done(function(response) {
    var data = eval(response);
    var photos = data.photos.photo;
    for (var i = 0; i < photos.length; i++) {
      var photo = photos[i];
      var url = getFlickrURL(photo.farm, photo.server, photo.id, photo.secret);
      sets.stream.photos.push(new Photo(photo.id, url));
    }
    if (display) {
      displaySet(sets.stream);
    }
  });
}

// generates all links to a set
// displays the set on stage if display = true
genSetLinks = function(set, display) {

  if (set.name === 'stream') {
    genLinksFromStream(display);
    return;
  }

  // add a callback to display this set if images are already loading
  if (set.photos.length != 0 || UI.allLinksLoading) {
    UI.requestToShow(set);
    return;
  }

  $.ajax({
    type : 'POST',
    url : FLICKR.URL,
    data : {
      method : 'flickr.photosets.getPhotos',
      api_key : FLICKR.KEY,
      format : 'json',
      dataType : 'jsonp',
      photoset_id : set.id,
    }
  }).done( function(response) {

    var data = eval(response);
    var photos = data.photoset.photo;
    for (var i = 0; i < photos.length; i++) {
      var photo = photos[i];
      var url = getFlickrURL(photo.farm, photo.server, photo.id, photo.secret);

      for (key in sets) {

        if (sets[key].id == data.photoset.id) {
          sets[key].photos.push(new Photo(photo.id, url));
          allLinks[photo.id] = url;
        }
      }
    }

    if (display) {
      displaySet(set);
    }

  }.bind(this));
}

// gets the links to a set
genAllSetLinks = function() {

  // this function can only run once!
  if (UI.allLinksLoaded || UI.allLinksLoading) {
    return;
  }
  UI.allLinksLoading = true;

  // todo - wait on stream photos in semaphore
  genLinksFromStream();

  var waiting_on = Object.keys(sets).length - 2;

  for (set in sets) {
    if (set === 'stream' || sets[set].photos.length != 0) {
      continue;
    }

    if (sets.hasOwnProperty(set)) {
      $.ajax({
        type : 'POST',
        url : FLICKR.URL,
        data : {
          method : 'flickr.photosets.getPhotos',
          api_key : FLICKR.KEY,
          format : 'json',
          dataType : 'jsonp',
          photoset_id : sets[set].id,
        }
      }).done( function(response) {

        var data = eval(response);
        var photos = data.photoset.photo;

        var this_set_name;
        for (set_name in sets) {
          if (sets[set_name].id == data.photoset.id) {
            this_set_name = set_name;
            break;
          }
        }

        for (var i = 0; i < photos.length; i++) {
          var photo = photos[i];
          var url = getFlickrURL(photo.farm, photo.server, photo.id, photo.secret);

          sets[this_set_name].photos.push(new Photo(photo.id, url));

          allLinks[photo.id] = url;

        }
        
        waiting_on--;
        
        // last set arrives!
        if (waiting_on == 0) {
          UI.allLinksLoaded = true;
          UI.allLinksLoading = false;

          // collage requested to be shown before all links loaded
          if (UI.requestedToShow) {
            UI.requestToShow = undefined;
            if (UI.requestedToShow === 'collage') {
              populateCollage();
            } else {
              displaySet(UI.requestedToShow)
            }
          }
        }
      }.bind(this));
    }
  }
}

// required to parse return data from Flickr as JSON
jsonFlickrApi = function(data) {
  return data;
}

// displays a set to the screen
displaySet = function(set_data) {
  clearPhotos();
  
  // reset scroll to top
  $('body').scrollTop(0);

  populatePhotos(set_data);
}

// fills up the collage tab with photos
populateCollage = function() {

  if (!UI.allLinksLoaded) {
    UI.requestToShow('collage');
  }

  // put a callback to populate imgs after links load
  if (!UI.allLinksLoaded && !UI.allLinksLoading) {
    genAllSetLinks();
    return;
  }

  if (!UI.collageLoaded) {
    UI.collageLoaded = true;
    var ids = Object.keys(allLinks);

    ids.sort(function() {
      return Math.random() - 0.5;
    });

    if (ids.forEach) {
      ids.forEach(function(id) {
        // url = getFlickrStreamURL(id)
        $('#collage-container').append('<li class="collage-img"><a target="_blank"><div class="tile" style="background-image: url(' + allLinks[id] + ')"></div></a></li>');
      });
    }
  }
}

// populates the stage with the photos from <Obj> set_data
populatePhotos = function(set_data) {
  // load if not loaded yet
  if (set_data.photos.length === 0) {
    genSetLinks(set_data, true);
    return;
  }

  // load in masonry
  UI.msnry = new Masonry(UI.msnry_container, UI.msnry_settings);
  // allow columns to fit resizing of window
  UI.msnry.bindResize();

  // handler for when photos come in
  // position is index of photo in list
  var photos_loaded = 0;
  var photo_position = 0;
  var inQueue = {};
  photo_onload = function(obj, pos) {
    var li = $(obj).parent().parent();
    if (pos === photo_position) {
      UI.msnry.appended(li);
      li.addClass('fadeIn');
      photo_position++;
      while (inQueue[photo_position]) {
        var elem = (inQueue[photo_position]);
        UI.msnry.appended(elem);
        inQueue[photo_position].addClass('fadeIn');
        delete inQueue[photo_position];
        photo_position++;
      }
    } else {
      inQueue[pos] = li;
    }
  }
  for (var i = 0; i < set_data.photos.length; i++) {
    var url = set_data.photos[i].getStreamURL();
    $('#photo-col').append('<li class="stage-img" ><a target="_blank"><img  width="' + UI.photo_width + '" onload="photo_onload(this,' + i + ')" id="' + set_data.photos[i].id + '" src="' + set_data.photos[i].url + '" /></a></li>');
  }
  $('.stage-img').click(function(hit) {
    showViewer(hit.target.src);
  });
  $(".exif").click(function() {
    getExif(this.id);
  });

  // preload all photos if not done yet
  genAllSetLinks();
}

// clears all photos being displayed
clearPhotos = function() {
  $('#photo-col').empty();
}

// takes a link and returns a link to a different size of same image
changePhotoSize = function(photo_url, size) {
  size = size || UI.size.LARGE;
  return photo_url.replace(/_.\.jpg$/, size + '.jpg');
}

// displays a viewer for individual photos
showViewer = function(url) {
  if (UI.device) {
    return;
  }
  var photo = $('$viewer-main');
  var img = new Image();
  img.addEventListener('load', function() {
    //$('body').addClass('stop-scroll');
    // $('#stage').addClass('viewer-on');
    $('#viewer').fadeIn();
  }, false);
  img.src = changePhotoSize(url, UI.size.LARGE);
  photo.src = img.src;
}

// gets link to image
// size optional - default based on screen size and device
getFlickrURL = function(farm, server, id, secret, size) {
  size = size || UI.photo_size
  return 'http://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + size + '.jpg';
}

// returns Flickr exif data for photo by id
getExif = function(id) {
  $.ajax({
    type : 'POST',
    url : FLICKR.URL,
    data : {
      method : 'flickr.photos.getExif',
      api_key : FLICKR.KEY,
      photo_id : id,
      format : 'json',
      dataType : 'jsonp',
      user_id : FLICKR.ID,
    }
  }).done( function(response) {
    console.log(response);
  }.bind(this));
}