var DefenderLogic = {
    
    coreLogic: function(creep) {
        if(creep.memory.role == 'meleeDefender') {
            module.exports.meleeDefender(creep);
        }
        if(creep.memory.role == 'rangedDefender') {
            module.exports.rangedDefender(creep);
        }
        if(creep.memory.role == 'healer') {
            module.exports.healer(creep);
        }
        if(creep.memory.role == 'tank') {
            module.exports.tank(creep);
        }
        if(creep.memory.role == 'guard') {
            module.exports.guard(creep);
        }
    },
    
    meleeDefender: function(creep) {
        if(creep.memory.state == undefined) {
            creep.memory.state = 'traveling';
        }
        
        if(creep.memory.state == 'traveling') {
            if(creep.room.name != creep.memory.targetRoomName) {
                creep.moveTo(Game.flags[creep.memory.targetRoomName]);
            } else {
                creep.moveTo(Game.flags[creep.memory.targetRoomName]);
                creep.memory.state = 'defending'
            }
        }
        //travel to the room
        
        if(creep.memory.state == 'defending') {
            var enemyCreeps = creep.room.find(FIND_HOSTILE_CREEPS);
            
            if(enemyCreeps.length) {
                var targetCreep = creep.pos.findClosestByRange(enemyCreeps);
                
                if(creep.attack(targetCreep) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetCreep);
                }
            } else {
                creep.moveTo(Game.flags[creep.memory.targetRoomName]);
            }
        }
    },
    
    rangedDefender: function(creep) {
        if(creep.memory.state == undefined) {
            creep.memory.state = 'traveling';
        }
        
        if(creep.memory.state == 'traveling') {
            if(creep.room.name != creep.memory.targetRoomName) {
                creep.moveTo(Game.flags[creep.memory.targetRoomName]);
            } else {
                creep.moveTo(Game.flags[creep.memory.targetRoomName]);
                creep.memory.state = 'defending'
            }
        }
        //travel to the room
        
        if(creep.memory.state == 'defending') {
            var enemyCreeps = creep.room.find(FIND_HOSTILE_CREEPS);
            
            if(enemyCreeps.length) {
                var targetCreep = creep.pos.findClosestByRange(enemyCreeps);
                
                if(creep.rangedAttack(targetCreep) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetCreep);
                }
            } else {
                creep.moveTo(Game.flags[creep.memory.targetRoomName]);
            }
        }
    },
    
    healer: function(creep) {
        if(creep.memory.state == undefined) {
            creep.memory.state = 'traveling';
        }
        
        if(creep.memory.state == 'traveling') {
            if(creep.room.name != creep.memory.targetRoomName) {
                creep.moveTo(Game.flags[creep.memory.targetRoomName]);
            } else {
                creep.moveTo(Game.flags[creep.memory.targetRoomName]);
                creep.memory.state = 'defending'
            }
        }
        //travel to the room
        
        if(creep.memory.state == 'defending') {
            var friendlyCreeps = _.filter(creep.room.find(FIND_MY_CREEPS), (creep) => creep.hits < creep.hitsMax);
            friendlyCreeps.sort(function(a,b){return ((a.hits/a.hitsMax) - (b.hits / b.hitsMax))});
            
            if(friendlyCreeps.length) {
                if(creep.heal(friendlyCreeps[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(friendlyCreeps[0]);
                }
            } else {
                var distanceFromFlag = creep.pos.getRangeTo(Game.flags[creep.memory.targetRoomName].pos);
                if(distanceFromFlag > 2) {
                    creep.moveTo(Game.flags[creep.memory.targetRoomName]);
                }
            }
        }
    },
    
    tank: function(creep) {
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
    },
    
    guard: function(creep) {
        if(creep.memory.state == undefined) {
            creep.memory.state = 'traveling';
        }
        
        if(creep.memory.state == 'traveling') {
            if(creep.room.name != creep.memory.targetRoomName) {
                creep.moveTo(Game.flags[creep.memory.targetRoomName]);
            } else {
                creep.moveTo(Game.flags[creep.memory.targetRoomName]);
                creep.memory.state = 'defending'
            }
        }
        //travel to the room
        
        if(creep.memory.state == 'defending') {
            var enemyCreeps = creep.room.find(FIND_HOSTILE_CREEPS);
            
            if(enemyCreeps.length) {
                var targetCreep = creep.pos.findClosestByRange(enemyCreeps);
                
                if(creep.attack(targetCreep) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetCreep);
                }
            } else {
                creep.heal(creep);
                creep.moveTo(Game.flags[creep.memory.targetRoomName]);
            }
        }
    },
}

module.exports = DefenderLogic;
