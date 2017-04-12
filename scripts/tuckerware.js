
// occurs onload, on-page-switch, on-topic-switch
function normalizeHeights(){
  setTimeout(function() { // ample time to calculate
    $("#initial_content").height($("#main_menu").height());
    $("html").height($(document).height());
    $("#right_panel").height($("html").height() - $("#banner").height());
  }, 20);
  // $("#right_panel").height($(".defaultContentLayout:first").height());
}

$(document).ready(function(){

  // setting the stage here
  $('#main_content').load("content/D/intro_D.txt"); // call first page onload
  $("#main_menu li:first").trigger('mouseover');  // highlight 'D'
    normalizeHeights();
  // setTimeout(function() {
  //   $("#main_menu li:first").click();
  // },10);

  // Angular use --> loading content from file compartments
  var app = angular.module('loaderApp', []);
    app.controller('loaderController', function($scope, $http) {


      // angular.element('#main_menu li:first').trigger('click');


    // select file by menu selection
    $scope.showPage = function (menu_choice) {
      const MOTTO = "DREAM";
      var file_letter  =  MOTTO[menu_choice];
      var isJSON = (menu_choice== 2 || menu_choice == 3);
      var isJSON = false;
      var extension = "." +  (isJSON? "json" : "txt");
      var file = "content/"+ file_letter + "/intro_" + file_letter + extension;

      // fade-transition animation
      $("#main_content").fadeOut('fast', function(){
            $http.get(file)
      			   .success(function(content){
              $("#main_content").html(content);
      		});
      }).fadeIn();
      normalizeHeights(); // tidying

    } // end of showPage()

  }); // end of Angular


}); // end of document.ready()

// semi-globals
var theme_topic_shown = "education";

// highlight hovered; dull the remaining
function menuGlow(hovered){
  var bar_visibility = "0";

    // full scan and update
    $("#main_menu > li").each(function(index, value){
      var current_letter = $("#main_menu > li ").eq(index);
        if (index == hovered){
          // highlighting
            bar_visibility = "4px groove #B2D8B2";
            $(current_letter).css("width","30%");
        } else {
          // dulling
            bar_visibility = "0";
            $(current_letter).css("width","15%");
        }

        // applying updates
        $(current_letter ).html("DREAM"[index]);
        $(current_letter ).css("border-bottom", bar_visibility);
        launchWord(hovered);
    });
}

// expands hovered menu item into full word of the DREAM acronym
function launchWord(hovered){
  var menu_choices = ["Debut","Reveal", "Entertain", "Amaze", "More" ];
  $("#main_menu > li").eq(hovered).html("<a href = '#'>" + menu_choices[hovered]  +  "</a>" );
}

function clickPage(newPage){
  // click to page; reset window position; highlight menu choice
  $("#main_menu :eq("+newPage+")")[0].click();
  $("#main_menu :nth-child("+newPage+")").trigger('mouseover');
  window.scrollTo(0,0);
}

function openSelfGallery(){

}

function deploySettings(){

}

function expandTopic(theme_letter, theme_topic, topic_index){
  $(".contentDisplay").show();
  const SCROLL_TIME = 950;
  const CONTENT_DISPLAY = $(".contentDisplay");
  var spacing = CONTENT_DISPLAY.offset().top-150; // -150 as slight adjust
  $('html,body').stop().animate({scrollTop: spacing}, SCROLL_TIME);

    // Load the major data.
    var parent_dir = "content/" +  theme_letter + "/"
    var file = parent_dir;
    if (theme_letter === "M"){  // 1 file only
        file +=   "contact_listing.txt";
        $.ajax({
            type: "GET", url:file, dataType: "text"
        }).done(function (data) {
          // splits data from single file
            CONTENT_DISPLAY.html(data.split("\n")[topic_index]);
      });
    } else {
      // here, file depends on the chosen topic
      file +=  theme_topic + ".txt";
      CONTENT_DISPLAY.load(file);
    }
    normalizeHeights();
}
