var combatMelee = {
    run: function(creep) {
        if(typeof(creep.memory.state) === 'undefined') {
            creep.memory.state = 'defend';
        }
        
        var targetFlag = Game.flags['target'];
        
        if(creep.hits < 100) {
            creep.say('oh crap');
        }
        
        if(creep.memory.state == 'attack') {
            if(creep.room.name != targetFlag.pos.roomName) {
                //console.log('thinks its not there');
                creep.moveTo(targetFlag); //gets us just inside the room
            } else {
                //console.log('doing else');
                var enemies = creep.room.find(FIND_HOSTILE_CREEPS); //find enemy creeps
                var enemyStructures = _.filter(creep.room.find(FIND_HOSTILE_STRUCTURES), (structure) => structure != creep.room.controller && structure.structureType != STRUCTURE_STORAGE && structure.structureType != STRUCTURE_RAMPART);
                var walls = _.filter(creep.room.find(FIND_STRUCTURES), (structure) => structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART);
                var enemyConstructionSites = creep.room.find(FIND_HOSTILE_CONSTRUCTION_SITES);
                
                var targetWall = Game.getObjectById('587c57d3c6d3eff7709032a9');
                
                if(creep.hits < creep.hitsMax) {
                    creep.heal(creep);
                }
                
                if(targetWall != undefined) {
                    if(creep.attack(targetWall) == ERR_NOT_IN_RANGE) { //try and attack them
                        //console.log('trying to attack');
                        creep.moveTo(targetWall);  //otherwise move to them
                    }
                }
                else if(enemies.length) { //if there are enemies
                    if(creep.rangedAttack(enemies[0]) == ERR_NOT_IN_RANGE) { //try and attack them
                        //console.log('trying to attack');
                        creep.moveTo(enemies[0]);  //otherwise move to them
                    }
                } else if(enemyStructures.length) { //otherwise if there are structures
                var target = creep.pos.findClosestByPath(enemyStructures);
                    if(creep.rangedAttack(target) == ERR_NOT_IN_RANGE) { //try and dismantle them,,,
                        //console.log('trying to dismantle');
                        creep.moveTo(target); //otherwise move to them
                    }
                } else if(enemyConstructionSites.length) { //otherwise if there are structures
                    creep.moveTo(enemyConstructionSites[0]); //otherwise move to them
                } else {
                    //console.log('trying to get to flag');
                    creep.moveTo(targetFlag); //otherwise go sit at the target flag
                }
                //code a retriever to collect free loots
            }
        } else if(creep.memory.state == 'defend') {
            var enemies = creep.room.find(FIND_HOSTILE_CREEPS); //find enemy creeps
             if(enemies.length) { //if there are enemies
                if(creep.attack(enemies[0]) == ERR_NOT_IN_RANGE) { //try and attack them
                    console.log('trying to attack');
                    creep.moveTo(enemies[0]);  //otherwise move to them
                }
            } else {
                creep.moveTo(Game.flags['Idle']);
            }
            //creep.moveTo(Game.flags['Idle']);
        }
    }
}

module.exports = combatMelee;
