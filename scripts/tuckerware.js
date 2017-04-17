function scrollToTop(){
  $("html, body").animate({ scrollTop: 0 }, "slow");
}

$(document).ready(function(){

  // setting the stage here
  $('#main_content').load("content/D/intro_D.txt"); // call first page onload
  $("#main_menu li:first").trigger('mouseover');  // highlight 'D'

  // Angular use --> loading content from file compartments
  var app = angular.module('loaderApp', []);
    app.controller('loaderController', function($scope) {
      $scope.showPage = function (menu_choice) {
         const MOTTO = "DREAM";
         $scope.key_letter = MOTTO[menu_choice];
       } // END(showPage)
      });



    // const AMAZE_ARCHIVES = "content/A/archives_list.txt";
    // $http.get(AMAZE_ARCHIVES)
    //    .success(function(data){
    //     $scope["amaze_topics"] = data.topics;
    //   });

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
  //var li_ = "<li><a href = ' '></a></li>"
  // var appendage = li_ + li_ + li_
  // $("#right_panel li:first").after(appendage);

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
}
