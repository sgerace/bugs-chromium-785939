var count = 0;
var interval = setInterval(function() {
    if (count++ === 100) {
        clearInterval(interval);
        return;
    }
    var s = count / 99 * 2 * Math.PI;
    var tx = 400 * count / 99;
    var ty = 400 * count / 99;
    var ra = 100;
    var rb = 60;
    var na = 20;
    var nb = 2500; // Increase or decrease this number to alter performance
    var paths = [];
    for (i = 0; i < na; ++i) {
        var path = [];
        var a = i / (na - 1) * 2 * Math.PI;
        var cx = tx + ra * Math.cos(s + a);
        var cy = ty + ra * Math.sin(s + a);
        for (j = 0; j < nb; ++j) {
            var b = j / (nb - 1) * 2 * Math.PI;
            var x = cx + rb * Math.cos(b);
            var y = cy + rb * Math.sin(b);
            path.push(x, y);
        }
        paths.push(path);
    }
    postMessage({
        paths: paths
    });
}, 10);
