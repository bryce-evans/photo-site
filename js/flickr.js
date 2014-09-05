const KEY = 'd86d9b82925db25bbeb0bf49d7e97e13';
const SECRET = 'b31fc7c4e096aa0e';

const sets = {
	all : {links: {}}
  performances : {id : '72157641927940914', links: []},
  featured50 : {id : '72157635671751723', links: []},
  portraits : {id : '72157635020065114', links: []},
  cats : {id : '72157638337318724', links: []},
  bw : {id : '72157639080128075', links: []},
  skies : {id : '72157637070898063', links: []},
  macro : {id : '72157635013739675', links: []},
  wildlife : {id : '72157635015093339', links: []},
  food : {id : '72157635020081930', links: []},
};

genLinks = function() {
	for(key in sets) {
		  if (sets.hasOwnProperty(key)) {
    	alert(key + " -> " + p[key]);
	}	
	
}

jsonFlickrApi = function(data) {
  return data;
}
displaySet = function(set_id) {
  clearPhotos();
  genPhotos(set_id);
}
this.collageLoaded = false;
displayCollage = function() {
  if (this.collageLoaded) {
    return;
  }
  this.collageLoaded = true;
  for (var i = 0; i < 500; i++) {
  	url = '';
    $('#collage-container').append('<li><div class="tile"></div></li>');
  }

  // jQuery('<div/>', {
  // class: 'tile',
  // style: 'background-image: url(https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-xap1/v/t1.0-9/p417x417/10346272_10152639526997028_7792673939379580311_n.jpg?oh=6d9225f5d66d52f91c14eb7ba924c515&oe=54853B29&__gda__=1420027794_1b57f3feea3f9a232a8b09467bc97a2a)'
  // }).appendTo($('#collage').getChildren()[0]);
}
genPhotos = function(set_id) {
  $.ajax({
    type : 'POST',
    url : 'https://api.flickr.com/services/rest/',
    data : {
      method : 'flickr.photosets.getPhotos',
      api_key : KEY,
      format : 'json',
      dataType : 'jsonp',
      photoset_id : set_id,
    }
  }).done(function(response) {

    var data = eval(response);
    var photos = data.photoset.photo;
    for (var i = 0; i < photos.length; i++) {
      var photo = photos[i];
      var url = getFlickrURL(photo.farm, photo.server, photo.id, photo.secret, '_z');
      $('#photo-col' + (((i + 1) % 3) + 1)).append('<li><img width="400px" src="' + url + '" /></li>');
    }
  }).fail(function(response) {
    console.log(response);
  });
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
displaySet(sets.featured50);
