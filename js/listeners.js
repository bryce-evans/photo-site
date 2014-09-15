ui = function() {
  this.init = function() {
    this.currentTab = $('#tab-featured');
    this.currentDisplay = $('#stage');
    this.stageShown = true;
  }
}
UI = new ui();

$(document).ready(function() {

  UI.init();

  swapDisplayTo = function(id) {

    //no change
    if (id === '#' + UI.currentDisplay.attr('id')) {
      return;
      // hide current
    } else {
      UI.currentDisplay.addClass('hidden');
    }
    // show new display
    var element = $(id);
    element.removeClass('hidden');
    UI.currentDisplay = element;
  }

  $("#menu li").click(function() {

    // update tab color
    var hit = $(this);
    hit.addClass('selected');
    if (UI.currentTab && hit !== UI.currentTab) {
      UI.currentTab.removeClass('selected');
    }

    // update display
    if (hit && hit.context) {
      //console.log(hit.context.id);
    }
    // update current object
    UI.currentTab = hit;
  });

  UI.displayFeatured = function() {
    swapDisplayTo('#stage');
    displaySet(sets.featured50);
  }
  UI.displayCollage = function() {
    swapDisplayTo('#collage');
    displayCollage();
  }
  UI.displayPerformances = function() {
    swapDisplayTo('#stage');
    displaySet(sets.performances);
  }
  UI.displayPortraits = function() {
    swapDisplayTo('#stage');
    displaySet(sets.portraits);
  }
  UI.displayCats = function() {
    swapDisplayTo('#stage');
    displaySet(sets.cats);
  }
  UI.displayRecent = function() {
    swapDisplayTo('#stage');
    displaySet(sets.stream);
  }
  UI.displayAbout = function() {
    swapDisplayTo('#about');
  }
  UI.displayRetouching = function() {
    swapDisplayTo('#retouching');
  }
  UI.displayReviews = function() {
    swapDisplayTo('#reviews');
  }
  UI.displayContact = function() {
    swapDisplayTo('#contact');
  }
  $('#tab-featured').click(function() {
    displayFeatured();
  });

  $('#tab-collage').click(function() {
    displayCollage();
  });

  $('#tab-performances').click(function() {
    displayPerformances();
  });

  $('#tab-portraits').click(function() {
    displayPortraits();
  });
  $('#tab-cats').click(function() {
    displayCats();
  });
  $('#tab-recent').click(function() {
    displayRecent();
  });
  $('#tab-about').click(function() {
    displayAbout();
  });

  $('#tab-retouching').click(function() {
    displayRetouching();
  });
  $('#tab-reviews').click(function() {
    displayReviews();
  });
  $('#tab-contact').click(function() {
    displayContact();
  });

});
