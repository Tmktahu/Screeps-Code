//Welcome to Project Gadgets. The purpose of this project is to give easy-to-use functions to do random stuff

var Gadgets = {
    addRR: function(ownedRoom, targetRoom) {
        Memory.Overmind.OwnedRooms[ownedRoom].reservedRooms[targetRoom] = {};
    },
    
    removeRR: function(ownedRoom, targetRoom) {
        var index = Memory.Overmind.OwnedRooms[ownedRoom].reservedRooms.indexOf(targetRoom);
        if (index > -1) {
            Memory.Overmind.OwnedRooms[ownedRoom].reservedRooms.splice(index, 1);
            console.log('Successfully removed.');
        } else {
            console.log('ERROR: Target room is not assigned.');
        }
    },
    
    numSpawning: function(creepType, roomName) {
        //check the whole room for the number of these that are being spawned
        var count = 0;
        for(spawnName in Game.spawns) {
            if(spawnName == roomName) {
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

module.exports = Gadgets;
