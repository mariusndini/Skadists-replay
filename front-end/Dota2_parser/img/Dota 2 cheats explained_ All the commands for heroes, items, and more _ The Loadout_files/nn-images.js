// Call at initial page load:
// jQuery(document).ready(initImageComparisons);
jQuery(document).ready(function($){ 
  initImageComparisons($);
});

window.addEventListener('NextPageContentLoaded', function() {
  initImageComparisons();
});

  /**
   * Also includes some galleries code.
   */
  function initImageComparisons($) {
    if(typeof $ === 'undefined') $ = jQuery;

    /*
     * Slide JS
     */
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var isUsingSlide = false;
    // try caching the object to increase performance
    var compWrapper = $(".ic_img_wrap");
    var innerSlide = compWrapper.children('.ic_img_primary');
    var slider = compWrapper.children('.ic_slider');
    $(document).on('mousemove', '.ic_img_wrap', function (e) {
      // Does not affect panning on touch screens
      e.currentTarget.firstElementChild.style.width = e.offsetX + "px";
      e.currentTarget.lastElementChild.style.left =  e.offsetX + "px";
    });

    $('.ic_img_wrap').each(function(){
      var $this = $(this);
      var mc = new Hammer(this);
      mc.on("pan", function(ev) {
        // Affects panning on touch screens. ev.srcEvent.offsetX does not exist on iOS.
        var relativeXPosition = Math.round(ev.center.x);
        $this.children('.ic_img_primary').css("width", relativeXPosition + "px");
        $this.children('.ic_slider').css('left', relativeXPosition + "px");
        return false;
      });
    });

    $('body').on('click','.ic_nav_primary li', function(){
      var imgurl = $(this).children('a').data('imgurl');
      $(this).siblings('.active').removeClass("active");
      $(this).addClass("active");
      $(this).parents('.image_comparison').children('.ic_img_wrap').children('.ic_img_primary').find('img').attr('src', imgurl);
      $(this).parents('.image_comparison').find('.ic_img_primary_label').html($(this).children('a').html());
    });
    $('body').on('click','.ic_nav_secondary li', function(){
      var imgurl = $(this).children('a').data('imgurl');
      $(this).siblings('.active').removeClass("active");
      $(this).addClass("active");
      $(this).parents('.image_comparison').children('.ic_img_wrap').children('.ic_img_secondary').find('img').attr('src', imgurl);
      $(this).parents('.image_comparison').find('.ic_img_secondary_label').html($(this).children('a').html());
    });

    if($('.gallery_rail').length === 0) return;
      var enlarges = document.getElementsByClassName('gallery_enlarge')

      for(var i = 0; i < enlarges.length; i++) {
        enlarges[i].parentNode.getElementsByClassName('gallery_rail')[0].addEventListener('click', function(ev) {
          window.activeGallery = ev.currentTarget.id
      }, true)
    }
}




if( window.InfiniteScroll && typeof window.InfiniteScroll === "object" ) {
  window.addEventListener("NextPageContentLoaded", function(){
    $ = jQuery;
    if($('.next_page_placeholder * .gallery_rail').length === 0) return;

    var enlarges = document.getElementsByClassName('gallery_enlarge')

    for(var i = 0; i < enlarges.length; i++) {
      enlarges[i].parentNode.getElementsByClassName('gallery_rail')[0].addEventListener('click', function(ev) {
        window.activeGallery = ev.currentTarget.id
      }, true)
    }

    var new_document = $('.next_page_placeholder article');

    document.querySelectorAll('.gallery_rail').forEach(function(rail, i){
      $(rail).featherlightGallery({
        previousIcon: '&#9664;',     /* Code that is used as previous icon */
        nextIcon: '&#9654;',         /* Code that is used as next icon */
        galleryFadeIn: 100,          /* fadeIn speed when slide is loaded */
        galleryFadeOut: 300,         /* fadeOut speed before slide is loaded */
        filter: `a.gallery`,
        targetAttr: 'href'
      });
    })
  });
}
