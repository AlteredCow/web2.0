/* |||||||||||| ON-READY||||||||||||||||||||||||||||||||||| */
$(document).ready(function() {

    // SECTION: setting initial stage
    $('#main_content').load("content/D/base_D.html"); // call first page onload
    $("#main_menu li:first").trigger('mouseover'); // highlight 'D'

    // SECTION: Angular main use - to load compartments of data
    var loader_app = angular.module('loaderApp', ['ngAnimate']);
    loader_app.controller('loaderController', ['$scope', '$http', function($scope, $http) {
        $scope.showPage = function(menu_choice) {
                const MOTTO = "DREAM";
                var letter = MOTTO[menu_choice];
                $scope.key_letter = letter;

                // sections 'A' and 'M' read from JSON, not HTML
                var isA = (letter === 'A');
                var isM = (letter === 'M');
                if (isA || isM){
                  var json_dir = "A/archives";
                  var json_root = "topic"
                  if (isM){
                    json_dir = "M/contacting";
                    json_root = "contact";
                  }
                  var records = "content/" + json_dir + ".JSON";
                  $http.get(records)
                     .success(function(JSON){
                       $scope.records = JSON[json_root];
                    });

                }
            } // END(showPage)


      /* @param key_letter: the menu choice key_letter
      * @param selected_topic: the selected sub-material
      * @param topic_key: numerical key for various purposes
      * Each page has sub-content, sorted into several, narrower topics.
      * This funcion grabs and replaces the content file and slides to display area
      */
      $scope.expandTopic = function(key_letter, selected_topic, topic_key) {

          var isA = (key_letter === 'A');
          var isJSON = (isA || key_letter === 'M');
          var doScroll = (!isA);
          var hasHelperContent = (isA);

          const CONTENT_DISPLAY = $(".contentDisplay");
          CONTENT_DISPLAY.show();


          if (doScroll){
            const SCROLL_TIME = 900;
            const OFFSET = 150;
            var spacing = CONTENT_DISPLAY.offset().top - OFFSET;
            $('html,body').stop().animate({
              scrollTop: spacing
            }, SCROLL_TIME);
          }

          if (isJSON){
              CONTENT_DISPLAY.html($scope.records[topic_key].major);
          } else {
            var parent_dir = "content/" + key_letter + "/";
            var file = parent_dir;
            file += selected_topic + ".html";
            CONTENT_DISPLAY.load(file);
          }
          if (hasHelperContent){
            const CONTENT_DISPLAY_BETA = $(".contentDisplayHelper");
            CONTENT_DISPLAY_BETA.show();
            var selected_topic = $scope.records[topic_key];
            CONTENT_DISPLAY_BETA.html(selected_topic.minor);

          }

      }




    }]); // END(controller)


    // // SECTION: adjust heights after resize
    // $(window).on("resize", function() {
    //     clearTimeout($(this).data('timer'));
    //     $(this).data('timer', setTimeout(function() {
    //             var doc_width = $(window).width();
    //             var left_panel_width = $("#main_content").width();
    //             $("#right_panel").width(doc_width - left_panel_width);
    //             console.log("sneeze");
    //         }, 400)
    //     );
    // });

});

/* |||||||||||| "GLOBALS" ||||||||||||||||||||||||||||||||||| */
$.tuckerware = new Object();
$.tuckerware.private = new Object();
$.tuckerware.private.selected_topic_shown = "education";

/* |||||||||||| STANDARD FUNCTIONS  ||||||||||||||||||||||||||||||||||| */




// @param newPage: the letter indicating the page to load
// flips pages - loads new page from menu choice
function clickPage(newPage) {
    // click to page; reset window position; highlight menu choice
    $("#main_menu :eq(" + newPage + ")")[0].click();
    $("#main_menu :nth-child(" + newPage + ")").trigger('mouseover');
    window.scrollTo(0, 0);
}


/*
* expands the right-panel menu for extended options
*/
function deploySettings() {
    //var li_ = "<li><a href = ' '></a></li>"
    // var appendage = li_ + li_ + li_
    // $("#right_panel li:first").after(appendage);

}



// @param hovered: menu choice in-focus, namely hovered
// expands hovered menu item into full word of the DREAM acronym
function launchWord(hovered) {
    var menu_choices = ["Debut", "Reveal", "Entertain", "Amaze", "More"];
    $("#main_menu > li").eq(hovered).html("<a href = '#'>" + menu_choices[hovered] + "</a>");
}

// // graphic finalize - to have accordian-layout
// function loadAccordians(){
//   $("button.accordian").on("click", function(){
//     console.log('dog');
//     this.classList.toggle("active");
//     var panel = this.nextElementSibling;
//     var disp = panel.style.display;
//     disp = disp === "block"? "none" : "block";
//   });
// }

// @param hovered: menu choice in-focus, namely hovered
// graphic tracking - highlight hovered menu choice
function menuGlow(hovered) {
    var bar_visibility = "0";

    // full scan and update
    $("#main_menu > li").each(function(index, value) {
        var current_letter = $("#main_menu > li ").eq(index);
        if (index == hovered) {
            // highlighting
            bar_visibility = "4px groove #B2D8B2";
            $(current_letter).css("width", "30%");
        } else {
            // dulling
            bar_visibility = "0";
            $(current_letter).css("width", "15%");
        }

        // applying updates
        $(current_letter).html("DREAM" [index]);
        $(current_letter).css("border-bottom", bar_visibility);
        launchWord(hovered);
    });
}

// operates the LightBox
function openSelfGallery() {

}

function scrollToTop() {
    $("html, body").animate({
        scrollTop: 0
    }, "slow");
}
