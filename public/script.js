var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");

function render(paths) {
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, 400, 400);

    var pathslen = paths.length;
    context.beginPath();
    for (var k = 0; k < pathslen; ++k) {
        var path = paths[k];
        var pathlen = path.length;
        var index = 2;
        context.moveTo(path[0], path[1]);
        while (index < pathlen) {
            context.lineTo(path[index], path[index + 1]);
            index += 2;
        }
        context.closePath();
    }
    context.stroke();
}

var worker = new Worker('worker.js');
worker.onmessage = function(e) {
    render(e.data.paths);
};
