ui = function() {
  this.init = function() {
    this.currentTab = null;
    this.currentDisplay = null;
    this.stageShown = true;
    this.allLinksLoading = false;
    this.allLinksLoaded = false;
    this.collageLoaded = false;
    this.menuOpen = false;
    this.device = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    //removed "iPad"

    // https://www.flickr.com/services/api/flickr.photos.getSizes.html
    this.size = {
    	MOBILE : '_z',
    	MEDIUM : '_c',
    	LARGE : '_b',
    }
    this.photo_size = this.size.MEDIUM; //this.device ? this.size.MOBILE : this.size.MEDIUM;

    // load in masonry
    this.msnry
    this.msnry_container = document.querySelector('#photo-col');
    this.photo_width = Math.min(410, Math.max(200, screen.width - 400) / 3);
    $('#stage').width(this.photo_width * 3 + 15);
    this.msnry_settings = {
      itemSelector : '.stage-img',
      isLayoutInstant : false,
      hiddenStyle : {
        opacity : 0,
        transform : "scale(0.95)"
      },
      visibleStyle : {
        opacity : 1,
        transform : "scale(1)"
      },
      // 5px padding
      columnWidth : this.device ? screen.width : this.photo_width + 5,
    };

  }
  // data to be shown after links are loaded
  // used in a callback to genSetLinks
  this.requestToShow = function(set_data) {
    this.requestedToShow = set_data;
  }
  this.requestedToShow = undefined;

  this.highlightTab = function(tab_selector) {
    var hit = $(tab_selector);
    hit.addClass('selected');
    if (UI.currentTab && hit !== UI.currentTab) {
      UI.currentTab.removeClass('selected');
    }
    UI.currentTab = hit;
  }

  this.showDisplayFromMenuId = function(id) {
    var selector = '#' + id;

    if (UI.currentTab && UI.currentTab.selector === selector) {
      return;
    } else {
      this.highlightTab(selector);

    }

    switch (id) {
      case "tab-featured":
        this.displayFeatured();
        break;
      case 'tab-collage':
        this.displayCollage();
        break;
      case 'tab-performances':
        this.displayPerformances();
        break;

      case 'tab-portraits':
        this.displayPortraits();
        break;

      case 'tab-international':
        this.displayInternational();
        break;

      case 'tab-cats':
        this.displayCats();
        break;

      case 'tab-recent':
        this.displayRecent();
        break;

      case 'tab-about':
        this.displayAbout();
        break;

      case 'tab-retouching':
        this.displayRetouching();
        break;

      case 'tab-reviews':
        this.displayReviews();
        break;

      case 'tab-contact':
        this.displayContact();
        break;

    }
  }
}
UI = new ui();

$(document).ready(function() {

  UI.init();
  //
  $('#stage').width(($(window).width() - 240) + 'px');
  $(window).resize(function() {
    $('#stage').width(($(window).width() - 240) + 'px');
  });
  
  $('#viewer').click(function(){
  	$('#viewer').fadeOut();
  	$('#viewer-main').fadeOut();
  	//$('body').removeClass('stop-scroll');
  	$('#stage').removeClass('viewer-on');
  });

  // hides current display and shows new one
  // e.g. stage, about, other info etc
  swapDisplayTo = function(id) {

    //no change
    if (UI.currentDisplay && id === UI.currentDisplay.selector) {
      return;

    }

    // remove previous fixed positioning
    var element = $(id);
    element.css('position', '');
    element.css('top', '');

    // show new UI.display
    // reset to top for new tab
    if (UI.currentDisplay) {

      // fade from current location and zoom to the top for seamless transition
      var top = UI.currentDisplay.offset().top;
      UI.currentDisplay.css('top', -$(document).scrollTop() + top);
      UI.currentDisplay.css('position', 'fixed');
      document.body.scrollTop = document.documentElement.scrollTop = 0;

      // immediately remove the fixed positioning after switch
      UI.currentDisplay.addClass('hidden');

    }


    element.removeClass('hidden');

    UI.currentDisplay = element;
  }

  UI.setNavAnchor = function(str) {
    $(function() {
      // Clear the hash in the URL
      location.hash = str;

    });

  }

  UI.displayFeatured = function() {
    UI.setNavAnchor('featured');
    swapDisplayTo('#stage');
    displaySet(sets.featured50);
  }
  UI.displayCollage = function() {
    UI.setNavAnchor('collage');
    populateCollage();
    swapDisplayTo('#collage');
  }
  UI.displayPerformances = function() {
    UI.setNavAnchor('performances');
    swapDisplayTo('#stage');
    displaySet(sets.performances);
  }
  UI.displayPortraits = function() {
    UI.setNavAnchor('portraits');
    swapDisplayTo('#stage');
    displaySet(sets.portraits);
  }
  UI.displayInternational = function() {
    UI.setNavAnchor('international');
    swapDisplayTo('#stage');
    displaySet(sets.international);
  }
  UI.displayCats = function() {
    UI.setNavAnchor('cats');
    swapDisplayTo('#stage');
    displaySet(sets.cats);
  }
  UI.displayRecent = function() {
    UI.setNavAnchor('recent');
    swapDisplayTo('#stage');
    displaySet(sets.stream);
  }
  UI.displayAbout = function() {
    UI.setNavAnchor('about');
    swapDisplayTo('#page-about');
  }
  UI.displayRetouching = function() {
    UI.setNavAnchor('retouching');
    swapDisplayTo('#retouching');
  }
  UI.displayReviews = function() {
    UI.setNavAnchor('kind-words');
    swapDisplayTo('#reviews');
  }
  UI.displayContact = function() {
    UI.setNavAnchor('contact');
    swapDisplayTo('#page-contact');
  }
  // MOBILE LISTENERS
  if (UI.device) {
  	
  	$('#mobile-menu').text('featured');

    $('#mobile-menu').click(function() {
      $('#menu').toggleClass('hidden');
      $('#mobile-menu').toggleClass('open');
    });

    $('#menu li').click(function() {
      if ($(this).hasClass('separator')) {
        return;
      }
      $('#menu').toggleClass('hidden');
      $('#mobile-menu').toggleClass('open');

      $('#mobile-menu').text($('#' + this.id).text());

      //show new item
      UI.showDisplayFromMenuId(this.id);
    });

    // move footer
    $("#footer").hide();
    //appendTo('body');

    // standard listeners
  } else {
    $('#mobile-menu').hide();
    $('#menu').removeClass('hidden');
    $('#menu li').click(function() {
      UI.showDisplayFromMenuId(this.id);
    });

  }

});