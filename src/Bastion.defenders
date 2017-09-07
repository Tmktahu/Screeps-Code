var Defenders = {
    
    meleeDefender: function() {
        if(creep.memory.state == undefined) {
            creep.memory.state = 'traveling';
        }
        
        if(creep.memory.state == 'traveling') {
            if(creep.room.name != creep.memory.targetRoomName) {
                creep.moveTo(Game.flags[creep.memory.targetRoomName]);
            } else {
                creep.moveTo(Game.flags[creep.memory.targetRoomName]);
                creep.memory.state = 'attacking'
            }
        }
        //travel to the room
        
        if(creep.memory.state == 'attacking') {
            var enemyCreeps = creep.room.find(FIND_HOSTILE_CREEPS);
            
            targetCreep = creep.pos.findClosestByRange(enemyCreeps);
        }
        //once we are in the room, attack enemy creeps
        
        //for now we will use high-damage melee creeps
    }
}

module.exports = Defenders;
