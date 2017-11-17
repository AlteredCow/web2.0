// @param root_number <int>: user input
function kaprekarCalculate(root_number){
  $scope.round = 0;
  round.ascending = swapDigits(root_number, "up");
  round.descending = swapDigits(root_number, "down");
  round.newValue = round.descending - round.ascending;
  $scope.kaprekarValue = round.newValue;
  $scope.kaprekar_steps.push(round); // keep order <desc, asc, diff> 
  if ($scope.kaprekarValue != 6174 && $scope.kaprekarValue != 0){
    kaprekarCalculate($scope.kaprekarValue);
  }
}
function swapDigits(root_number, direction){
  root_number = root_number.toString().split(''); // array-ify digits
  if (direction === "up"){ // low to high
    // rearrange ▲
    root_number.sort().join('');
  } else {
    // rearrange ▼
    root_number.sort().reverse().join('');
  }
  $scope.round++;
  // return the proper ordering
  return parseInt(root_number);
}
