var Mine = (function () {
    function Mine() {
        this.names = ['Dijkstra', 'Knuth', 'Turing', 'Hopper'];
    }
    Mine.prototype.get = function () {
        return this.names;
    };
    Mine.prototype.add = function (value) {
        this.names.push(value);
    };
    return Mine;
})();
exports.Mine = Mine;
