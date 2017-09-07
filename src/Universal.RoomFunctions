module.exports = function() {
    Room.prototype.numSpawning = function(creepType) {
        //check the whole room for the number of these that are being spawned
        var count = 0;
        for(spawnName in Game.spawns) {
            if(Game.spawns[spawnName].room.name == this.name) {
                if(Game.spawns[spawnName].spawning != null) {
                    var creepName = Game.spawns[spawnName].spawning.name;
                    if(Game.creeps[creepName].memory.role == creepType) {
                        count++;
                    }
                }
            }
        }
        return count;
    }
}
