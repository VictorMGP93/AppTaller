jQuery(document).ready(function($) {

	'use strict';


    var lastId,
        topMenu = $(".menu-first"),
        topMenuHeight = 50,       
        menuItems = topMenu.find("a"),       
        scrollItems = menuItems.map(function(){
          
          if($(this).hasClass('external')) {
            return;
          }
            
          var item = $($(this).attr("href"));
          if (item.length) { return item; }
        });

    
    menuItems.click(function(e){
      var href = $(this).attr("href"),
          offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
      $('html, body').stop().animate({ 
          scrollTop: offsetTop
      }, 300);
      e.preventDefault();
    });


    $(window).scroll(function(){
      
       var fromTop = $(this).scrollTop()+topMenuHeight;
       
       
       var cur = scrollItems.map(function(){
         if ($(this).offset().top < fromTop)
           return this;
       });
       
       cur = cur[cur.length-1];
       var id = cur && cur.length ? cur[0].id : "";
       
       if (lastId !== id) {
           lastId = id;           
           menuItems
             .parent().removeClass("active")
             .end().filter("[href=#"+id+"]").parent().addClass("active");
       }                   
    });



    $(window).scroll(function(){
         $('.main-header').toggleClass('scrolled', $(this).scrollTop() > 1);
     });



    $('a[href="#top"]').click(function(){
        $('html, body').animate({scrollTop: 0}, 'slow');
        return false;
    });


    $('.flexslider').flexslider({
      slideshow: true,
      slideshowSpeed: 3000,  
      animation: "fade",
      directionNav: false,
    });


    $('.toggle-menu').click(function(){
        $('.menu-first').toggleClass('show');       
    });

    $('.menu-first li a').click(function(){
      $('.menu-first').removeClass('show');
    });


      $(function(){
        $('[data-rel="lightbox"]').lightbox();
      });


});
