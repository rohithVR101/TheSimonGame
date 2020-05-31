var buttonColours = ["red", "blue", "green", "yellow"];
var cpuPattern = [];
var userPattern = [];
var score, level, i;

function controlGameState() {
    if ($("#controlGameState")[0]["innerText"] == "START" || $("#controlGameState")[0]["innerText"] ==
        "PLAY AGAIN?") {
        score = 0;
        level = 0;
        cpuPattern = [];
        $("#controlGameState").text("RESET GAME");
        $("#score").text("Score : " + score);
        $("#instruction").text("Level " + level);
        nextSequence();
    } else if ($("#controlGameState")[0]["innerText"] == "RESET GAME") {
        cpuPattern = [];
        $("#controlGameState").text("START");
        $("#score").text("");
        $("#instruction").text("");
    }
}

function nextSequence() {
    level++;
    userPattern = [];
    i = 0;
    $("#instruction").text("Level " + level);
    var randomChosenColour = buttonColours[Math.floor(Math.random() * Math.floor(4))];
    cpuPattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $('.' + randomChosenColour).addClass('flash');
    setTimeout(function () {
        $('.' + randomChosenColour).removeClass('flash');
    }, 200);
}

$(".disc").click(function () {
    if (i < cpuPattern.length - 1) {
        let userChosenColour = this.alt;
        playSound(userChosenColour);
        userPattern.push(userChosenColour);
        i++;
    } else if (i == cpuPattern.length - 1) {
        let userChosenColour = this.alt;
        playSound(userChosenColour);
        userPattern.push(userChosenColour);
        checkAnswer();
    }
});

function checkAnswer() {
    let x = true;
    for (var i = 0; i < userPattern.length; ++i) {
        if (userPattern[i] !== cpuPattern[i]) x = false;
    }
    if (x) {
        score++;
        $("#score").text("Score : " + score);
        setTimeout(function () {
            nextSequence();
        }, 500);
    } else {
        playSound("gameover");
        $("#controlGameState").text("PLAY AGAIN?");
        $("#score").text("YOUR SCORE WAS " + score);
        $("#instruction").text("GAME OVER");
    }
}

function playSound(name) {
    clip = new Audio('sounds/' + name + '.mp3').play();
}