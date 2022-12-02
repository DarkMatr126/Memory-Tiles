window.addEventListener('load',() => {
})


var tiles = [];
var UI = 'menu'; //menu, game, stats

function removeTiles () {
    document.getElementById('tiles').innerHTML = '';
    document.getElementById('tutTiles').innerHTML = '';
    tiles = [];
}

function reset () {
    scores.push(score);
    if (score > highscore) {
        highscore = parseInt(`${score}`);
        document.getElementById('highscore').innerText = `Highscore:${highscore}`;
    }
    if (lvl > maxLvl) {
        maxLvl = parseInt(`${lvl}`);
    }

    removeTiles();
    lvl = 0;
    numCorrect = 0;
    sequence = [];
    posSequence = 0;
    score = 0;

    document.getElementById('score').innerText = score;
    document.getElementById('lvl').innerText = `Level:${lvl}`;

    if (typeof intSequence == 'number') {
        clearInterval(intSequence);
    }
}

function start () {
    document.getElementById('startMenu').style.display = 'none';
    document.getElementById('game').style.display = '';
    document.getElementById('back').style.display = '';
    paused = false;
    UI = 'game';
    advanceLvl();
}

function back () {
    switch (UI) {
        case 'game':
            document.getElementById('startMenu').style.display = '';
            document.getElementById('game').style.display = 'none';
            document.getElementById('gameover').style.display = 'none';
            document.getElementById('gameover').getElementsByClassName('newHighscore')[0].style.display = 'none';
            document.getElementById('data').style.display = 'block';
            document.getElementById('back').style.display = 'none';

            UI = 'menu';
            reset();
            paused = false;
            break;
        case 'stats':
            document.getElementById('startMenu').style.display = '';
            document.getElementById('back').style.display = 'none';
            document.getElementById('statsMenu').style.display = 'none';

            UI = 'menu';
            break;
        case 'credits':
            document.getElementById('startMenu').style.display = '';
            document.getElementById('back').style.display = 'none';
            document.getElementById('credits').style.display = 'none';

            UI = 'menu';
            break;
        case 'tutorial':
            tutorial.exit();
            UI = 'menu'
            break;
    }
}

function stats () {
    var statsMenu = document.getElementById('statsMenu');

    //Calculate Stuff
    var averageScore = 0;
    if (scores.length != 0) {
        var sum = 0;
        for (let i = 0; i < scores.length; i++) {
            sum+=scores[i];
        }
        averageScore = Math.floor((sum/scores.length)*10)/10;
    }

    //Set stats
    statsMenu.getElementsByClassName('highscore')[0].innerHTML = `Highscore: ${highscore}`;
    statsMenu.getElementsByClassName('maxLvl')[0].innerHTML = `Max Level: ${maxLvl}`;
    statsMenu.getElementsByClassName('attempts')[0].innerHTML = `Attepts: ${scores.length}`;
    statsMenu.getElementsByClassName('averageScore')[0].innerHTML = `Average Score: ${averageScore}`;

    //Render
    document.getElementById('startMenu').style.display = 'none';
    document.getElementById('back').style.display = '';
    statsMenu.style.display = '';
    UI = 'stats';
}

function credits () {
    document.getElementById('startMenu').style.display = 'none';
    document.getElementById('back').style.display = '';
    document.getElementById('credits').style.display = '';
    UI = 'credits';
}

//Level System
var lvl = 0;//actual level is lvl + 1
var maxLvl = 0;
var score = 0;
var scores = [];
var highscore = 0;

var lvls = { //l<Level Number>: {width: <width>, size: <tile width>, num: <select num>, int: <interval>}
    default: {
        width:2,
        size:1,
        num:2,
        int:950
    }
}

var sequence = []; //[x,y]
var sequenceDone = false;
var intSequence = undefined;
var posSequence = 0;
var numCorrect = 0; //not score, resets each level

var paused = false;

function advanceLvl () {
    lvl++;
    document.getElementById('score').innerText = score;
    document.getElementById('lvl').innerText = `Level:${lvl}`;
    var data = undefined;
    if (typeof lvls[`l${lvl}`] != 'undefined') {
        data = JSON.parse(JSON.stringify(lvls[`l${lvl}`]));
    } else {
        data = JSON.parse(JSON.stringify(lvls.default)); //JS sucks. why can't I just copy it!

        data.int-=(lvl+1)*25;
        if (data.int < 420) {
            data.int = 420;
        }

        data.width+=Math.floor((lvl+1)/5);

        data.num+=Math.floor((lvl)/5); //normally lvl+1, but want to come in 1 latter
    }
    createLvl(data.width,data.size);

    //sequence generation
    sequence = generateSeries(data.width,data.num);
    sequencer(data.int);
}

function generateSeries (width,num) {
    var newSequence = [];
    posSequence = 0;
    numCorrect = 0;
    for (let i = 0; i < num; i++) {
        var x = Math.floor(Math.random()*width);
        var y = Math.floor(Math.random()*width);

        newSequence.push([x,y]);
    }
    return newSequence;
}

function sequencer (interval,isTut = false) {
    if (!isTut) {
        sequenceDone = false;
    } else {
        tutorial.paused = true;
    }
    var timeout = interval/2;
    intSequence = setInterval(() => {
        var x = sequence[posSequence][0];
        var y = sequence[posSequence][1];
        var tile = tiles[y][x];
        tile.style.background = 'var(--tileShow)';
        setTimeout(() => {
            tile.style.background = 'var(--tileDefault)';
        }, timeout);
        posSequence++
        if (posSequence >= sequence.length) {
            if (!isTut) {
                sequenceDone = true;
            } else {
                setTimeout(() => {
                    tutorial.paused = false;
                },timeout)
            }
            clearInterval(intSequence);
        }
    },interval)
}

var tileFeedback = 200;
function clickTile (x,y) {
    var tile = tiles[y][x];

    if (paused) {
        return;
    }
    if (!sequenceDone) {
        tile.style.background = 'var(--tileClickedBad)';
        setTimeout(() => {
            tile.style.background = 'var(--tileDefault)';
        },tileFeedback)
        return;
    }

    tile.style.background = 'var(--tileClicked)';
    setTimeout(() => {
        tile.style.background = 'var(--tileDefault)';
    },tileFeedback)
    
    if (x === sequence[numCorrect][0] && y === sequence[numCorrect][1]) {
        numCorrect++;
        score++;
        document.getElementById('score').innerText = score;
    } else {
        gameOver();
        return;
    }
    if (numCorrect === sequence.length) {
        document.getElementById('nextLevel').style.display = '';
        paused = true;
        setTimeout(() => {
            score++;
        },tileFeedback*2)
    }
}

function gameOver () {
    var gameoverDiv = document.getElementById('gameover')
    if (score > highscore) {
        highscore = parseInt(`${score}`);
        document.getElementById('highscore').innerText = `Highscore:${highscore}`;
        gameoverDiv.getElementsByClassName('newHighscore')[0].style.display = '';
    }
    
    document.getElementById('data').style.display = 'none';

    gameoverDiv.getElementsByClassName('score')[0].innerText = `Score: ${score}`;
    gameoverDiv.getElementsByClassName('highscore')[0].innerText = `Highscore: ${highscore}`;
    gameoverDiv.getElementsByClassName('level')[0].innerText = `Level: ${lvl}`;
    gameoverDiv.style.display = '';

    paused = true;
}

function restart () {
    reset();
    document.getElementById('gameover').style.display = 'none';
    document.getElementById('data').style.display = 'block';
    document.getElementById('gameover').getElementsByClassName('newHighscore')[0].style.display = 'none';
    paused = false;
    advanceLvl();
}

//Cookies
//Add at some point