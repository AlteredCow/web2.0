/* |||||||||||| NOTES ||||||||||||||||||||||||||||||||||| */
//TODO: redundancy in variables; mixing privacy; FIXXX
//TODO: make 'Archives' its own (sub-)app
// TODO: move DOM-related functions to loader_app.directive
// TODO: acknowledge GET only when appropiate (LAZY LOAD)
// TODO: DOM content -- controller to directive
// TODO: generalize menuGlow for @style/..., by glow(fx)
// TODO: http requests hit twice?

/* |||||||||||| ON-READY||||||||||||||||||||||||||||||||||| */
$(document).ready(function() {
  $("#main_menu li:first").trigger('mouseover'); // highlight 'D'
  var loader_app = angular.module('loaderApp', ['ngAnimate', 'ngRoute', 'infinite-scroll']);

    // URL-hash configuration: allows flipping through DREAM sections
    loader_app.config(function($routeProvider){
      $routeProvider
        .when('/:name',
               {
                controller: "loaderController",
                 // where :name == key_letter
                   templateUrl: function(params){ return 'content/'+params.name+'/base_'+params.name+'.html'; }
              })
        .otherwise({
            templateUrl: 'content/D/base_D.html' // home-page
        });
    }); // END(app-config)


  // loader_app.directive("myTopic", function(){
  //   // return{
  //   //   templateUrl: 'content/R/education.html'
  //   // };
  //   return{
  //     restrict: 'E',
  //     link: function(scope, element, attrs){
  //       scope.
  //       // return './content/' + {{obj.prop}} + "/" + {{obj.prop}} + ".html"; }
  //   }
  // });


  // loader_app.directive('myTopic', function() {
  //    return {
  //        restrict: 'E',
  //        link: function(scope, element, attrs) {
  //          templateUrl: 'content/{{key_letter}}/{{partial}}.html'
  //           //  scope.contentUrl = 'content/excerpts/hymn-' + attrs.ver + '.html';
  //           //  attrs.$observe("ver",function(v){
  //               //  scope.contentUrl = 'content/excerpts/hymn-' + v + '.html';
  //            });
  //        }
  //       //  template: '<div ng-include="contentUrl"></div>'
  // });



    loader_app.controller('loaderController', ['$scope', '$http', '$route', '$routeParams', function($scope, $http, $route, $routeParams) {

      $scope.obj = {prop: "hey"};
      $scope.key_letter = 'D';
      $scope.partial = "";
      $scope.archives_pageNOW = 0;
      $scope.archives_displayLIMIT = 5;
      var archives = "content/A/archives.JSON";
      $scope.key_letter = $routeParams.name;




      $http.get(archives)
         .success(function(JSON){
           const ARCHIVES_ROOT = "topic";
           $scope.records = JSON[ARCHIVES_ROOT];
           $scope.archives_pageTOTAL = Math.ceil($scope.records.length /  $scope.archives_displayLIMIT);
        });
      var contacts = "content/M/contacting.JSON";
      $http.get(contacts)
         .success(function(JSON){
           const ARCHIVES_ROOT = "contact";
           $scope.contacts = JSON[ARCHIVES_ROOT];
        });
      var artwork = "content/E/artwork.JSON";
      $http.get(artwork)
         .success(function(JSON){
           const ARCHIVES_ROOT = "piece";
           $scope.artbase = JSON[ARCHIVES_ROOT];
           $scope.artwork = [];
        });
        // $.getJSON("data/full_res.json", function(json) {
        // 		do something...
        // });


        $scope.loadImages = function(){
          const display_multiple = 6;
          var offset = $scope.artwork.length;
          for (var x = 0; x < display_multiple; x++){
            var new_img = $scope.artbase[x + offset];
            $scope.artwork.push(new_img);
          }

        }


      /* @param key_letter: the menu choice key letter
      * @param selected_topic: the clicked sub-material
      * @param topic_index: general purpose numerical key
      * Each page has sub-content, which is sorted into several narrower topics.
      * This funcion grabs content file, then displays it, and slides to display area
      */
      $scope.expandTopic = function(key_letter, selected_topic, topic_index) {
          // CONTENT_DISPLAY.show(); //  'display: hidden' in HTML
          //
          // // loads to page only content within JSON
          var CONTENT_DISPLAY = $(".contentDisplay");


          //   // now load topic file
          //   var parent_dir = "content/" + key_letter + "/";
          //   var from_file_path = parent_dir + selected_topic + ".html";
          //   CONTENT_DISPLAY.load(from_file_path);
          // }

          if (key_letter === 'M'){
            CONTENT_DISPLAY.html($scope.contacts[topic_index].info);
          }
          $scope.partial = 'content/' + key_letter + "/" + selected_topic + ".html";


          CONTENT_DISPLAY = $(".contentDisplay");
          // scroll-to-display action
          const SCROLL_TIME = 900;
          const OFFSET = 150;
          var spacing = CONTENT_DISPLAY.offset().top - OFFSET;
          $('html,body').stop().animate({
            scrollTop: spacing
          }, SCROLL_TIME);
      }


      // navigates 'pages' of topic choices
      $scope.archivesMove = function(direction){
        var page_now = $scope.archives_pageNOW;
        if (direction === 'up'){
          page_now--;
        } else {
          page_now++;
        }

        // stay within bounds
        var page_max = $scope.archives_pageTOTAL;
        if (page_now < 0){
          page_now = page_max - 1; // -1 for 0-index
        } else if (page_now >= page_max){
          page_now = 0; // reset cycle
        }

        // track current page
        $scope.archives_pageNOW = page_now;
      }



      // @helps showPage, expandTopic
      // @param topic_index: index within JSON of chosen topic
      // controls content of 'A' section
      $scope.expandArchives = function(topic_index){
        var offset = $scope.archives_pageNOW *  $scope.archives_displayLIMIT;
        var archiveCount = $scope.records.length;

        // offset adjusts choice # 1 - 5 by page number
        if (offset >= archiveCount){
          offset = 0;
          topic_index = archiveCount - 1; // final archive
        }
        topic_index += offset;

        // if selection is non-empty list option, then update
        if (topic_index < archiveCount){
          selected_archive = $scope.records[topic_index];

          // upper content
          $(".contentDisplay").show().html(selected_archive.major);
          // lower content
          $(".contentDisplayHelper").show().html(selected_archive.minor);
        }
      }

      // archives UI-list builder
      $scope.grabArchives = function(){
        const SHOW_LIMIT =  $scope.archives_displayLIMIT;
        var offset = SHOW_LIMIT * $scope.archives_pageNOW;
        var available_topics = [];
        // grabbing current (n-number of topics)
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
    }]); // END(controller)
}); //END(onready)



/* |||||||||||| STANDARD FUNCTIONS  ||||||||||||||||||||||||||||||||||| */




// @param newPage: the letter indicating the page to load
// flips pages - loads new page from menu choice
// click for page; highlight menu choice;  reset window position
function clickPage(newPage) {
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
    var menu_choices = ["Debut", "Reveal", "Entertain", "Amaze", "More"];
    var key_letter = "DREAM"[hovered];
    var menu_achor = "<a href = '#/" + key_letter + "'>" + menu_choices[hovered] + "</a>";
    $("#main_menu > li").eq(hovered).html(menu_achor);
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
            bar_visibility = "4px groove #dadada";
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

function scrollToTop() {
    $("html, body").animate({
        scrollTop: 0
    }, "slow");
}
