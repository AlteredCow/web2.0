$(document).ready(function(){
  $("#initial_content").height($("#main_menu").height());
  $("#space_block").height($("#initial_content").height());
	$("#right_panel").height($("#left_panel").height());
  $('#main_content').load("content/content_D.txt");
  $("#main_menu li:first").trigger('mouseover');

  var app = angular.module('loaderApp', []);
    app.controller('loaderController', function($scope, $http) {

  /*------------- CHANGING TOPICS ---------------------------------*/
    $scope.showPage = function (menu_choice) {

      // find file by menu selection
      var file_letter  =  "DREAM"[menu_choice];
      var isJSON = (menu_choice== 2 || menu_choice == 3);
      var extension = "." +  (isJSON? "json" : "txt");
      var file = "content/content_"+ file_letter + extension;

      // swap content through fade-transition
      $("#main_content").fadeOut('slow', function(){
            $http.get(file)
      			   .success(function(content){
              $("#main_content").html(content);
      		});
      }).fadeIn();


      } // end of showPage()
    }); // end of Angular


}); // end of document.ready()

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

function expand(theme_letter, theme_topic, row){
  var nth_child = " :nth-child(" + row + ")";
  $(".topicRow" + nth_child).fadeIn(800);

}

$( ".topicRow > span > a " ).click(function() {
  // var nth_child = " :nth-child(" + row + ")";


console.log($("div:hidden:first"));
});
