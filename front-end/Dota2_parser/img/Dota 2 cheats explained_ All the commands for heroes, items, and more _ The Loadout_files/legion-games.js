(function($) {
  $(document).ready(function($) {
    if($("#header-search-input").length==0) return;
    $("#header-search-input").autocomplete({
      classes: { "ui-autocomplete": "header-autocomplete" }, 
      source: function(term, response) {
        
      $.ajax({
        type: 'POST',
        dataType: 'json',
        url: legion_games.ajax_url,
        data: 'action=search_term&term='+term.term,
        success: function(data) {
          response(data);
        }
      });
    },
    open: function(event, ui)
        {
          if(responsiveInfo.isResponsive) {
            if(document.body.classList.contains("admin-bar")) {
              myTop = "106px"
            } else {
              myTop = "60px"
            }
            $("#header-search-input").autocomplete ("widget").css("width", "100%");
            $("#header-search-input").autocomplete ("widget").css("top",myTop);  
            $("#header-search-input").autocomplete ("widget").css("left","0px");     
          }
          
           
        }   
    }).autocomplete( "instance" )._renderItem = function( ul, item ) {
      item.name = item.name.replace(/\\(.)/mg, "$1");
      switch(item.type) {
        case 'review':
          if(item.score === '0') {
            return $( "<li class='search-result-item'>" )
              .append( "<div class=\"st_gamereview\"><a href=\""+item.url+"\">" + item.name + "</a></div>" )
              .appendTo( ul );
          } else {
            return $( "<li class='search-result-item'>" )
              .append( "<div class=\"st_gamereview\"><a href=\""+item.url+"\">" + item.name + "<span class=\"st_review_score review_score_"+item.score+"\">"+item.score+"</span></a></div>" )
              .appendTo( ul );
          }

          break;
        case 'gamelink': 
          return $( "<li class='search-result-item'>" )
        .append( "<div class=\"st_gamelink\"><a href=\""+item.url+"\">" + item.name + "</a></div>" )
        .appendTo( ul );

          break;
           case 'divider': 
          return $( "<li class='search-result-divider'>" ).appendTo( ul );

          break;
        case 'nav_menu':
          // We have to give it some markup to return, but we don't want the user to see it
          return $( "<li class='search-result-item' style=\"display: none;\">" ); 
          break;
        default:
          return $( "<li class='search-result-item'>" )
            .append( "<div class=\"st_game\"><a href=\""+item.url+"\">" + item.name + "</a></div>" )
            .appendTo( ul );
          break;
      }
     
    };
    
  });
 



})(jQuery);
