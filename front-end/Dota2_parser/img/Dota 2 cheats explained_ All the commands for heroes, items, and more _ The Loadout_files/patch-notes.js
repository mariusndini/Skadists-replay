jQuery(document).ready(function($) {
  if(pn_nav_top = $('#patch_notes_nav').length==0) return;

  // throttle function, enforces a minimum time interval
  function throttle(fn, interval) {
    var lastCall, timeoutId;
    return function () {
        var now = new Date().getTime();
        if (lastCall && now < (lastCall + interval) ) {
            // if we are inside the interval we wait
            clearTimeout(timeoutId);
            timeoutId = setTimeout(function () {
                lastCall = now;
                fn.call();
            }, interval - (now - lastCall) );
        } else {
            // otherwise, we directly call the function 
            lastCall = now;
            fn.call();
        }
    };
  }


  var currentActiveSection = null;

  function highlightNavigation() {
    // get the current vertical position of the scroll bar
    var scrollPosition = $(window).scrollTop() + window.innerHeight/2;
    var foundSection = false;
    // iterate the sections
    $sections.each(function() {
        var currentSection = $(this);
        // get the position of the section
        var sectionTop = currentSection.offset().top;
        
        // if the user has scrolled over the top of the section  
        if (scrollPosition >= sectionTop) {
            // get the section id
            var name = currentSection.attr('name');
            // get the corresponding navigation link
            var $navigationLink = sectionIdTonavigationLink[name];
            foundSection = true;
            currentActiveSection = $navigationLink;
            // if the link is not active
            if (!$navigationLink.hasClass('active')) {
                // remove .active class from all the links
                $navigationLinks.removeClass('active');
                // add .active class to the current link
                $navigationLink.addClass('active');
            }
            // we have found our section, so we return false to exit the each loop
            return false;  
        } 
    });
    if(!foundSection) {
      if(currentActiveSection!==null) {
        currentActiveSection.removeClass('active');
      }
    }
}

  // Get the trigger points to embolden the nav
  var previousBreakpoint = null;
  var nextBreakpoint = $('.pn_startSection').first();

  var $navigationLinks = $('#patch_notes_nav ul li');
  var $sections = $($(".pn_startSection").get().reverse());
  var sectionIdTonavigationLink = {};
  $sections.each( function(){
    sectionIdTonavigationLink[ $(this).attr('name') ] = $('#patch_notes_nav ul li a[href=#' + $(this).attr('name') + ']').parent("li");
  });
  var viewOffset = 300;

  var pn_nav_top = $('#patch_notes_nav').offset().top;
  pn_nav_top -= 140;
  var max_nav_top = $('.post_footer').offset().top - 100;

  $(window).scroll(function() {
    
    throttle(highlightNavigation(), 1500);
   
    });
 

  function toggleSection(startElement) {

    if(startElement.hasClass("hidden")) {
      startElement.nextUntil('.pn_endSection').fadeIn(200, function(){
        startElement.removeClass("hidden");
      });

    } else {
      startElement.nextUntil('.pn_endSection').fadeOut(200, function(){
        startElement.addClass("hidden");
      });
    }
  }

  $('.entry-content h4').click(function(){
   console.log("clicked");
    if($(this).children('.pn_startSection').length > 0) {
      toggleSection($(this));
    }
  });


});
