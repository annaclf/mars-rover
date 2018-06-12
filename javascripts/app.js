// Rover Object Goes Here
// ======================

var rover = {
  direction: "N",
  coordX : 0,
  coordY : 0,
  travelLog : [],
  logThis : false,
  validDirections : ["f","b","l","r"],
  premioCoords : {
    x : null,
    y : null
  }
}

// ======================
function turnLeft(){
  console.log("turnLeft was called!");
  var currentDirection = rover.direction;
  switch(currentDirection){
    case "N":
    if(rover.coordX>0){
      rover.coordX--;
      rover.direction = "W";
      rover.logThis = true;
    }
    else{
      rover.logThis = false;
    }
    break;
    case "W":
    if(rover.coordY<9){
      rover.coordY++;
      rover.direction = "S";
      rover.logThis = true;
      }
      else{
        rover.logThis = false;
      } 
    break;
    case "S":
    if(rover.coordX<10){
      rover.coordX++;
      rover.direction = "E";
      rover.logThis = true;
      }
      else{
        rover.logThis = false;
      }
    break;
    case "E":
    if(rover.coordY>0){
      rover.coordY--;
      rover.direction = "N";
      rover.logThis = true;
      }
      else{
        rover.logThis = false;
      }
    break;
  }
  var coords = "X:" + rover.coordX + " Y:" + rover.coordY;
  console.log(coords);
  if(rover.logThis){
    rover.travelLog.push(coords);
    drawStep(rover.coordX,rover.coordY);
  }
  else{
    console.log('You can not move this direction');
  }
}
function turnRight(){
  console.log("turnRight was called!");
  var currentDirection = rover.direction;
  switch(currentDirection){
    case "N":
      if(rover.coordX<9){
      rover.coordX++;
      rover.direction = "E";
      rover.logThis = true;
      }
      else{
        rover.logThis = false;
        showErrorMsg("E");
      }
    break;
    case "W":
      if(rover.coordY>0){
      rover.coordY--;
      rover.direction = "N";
      rover.logThis = true;
      }
      else{
        rover.logThis = false;
        showErrorMsg("N");
      } 
    break;
    case "S":
      if(rover.coordX>0){
        rover.coordX--;
        rover.direction = "W";
        rover.logThis = true;
      }
      else{
        rover.logThis = false;
        showErrorMsg("W");
      }   
    break;
    case "E":
      if(rover.coordY<9){
      rover.coordY++;
      rover.direction = "S";
      rover.logThis = true;
      }
      else{
        rover.logThis = false;
        showErrorMsg("S");
      } 
    break;
  }
  var coords = "X:" + rover.coordX + " Y:" + rover.coordY;
  if(rover.logThis){
    rover.travelLog.push(coords);
    drawStep(rover.coordX,rover.coordY);
  }
  else{
    console.log('You can not move this direction');
  }
}
function moveForward(){
  var currentDirection = rover.direction;
  console.log("moveForward was called");

  switch(currentDirection){
    case "N":
    if(rover.coordY>0){
      rover.logThis = true;
      rover.coordY--;
    }
    else{
      rover.logThis = false;
    }
    break;
    case "W":
    if(rover.coordX>0){
      rover.logThis = true;
      rover.coordX--;
    }
      else{
        rover.logThis = false;
      }
    break;
    case "S":
    if(rover.coordY<9){
      rover.logThis = true;
      rover.coordY++;
    }
    else{
      rover.logThis = false;
    }
    break;
    case "E":
    if(rover.coordX<9){
      rover.coordX++;
      rover.logThis = true;
    }
    else{
      rover.logThis = false;
    }
    break;
  }
  var coords = "X:" + rover.coordX + " Y:" + rover.coordY;
  //check if move was made and if so push to log array
  if(rover.logThis){
    drawStep(rover.coordX,rover.coordY);
    rover.travelLog.push(coords);
  }
  else{
    showErrorMsg(currentDirection);
  }
}
function moveBackward(){
  var currentDirection = rover.direction;
  console.log("moveBackward was called");
  switch(currentDirection){
    case "N":
    if(rover.coordY<9){
      rover.logThis = true;
      rover.coordY++;
    }
    else{
      rover.logThis = false;
    }
    break;
    case "W":
    if(rover.coordX<9){
      rover.logThis = true;
      rover.coordX++;
    }
      else{
        rover.logThis = false;
      }
    break;
    case "S":
    if(rover.coordY>0){
      rover.logThis = true;
      rover.coordY--;
    }
      else{
        rover.logThis = false;
      }
    break;
    case "E":
    if(rover.coordX>0){
      rover.coordX--;
      rover.logThis = true;
    }
    else{
      rover.logThis = false;
    }
    break;
  }
  var coords = "X:" + rover.coordX + " Y:" + rover.coordY;
  //check if move was made and if so push to log array
  if(rover.logThis){
    drawStep(rover.coordX,rover.coordY);
    rover.travelLog.push(coords);
  }
  else{
    console.log('You can not move this direction');
  }
}
function moveRover(dirList){
  for(var i = 0; i<dirList.length;i++){
    var move = dirList[i];
    if(rover.validDirections.includes(move)){
      switch(move){
        case "f":
        moveForward();
        break;
        case "b":
        moveBackward();
        break;
        case "r":
        turnRight();
        break;
        case "l":
        turnLeft();
        break;
      }
    }
    else{
      console.log('Invalid direction, no move was made');
    }
  }
}
function drawStep(cordX, cordY){
  var direction = rover.direction;
  updateCoords(cordX,cordY);
  $('.table tr td.current').removeClass();
  currentRow = $('.table tr[data-y="'+cordY+'"]');
  $(currentRow).find('[data-x="'+cordX+'"]').addClass('current '+direction);
  updateDir(direction);
  checkIfPremio(cordX,cordY);
}
function updateDir(dir){
  console.log("Direction: " +dir);
  $('.direction').text(dir);
}
function updateCoords(x,y){
  $('.coords').text(`${x},${y}`);
}
function showErrorMsg(dir){
  console.log('You can not move this direction');
  $('.table').addClass(dir);
  setTimeout(function(){
    $('.table').removeClass(dir);
  }, 300);
}
function checkIfPremio(x,y){
  if(x === rover.premioCoords.x && y===rover.premioCoords.y){
    $('#completed').fadeIn();
    printTravelLog();
  }
}
function printTravelLog(){
  var travelLog = rover.travelLog,
      logs = travelLog.length,
      html = "";
  for(var i = 0; i<logs;i++){
    html += `<li>{${travelLog[i]}}</li>`;
  }
  $('#travelLog').append(html);
  $('.attempts').text(logs);
  console.log("Travel Log: " + travelLog);
}
function elPremio(){
  var tableCell = $(".table tr td");
  var tableRow = $(".table tr");
  var randomNum1 = Math.floor((Math.random() * 10)),
      randomNum2 = Math.floor((Math.random() * 10)),
      randomRow = $('.table tr[data-y="'+randomNum1+'"]');
      $(randomRow).find('[data-x="'+randomNum2+'"]').addClass('premio');
      rover.premioCoords.x = randomNum2;
      rover.premioCoords.y = randomNum1;
}
function assignCoords(){
  var tableRow = $(".table tr");
  tableRow.each(function(index){
    $(this).attr('data-y',index);
    var tableCells = $(this).find('td');
    tableCells.each(function(index){
      $(this).attr('data-x',index);
    });
  });
}
function resetGame(){
  assignCoords();
  $('td').removeClass('premio');
  elPremio();
  rover.coordX = 0;
  rover.coordY = 0;
  rover.direction = "N";
  updateDir("N");
  updateCoords(0,0);
  rover.travelLog = [];
  $('.table td.current').removeClass('current');
  $('.table tr:first-child td:first-child').addClass('current');
  $('#travelLog').empty();
  $('#completed').fadeOut();
}

$(document).ready(function(){
  assignCoords();
  elPremio();
});


/**function controlling with keys, 
 * function inspirated from: https://jsfiddle.net/Sk8erPeter/Mhpy3/
**/
function print_arrow_key(keyCodeNumber) {
  // console.log(keyCodeNumber);
  var key_arrow_or_other = document.getElementById('key_arrow_or_other'),
      LEFT = 37,
      UP = 38,
      RIGHT = 39,
      DOWN = 40;
  switch (keyCodeNumber) {
  case LEFT:
    turnLeft();
    break;
  case UP:
    moveForward();
    break;
  case RIGHT:
    turnRight();
    break;
  case DOWN:
    moveBackward();
    break;
  default:
    break;
  }
}
function checkKeycode(event) {
  // handling Internet Explorer stupidity with window.event
  // @see http://stackoverflow.com/a/3985882/517705
  var keyDownEvent = event || window.event,
      keycode = (keyDownEvent.which) ? keyDownEvent.which : keyDownEvent.keyCode;
  print_arrow_key(keycode);
  return false;
}

document.onkeydown = checkKeycode;