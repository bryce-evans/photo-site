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

  $("#menu li").click(function() {

    // update tab color
    var hit = $(this);
    hit.addClass('selected');
    if (UI.currentTab && hit !== UI.currentTab) {
      UI.currentTab.removeClass('selected');
    }

    // update UI.display
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
