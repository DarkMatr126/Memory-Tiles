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
    setTileSize(size);
    removeTiles();

    var center = width/2;

    var tilesDiv = document.getElementById('tiles');

    for (let y = 0; y < width; y++) {
        var deviationY = y-center;

        var rowArr = [];

        for (let x = 0; x < width; x++) {
            var deviationX = x-center;

            var tile = document.createElement('div');
            tile.setAttribute('class','tile');
            tile.style.left = `calc(50% + ${deviationX*tileSize}in + ${deviationX*5*tileSize}px)`;
            tile.style.top = `calc(50% + ${deviationY*tileSize}in + ${deviationY*5*tileSize}px)`;
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