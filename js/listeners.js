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
      console.log(hit.context.id);
    }
    // update current object
    UI.currentTab = hit;
  });

  $('#tab-featured').click(function() {
    swapDisplayTo('#stage');
    displaySet(sets.featured50);

  });

  $('#tab-collage').click(function() {
    swapDisplayTo('#collage');
    displayCollage();
  });

  $('#tab-performances').click(function() {
    swapDisplayTo('#stage');
    displaySet(sets.performances);
  });

  $('#tab-portraits').click(function() {
    swapDisplayTo('#stage');
    displaySet(sets.portraits);
  });
  $('#tab-cats').click(function() {
    swapDisplayTo('#stage');
    displaySet(sets.cats);
  });
  $('#tab-recent').click(function() {
    swapDisplayTo('#stage');
    displaySet(sets.stream);
  });
  $('#tab-about').click(function() {
    swapDisplayTo('#about');
  });

  $('#tab-retouching').click(function() {
    swapDisplayTo('#retouching');
  });
  $('#tab-reviews').click(function() {
    swapDisplayTo('#reviews');
  });
  $('#tab-contact').click(function() {
    swapDisplayTo('#contact');
  });

});
