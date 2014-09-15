ui = function() {
  this.init = function() {
    this.currentTab = $('#logo');
    this.currentDisplay = $('#logo');
    this.stageShown = true;
  }
}
UI = new ui();

$(document).ready(function() {

  UI.init();

  // hides current display and shows new one
  // e.g. stage, about, other info etc
  swapDisplayTo = function(id) {

    //no change
    if (id === '#' + UI.currentDisplay.attr('id')) {
      return;
      // hide current
    } else {
      UI.currentDisplay.addClass('hidden');
    }
    // show new UI.display
    var element = $(id);
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

  UI.highlightTab = function(tab_id) {
    var hit = $(tab_id);
    hit.addClass('selected');
    if (UI.currentTab && hit !== UI.currentTab) {
      UI.currentTab.removeClass('selected');
    }
    UI.currentTab = hit;
  }

  UI.setNavAnchor = function(str) {
    $(function() {
      // Clear the hash in the URL
      location.hash = str;

    });

  }

  UI.displayFeatured = function() {
    UI.highlightTab('#tab-featured');
    UI.setNavAnchor('featured');
    swapDisplayTo('#stage');
    displaySet(sets.featured50);
  }
  UI.displayCollage = function() {
    UI.highlightTab('#tab-collage');
     UI.setNavAnchor('collage');
    swapDisplayTo('#collage');
    displayCollage();
  }
  UI.displayPerformances = function() {
    UI.highlightTab('#tab-performances');
     UI.setNavAnchor('performances');
    swapDisplayTo('#stage');
    displaySet(sets.performances);
  }
  UI.displayPortraits = function() {
    UI.highlightTab('#tab-portraits');
     UI.setNavAnchor('portraits');
    swapDisplayTo('#stage');
    displaySet(sets.portraits);
  }
  UI.displayCats = function() {
    UI.highlightTab('#tab-cats');
     UI.setNavAnchor('cats');
    swapDisplayTo('#stage');
    displaySet(sets.cats);
  }
  UI.displayRecent = function() {
    UI.highlightTab('#tab-recent');
     UI.setNavAnchor('recent');
    swapDisplayTo('#stage');
    displaySet(sets.stream);
  }
  UI.displayAbout = function() {
    UI.highlightTab('#tab-about');
    swapDisplayTo('#about');
  }
  UI.displayRetouching = function() {
    UI.highlightTab('#tab-retouching');
     UI.setNavAnchor('retouching');
    swapDisplayTo('#retouching');
  }
  UI.displayReviews = function() {
    UI.highlightTab('#tab-reviews');
     UI.setNavAnchor('reviews');
    swapDisplayTo('#reviews');
  }
  UI.displayContact = function() {
    UI.highlightTab('#tab-contact');
     UI.setNavAnchor('contact');
    swapDisplayTo('#contact');
  }
  $('#tab-featured').click(function() {
    UI.displayFeatured();
  });

  $('#tab-collage').click(function() {
    UI.displayCollage();
  });

  $('#tab-performances').click(function() {
    UI.displayPerformances();
  });

  $('#tab-portraits').click(function() {
    UI.displayPortraits();
  });
  $('#tab-cats').click(function() {
    UI.displayCats();
  });
  $('#tab-recent').click(function() {
    UI.displayRecent();
  });
  $('#tab-about').click(function() {
    UI.displayAbout();
  });

  $('#tab-retouching').click(function() {
    UI.displayRetouching();
  });
  $('#tab-reviews').click(function() {
    UI.displayReviews();
  });
  $('#tab-contact').click(function() {
    UI.displayContact();
  });

});
