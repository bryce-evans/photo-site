const FLICKR = {
  URL : 'https://api.flickr.com/services/rest/',
  KEY : 'd86d9b82925db25bbeb0bf49d7e97e13',
  SECRET : 'b31fc7c4e096aa0e',
  ID : '96143629@N07'
};

const allLinks = {};
const sets = {
  performances : {
    id : '72157641927940914',
    links : []
  },
  featured50 : {
    id : '72157635671751723',
    links : []
  },
  portraits : {
    id : '72157635020065114',
    links : []
  },
  cats : {
    id : '72157638337318724',
    links : []
  },
  bw : {
    id : '72157639080128075',
    links : []
  },
  skies : {
    id : '72157637070898063',
    links : []
  },
  macro : {
    id : '72157635013739675',
    links : []
  },
  wildlife : {
    id : '72157635015093339',
    links : []
  },
  food : {
    id : '72157635020081930',
    links : []
  },
  stream : {
    current_page : '1',
    pages : '1',
    links : []
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
      sets.stream.links.push(url);
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
              sets[key].links.push(url);
              allLinks[url] = true;
            }
          }
        }
        this.waiting_on--;
        if (this.waiting_on == 0) {
          callback();
        }
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
  for (url in allLinks) {
    $('#collage-container').append('<li><div class="tile" style="background-image: url(' + url + ')"></div></li>');
  }

  // jQuery('<div/>', {
  // class: 'tile',
  // style: 'background-image: url(https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-xap1/v/t1.0-9/p417x417/10346272_10152639526997028_7792673939379580311_n.jpg?oh=6d9225f5d66d52f91c14eb7ba924c515&oe=54853B29&__gda__=1420027794_1b57f3feea3f9a232a8b09467bc97a2a)'
  // }).appendTo($('#collage').getChildren()[0]);
}
populatePhotos = function(set_data) {
  for (var i = 0; i < set_data.links.length; i++) {
    $('#photo-col' + (((i + 1) % 3) + 1)).append('<li><img width="400px" src="' + set_data.links[i] + '" /></li>');
  }
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

