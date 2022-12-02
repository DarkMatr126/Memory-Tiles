var tileSize = 1//in inches

window.addEventListener('load',() => {
    setTileSize(tileSize);
})

function setTileSize (size) {
    tileSize = size;
    var root = document.querySelector(':root');
    root.style.setProperty('--tileSize', `${tileSize}in`);
}

function createLvl (width,size,tutorialLvl = false) {
    removeTiles();

    size*=2/width*2;
    if (size < 0.1) {
        size = 0.1;
    }
    setTileSize(size);


    var marginFrac = 10; //size/margin
    var margin = size/marginFrac;
    var totSize = width*size+(width-1)*margin;
    var centerTile = width/2; //actually Math.ciel(<math>)-1 because of arrays; same as Math.floor();
    /*
    full tile offset = distance from center tile * size
    */

    var tilesDiv = document.getElementById('tiles');

    for (let y = 0; y < width; y++) {
        var difY = y-centerTile;
        var offY = difY*size; //in inches
        var marOffY = (difY+0.5)*size/marginFrac;

        var rowArr = [];

        for (let x = 0; x < width; x++) {            
            var difX = x-centerTile;
            var offX = difX*size; //in inches
            var marOffX = (difX+0.5)*size/marginFrac;

            var tile = document.createElement('div');
            tile.setAttribute('class','tile');

            tile.style.left = `calc(50% + ${offX}in + ${marOffX}in)`
            tile.style.top = `calc(50% + ${offY}in + ${marOffY}in)`

            if (!tutorialLvl) {
                tile.setAttribute('onclick',`clickTile(${x},${y})`);
                tilesDiv.append(tile);
            } else {
                tile.setAttribute('onclick',`tutorial.click(${x},${y})`);
                document.getElementById('tutTiles').append(tile);
            }

            rowArr.push(tile);
        }
        tiles.push(rowArr);
    }    
}