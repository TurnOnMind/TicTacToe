// useful varables
const play = document.getElementById('play');   // div capture
const max = 3;                                  // grid size [max x max] 
const goal = 3;                                 // how many you need fields in a row to win
let limit;                                      // it's used in checking if is remis
let playground = [];                            // playground grid

// creating playground
function autostart() {
    for (i = 0; i < max; i++) {
        playground.push([]);
    }
    initialize();
}

// start and restart playground
function initialize() {
    limit = 0;                      // reseting limit value
    play.innerHTML = '';            // clearing HTML staff
    for (x = 0; x < max; x++) {
        for (y = 0; y < max; y++) {
            play.innerHTML += '<div id="' + x + '' + y + '" class="canbeused" onclick="playersmove(' + x + ', ' + y + ', \'red\')"></div>'; //seting up fields to default
            playground[x][y] = 0;   // reseting playground values
        }
        play.innerHTML += '<br>';   // new row
    }
}

// set field as used and check if someone win
function choose(x, y, color) {
    limit++;                                            // increse limit value for each field taken
    const block = document.getElementById(x + '' + y);  // HTML staff
    block.classList.remove('canbeused');
    block.classList.add(color);
    block.classList.add('useded');
    block.attributes.removeNamedItem('onclick');
    setTimeout(check, 100, x, y, color);                // checking if someone win
    playground[x][y] = color;                           // setting color in array
}

// all posibilites checker
function aPC(x, y, color, mx, my) {
    let i = 1; // setting counter
    while (x + mx * i >= 0 && x + mx * i < max &&               // checking if checking x is in grid
           y + my * i >= 0 && y + my * i < max &&               // checking if checking y is in grid
           playground[x + mx * i][y + my * i] == color) i++;    // checking if checking field is in right color
    return i - 1;                                               // returning how many same colors is in a row (one site of each direction)
}

// check if someone wins or if is draw
// it doesn't scan whole playground 
function check(x, y, color) {
    if (aPC(x, y, color,  1, 0) + aPC(x, y, color, -1,  0) + 1 >= goal || // checking how many fields are horizontally
        aPC(x, y, color,  0, 1) + aPC(x, y, color,  0, -1) + 1 >= goal || // checking how many fields are vertically
        aPC(x, y, color,  1, 1) + aPC(x, y, color, -1, -1) + 1 >= goal || // checking how many fields are in cross
        aPC(x, y, color, -1, 1) + aPC(x, y, color,  1, -1) + 1 >= goal )  // checking how many fields are in second cross
    {
        alert(color + ' win!'); // alert about how win
        document.getElementById(color).innerHTML = parseInt(document.getElementById(color).innerHTML) + 1; // adding 1 to score
        initialize();           // reset game
    }
    if (limit == max * max) {
        alert('draw!');         // alert if it's draw
        initialize();           // reset game
    }
}

// Randomized bot movment with not used field selector
function botmove() {
    let x, y;                                   // some variables
    do {
        x = Math.floor(Math.random() * max);    // randomizing x
        y = Math.floor(Math.random() * max);    // randomizing y
    } while (playground[x][y] != 0)             // check if it's occupated
    choose(x, y, 'blue');                       // call choose function for bot
}

// input function for player's move with reference to bot movment after 100ms
function playersmove(x, y, color) {
    choose(x, y, color);                        // call choose function for player
    setTimeout(botmove, 100);                   // bot move with 100ms relay
}

// autostart
autostart();