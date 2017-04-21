/* |||||||||||| ON-READY||||||||||||||||||||||||||||||||||| */
$(document).ready(function() {

    // SECTION: setting initial stage
    $('#main_content').load("content/D/intro_D.html"); // call first page onload
    $("#main_menu li:first").trigger('mouseover'); // highlight 'D'

    // SECTION: Angular main use - to load compartments of data
    var loader_app = angular.module('loaderApp', ['ngAnimate']);
    loader_app.controller('loaderController', ['$scope', '$http', function($scope, $http) {
        $scope.showPage = function(menu_choice) {
                const MOTTO = "DREAM";
                $scope.key_letter = MOTTO[menu_choice];
            } // END(showPage)

        // SECTION: Scan archive file - to render list on 'A' page

        const ARCHIVES = "content/A/archive.JSON";
        $http.get(ARCHIVES)
           .success(function(JSON){
             console.log(JSON.topic);
            $scope.amaze_topics = JSON.topic;
          });

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
$.tuckerware.private.theme_topic_shown = "education";

/* |||||||||||| STANDARD FUNCTIONS  ||||||||||||||||||||||||||||||||||| */


function amazeByTopic(index) {

}

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

/* @param theme_letter: the menu choice key_letter
* @param theme_topic: the selected sub-material
* @param topic_index: numerical key for element-hunting in single-file content
* Each page has sub-content, sorted into several, narrower topics.
* This funcion grabs and replaces the content file and slides to display area
*/
function expandTopic(theme_letter, theme_topic, topic_index) {
    $(".contentDisplay").show();
    const SCROLL_TIME = 950;
    const CONTENT_DISPLAY = $(".contentDisplay");
    var spacing = CONTENT_DISPLAY.offset().top - 150; // -150 as slight adjust
    $('html,body').stop().animate({
        scrollTop: spacing
    }, SCROLL_TIME);

    // Load the major data.
    var parent_dir = "content/" + theme_letter + "/"
    var file = parent_dir;
    if (theme_letter === "M") { // 1 file only
        file += "contact_listing.html";
        $.ajax({
            type: "GET",
            url: file,
            dataType: "text"
        }).done(function(data) {
            // splits data from single file
            CONTENT_DISPLAY.html(data.split("\n")[topic_index]);
        });
    } else {
        // here, file depends on the chosen topic
        file += theme_topic + ".html";
        CONTENT_DISPLAY.load(file);
    }
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
