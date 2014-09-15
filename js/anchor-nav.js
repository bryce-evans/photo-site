function checkAnchor() {
  // Check URL using setTimeout as it may not change before
  // listener is called
  UI.navPages = {
    'featured' : UI.displayFeatured,
    'collage' : UI.displayCollage,
    'all' : UI.displayCollage,
    'performances' : UI.displayPerformances,
    'portraits' : UI.displayPortraits,
    'cats' : UI.displayCats,
    'recent' : UI.displayRecent,
    'about' : UI.displayAbout,
    'retouching' : UI.displayRetouching,
    'reviews' : UI.displayReviews,
    'kindwords' : UI.displayReviews,
    'contact' : UI.displayContact,
  }
  window.setTimeout(doHashCheck, 10)
}

var doHashCheck = (function() {
  return function() {
    var fnName = window.location.hash.replace(/^#/, '');
    console.log(fnName);
    // fnName should be a native function, not a host method
    if (UI.navPages[fnName]) {
      UI.navPages[fnName]();
    } else {
    	// main entry page
      UI.highlightTab('#tab-featured');
      swapDisplayTo('#stage');
      displaySet(sets.featured50);
    }
  }
})(this);

