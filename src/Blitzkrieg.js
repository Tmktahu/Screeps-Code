//Welcome to Project Blitzkrieg. The goal of this project is to begin our development of attack code.
//To begin, we will make a creep that will enter and leave a room, healing itself in the proccess, to drain the enemy turrets.

require('Blitzkrieg.spawnFunctions')();

var Blitzkrieg = {
    spawningLogic: function() {
        //here we will handle spawning and stuff
        //so we need a master list of rooms to attack
        var targetRooms = ['E31N79'];
        
        for(index in targetRooms) { //for each target room
            //so now we need to get a list of active creeps that have been assigned to the room
            //what category of creeps will there be?
            
            //sieger? fuck spelling
            //dissaembler?
            //barbarian
            
            var numSiegers = _.filter(Game.creeps, (creep) => creep.memory.role == 'sieger').length;
            var targetNumSiegers = 0;
            
            var numBarbarians = _.filter(Game.creeps, (creep) => creep.memory.role == 'barbarian').length;
            var targetNumBarbarians = 0;
            
            if(numSiegers < targetNumSiegers) {
                for(name in Game.spawns) {
                    if(Game.spawns[name].spawning == null) { //and if it isn't spawning anything
                        var newName = Game.spawns[name].createSieger(targetRooms[index]); //create a reserver
                        if(newName != undefined && newName != -6) {
                            console.log(Game.spawns[name].name, 'Creating Sieger', newName,'for Room', targetRooms[index]); //and log it
                        }
                    }
                }
            }
            
            else if(numBarbarians < targetNumBarbarians) {
                for(name in Game.spawns) {
                    if(Game.spawns[name].spawning == null) { //and if it isn't spawning anything
                        var newName = Game.spawns[name].createBarbarian(targetRooms[index]); //create a reserver
                        if(newName != undefined && newName != -6) {
                            console.log(Game.spawns[name].name, 'Creating Barbarian', newName,'for Room', targetRooms[index]); //and log it
                        }
                    }
                }
            }
        }
    },
    
    creepLogic: function(creep) {
        if(creep.memory.role == 'sieger') {
            module.exports.sieger(creep);
        }
        if(creep.memory.role == 'barbarian') {
            module.exports.barbarian(creep);
        }
    },
    
    sieger: function(creep) {
        //this is the logic for the sieger
        
        //so how are we going to do this?
        
        //idealy i'd like to make a team of 3 healers. They group up in the staging room, and once all there they enter the target room
        //once in the target room, they check each other's health and heal the one that is below max
        
        //or we can just ditch that idea and go with what we have.
        //cept lets make use of the idea that we get auto-flung from room to room
        
        //enter the target room and don't move.
        //it flips us back and forth till we get too low
        //then back out into safe room till we are full health again
        
        creep.heal(creep);
        
        if(creep.memory.state == 'sieging') {
            
            if(creep.room.name != Game.flags[creep.memory.targetRoom + 'sieging'].pos.roomName) {
                creep.moveTo(Game.flags[creep.memory.targetRoom + 'sieging']);
            } /*else if(creep.pos.x == 0 || creep.pos.y == 0 || creep.pos.x == 49 || creep.pos.y == 49) {
                creep.moveTo(Game.flags['sieging']);
            } else {
                creep.moveTo(Game.flags['sieging']);
            }*/
            
            if(creep.hits < 1000) {
                creep.memory.state = 'healing';
            }
        }
        
        if(creep.memory.state == 'healing') {
            
            if(creep.room.name != Game.flags['healing'].pos.roomName) {
                creep.moveTo(Game.flags['healing']);
            //} else if(creep.pos.x == 0 || creep.pos.y == 0 || creep.pos.x == 49 || creep.pos.y == 49) {
                //creep.moveTo(Game.flags['healing']);
            } else {
                creep.moveTo(Game.flags['healing']);
            }
            
            if(creep.hits == creep.hitsMax) {
                creep.memory.state = 'sieging';
            }
        }
    },
    
    barbarian: function(creep) {
        if(typeof(creep.memory.state) === 'undefined') {
            creep.memory.state = 'attack';
        }
        
        var targetFlag = Game.flags[creep.memory.targetRoom + 'target'];
        //var targetWall = Game.getObjectById('5867cf44683b20301ac3ef5d');
        
        
        if(creep.hits < 100) {
            creep.say('oh crap');
        }
        
        if(creep.memory.state == 'attack') {
            if(creep.room.name != targetFlag.pos.roomName) {
                creep.moveTo(targetFlag); //gets us just inside the room
            } else {
                var enemies = creep.room.find(FIND_HOSTILE_CREEPS); //find enemy creeps
                var enemyStructures = _.filter(creep.room.find(FIND_HOSTILE_STRUCTURES), (structure) => structure != creep.room.controller && structure.structureType != STRUCTURE_RAMPART && structure.structureType != STRUCTURE_STORAGE);
                var walls = _.filter(creep.room.find(FIND_STRUCTURES), (structure) => structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART);
                var enemyConstructionSites = creep.room.find(FIND_HOSTILE_CONSTRUCTION_SITES);
                
                var allTargets = enemies.concat(enemyStructures);
                
                /*
                if(enemies.length) { //if there are enemies
                    var targetEnemy = creep.pos.findClosestByPath(enemies);
                    if(creep.attack(targetEnemy) == ERR_NOT_IN_RANGE) { //try and attack them
                        creep.heal(creep);
                        creep.moveTo(targetEnemy);  //otherwise move to them
                    }
                    
                } else if(enemyStructures.length) { //otherwise if there are structures
                var target = creep.pos.findClosestByPath(enemyStructures);
                    if(creep.attack(target) == ERR_NOT_IN_RANGE) { //try and dismantle them,,,
                        creep.moveTo(target); //otherwise move to them
                    }
                    */
                    
                /*if(targetWall != undefined) {
                    if(creep.attack(targetWall) == ERR_NOT_IN_RANGE) { //try and attack them
                        creep.heal(creep);
                        creep.moveTo(targetWall);  //otherwise move to them
                    }
                    
                } else*/ if(allTargets.length) {
                    specificTarget = creep.pos.findClosestByPath(allTargets);
                    if(creep.attack(specificTarget) == ERR_NOT_IN_RANGE) { //try and attack them
                        creep.heal(creep);
                        if(creep.moveTo(specificTarget) == ERR_NO_PATH) {  //otherwise move to them
                            creep.moveTo(specificTarget, {ignoreDestructibleStructures: true});
                        }
                    }
                } else if(enemyConstructionSites.length) { //otherwise if there are structures
                    creep.moveTo(enemyConstructionSites[0]); //otherwise move to them
                    
                } else {
                    creep.moveTo(targetFlag); //otherwise go sit at the target flag
                }
                //code a retriever to collect free loots
            }
        }
    }
}

module.exports = Blitzkrieg;
