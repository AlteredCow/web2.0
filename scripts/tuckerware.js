/* |||||||||||| "GLOBALS" ||||||||||||||||||||||||||||||||||| */

//TODO: redundancy in variables; mixing privacy; FIXXX
//TODO: make 'Archives' its own (sub-)app
$.tuckerware = new Object();
$.tuckerware.private = new Object();
$.tuckerware.private.selected_topic_shown = "education";
$.tuckerware.private.archive_pageTRACKER = 0;
$.tuckerware.private.archive_pagecount = 0;
$.tuckerware.private.archive_maxShow = 5;


/* |||||||||||| ON-READY||||||||||||||||||||||||||||||||||| */
$(document).ready(function() {

    // SECTION: setting initial stage
    $('#main_content').load("content/D/base_D.html"); // call first page onload
    $("#main_menu li:first").trigger('mouseover'); // highlight 'D'

    // TODO: move DOM-related functions to loader_app.directive
    // SECTION: Angular main use - to load compartments of data
    var loader_app = angular.module('loaderApp', ['ngAnimate']);
    loader_app.controller('loaderController', ['$scope', '$http', function($scope, $http) {
        $scope.showPage = function(menu_choice) {
            // TODO: separate isA to its own function, wire in a loop

              // swaps ng-include src
                const MOTTO = "DREAM";
                var letter = MOTTO[menu_choice];
                $scope.key_letter = letter;

                // sections 'A' and 'M' require more work
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
                       if (isA){
                         var length = $scope.records.length;
                         var maxShow = $.tuckerware.private.archive_maxShow;
                         $.tuckerware.private.archive_pagecount = Math.ceil(length/maxShow);
                         $scope.archives_pageMAX = Math.ceil(length/maxShow);
                       }
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
          const CONTENT_DISPLAY = $(".contentDisplay");
          CONTENT_DISPLAY.show(); //  'display: hidden' in HTML

          // A and M are JSON; A is plain special
          if (key_letter === 'A'){
            expandArchives(topic_key);
          } else if (key_letter === 'M'){
            CONTENT_DISPLAY.html($scope.records[topic_key].major);
          } else {
            // scroll-to-display action
            const SCROLL_TIME = 900;
            const OFFSET = 150;
            var spacing = CONTENT_DISPLAY.offset().top - OFFSET;
            $('html,body').stop().animate({
              scrollTop: spacing
            }, SCROLL_TIME);

            // now load file
            var parent_dir = "content/" + key_letter + "/";
            var file = parent_dir + selected_topic + ".html";
            CONTENT_DISPLAY.load(file);
          }
      }

      // navigates 'pages' of topic choices
      $scope.archivesMove = function(direction){
        var page_now = $.tuckerware.private.archive_pageTRACKER;
        var page_limit = $scope.archives_pageMAX;

        if (direction === 'up'){
          page_now--;
        } else {
          page_now++;
        }

        // stay within bounds
        if (page_now < 0){
          page_now = page_limit-1;
        } else if (page_now >= page_limit){
          page_now = 0;
        }

        // updating globals
        $.tuckerware.private.archive_pageTRACKER = page_now;
        $scope.archives_pageNOW = page_now;
      }



      // @helps showPage, expandTopic
      // @param topic_key: index within JSON of chosen topic
      // controls content of 'A' section
      function expandArchives(topic_key){
        const CONTENT_DISPLAY = $(".contentDisplay");
        var pageNow = $scope.archives_pageNOW = $.tuckerware.private.archive_pageTRACKER;
        var pageMax = $scope.archive_displayLIMIT = $.tuckerware.private.archive_maxShow;
        var offset = pageNow * pageMax;
        var numberOfArchives = $scope.records.length;

        // offset adjusts choice # 1 - 5 by page number
        if (offset >= numberOfArchives){
          offset = 0;
          topic_key = numberOfArchives- 1; // final archive
        }
        topic_key += offset;

        // if selection is non-empty list option, then update
        if (topic_key < numberOfArchives){
          selected_topic = $scope.records[topic_key];

          // upper content
          CONTENT_DISPLAY.html(selected_topic.major);
          // lower content
          const CONTENT_DISPLAY_BETA = $(".contentDisplayHelper");
          CONTENT_DISPLAY_BETA.show();
          CONTENT_DISPLAY_BETA.html(selected_topic.minor);
        }
      }

      // archive-list-builder -- to array, for display
      $scope.grabArchives = function(){
        const MAX_SHOW = $.tuckerware.private.archive_maxShow;
        var row_offset = MAX_SHOW * $.tuckerware.private.archive_pageTRACKER;
        var available_topics = [];
        for (var x = (0 + row_offset); x < (MAX_SHOW + row_offset); x++){
          var current_topic = $scope.records[x];
          if (current_topic){
            available_topics.push($scope.records[x]);
          } else {
            var empty_obj = '{"topic" : "", "major" : "" }';
            available_topics.push(empty_obj);
          }
        }
        return available_topics;
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


// @helps menuGlow
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
