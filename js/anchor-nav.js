function checkAnchor() {
  // Check URL using setTimeout as it may not change before
  // listener is called
  UI.navPages = {
    'featured' : 'tab-featured',
    'collage' :'tab-collage',
    'all' : 'tab-collage',
    'performances' : 'tab-performances',
    'portraits' : 'tab-portraits',
    'international' : 'tab-international',
    'cats' : 'tab-cats',
    'recent' : 'tab-recent',
    'about' : 'tab-about',
    'retouching' : 'tab-retouching',
    'kind-words' : 'tab-reviews',
    'kindwords' : 'tab-reviews',
    'contact' : 'tab-contact',
  }
  window.setTimeout(doHashCheck, 10)
}

var doHashCheck = (function() {
  return function() {
    var tab = window.location.hash.replace(/^#/, '');

    // fnName should be a native function, not a host method
    if (UI.navPages[tab]) {
      UI.showDisplayFromMenuId(UI.navPages[tab]);
    } else {
    	// main entry page
      UI.highlightTab('#tab-featured');
      swapDisplayTo('#stage');
      displaySet(sets.featured50);
    }
  }
})(this);

