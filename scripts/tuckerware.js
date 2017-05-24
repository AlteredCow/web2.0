/* |||||||||||| NOTES ||||||||||||||||||||||||||||||||||| */
// TODO: redundancy in variables; mixing privacy; FIXXX
// TODO: grant 'Archives' its own controller (overall, modular restructuring) 
// TODO: split controller into multiple, each with single responsibility
// TODO: move DOM-related functions to .directive
// TODO: acknowledge GET only when appropiate (LAZY LOAD)
// TODO: generalize menuGlow for @style/..., by glow(fx)
// TODO: http requests hit twice?

var menu_choices = ["Debut", "Reveal", "Enjoy", "Amuse", "More"];
/* |||||||||||| ON-READY||||||||||||||||||||||||||||||||||| */
$(document).ready(function() {
  $("#main_menu li:first").trigger('mouseover'); // highlight 'D'
  var loader_app = angular.module('loaderApp', ['ngAnimate', 'ngRoute', 'infinite-scroll']);


    // URL-hash configuration: allows flipping through DREAM sections
    loader_app.config(function($routeProvider, $locationProvider){
      $routeProvider
        .when('/:key_letter',
               {
                controller: "loaderController",
                templateUrl: function(params){ return 'content/'+params.key_letter+'/base_'+params.key_letter+'.html'; }
              })
        .otherwise({
            templateUrl: 'content/D/base_D.html' // home-page
        });
    }); 


  loader_app.controller('loaderController', ['$scope', '$http', '$route', '$routeParams', '$window', function($scope, $http, $route, $routeParams, $window) {

      $scope.key_letter = $routeParams.key_letter;
      $scope.partial = "content/empty.html"; // TODO: rename (partial is /topic_name.html)
      $scope.archivesPageNow = 0;
      $scope.archivesDisplayLimit = 5;

      // mobile menu
      $scope.$on('$locationChangeSuccess', function(event) {
        var current_letter = window.location.hash.substr(2, 3);
        var current_letter_key = "DREAM".indexOf(current_letter);
        $scope.key_word = menu_choices[current_letter_key];
        $("ul.mobile_menu").hide(300);
      });

      var archives = "content/A/archives.JSON";
      $http.get(archives)
         .success(function(JSON){
           const ARCHIVES_ROOT = "topic";
           $scope.records = JSON[ARCHIVES_ROOT];
           $scope.archivesPagesTotal = Math.ceil($scope.records.length /  $scope.archivesDisplayLimit);
        });
      var artwork = "content/E/artwork.JSON";
      $http.get(artwork)
         .success(function(JSON){
           const ARCHIVES_ROOT = "piece";
           $scope.artbase = JSON[ARCHIVES_ROOT];
           $scope.artwork = [];
        });


        // TODO: build filters (or sorting machines) per medium, date, ...
        $scope.loadImages = function(){
          const DISPLAY_MULTIPLE = 3;
          var offset = $scope.artwork.length;
          for (var x = 0; x < DISPLAY_MULTIPLE; x++){
            var new_img = $scope.artbase[x + offset];
            if (new_img){
              $scope.artwork.push(new_img);
            }
          }
        }

        $scope.openLink = function(url){
          $window.open(url, '_blank');
        }


      /* @param key_letter: the menu choice key letter
      * @param selected_topic: the clicked sub-material
      * Each page has sub-content, which is sorted into several narrower topics.
      * This funcion grabs content file, then displays it, and slides to display area
      */
      $scope.expandTopic = function(key_letter, selected_topic) {
          $scope.partial = 'content/' + key_letter + "/" + selected_topic + ".html";
          scrollToDisplay();
    }




      // navigates 'pages' of topic choices
      $scope.archivesFlip = function(direction){
        var page_now = $scope.archivesPageNow;
        if (direction === 'up'){
          page_now--;
        } else {
          page_now++;
        }

        // stay within bounds
        var page_max = $scope.archivesPagesTotal;
        if (page_now < 0){
          page_now = page_max - 1; // -1 for 0-index
        } else if (page_now >= page_max){
          page_now = 0; // reset cycle
        }

        // update: track current page
        $scope.archivesPageNow = page_now;
      }


      // TODO: find a better system
      // Archives RESPONSIVENESS PT1
      // Reset all full-screen descriptions
      var id;
      $(window).resize(function() {
          clearTimeout(id);
          id = setTimeout(function(){
            if ($scope.key_letter === 'A'){
              if ($(document).width() > 600){
                  $(".flipList").css("display", "inline-block");
              } else {
                $(".flipList").hide();
              }
               
          }
        }, 300);
          
      });
      
      // Archives RESPONSIVENESS PT2
      // On mobile, return list after reading
      $(function(){
        $("button.revert_button").click(function(){ 
          $(".flipList").css({"display":"block", "width":"100%;"});
          $("#archives_wrapper").fadeOut(200);
      });
      });  



      // @helps showPage, expandTopic
      // @param topic_index: index within JSON of chosen topic
      // controls content of 'A' section
      $scope.expandArchive = function(topic_index){
        var offset = $scope.archivesPageNow *  $scope.archivesDisplayLimit;
        var archiveCount = $scope.records.length;

        // offset ~= page-index-multiplier 
        if (offset >= archiveCount){
          offset = 0;
          topic_index = archiveCount - 1; // final archive
        }
        topic_index += offset;

        // if selection is non-empty list option, then update
        if (topic_index < archiveCount){
          selected_archive = $scope.records[topic_index];
          // scrollToDisplay();
          
          
          // Archives RESPONSIVENESS PT3
          // only temporarily hide list if in mobile
          if ($(window).width() <= 600){
            $(".flipList").hide();
            $("#archives_wrapper").css("display", "inline-block");
          } 

          // upper content
          $(".contentDisplay:nth-of-type(1)").hide().html(selected_archive.major).fadeIn('fastest');
          // lower content
          $(".contentDisplay:nth-of-type(2)").hide().html(selected_archive.minor).fadeIn('slow');
          
        }
      }
      

      // UI-list builder for Archives
      $scope.grabArchives = function(){
        const SHOW_LIMIT =  $scope.archivesDisplayLimit;
        var offset = SHOW_LIMIT * $scope.archivesPageNow;
        var available_topics = [];
        
        // grabbing current n-number of topics
        for (var x = (0 + offset); x < (SHOW_LIMIT + offset); x++){
          var current_topic = $scope.records[x];
          if (current_topic){
            available_topics.push($scope.records[x]);
          } else {
            // filling remaining page with empty slots
            var empty_obj = '{"topic" : "", "major" : "" }';
            available_topics.push(empty_obj);
          }
        }
        return available_topics;
      }
      
      
      function scrollToDisplay(){
        var CONTENT_DISPLAY = $(".contentDisplay");
        const SCROLL_TIME = 900;
        var location = CONTENT_DISPLAY.offset().top;
        if ($scope.key_letter === 'A'){
          location -= 100;
        }
        $('html,body').stop().animate({
          scrollTop: location
        }, SCROLL_TIME);
      }

      
      



  }]); // END(controller)
}); //END(onready)




/* |||||||||||| STANDARD FUNCTIONS  ||||||||||||||||||||||||||||||||||| */

// @param newPage: the letter indicating the page to load
// flips pages - loads new page from menu choice
// click for page; highlight menu choice;  reset window position
function goToPage(newPage) {
    var selected_page = $("#main_menu :nth-child(" + newPage + ")");
    window.location.hash = selected_page.html();
    selected_page.trigger('mouseover');
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
    
    var key_letter = "DREAM"[hovered];
    var menu_achor = "<a href = '#/" + key_letter + "'>" + menu_choices[hovered] + "</a>";
    $("#main_menu > li").eq(hovered).html(menu_achor);
}

// // graphic finalize - to have accordian-layout
// function loadAccordians(){
//   $("button.accordian").on("click", function(){
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
            bar_visibility = "6px solid white";
            $(current_letter).css({"width": "30%"});
        } else {
            // dulling
            bar_visibility = "0";
            $(current_letter).css({"width": "15%"});
        }

        // applying updates
        current_letter.text("DREAM" [index]);
        $(current_letter).css("border-bottom", bar_visibility);
        launchWord(hovered);
    });
}

// operates the LightBox
function openSelfGallery() {

}

// Animate return to page top 
function scrollToTop() {
    $("html, body").animate({
    scrollTop: 0}, "slow");
}




/* ----- MOBILE -------- */

// Toggling mobile dropdown menu
$(function(){
  $("button.mobile_menu").click(function(){
    var menu_content = $("ul.mobile_menu"); 
    if (menu_content.is(":visible")){
      menu_content.toggle(400);
    } else{ // text sliding motion
      menu_content.show();
      menu_content.find("li").hide();
      menu_content.find("li").toggle(500);
    }
  });
  });

