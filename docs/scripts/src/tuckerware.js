const MENU_CHOICES = ["Debut", "Reveal", "Enjoy", "Amuse", "More"];

/* ------------ ON-READY --------------------------- */

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
                templateUrl: function(params){ return 'content/bases/base_'+params.key_letter+'.html'; }
              })
        .otherwise({
            templateUrl: 'content/bases/base_D.html' // home
        });
    }); 

  // massive, overarching content loader -- both for main pages (DREAM) and sub-pages (topics)
  loader_app.controller('loaderController', ['$scope', '$http', '$route', '$routeParams', '$window', function($scope, $http, $route, $routeParams, $window) {


// ================= GENERAL VIEWS ===================================
      $scope.key_letter = $routeParams.key_letter;
      $scope.partial = "content/other/empty.html";
      $scope.archivesCurrentPage = 0;
      $scope.archivesDisplayLimit = 6;

      // @requires: #/_ page section navigation
      // / UI: upon changing topics, update menu and scroll to page-top
      $scope.$on('$locationChangeSuccess', function(event) {
        var current_letter = document.location.hash.substr(2, 3);
        var current_letter_key = "DREAM".indexOf(current_letter);
        $("#main_menu li").eq(current_letter_key).trigger('mouseover');
        $scope.key_word = MENU_CHOICES[current_letter_key];
        $("ul.mobile_menu").hide(300);
        scrollToTop();
      });

      // scroll to newly visible content
      function scrollToDisplay(){
        setTimeout(function () { // allow section to load
          const CONTENT_DISPLAY = $(".contentScreen");
          const SCROLL_TIME = 900;
          var location = CONTENT_DISPLAY.offset().top;
          if ($scope.key_letter === 'A'){
            location -= 100;// mobile graphic fix
          }
          $('html,body').stop().animate({
            scrollTop: location
          }, SCROLL_TIME);
      }, 100);
      }
      
      /* @param key_letter: the menu choice letter parameter
      * @param selected_topic: the section sub-material
      * Each section (letter) has sub-material spread across topic names
      * This funcion grabs content files, displays it, and slides to view
      */
      $scope.expandTopic = function(key_letter, selected_topic) {
          $scope.partial = 'content/' + key_letter + "/" + selected_topic + ".html";
          scrollToDisplay();
    }
    
    // TODO: migrate these two behaviors into directive
    $scope.swapViewSets = function(incoming, outgoing){
      $.each(incoming, function(){
        this.fadeIn();
      });
      $.each(outgoing, function(){
        this.fadeOut();
      });
      $("html, body").animate({
        scrollTop: incoming[0].offset().top - 100}, "slow");
    }
    
    $scope.main_img_set = ["profile_A.png", "profile_B.jpg", "profile_C.jpg"];
    $scope.main_img_key = 0;
    $scope.main_img = $scope.main_img_set[0];
    $scope.cycleImages = function(set_name){
      var set = $scope[set_name + "_img_set"];
      var index = $scope[set_name + "_img_key"]+1;
      if (index === set.length){
        index = 0;
      }
      var next_img = set[index];
      $scope[set_name + "_img_key"] = index; // update from alias
      $scope[set_name + "_img"] = next_img;
    }
        
// =============================================================
// ====================== ARTWORK =============================

const artwork = "content/E/artwork.JSON";
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

// ====================== ARCHIVES =============================

    $scope.archiveDefaultView = [$("#archive_grid"), $("#archive_intro"), $("#archive_nav"), $("h2")];
    $scope.archiveReaderView = [$(".contentScreen:nth-of-type(2)"), $(".contentScreen:nth-of-type(3)"), $(".reverter")];
    
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
          this.swapViewSets(this.archiveReaderView, this.archiveDefaultView);

          // TODO: why (2), (3)??
          // upper content, lower content
          $(".contentScreen:nth-of-type(2)").html(selected_archive.major).fadeIn('slowest');
          $(".contentScreen:nth-of-type(3)").html(selected_archive.minor).fadeIn('slowest');
          
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


/* === STANDARD FUNCTIONS  ======== */

// @param hovered: menu choice in-focus, namely hovered
// expands hovered menu item into full word of the DREAM acronym
function launchWord(hovered) {
    var key_letter = "DREAM"[hovered];
    $("#main_menu li a").eq(hovered).text(MENU_CHOICES[hovered]);
}

// @param hovered: menu choice in-focus, namely hovered
// graphic tracking - highlight hovered menu choice
function menuGlow(hovered) {
    var bar_visibility = "0";

    // full scan and update
    $("#main_menu > li").each(function(index, value) {
        var current_letter = $("#main_menu > li ").eq(index);

        // highlight or dull 
        if (index == hovered) {
            bar_visibility = "6px solid white";
            $(current_letter).css({"width": "30%"});
        } else {
            bar_visibility = "0";
            $(current_letter).css({"width": "15%"});
        }

        // applying updates
        current_letter.find("a").text("DREAM"[index]); // "a" as in <a> 
        $(current_letter).css("border-bottom", bar_visibility);
        launchWord(hovered);
    });
}

// Animate return to page top 
function scrollToTop() {
    $("html, body").animate({scrollTop: 0}, "slow");
}

/* ----- MOBILE -------- */

// Toggling mobile dropdown menu
$(function(){
  $(".mobile_menu").click(function(){
    $("ul.mobile_menu").toggle(400);
  });
});

