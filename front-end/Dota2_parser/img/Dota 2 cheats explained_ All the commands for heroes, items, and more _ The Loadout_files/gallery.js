document.addEventListener('DOMContentLoaded', galleriesCore);
window.addEventListener('NextPageContentLoaded', galleriesCore);

function galleriesCore (e) {
  screen_width =  document.documentElement.clientWidth || document.body.clientWidth;

  var firstGallery = document.getElementsByClassName('site_gallery')[0];
  if(firstGallery === undefined) return; // (Bail if no galleries at this point)

  function setResponsiveGalleryImages() {
    if(window.galleryRefs) {
      /* Loop over all the gallery objects in the window. Change their gal_img_width
      properties based on whether they are smaller than their max width or not */

      for(var i = 0; i < window.galleryRefs.quantity; i++) {
        var identifier = `gallery_${i}`;
        thisGallery = window.galleryRefs[identifier];

        if(screen_width < thisGallery.gal_img_max_width) {
          thisGallery.gal_img_width = screen_width;
        } else {
          // Set it back to original if scaled up:
          thisGallery.gal_img_width = thisGallery.gal_img_max_width;
        }

        window.galleryRefs[identifier] = thisGallery;

        // Need image index here.
        var index = parseInt(thisGallery.main.dataset.imageindex) - 1;
        thisGallery.galleryRail.style.marginLeft = "-" + (index * thisGallery.gal_img_width) + "px";
      }
    }
  }

  // Where we will save the DOM traversal ahead of time:
  window.galleryRefs = {};

  function setGalleryReferences(currentGallery) {
    // The object we will export:
    thisGallery = {};

    // Main image rail stuff:
    thisGallery.main = currentGallery;
    thisGallery.galleryNav = currentGallery.querySelector('.gallery_slider_rail .gallery_nav');
      thisGallery.galleryNavPrev = thisGallery.galleryNav.getElementsByClassName('gallery_nav_prev')[0];
      thisGallery.galleryNavNext = thisGallery.galleryNav.getElementsByClassName('gallery_nav_next')[0];
    thisGallery.gallerySlider = currentGallery.getElementsByClassName('gallery_slider_rail')[0];
    thisGallery.galleryRail = thisGallery.gallerySlider.getElementsByClassName('gallery_rail')[0];
      thisGallery.galleryImgContainers = thisGallery.galleryRail.getElementsByClassName('gallery');
      thisGallery.galleryCounter = thisGallery.gallerySlider.getElementsByClassName('gallery_counter')[0];

    // Thumbrail stuff
    thisGallery.galleryThumbSlider = currentGallery.getElementsByClassName('gallery_thumb_slider_rail')[0];
      thisGallery.galleryThumbRail = thisGallery.galleryThumbSlider.getElementsByClassName('gallery_thumb_rail')[0];
        thisGallery.thumbRailImages = thisGallery.galleryThumbRail.getElementsByTagName('img');
      thisGallery.galleryThumbNav = thisGallery.galleryThumbSlider.getElementsByClassName('gallery_thumb_nav')[0];
        thisGallery.galleryThumbNavPrev = thisGallery.galleryThumbNav.getElementsByClassName('gallery_thumb_nav_prev')[0];
        thisGallery.galleryThumbNavNext = thisGallery.galleryThumbNav.getElementsByClassName('gallery_thumb_nav_next')[0];

    // This can have its own gal_img_width (which tells the gallery how far to shift L&R):
    let gal_dims = setGalImgWidth(thisGallery.main);
    thisGallery.gal_img_width = gal_dims[0];
    thisGallery.gal_img_max_width = gal_dims[1];

    // Assign the id to the window object
    galleryRefs[thisGallery.galleryRail.id] = thisGallery;

    if(! window.galleryRefs.quantity) {
      window.galleryRefs.quantity = 1;
    } else {
      // More efficient than trying to count keys in an object:
      window.galleryRefs.quantity++;
    }

  }
  
  // If there is a gallery present on the page:
  if(firstGallery && typeof firstGallery === "object") {
    window.addEventListener("resize", function() {
      // Every half a second after a resize, allow a delayed resize event to trigger:
      if(window.responsiveInfo.throttle(500, 'responsiveGallery')) {
        setTimeout(function(){
          // Capture screen width at point of resize for best usability:
          screen_width = document.documentElement.clientWidth || document.body.clientWidth;
          setResponsiveGalleryImages();
          let activeGalleries = document.getElementsByClassName('gallery_rail');
          for(var i = 0; i < activeGalleries.length; i++) {

            // Get 1 less than the data-imgindex integer from the active thumbnail below the gallery:
            var index = parseInt(
              activeGalleries[i].parentElement.parentElement
              .querySelector('.gallery_thumb_slider_rail .gallery_thumb_rail .rail_active')
              .dataset
              .imgindex
            ) - 1;
          }
        }, 1000);
      }

      setResponsiveGalleryImages();
    }, false);

    window.addEventListener("orientationchange", function() {
      // Announce the new orientation number
      screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      setResponsiveGalleryImages();
    }, false);

    var allGalleries = document.getElementsByClassName('site_gallery');
    for(var i = 0; i < allGalleries.length; i++) {
      var currentGallery = allGalleries[i];
      setGalImgWidth(currentGallery);

      function determineClickedGallery(e) {
        // Move up to a common starting point, then drill down to where we capture the unique id:
        // Behaves differently for touch events:
        if(e.type === 'panleft' || e.type === 'panright') {
          if(e.target.tagName === 'IMG') {
            var galleryID = e.target.parentElement.parentElement.parentElement.parentElement
              .getElementsByClassName('gallery_slider_rail')[0].getElementsByClassName('gallery_rail')[0].id;
          } else if(e.target.classList.contains('gallery_counter')) {
            var galleryID = e.target.parentElement.parentElement
              .getElementsByClassName('gallery_slider_rail')[0].getElementsByClassName('gallery_rail')[0].id;
          }
        } else {
          var galleryID = e.target.parentElement.parentElement.parentElement.getElementsByClassName('gallery_slider_rail')[0].getElementsByClassName('gallery_rail')[0].id;
        }

        if(galleryID) {
          return window.galleryRefs[galleryID];
        } else {
          return false;
        }
      }

      function shiftGalleryRail(direction = null, clickedIndex = null, event) {
        if(Date.now() < window.galleryLastShifted + 100) return;
        var clickedGallery = determineClickedGallery(event);

        /* Moves the current gallery image, whether by direct
          thumbnail-click or by clicking next / swiping */
        let canGo = false;
        var image_index = parseInt(clickedGallery.galleryNav.dataset.imageindex);
        var image_count = parseInt(clickedGallery.galleryNav.dataset.imagecount);

        switch(direction) {
          case 'forward':
            if(image_index < image_count) canGo = true;
            image_index++;
            break;
          case 'backward':
            if(image_index > 1) canGo = true;
            image_index--;
            break;
          default:
            if( typeof clickedIndex === 'number' ) {
              image_index = clickedIndex;
              canGo = true;
            } else {
              return;
            }
        }

        if(canGo === true) {
          var newMarginLeft = ((image_index - 1) * clickedGallery.gal_img_width) * - 1;
          clickedGallery.galleryRail.style.marginLeft = newMarginLeft + 'px';
          clickedGallery.galleryNav.dataset.imageindex = image_index;
          update_enlarge_button(image_index, clickedGallery);
          update_gallery_counter(clickedGallery.galleryCounter, image_index);
          update_thumb_rail(clickedGallery.galleryThumbRail, image_index);
          clickedGallery.main.dataset.imageindex = image_index;
          window.galleryLastShifted = Date.now();
        }
      }

      switch(e.type) {
        case 'DOMContentLoaded':
          currentPage = 0;
          break;
        case 'NextPageContentLoaded':
          currentPage = window.InfiniteScroll.currentPageIndex + 1;
          break;
        default: currentPage = null; // Not sure if this would occur.
      }

      // Have to define galleryImgContainers locally as the window object will not yet be defined:
      galleryImgContainers = currentGallery
        .getElementsByClassName('gallery_slider_rail')[0]
        .getElementsByClassName('gallery_rail')[0]
        .getElementsByClassName('gallery');

      for(var k = 0; k < galleryImgContainers.length; k++) {
        let identifier = `gallery_${i}`; // To label the gallery later;
        let galleryRail = currentGallery.getElementsByClassName('gallery_rail')[0];
        if(! galleryImgContainers[k].classList.contains(identifier)) {
          galleryImgContainers[k].classList.add(identifier)
          galleryImgContainers[k].dataset.featherlight = ''
        }
        galleryRail.id = identifier
        // galleryRail.dataset.featherlightFilter = `a.gallery`
        // galleryRail.setAttribute('data-featherlight-gallery', "")
      }

      setGalleryReferences(currentGallery);

      thisGallery = window.galleryRefs[`gallery_${i}`];

      // Apply event listeners.
      thisGallery.galleryNavPrev.addEventListener('click', applyShiftBackward);
      thisGallery.galleryNavNext.addEventListener("click", applyShiftForward);

      // Add a consistent distance for shifting the thumbrail, accessible in below blocks
      thisGallery.thumbShiftDistance = thisGallery.thumbRailImages[0].width + 10;

      thisGallery.galleryThumbNavPrev.addEventListener("click", function(e) {
        var clickedGallery = determineClickedGallery(e);
        var min_x = 0;
        var curMarginLeft = parseInt(clickedGallery.galleryThumbRail.style.marginLeft.replace("px", ""));
        newMarginLeft = curMarginLeft + clickedGallery.thumbShiftDistance;
        if(newMarginLeft < min_x) {
          clickedGallery.galleryThumbRail.style.marginLeft = newMarginLeft + 'px';
        } else {
          clickedGallery.galleryThumbRail.style.marginLeft = min_x + 'px';
        }
      });

      thisGallery.galleryThumbNavNext.addEventListener("click", function(e) {
        var clickedGallery = determineClickedGallery(e);
        var image_count = clickedGallery.thumbRailImages.length;
        var max_x = (((image_count) * clickedGallery.thumbShiftDistance) -  clickedGallery.gal_img_width + 70)*-1;
        if(clickedGallery.galleryThumbRail.style.marginLeft) {
          var curMarginLeft = parseInt(clickedGallery.galleryThumbRail.style.marginLeft.replace("px", ""));
        } else {
          curMarginLeft = 0;
        }
        newMarginLeft = curMarginLeft - clickedGallery.thumbShiftDistance;
        if(newMarginLeft > max_x) {
          clickedGallery.galleryThumbRail.style.marginLeft = newMarginLeft + 'px';
        } else {
          clickedGallery.galleryThumbRail.style.marginLeft = max_x + "px";
        }
      });

      for(let i = 0; i < thisGallery.thumbRailImages.length; i++) {
        thisGallery.thumbRailImages[i].addEventListener("click", function(e) {
          clickedGallery = determineClickedGallery(e);
          clickedGallery.main.querySelector('.rail_active').classList.remove('rail_active');
          e.target.classList.add('rail_active');
          var newIndex = parseInt(e.target.dataset.imgindex);
          clickedGallery.galleryNav.dataset.imageindex = newIndex;
          clickedGallery.main.dataset.imageindex = newIndex;
          shiftGalleryRail(null, newIndex, e);
        });
      }

      var canSwipe = true; // 2 second delay between swiping
      var hammertime = new Hammer(thisGallery.gallerySlider);
      var gallobj = thisGallery.gallerySlider;
        hammertime.on('panleft panright', galleryHammertime);
        function galleryHammertime(ev) {
          clickedGallery = determineClickedGallery(ev);
          if(canSwipe) {
            canSwipe = false;
            setTimeout(function(){canSwipe=true}, 200)
            // console.log(ev.type);
            if(ev.type === 'panright') {
              shiftGalleryRail('backward', null, ev);
            }
            if(ev.type === 'panleft') {
              shiftGalleryRail('forward', null, ev);
            }
          } else {
            // console.log("waiting");
          }
        };
    }
  }

  function update_enlarge_button(index, thisGallery) {
    var nextHref = thisGallery.galleryRail.getElementsByClassName('gallery')[index - 1].getAttribute('href');
    thisGallery.main.getElementsByClassName('gallery_enlarge')[0].setAttribute('href', nextHref);
  }
  function update_gallery_counter(counterObj, index) {
    if(counterObj.length) counterObj = counterObj[0]; // The click event can cause type issues
    counterObj.getElementsByClassName('gallery_index')[0].innerHTML = index;
  }
  function update_thumb_rail(thumbrail, index) {
    // Set the active thumb
    var thumbs = thumbrail.getElementsByTagName('img');
    var shiftDistance = thumbs[0].width + 10;
    var activeThumb = thumbrail.getElementsByClassName('rail_active')[0];

    var image_count = clickedGallery.thumbRailImages.length;

    activeThumb.classList.remove('rail_active');
    thumbs[index - 1].classList.add('rail_active');

    // Shift the rail along to center the active
    newRailMarginLeft = (shiftDistance * (parseInt(index)))*-1;
    newRailMarginLeft = (newRailMarginLeft + (clickedGallery.gal_img_width/2));

    newRailMarginLeft = (shiftDistance * (parseInt(index)-1))*-1;
    newRailMarginLeft = (newRailMarginLeft + (clickedGallery.gal_img_width/2) - shiftDistance);

    if(newRailMarginLeft > 0) newRailMarginLeft = 0;
    // image_count is declared outside this function, but is defined due to nested var scope:
    maxMarginLeft = (((image_count) * shiftDistance) -  clickedGallery.gal_img_width + 70)*-1;
    if(newRailMarginLeft < maxMarginLeft) newRailMarginLeft = maxMarginLeft;

    thumbrail.style.marginLeft = newRailMarginLeft + 'px';
  }

  function setGalImgWidth(thisGallery) {
    var gal_img_width;
    var gal_img_max_width;

    // Determine the size of the gallery (Sizes taken from lib/setup.php):
    if(thisGallery.classList.contains('site_gallery_large') || thisGallery.classList.contains('site_gallery_full')) {
      if (screen_width < 940) {
        gal_img_width = screen_width;
      } else {
        gal_img_width = 900;
      }
        gal_img_max_width = 900;
      } else if(thisGallery.classList.contains('site_gallery_news-header')) {
        if (screen_width < 580) {
          gal_img_width = screen_width;
        } else {
          gal_img_width = 580;
        }
        gal_img_max_width = 580;
      } else if(thisGallery.classList.contains('site_gallery_medium')) {
        if(screen_width < 740) {
          gal_img_width = screen_width;
        } else {
          gal_img_width = 740;
        }
        gal_img_max_width = 740;
      } else {
        // Edge case. Give it default values for Large without conditionals
        gal_img_width = 900;
        gal_img_max_width = 900;
      }

      return [gal_img_width, gal_img_max_width];
  }

  function applyShiftBackward (e) {
    clickedGallery = determineClickedGallery(e);
    shiftGalleryRail('backward', null, e);
  }
  
  function applyShiftForward (e) {
    clickedGallery = determineClickedGallery(e);
    shiftGalleryRail('forward', null, e);
  }
}