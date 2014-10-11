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
    //removed iPad

    // load in masonry
    this.msnry
    this.msnry_container = document.querySelector('#photo-col');
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

      columnWidth : 405,
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

      // immediately remove the fixed positioning after switch

      // reset scroll to top
      setTimeout(function() {
        $('body').scrollTop(0);
      }, 250);
      UI.currentDisplay.addClass('hidden');

      // fade out stage
      // if (UI.currentDisplay === $('#stage')) {
      // var imgs = $('.stage-img');
      // imgs.each(function(i) {
      // $(imgs[i]).removeClass('fadeIn');
      // $(imgs[i]).addClass('fadeOut');
      // });
      // setTimeout(function() {
      // $('#stage').hide();
      // }, 400);
      // }

    }

    // fade in stage
    // if (UI.currentDisplay === $('#stage')) {
    // var imgs = $('.stage-img');
    // imgs.each(function(i) {
    // $(imgs[i]).addClass('fadeIn');
    // });
    // $('#stage').show();
    // }

    element.removeClass('hidden');

    UI.currentDisplay = element;
  }
  // $("#menu li").click(function() {
  //
  // // update tab color
  // var hit = $(this);
  // hit.addClass('selected');
  // if (UI.currentTab && hit !== UI.currentTab) {
  // UI.currentTab.removeClass('selected');
  // }
  //
  // // update UI.display
  // if (hit && hit.context) {
  // //console.log(hit.context.id);
  // }
  // // update current object
  // UI.currentTab = hit;
  // });

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

// change header size on scroll
// from Wolfram <http://reference.wolfram.com/common/javascript/gl-head-scripts.en.js>
// basically if not at top, add class to shrink. Always fixed at top, only shrunk
// (window).on('load scroll resize', gl_ThrottleFunction(function() {
// // create ability to toggle the compact menu
// if ($('body.gl-header-nocompact').length > 0) {
// // don't use the compact header (the rest is done with css)
// gl_FirstRun = false;
// } else {
// // switch to compact mode when page is loaded/reloaded while scrolled down
// if (gl_FirstRun && $(window).scrollTop() > gl_HeaderFullHeight - gl_HeaderCompactHeight) {
// $('#gl-header, #gl-header-bg, #gl-header-offset').addClass('gl-compact gl-onload');
// gl_FirstRun = false;
// return;
// }
// gl_FirstRun = false;
//
// // toggle modes on scroll
// if ($(window).scrollTop() > gl_HeaderFullHeight - gl_HeaderCompactHeight) {
// // switch to compact mode when user scrolls down
// $('#gl-header, #gl-header-bg, #gl-header-offset').addClass('gl-compact');
// } else {
// // use full size mode by default and switch to it when user scrolls up
// $('#gl-header, #gl-header-bg, #gl-header-offset').removeClass('gl-compact');
// }
// }
// // emulate horizontal scroll effect on fixed position element
// $(gl_Header).offset({
// left : gl_OffsetLeft
// });
// }));
