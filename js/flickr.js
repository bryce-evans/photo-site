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
    return 'https://www.flickr.com/photos/' + FLICKR.ID + "/" + this.id;
  };
}
// a set implementation of links. key : <string> url, value: <bool> (true)
var allLinks = {};

const sets = {
  performances : {
    id : '72157641927940914',
    photos : []
  },
  featured50 : {
    id : '72157635671751723',
    photos : []
  },
  portraits : {
    id : '72157635020065114',
    photos : []
  },
  cats : {
    id : '72157638337318724',
    photos : []
  },
  bw : {
    id : '72157639080128075',
    photos : []
  },
  skies : {
    id : '72157637070898063',
    photos : []
  },
  macro : {
    id : '72157635013739675',
    photos : []
  },
  wildlife : {
    id : '72157635015093339',
    photos : []
  },
  food : {
    id : '72157635020081930',
    photos : []
  },
  stream : {
    current_page : '1',
    pages : '1',
    photos : []
  }
};

genLinksFromStream = function() {

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
  });
}
genLinks = function(callback) {
  genLinksFromStream();

  this.waiting_on = Object.keys(sets).length;
  for (set in sets) {
    if (set === 'stream') {
      break;
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
        this.waiting_on--;
        if (this.waiting_on == 0) {
          callback();
        }

        // convert set to list

        // for (var key in allLinksSet) {
        // allLinks.push({
        // 'id' : key,
        // 'url' : allLinksSet[key],
        // });
        // }

      }.bind(this));
    }
  }
}
$(document).ready(function() {
  genLinks(function() {
    displaySet(sets.featured50);
  });
});

jsonFlickrApi = function(data) {
  return data;
}
displaySet = function(set_data) {
  clearPhotos();
  populatePhotos(set_data);
}
this.collageLoaded = false;
displayCollage = function() {
  if (this.collageLoaded) {
    return;
  }
  this.collageLoaded = true;
  // ret

  var ids = Object.keys(allLinks);

  ids.sort(function() {
    return Math.random() - 0.5;
  });

  if (ids.forEach) {
    ids.forEach(function(id) {
      $('#collage-container').append('<li><a href="' + getFlickrStreamURL(id) + '" target="_blank"><div class="tile" style="background-image: url(' + allLinks[id] + ')"></div></a></li>');
    });
  }

  // jQuery('<div/>', {
  // class: 'tile',
  // style: 'background-image: url(https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-xap1/v/t1.0-9/p417x417/10346272_10152639526997028_7792673939379580311_n.jpg?oh=6d9225f5d66d52f91c14eb7ba924c515&oe=54853B29&__gda__=1420027794_1b57f3feea3f9a232a8b09467bc97a2a)'
  // }).appendTo($('#collage').getChildren()[0]);
}
populatePhotos = function(set_data) {
  for (var i = 0; i < set_data.photos.length; i++) {
    var url = set_data.photos[i].getStreamURL();
    $('#photo-col' + (((i + 1) % 3) + 1)).append('<li ><a href="'+url+'" target="_blank"><img  onload="fadeIn(this)" id="' + set_data.photos[i].id + '" width="400px" src="' + set_data.photos[i].url + '" /></a></li>');
  }
  $(".exif").click(function() {

    getExif(this.id);
  });
}

window.fadeIn = function(obj) {
    $(obj).fadeIn(1000);
}

clearPhotos = function() {
  for (var i = 1; i < 4; i++) {
    $('#photo-col' + i).empty();
  }
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

