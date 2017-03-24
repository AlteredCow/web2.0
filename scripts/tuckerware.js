$(document).ready(function(){
  $("#initial_content").height($("#main_menu").height());
  $("#space_block").height($("#initial_content").height());
	$("#right_panel").height($("#left_panel").height());
  $('#main_content').load("content/D/intro_D.txt");
  $("#main_menu li:first").trigger('mouseover');



  var app = angular.module('loaderApp', []);
    app.controller('loaderController', function($scope, $http) {

  /*------------- CHANGING TOPICS ---------------------------------*/
    $scope.showPage = function (menu_choice) {

      // find file by menu selection
      var file_letter  =  "DREAM"[menu_choice];
      var isJSON = (menu_choice== 2 || menu_choice == 3);
      var extension = "." +  (isJSON? "json" : "txt");
      var file = "content/"+ file_letter + "/intro_" + file_letter + extension;

      // swap content through fade-transition
      $("#main_content").fadeOut('slow', function(){
            $http.get(file)
      			   .success(function(content){
              $("#main_content").html(content);
              // $(".topic_choice:eq(0)")[0].click(); //auto-scroll
      		});
      }).fadeIn();


      } // end of showPage()
    }); // end of Angular


}); // end of document.ready()

// semi-globals
var topicRow_priorNumber = 0;
var theme_topic_prior = "education";

// highlight hovered; dull the remaining
function menuGlow(hovered){
  var bar_visibility = "0px solid black";
    $("#main_menu > li").each(function(index, value){

      var current_letter = $("#main_menu > li ").eq(index);
        if (index == hovered){
          // highlighting
            bar_visibility = "4px groove #B2D8B2";
            $(current_letter).css("width","30%");
        } else {
          // dulling
            bar_visibility = "0px solid black";
            $(current_letter).css("width","15%");
        }

        // updating
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


function openSelfGallery(){

}

function deploySettings(){

}

function expandTopic(theme_letter, theme_topic, topic_index){
  const SCROLL_TIME = 950;
  var content_display = $(".contentDisplay");
  var spacing = content_display.offset().top-150;
  $('html,body').stop().animate({scrollTop: spacing}, SCROLL_TIME);

    /*
    * Now load data.
    * Contact data needs only 1 file.
    */
    var file = "content/" +  theme_letter + "/" + theme_topic + ".txt";
    if (theme_letter == 'M'){

    } else {
      content_display.load(file);
    }


}
