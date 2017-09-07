var Thief = {
    run: function(creep) {
        if(typeof(creep.memory.state) === 'undefined') {
            creep.memory.state = 'collecting';
        }
        
        if(creep.hits < 100) {
            creep.say('oh crap');
        }
        
        if(creep.memory.state == 'collecting') {
            var targetFlag = Game.flags['target'];
            
            if(creep.room.name != targetFlag.pos.roomName) {
                //console.log('thinks its not there');
                creep.moveTo(targetFlag); //gets us just inside the room
            } else {
                //console.log('doing else');
                var enemyStorage = creep.room.storage;
                
                if(enemyStorage != undefined && enemyStorage.store[RESOURCE_ENERGY] == 0) {
                    Memory.tempBoolean = false;
                    creep.memory.state = 'delivering';
                }
                
                if(enemyStorage != undefined) {
                    if(creep.withdraw(enemyStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { //try and attack them
                        creep.moveTo(enemyStorage);  //otherwise move to them
                    }
                }
                
                if(creep.carry.energy == creep.carryCapacity) {
                    creep.memory.state = 'delivering';
                }
            }
        } else if(creep.memory.state == 'delivering') {
            var homeRoomFlag = Game.flags['Home'];
            
            if(creep.room.name != homeRoomFlag.pos.roomName) {
                creep.moveTo(homeRoomFlag); //gets us just inside the room
            } else {
                
                var myStorage = creep.room.storage;
                
                if(myStorage != undefined) {
                    if(creep.transfer(myStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { //try and attack them
                        creep.moveTo(myStorage);  //otherwise move to them
                    }
                }
                
                if(creep.carry.energy == 0) {
                    creep.memory.state = 'collecting';
                }
                //code a retriever to collect free loots
            }
        }
    }
}

module.exports = Thief;
