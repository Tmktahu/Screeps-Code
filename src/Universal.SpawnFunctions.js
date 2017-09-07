module.exports = function() {
    StructureSpawn.prototype.generateName =
    function(creepType) {
        var finalCreepName = creepType + '' + (Game.time % 100000).toString();
        return finalCreepName;
    }
}
