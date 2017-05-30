/* ------------ ON-READY --------------------------- */
const menu_choices = ["Debut", "Reveal", "Enjoy", "Amuse", "More"];
$(document).ready(function() {
  $("#main_menu li:first").trigger('mouseover'); // highlight 'D'
  var loader_app = angular.module('loaderApp', ['ngAnimate', 'ngRoute', 'infinite-scroll']);

    // URL-hash configuration (e.g. ...com#/D)
    // allows flipping through DREAM sections
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


  // massive, overarching content loader -- both for main pages (DREAM) and sub-pages (topics)
  loader_app.controller('loaderController', ['$scope', '$http', '$route', '$routeParams', '$window', function($scope, $http, $route, $routeParams, $window) {

// ================= GENERAL ===================================
      $scope.key_letter = $routeParams.key_letter;
      $scope.partial = "content/empty.html"; // TODO: rename (partial is /topic_name.html)
      $scope.archivesCurrentPage = 0;
      $scope.archivesDisplayLimit = 6;

      // @requires: #/_ page section navigation
      // on section-change: update menu UI and scroll to page-top
      $scope.$on('$locationChangeSuccess', function(event) {
        var current_letter = document.location.hash.substr(2, 3);
        var current_letter_key = "DREAM".indexOf(current_letter);
        $("#main_menu li").eq(current_letter_key).trigger('mouseover');
        $scope.key_word = menu_choices[current_letter_key];
        $("ul.mobile_menu").hide(300);
        scrollToTop();
      });

      
      function scrollToDisplay(){
        var CONTENT_DISPLAY = $(".contentDisplay");
        const SCROLL_TIME = 900;
        var location = CONTENT_DISPLAY.offset().top;
        if ($scope.key_letter === 'A'){
          location -= 100;// mobile graphic fix
        }
        $('html,body').stop().animate({
          scrollTop: location
        }, SCROLL_TIME);
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
        
// =============================================================
// ================= ARTWORK ===================================
      var artwork = "content/E/artwork.JSON";
      $http.get(artwork)
         .success(function(JSON){
           const ARCHIVES_ROOT = "piece";
           $scope.artbase = JSON[ARCHIVES_ROOT];
           $scope.artwork = [];
        });

        
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
// =============================================================
// ====================== ARCHIVES =============================

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
      
      // 'A' section -- let A stand for 'archives' or 'amuse'
      var archives = "content/A/archives.JSON";
      $http.get(archives)
         .success(function(JSON){
           const ARCHIVES_ROOT = "topic";
           $scope.records = JSON[ARCHIVES_ROOT];
           $scope.archivesPagesTotal = Math.ceil($scope.records.length /  $scope.archivesDisplayLimit);
        });
        
        // navigates 'pages' of topic choices
        $scope.archivesFlip = function(direction){
          var page_now = $scope.archivesCurrentPage;
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
          $scope.archivesCurrentPage = page_now;
        }
      // 
      // // Archives RESPONSIVENESS PT2
      // // On mobile, return list after reading
      // $(function(){
      //   $("button.revert_button").click(function(){ 
      //     $(".flipList").css({"display":"block", "width":"100%;"});
      //     $("#archives_wrapper").fadeOut(200);
      // });
      // });  



      // @helps showPage, expandTopic
      // @param topic_index: index within JSON of chosen topic
      // controls content loading of 'A' section
      $scope.expandArchive = function(topic_index){
        var offset = $scope.archivesCurrentPage *  $scope.archivesDisplayLimit;
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
          
          // // Archives RESPONSIVENESS PT3
          // // only temporarily hide list if in mobile
          // if ($(window).width() <= 600){
          //   $(".flipList").hide();
          //   $("#archives_wrapper").css("display", "inline-block");
          // } 

          // upper content
          $(".contentDisplay:nth-of-type(1)").hide().html(selected_archive.major).fadeIn('fastest');
          // lower content
          $(".contentDisplay:nth-of-type(2)").hide().html(selected_archive.minor).fadeIn('slow');
          
        }
      }
      

      // UI-list builder for Archives
      $scope.grabArchives = function(){
        const SHOW_LIMIT =  $scope.archivesDisplayLimit;
        var offset = SHOW_LIMIT * $scope.archivesCurrentPage;
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
      
// =============================================================
  
      
  }]); // END(controller)
}); //END(onready)




/* |||||||||||| STANDARD FUNCTIONS  ||||||||||||||||||||||||||||||||||| */

// @param hovered: menu choice in-focus, namely hovered
// expands hovered menu item into full word of the DREAM acronym
function launchWord(hovered) {
    var key_letter = "DREAM"[hovered];
    $("#main_menu li a").eq(hovered).text(menu_choices[hovered]);
}

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
        current_letter.find("a").text("DREAM"[index]);
        $(current_letter).css("border-bottom", bar_visibility);
        launchWord(hovered);
    });
}

// Animate return to page top 
function scrollToTop() {
    $("html, body").animate({
    scrollTop: 0}, "slow");
}




/* ----- MOBILE -------- */

// Toggling mobile dropdown menu
$(function(){
  $(".mobile_menu").click(function(){
    $("ul.mobile_menu").toggle(400);
  });
});

