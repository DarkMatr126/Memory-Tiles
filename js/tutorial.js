/*
~~~~~~
SCRIPT
~~~~~~


These are tiles. Click one [wait for click]

Good. Next up are sequences. Clicked a tile to continue

Every level, a series of tiles will turn green. After they are done playing, repeat the pattern. You cannot start before the sequence ends

<sequence plays>

Over time, the grid size gets bigger. Click to continue

<sequence plays>

The number of selected tiles will also grow, and will play faster


*/

window.addEventListener('load',() => {
    tutorial.addSubtitle('These are tiles. Click one',false,() => {createLvl(2,1,true)});
    tutorial.addSubtitle('Good. Next up are sequences. Clicked a tile to continue',false);
    tutorial.addSubtitle('Every level, a series of tiles will turn green. After they are done playing, repeat the pattern. You cannot start before the sequence ends. Click to continue',false);
    tutorial.addSubtitle(null,true,() => {
        sequence = generateSeries(2,2);
        sequencer(1000,true);
    },true)
    tutorial.addSubtitle('Over time, the grid size gets bigger. Click to continue',false,() => {createLvl(3,1,true)});
    tutorial.addSubtitle(null,true,() => {
        sequence = generateSeries(3,2);
        sequencer(1000,true);
    },true)
    tutorial.addSubtitle('The number of selected tiles will also grow, and will play faster. Click to continue',false);
    tutorial.addSubtitle(null,true,() => {
        sequence = generateSeries(3,3);
        sequencer(750,true);
    },true)
    

    tutorial.addMessage('incorrect','Nope, Try Again');
})

const tutorial = {};

//variables
tutorial.script = []; //[[click paused boolean,function,sequence]]
tutorial.part = 0; //index of .script
tutorial.paused = false;
tutorial.sequencePos = 0;

tutorial.addSubtitle = (text,click,func = undefined, multistep = false) => {
    if (text != null) {
        var subtitle = document.createElement('a');
        subtitle.setAttribute('class',`s${tutorial.script.length}`);
        subtitle.innerText = text;
        subtitle.style.display = 'none'
        document.getElementById('tutorial').getElementsByClassName('subtitles')[0].append(subtitle);
    }    

    tutorial.script.push([click,func,multistep]);
}

tutorial.addMessage = (id,text) => {
    var message = document.createElement('a');
    message.setAttribute('class',`m${id}`);
    message.innerHTML = text;
    message.style.display = 'none';
    document.getElementById('tutorial').getElementsByClassName('messages')[0].append(message);
}
tutorial.toggleMessage = (id) => {
    var messageDiv = document.getElementById('tutorial').getElementsByClassName('messages')[0];
    for (let i = 0; i < messageDiv.children.length; i++) {
        var mess = messageDiv.children[i];
        if (mess.getAttribute('class') === `m${id}`) {
            mess.style.display = ''
            setTimeout(() => {mess.style.display = 'none'},1000)
            return;
        }
        mess.style.display = 'none';
        
    }
}

tutorial.start = () => {
    var tutDoc = document.getElementById('tutorial');
    UI = 'tutorial';

    document.getElementById('startMenu').style.display = 'none';
    tutDoc.style.display = '';
    document.getElementById('back').style.display = '';
    tutDoc.getElementsByClassName(`s${tutorial.part}`)[0].style.display = 'unset';

    if (tutorial.script[tutorial.part][1]) {
        tutorial.script[tutorial.part][1]();
    }
}

tutorial.click = (x,y) => {
    var tile = tiles[y][x];
    if (tutorial.paused) {
        tile.style.backgroundColor = 'var(--tileClickedBad)'
        setTimeout(() => {
            tile.style.backgroundColor = 'var(--tileDefault)'
        },tileFeedback)
        return;
    }
    tile.style.backgroundColor = 'var(--tileClicked)'
    setTimeout(() => {
        tile.style.backgroundColor = 'var(--tileDefault)'
    },tileFeedback)

    if (tutorial.script[tutorial.part][2]) {
        if (sequence[tutorial.sequencePos][0] === x && sequence[tutorial.sequencePos][1] === y) {
            //correct
            tutorial.sequencePos++;
            if (tutorial.sequencePos === sequence.length) {
                tutorial.sequencePos = 0;
                tutorial.advance();
            }
        } else {
            //fail message
            tutorial.toggleMessage('incorrect');
            setTimeout(() => {tutorial.script[tutorial.part][1]();},1000)
        }
        return;
    }
    tutorial.advance();
}

tutorial.advance = () => {
    if (tutorial.part >= tutorial.script.length) {
        tutorial.reset();
        return;
    }

    var subDiv = document.getElementById('tutorial').getElementsByClassName('subtitles')[0];

    tutorial.part++;
    if (tutorial.script.length <= tutorial.part) {
        //finished
        document.getElementById('tutComplete').style.display = 'unset';
        tutorial.paused = true;
        return;
    }

    if (typeof subDiv.getElementsByClassName(`s${tutorial.part-1}`)[0] != 'undefined') {
        subDiv.getElementsByClassName(`s${tutorial.part-1}`)[0].style.display = 'none';
    }
    if (typeof subDiv.getElementsByClassName(`s${tutorial.part}`)[0] != 'undefined') {
        subDiv.getElementsByClassName(`s${tutorial.part}`)[0].style.display = 'unset';
    }

    tutorial.paused = tutorial.script[tutorial.part][0];

    if (tutorial.script[tutorial.part][1]) {
        tutorial.script[tutorial.part][1]();
    }
}

tutorial.reset = () => {
    var subDiv = document.getElementById('tutorial').getElementsByClassName('subtitles')[0];

    if (typeof subDiv.getElementsByClassName(`s${tutorial.part}`)[0] != 'undefined') {
        subDiv.getElementsByClassName(`s${tutorial.part}`)[0].style.display = 'none';
    }
    
    subDiv.getElementsByClassName(`s${0}`)[0].style.display = 'unset';

    removeTiles();

    tutorial.part = 0; //index of .script
    tutorial.paused = tutorial.script[0][0];
    tutorial.sequencePos = 0;

    tutorial.script[0][1]();
}

tutorial.exit = () => {
    var tutDoc = document.getElementById('tutorial');
    
    document.getElementById('startMenu').style.display = '';
    tutDoc.style.display = 'none';
    document.getElementById('back').style.display = 'none';
}

tutorial.complete = () => {
    tutorial.exit();
    tutorial.reset();
    document.getElementById('tutComplete').style.display = 'none';
}
