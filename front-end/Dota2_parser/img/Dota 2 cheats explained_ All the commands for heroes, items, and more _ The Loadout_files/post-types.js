jQuery(document).ready(function($) {
    function enableJumplinks () {
        const jumpLinks = document.getElementsByClassName('site_jumplinks');
        for(var i = 0; i < jumpLinks.length; i++) {
            jumpLinks[i].addEventListener('click', function(e) {
                e.preventDefault();
                var hrefTarget = e.currentTarget.href.split('#')[1];
                let anchorElement = document.getElementById(hrefTarget);
                // PM 06/10/20 Some legacy content has spaces in the IDs
                if(anchorElement == null) {
                    anchorElement = document.getElementById(hrefTarget.replace(/_/g, ' '));
                }
                var headerOffset = window.innerWidth > 900 ? 80 : 20; // On mobile, don't account for header height.
                    headerOffset += document.querySelector('.banner').offsetTop; // Mini BFA pushes header down
                var realOffset = window.pageYOffset + anchorElement.getBoundingClientRect().top - headerOffset;
                var duration = 700;
                $('html, body').animate({ scrollTop: (realOffset) }, duration);
                setTimeout(function(){
                    // Lazyloaded images will move the position of the target (mobile)
                    let reFetchTarget = document.getElementById(hrefTarget);
                     // PM 06/10/20 Some legacy content has spaces in the IDs
                    if(reFetchTarget == null) {
                        reFetchTarget = document.getElementById(hrefTarget.replace(/_/g, ' '));
                    }
                    let newOffset = window.pageYOffset + reFetchTarget.getBoundingClientRect().top - headerOffset;
                    $('html, body').animate({ scrollTop: (newOffset) }, 200);
                }, duration + 100, hrefTarget);
            });
        }
    }
    
    enableJumplinks();
    window.addEventListener('NextPageContentLoaded', enableJumplinks);
} );

window.addEventListener('NextPageContentLoaded', function() {
    // This is required for mobile tables to be swipeable on scroll
    window.mobile_tables = new Mobile_Tables();
});