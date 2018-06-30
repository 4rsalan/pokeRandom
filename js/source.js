// ================================================================================================
// USER VARIABLES
// ================================================================================================
var create = document.getElementById("create");
var users = document.getElementById("users");
var players = document.getElementsByClassName("userInput");
var userContainer = document.getElementById("userContainer");
var userButton = document.getElementsByClassName("userButton");
var reset = document.getElementById("reset");
var randomButton = document.getElementById("randomize");
var textAreaId = document.getElementById("list");
var groups = document.getElementsByClassName("groups");
var teamMax = document.getElementsByClassName("teamMax");
var playerCount = document.getElementById("playerCount");
var calc = document.getElementsByClassName("calc");
var randTitle = document.getElementById("randTitle");

var userArray = [];
var inputContainer = document.createElement("div");
inputContainer.classList.add("contain", "mx-auto");

// ================================================================================================
// LISTENER FUNCTIONS
// ================================================================================================

// This function creates text boxes to enter the users playing the game
function createBoxes(){
    if (playerCount.value === "" || playerCount.value <= 0 || isNaN(playerCount.value)){
        alert("Please enter a numerical value greater than 0");
    }
    else {
        var newTitle = document.createElement("h6");
        newTitle.innerText = "Please enter all the players";
        var maxTitle = document.createElement("h6");
        newTitle.classList.add("newTitle");
        maxTitle.innerText = "What is the maximum amount of pokemon per player?";

        var maxInput = document.createElement("input");
        maxInput.type = "text";
        maxInput.classList.add("teamMax");

        users.appendChild(inputContainer);
        inputContainer.appendChild(newTitle);
        userArray = [];

        for (var x = 0; x < playerCount.value; x++) {
            userArray[x] = document.createElement("input");
            userArray[x].type = "text";
            userArray[x].classList.add("userInput");
            inputContainer.appendChild(userArray[x]);
        }
        inputContainer.appendChild(maxTitle);
        inputContainer.appendChild(maxInput);
        create.disabled = true;
    }
}

function createUsers(){
    //Checks to see
    if (players.length === 0){
        alert("Please create players first!");
    }
    else if (teamMax[0].value === "" || teamMax[0].value <= 0 || isNaN(teamMax[0].value)){
        alert("Please enter the maximum amount of pokemon per team");
    }
    else {
        createUsersButton();
    }
}

function randomize(){
    //Clearing the old groups
    clearRando();

    var lines = textAreaId.value.split('\n');
    var pokeArray = [];

    //This puts all the pokemon entered into an array
    for(var i = 0;i < lines.length;i++){
        pokeArray.push(lines[i]);
    }

    //Randomizes the values in the array
    var randPokeArray = shuffle(pokeArray);

    //Checks to see if the amount of pokemon entered can be distributed cleanly. Will recalculate the right amount
    // PokeArray must be greater than or equal to the players*maxPokemon per team.
    if (pokeArray.length < (groups.length*teamMax[0].value)){
        alert("There needs to be at least " + teamMax[0].value * players.length +
            " Pokemon in the list for even distribution");
        clearRando();
    }
    else {
        bgChange();
        //Resizes the array if need be evenly for every group
        var slicePokeArray = randPokeArray.slice(0, (groups.length*teamMax[0].value));

        //Splits the array into different sections depending on the teamMax
        var teams = chunkArray(slicePokeArray, teamMax[0].value);

        //Displays the randomized values into the respective teams
        for (var x = 0; x < (teams.length); x++) {
            for (var j = 0; j < teams[x].length;j++){
                var pokemonNode = document.createElement("li");
                var pokemon = document.createTextNode(teams[x][j]);
                pokemonNode.appendChild(pokemon);
                groups[x].appendChild(pokemonNode);
            }
        }
    }
}

// ================================================================================================
// HELPER FUNCTIONS
// ================================================================================================

//Randomizes and shuffles all the values in an array
function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

// Splits an array into smaller chunks which are determined by the user
function chunkArray(myArray, chunk_size){
    var results = [];

    while (myArray.length) {
        results.push(myArray.splice(0, chunk_size));
    }

    return results;
}

function createUsersButton(){
    userContainer.classList.add("row");
    userContainer.classList.add("mx-auto");
    for (var i = 0; i < playerCount.value; i++) {
        var card = document.createElement("div");
        var playerName = document.createElement("h6");
        var pokeList = document.createElement("ul");

        pokeList.classList.add("user" + i);
        pokeList.classList.add("groups");

        card.classList.add("card");
        card.classList.add("col-sm-4");
        playerName.innerHTML = userArray[i].value;

        userContainer.appendChild(card);
        card.appendChild(playerName);
        card.appendChild(pokeList);
    }
}

function clearUserBoxes(){
    create.disabled = false;

    var newTitle = document.getElementsByClassName("newTitle");
    var div = newTitle[0].parentElement;
    div.parentNode.removeChild(div);
    userArray = [];
    clearRando();
}

//Clears the list of randomized pokemon
function clearRando(){
    for (var i = 0; i < groups.length; i++){
        var ul = document.getElementsByClassName("groups")[i];
        if (ul) {
            while (ul.firstChild) {
                ul.removeChild(ul.firstChild);
            }
        }
    }
}

function maxCalc(){
    var num = teamMax[0].value * players.length;
    var node = document.createElement("h5");
    node.innerText = "You need to have at least " + num + " or more Pokemon in the list for even distribution.";
    randTitle.appendChild(node);
}

function bgChange(){
    var bgArray = ["img/b1.jpg", "img/b2.jpg", "img/b3.png", "img/b4.jpg", "img/b5.jpg ", "img/b6.png"];
    var rand = Math.floor(Math.random() * bgArray.length);
    var rand2 = bgArray[Math.floor(Math.random() * bgArray.length)];

    if ('url(' + bgArray[rand] + ')' !== document.body.style.backgroundImage){
        document.body.style.backgroundImage = 'url(' + bgArray[rand] + ')';
    }
    else {
        bgArray.splice(rand, 1);
        rand = Math.floor(Math.random() * bgArray.length);
        document.body.style.backgroundImage = 'url(' + bgArray[rand] + ')';
    }
}


// ===============================================================================================
// LISTENERS
// ===============================================================================================

//Adding Listeners

create.addEventListener("click", createBoxes);
userButton[0].addEventListener("click", createUsers);
randomButton.addEventListener("click", randomize);
reset.addEventListener("click", clearUserBoxes);
