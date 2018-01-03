// ================= ARTWORK ===================================
$(document).ready(function() {
var loader_app = angular.module('loaderApp', ['ngAnimate', 'ngRoute', 'infinite-scroll']);
loader_app.controller('loaderController', ['$scope', '$http', function($scope, $http){
// 
// var artwork = "content/bases/base_E/artwork.JSON";
// $http.get(artwork)
//    .success(function(JSON){
//      const ARCHIVES_ROOT = "piece";
//      $scope.artbase = JSON[ARCHIVES_ROOT];
//      $scope.artwork = [];
//   });
// 
//   
//   $scope.loadImages = function(){
//     const DISPLAY_MULTIPLE = 3;
//     var offset = $scope.artwork.length;
//     for (var x = 0; x < DISPLAY_MULTIPLE; x++){
//       var new_img = $scope.artbase[x + offset];
//       if (new_img){
//         $scope.artwork.push(new_img);
//       }
//     }
//   }
// 
//   $scope.openLink = function(url){
//     $window.open(url, '_blank');
//   }
  
}]);});
// =============================================================