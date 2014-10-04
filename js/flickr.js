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

//
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
      var url = getFlickrURL(photo.farm, photo.server, photo.id, photo.secret, '_z');
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
      var url = getFlickrURL(photo.farm, photo.server, photo.id, photo.secret, '_z');

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
          var url = getFlickrURL(photo.farm, photo.server, photo.id, photo.secret, '_z');

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
jsonFlickrApi = function(data) {
  return data;
}
displaySet = function(set_data) {
  clearPhotos();
  // reset scroll to top
  $('body').scrollTop(0);

  populatePhotos(set_data);
}
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
        $('#collage-container').append('<li class="collage-img"><a href="' + getFlickrStreamURL(id) + '" target="_blank"><div class="tile" style="background-image: url(' + allLinks[id] + ')"></div></a></li>');
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

  var photos_loaded = 0;
  photo_onload = function(obj) {
    photos_loaded++;
    if (photos_loaded == set_data.photos.length) {

      // load in masonry
      var container = document.querySelector('#photo-col');
      var msnry = new Masonry(container, {
        columnWidth : 405
      });
      msnry.bindResize()

      var imgs = $('.stage-img');
      imgs.each(function(i) {
        $(imgs[i]).addClass('fadeIn');
      });
    }
  }
  for (var i = 0; i < set_data.photos.length; i++) {
    var url = set_data.photos[i].getStreamURL();
    $('#photo-col').append('<li class="stage-img" ><a href="' + url + '" target="_blank"><img  onload="photo_onload(this)" id="' + set_data.photos[i].id + '" width="400px" src="' + set_data.photos[i].url + '" /></a></li>');
  }
  $(".exif").click(function() {
    getExif(this.id);
  });

  // preload all photos if not done yet
  genAllSetLinks();

}
clearPhotos = function() {

  $('#photo-col').empty();

}
getFlickrURL = function(farm, server, id, secret, size) {
  size = size || '';
  return 'http://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + size + '.jpg';
}
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

