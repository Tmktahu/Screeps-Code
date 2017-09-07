var ProjectColony = {
    run: function() {
        
        //welcome to Project Colony
        //the goal of this project is to get a colony started in a target room
        
        const targetRoom = 'E28N75'; //set our target room in it's variable
        const newSpawnName = 'Sarum'; //set the name of the new spawn in it's variable

        //========================================================================= PHASE 1 ========================================================================= 
        
        if(Game.spawns[newSpawnName] == undefined) { //if the new spawn DOES NOT exist
        //THIS MIGHT NOT WORK. idk when the new spawn gets it's 'energy' value....maybe when it starts to get constructed?
        //hopefully it won't get it's energy value until it's finished
        
            var colonyBuilders = 0; //this is the number of builders to be maintained
            var colonyUpgrader = 0; //this is the number of upgraders to be maintained
            //we do need a claimer, but we'll make it manually cause we only need one
            
            let currentBuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'colonyBuilder'); //get a list of ALL builders
            let currentUpgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'colonyUpgrader'); //get a list of ALL upgraders
            let currentClaimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'colonyClaimer'); //get a list of ALL upgraders
            
            console.log(currentBuilders, ' ', colonyBuilders);
            
            if(currentBuilders.length < colonyBuilders) { //then if the CURRENT number of builders is less than the desired number of builders
                //spawn a builder
                Game.spawns['Tanis'].createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, WORK, WORK], undefined, {role: 'colonyBuilder', targetRoom: targetRoom});
                
            } else if(currentUpgraders.length < colonyUpgrader) { //otherwise, if the CURRENT number of upgraders is less than the desired number
                //spawn an upgrader
                Game.spawns['Tanis'].createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, WORK], undefined, {role: 'colonyUpgrader', targetRoom: targetRoom});
            }
            
            for(creep in currentBuilders) { //for each builder
                module.exports.colonyBuilderCode(currentBuilders[creep]); //run the builder code
            }
            
            for(creep in currentUpgraders) { //for each upgrader
                module.exports.colonyUpgraderCode(currentUpgraders[creep]); //run the upgrader code
            }
            
            for(creep in currentClaimers) { //for each claimer
                module.exports.colonyClaimerCode(currentClaimers[creep]); //run the claimer code
            }
            
        //========================================================================= PHASE 2 ========================================================================= 
            
        } else { //otherwise the spawn is made and we should flip to making a stable economy
            
            //console.log('SPAWN EXISTS');
            
            var miners = 0; //number of miners
            var builders = 0; //number of builders
            var upgraders = 0; //number of upgraders
            
            var allCreepsInRoom = Game.spawns[newSpawnName].room.find(FIND_MY_CREEPS); //get all the creeps in the room
            var numberOfMiners = _.filter(allCreepsInRoom, (creep) => creep.memory.role == 'colonyMiner'); //filter out the miners
            var numberOfBuilders = _.filter(allCreepsInRoom, (creep) => creep.memory.role == 'colonyBuilder'); //filter out the builders
            var numberOfUpgraders = _.filter(allCreepsInRoom, (creep) => creep.memory.role == 'colonyUpgrader'); //filter out the upgraders
            
            //console.log(numberOfMiners.length, ' ', numberOfBuilders.length, ' ', numberOfUpgraders.length);
            
            if(numberOfMiners.length < miners) { //if we need more miners
                console.log('Sarum is trying to spawn a miner');
                Game.spawns[newSpawnName].createCreep([WORK, MOVE, MOVE, CARRY], undefined, {role: 'colonyMiner', targetRoom: targetRoom}); //spawn a miner
            } else if(numberOfUpgraders.length < upgraders) { //otherwise, if we need more upgraders
                console.log('Sarum is trying to spawn an upgrader');
                Game.spawns[newSpawnName].createCreep([WORK, MOVE, MOVE, CARRY], undefined, {role: 'colonyUpgrader', targetRoom: targetRoom}); //spawn an upgrader
            } else if(numberOfBuilders.length < builders) { //otherwise, if we need more builders
                console.log('Sarum is trying to spawn a builder');
                Game.spawns[newSpawnName].createCreep([WORK, MOVE, MOVE, CARRY], undefined, {role: 'colonyBuilder', targetRoom: targetRoom}); //spawn a builder
            }
            
            for(index in allCreepsInRoom) { //for every creep in the room
                if(allCreepsInRoom[index].memory.role == 'colonyMiner') { //if it's a miner
                    module.exports.colonyMinerCode(allCreepsInRoom[index]); //do the miner code
                }
                
                if(allCreepsInRoom[index].memory.role == 'colonyBuilder') { //if it's a builder
                    module.exports.colonyBuilderCode(allCreepsInRoom[index]); //do the builder code
                }
                
                if(allCreepsInRoom[index].memory.role == 'colonyUpgrader') { //if it's an upgrader
                    module.exports.colonyUpgraderCode(allCreepsInRoom[index]); //do the upgrader code
                }
            }
        }
    },
    
    colonyMinerCode: function(creep) { //this is the code for the miners that will be produced once the spawner is constructed
        if(creep.memory.state == undefined) { //if ourstate is undefined
            creep.memory.state = 'mining'; //set it to mining
        }

        if(creep.memory.state == 'mining') { //if we are in mining mode
            let allSources = creep.room.find(FIND_SOURCES); //get all sources in the room
            if(allSources[0].energy != 0) { //if source 0 isn't empty
                if(creep.harvest(allSources[0]) == ERR_NOT_IN_RANGE) { //go mine it
                    creep.moveTo(allSources[0]); //and if we arne't in range, move to it
                }
            } else { //otherwise source 0 is empty
                if(creep.harvest(allSources[1]) == ERR_NOT_IN_RANGE) { //so go mine source 1
                    creep.moveTo(allSources[1]); //and if we aren't in range, move to it
                }
            }
            
            if(creep.carry.energy == creep.carryCapacity) { //if we are full on energy
                creep.memory.state = 'delivering'; //flip to delivering mode
            }
        }
        
        if(creep.memory.state == 'delivering') { //if we are in delivering mode
            var allStructures = Game.rooms[creep.memory.targetRoom].find(FIND_MY_STRUCTURES); //get all structures in the room
            var mySpawns = _.filter(allStructures, (structure) => structure.structureType == STRUCTURE_SPAWN && structure.energy < structure.energyCapacity); //filter out the spawns that need energy
            var myExtensions = _.filter(allStructures, (structure) => structure.structureType == STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity); //filter out the extensions that need energy
            
            if(mySpawns.length) { //if there is a valid spawn that needs energy
                if(creep.transfer(mySpawns[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { //go give it energy
                    creep.moveTo(mySpawns[0]); //and move it it if not in range
                }
            } else if(myExtensions.length) { //otherwise, if there is an extension that needs energy
                if(creep.transfer(myExtensions[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { //give it energy
                    creep.moveTo(myExtensions[0]); //and move to it if not in range
                }
            } else {
                creep.moveTo(Game.spawns['Sarum']);
            }
            
            if(creep.carry.energy == 0) { //if we are out of energy
                creep.memory.state = 'mining'; //flip to mining mode
            }
        }
    },
    
    colonyBuilderCode: function(creep) {
        if(creep.memory.state == undefined) { //if our state is undefined
            creep.memory.state = 'traveling'; //set it to traveling
        }
        
        var colonyRoom = creep.memory.targetRoom; //get the target room
        
        if(creep.memory.state == 'traveling') { //if we are in traveling mode
            if(creep.room.name != colonyRoom) { //and we aren't in the target room
                creep.moveTo(Game.flags[colonyRoom]); //move to the target room's flag
            } else { //otherwise, we are in the target room
                    creep.memory.state = 'mining'; //so switch to mining
            }
        }
        
        if(creep.memory.state == 'mining') { //if we are in mining mode
            let allSources = creep.room.find(FIND_SOURCES); //get all the sources in the room
            if(allSources[0].energy != 0) { //if source 0 is NOT empty
                if(creep.harvest(allSources[0]) == ERR_NOT_IN_RANGE) { //try and harvest it
                    creep.moveTo(allSources[0]); //and if we aren't in range, move to it
                }
            } else { //otherwise, source 0 is empty
                if(creep.harvest(allSources[1]) == ERR_NOT_IN_RANGE) { //so harvest from source 1
                    creep.moveTo(allSources[1]); //and if we aren't in range, move to it
                }
            }
            
            if(creep.carry.energy == creep.carryCapacity) { //if we are full of energy
                creep.memory.state = 'building'; //switch to building mode
            }
        }
        
        if(creep.memory.state == 'building') { //if we are in building mode
            var allConstructionSites = creep.room.find(FIND_CONSTRUCTION_SITES); //get all the construction sites in the room
            if(creep.build(allConstructionSites[0]) == ERR_NOT_IN_RANGE) { //and try to build one of them
                creep.moveTo(allConstructionSites[0]); //but if we aren't in range, move there
            }
            
            if(creep.carry.energy == 0) { //if we are out of energy
                creep.memory.state = 'mining'; //switch to mining mode
            }
        }
    },
    
    colonyUpgraderCode: function(creep) {
        if(creep.memory.state == undefined) { //if state is undefined
            creep.memory.state = 'traveling'; //set it to traveling
        }
        
        var colonyRoom = creep.memory.targetRoom; //get the target room
        
        //copy paste of traveling code
        if(creep.memory.state == 'traveling') {
            if(creep.room.name != colonyRoom) {
                creep.moveTo(Game.flags[colonyRoom]);
            } else {
                creep.memory.state = 'mining';
            }
        }
        
        //copy paste of mining code
        if(creep.memory.state == 'mining') {
            let allSources = creep.room.find(FIND_SOURCES);
            if(allSources[1].energy != 0) {
                if(creep.harvest(allSources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(allSources[1]);
                }
            } else {
                if(creep.harvest(allSources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(allSources[0]);
                }
            }
            
            if(creep.carry.energy == creep.carryCapacity) {
                creep.memory.state = 'upgrading';
            }
        }
        
        if(creep.memory.state == 'upgrading') { //if we are upgrading
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) { //try and upgrade the room controller
                creep.moveTo(creep.room.controller); //and if we arne't in range, move there
            }
            
            if(creep.carry.energy == 0) { //if we are out of energy
                creep.memory.state = 'mining'; //switch to mining mode
            }
        }
    },
    
    colonyClaimerCode: function(creep) {
        if(creep.memory.state == undefined) { //blah blah state undefined
            creep.memory.state = 'traveling'; //so go travel
        }
        
        var colonyRoom = creep.memory.targetRoom; //get room
        
        //copy paste of traveling code
        if(creep.memory.state = 'traveling') {
            if(creep.room.name != colonyRoom) {
                creep.moveTo(Game.flags[colonyRoom]);
            } else {
                creep.memory.state = 'claiming';
            }
        }
        
        if(creep.memory.state == 'claiming') { //if we are in claiming mode
            if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) { //try and claim the controller in the room
                creep.moveTo(creep.room.controller); //and if we aren't in range, move there
            }
            
            if(creep.room.controller.level == 1) { //if the controller's level is 1
                creep.memory.state = 'doneClaiming'; //that means we've claimed it, so switch to doneClaiming mode
            }
        }
        
        if(creep.memory.state == 'doneClaiming') { //if we are done claiming
            //if(Game.spawns['Sarum'].recycleCreep(creep) == ERR_NOT_IN_RANGE) { //try and recycle yourself so we can get your energy back
            //    creep.moveTo(Game.spawns['Sarum']); //and if we aren't in range, move there
            //}
        }
    }
}

module.exports = ProjectColony;
