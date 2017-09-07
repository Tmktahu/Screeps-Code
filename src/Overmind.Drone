//Welcome to the Drone section of the Overmind Project. This code is the code that every basic drone runs. Military operations are dealt with elsewhere.
//Last updated by Fryke on 1/12/2017

var Drone = { //Declare the Drone variable.
    followOrders: function(creep) {
        //-----------------------------------------------HARVESTER LOGIC----------------------------------------------------
        //we are re-working the drill-mover system. It's too costly to make two creeps to do the job of one
        if(creep.memory.role == 'drill') {
            module.exports.drill(creep);
        }
        //-----------------------------------------------EMERGENCY MINER LOGIC----------------------------------------------------
        if(creep.memory.role == 'emergencyMiner') {
            module.exports.emergencyMiner(creep);
        }
        //-----------------------------------------------MINERAL MINER LOGIC----------------------------------------------------
        if(creep.memory.role == 'mineralMiner') {
            module.exports.mineralMiner(creep);
        }
        //-----------------------------------------------BUILDER LOGIC----------------------------------------------------
        if(creep.memory.role == 'builder') { //if we are a builder
            module.exports.builder(creep);
        }
        //-----------------------------------------------UPGRADER LOGIC----------------------------------------------------
        if(creep.memory.role == 'upgrader') {
            module.exports.upgrader(creep);
        }
        //-----------------------------------------------FUELER LOGIC----------------------------------------------------
        if(creep.memory.role == 'fueler') {
            module.exports.fueler(creep);
        }
        //-----------------------------------------------MOVER LOGIC----------------------------------------------------
        if(creep.memory.role == 'mover') {
            module.exports.mover(creep);
        }
        //-----------------------------------------------JANITOR LOGIC----------------------------------------------------
        if(creep.memory.role == 'janitor') {
            module.exports.janitor(creep); //then collect
        }
        //-----------------------------------------------FORTIFIER LOGIC----------------------------------------------------
        if(creep.memory.role == 'fortifier') {
            module.exports.fortifier(creep); //then collect
        }
        //-----------------------------------------------RESERVER LOGIC----------------------------------------------------
        if(creep.memory.role == 'reserver') {
            module.exports.reserve(creep);
        }
        //-----------------------------------------------RESERVER LOGIC----------------------------------------------------
        if(creep.memory.role == 'terminalManager') {
            module.exports.terminalManager(creep);
        }
        
        if(creep.memory.role == 'cleaner') {
            module.exports.cleaner(creep);
        }
    },
    
    drill: function(creep) {
        var assignedSource = Game.getObjectById(creep.memory.assignedSource); //get our assigned source
        
        if(creep.harvest(assignedSource) == ERR_NOT_IN_RANGE) { //harvest it
            creep.moveTo(assignedSource); //and if we aren't in range, move to it
        } else {
            var myLink = creep.pos.findInRange(creep.room.find(FIND_MY_STRUCTURES), 1, {
                filter: { structureType: STRUCTURE_LINK }
            }); //FIND THE ADJACENT LINK
            
            if(myLink[0] == undefined) { //if there is not a link nearby
                creep.drop(RESOURCE_ENERGY); //drop the energy into the container
            } else { //otherwise there is a link we can use
                if(creep.transfer(myLink[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { //put the energy in the link
                    creep.moveTo(myLink[0]);
                }
            }
        }
    },
    
    mover: function(creep) {
        var partnerDrill = Game.creeps[creep.memory.partnerDrillName];
        
        if(partnerDrill != undefined && partnerDrill.memory.role != 'drill') {
            creep.memory.partnerDrillName = 'none';
        }
        
        if(creep.memory.state == undefined) {
            creep.memory.state = 'collecting';
        }
        
        if(creep.memory.partnerDrillName == undefined || partnerDrill == undefined) {
            creep.memory.partnerDrillName = 'none';
        }
        
        if(partnerDrill != undefined) {
            var links = _.filter(creep.room.find(FIND_MY_STRUCTURES), (structure) => structure.structureType == STRUCTURE_LINK);
            for(var k = 0; k < links.length; k++) {
                var isNextToLink = partnerDrill.pos.isNearTo(links[k].pos);
                if(isNextToLink) {
                    creep.memory.partnerDrillName = 'none';
                    break;
                }
            }
        }
        
        if(creep.memory.state == 'collecting') {
            if(creep.memory.partnerDrillName == 'none') {
                //look for containers with a drill on them. if a mover isn't assigned, assign here
                var roomContainers = _.filter(creep.room.find(FIND_STRUCTURES), (structure) => structure.structureType == STRUCTURE_CONTAINER);
                
                for(var i = 0; i < roomContainers.length; i++) {
                    var creepAtContainer = creep.room.lookForAt(LOOK_CREEPS, roomContainers[i].pos);
                    
                    if(creepAtContainer[0] != undefined) {
                    if(creepAtContainer[0].memory.role == 'drill') {
                        var creepAssigned = _.filter(creep.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'mover' && creep.memory.partnerDrillName == creepAtContainer[0].name);
                        
                        if(creepAssigned.length == 0) {
                            creep.memory.partnerDrillName = creepAtContainer[0].name;
                            break;
                        }
                    }
                    }
                }
                
                
            } else if(partnerDrill == undefined) {
                //console.log(creep.name, 'partner doesnt exist');
            } else {
                var targetContainer = _.filter(creep.room.lookForAt(LOOK_STRUCTURES, partnerDrill.pos), (structure) => structure.structureType == STRUCTURE_CONTAINER);
                var droppedEnergy = creep.room.lookForAt(LOOK_RESOURCES, partnerDrill.pos);
                
                if(targetContainer[0] != undefined) { //if there is a container, then the drill is at the right position
                    if(targetContainer[0].store[RESOURCE_ENERGY] == targetContainer[0].storeCapacity) { //if the container is full
                        if(creep.withdraw(targetContainer[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targetContainer[0]); //get a load out of it
                        }
                    } else if(droppedEnergy[0] != undefined) { //if there is dropped energy
                        if(creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(droppedEnergy[0]); //grab some of it
                        }
                    } else {
                        if(creep.withdraw(targetContainer[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targetContainer[0]); //otherwise just get out of the container
                        }
                    }
                }
            }

            if(creep.carry.energy == creep.carryCapacity) {
                creep.memory.state = 'delivering';
            }
        }
        
        if(creep.memory.state == 'delivering') {
            
            //delivering code goes here
            //put it in storage
            var roomStorage = _.filter(creep.room.find(FIND_MY_STRUCTURES), (structure) => structure.structureType == STRUCTURE_STORAGE);
            var upgraderLink = Game.structures[Memory.Overmind.OwnedRooms[creep.room.name].upgraderLink];
            
            if(creep.transfer(upgraderLink, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(upgraderLink);
            }
            
            if(creep.carry.energy == 0) {
                creep.memory.state = 'collecting';
            }
        }
    },
    
    fueler: function(creep) {
        //the fueler is responsible for taking energy from storage and putting it in extensions, and THEN the spawn
        
        if(creep.memory.state == undefined) {
            creep.memory.state = 'collecting';
        }
        
        if(creep.memory.state == 'collecting') {
            
            var targetStorage = _.filter(creep.room.find(FIND_MY_STRUCTURES), (structure) => structure.structureType == STRUCTURE_STORAGE);
            
            if(targetStorage != undefined) { //if there is a container, then the drill is at the right position
                if(creep.withdraw(targetStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetStorage[0]); //otherwise just get out of the container
                }
            }
            
            if(creep.carry.energy == creep.carryCapacity) {
                creep.memory.state = 'delivering';
            }
        }
        
        if(creep.memory.state == 'delivering') {
            
            //delivering code goes here
            //put it in storage
            var roomExtensions = _.filter(creep.room.find(FIND_MY_STRUCTURES),
                (structure) => structure.structureType == STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity);
            var roomSpawns = _.filter(creep.room.find(FIND_MY_STRUCTURES),
                (structure) => structure.structureType == STRUCTURE_SPAWN && structure.energy < structure.energyCapacity);
            var allTargets = roomExtensions.concat(roomSpawns);
            
            if(allTargets.length) {
                let targetStructure = creep.pos.findClosestByPath(allTargets, 'dijkstra');
                if(creep.transfer(targetStructure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetStructure);
                }
            } else {
                creep.moveTo(Game.flags[creep.room.name+'idle']);
            }
            
            if(creep.carry.energy == 0) {
                creep.memory.state = 'collecting';
            }
        }
    },
    
    fortifier: function(creep) {
        //this dude will fill up turrets and repair walls and ramparts
        //gets his energy from storage
        //fills turrets first up to like 700 so there is a buffer, then goes and does repair work
            //so he will need a WORK piece
        
        if(creep.memory.state == undefined) {
            creep.memory.state = 'collecting';
        }
        
        if(creep.memory.state == 'collecting') {
            
            var targetStorage = _.filter(creep.room.find(FIND_MY_STRUCTURES), (structure) => structure.structureType == STRUCTURE_STORAGE);
            
            if(targetStorage != undefined) { //if there is a container, then the drill is at the right position
                if(creep.withdraw(targetStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetStorage[0]); //otherwise just get out of the container
                }
            }
            
            if(creep.carry.energy == creep.carryCapacity) {
                creep.memory.state = 'delivering';
            }
        }
        
        if(creep.memory.state == 'delivering') {
            
            //delivering code goes here
            //put it in storage
            var roomTowers = _.filter(creep.room.find(FIND_MY_STRUCTURES),
                (structure) => structure.structureType == STRUCTURE_TOWER && structure.energy < 700);
            var roomWallsAndRamparts = _.filter(creep.room.find(FIND_STRUCTURES),
                (structure) => (structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART)
                    && structure.hits < 1000000);
            
            if(roomTowers.length) {
                if(creep.transfer(roomTowers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(roomTowers[0]);
                }
            } else if(roomWallsAndRamparts.length) {
                if(creep.repair(roomWallsAndRamparts[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(roomWallsAndRamparts[0]);
                }
            } else {
                creep.moveTo(Game.flags[creep.room.name+'idle']);
            }
            
            if(creep.carry.energy == 0) {
                creep.memory.state = 'collecting';
            }
        }
    },
    
    mineralMiner: function(creep) {
        if(creep.memory.state == undefined) {
            creep.memory.state = 'mining';
        }
        
        var mineral = creep.room.find(FIND_MINERALS);
        var typeOfMineral = mineral[0].mineralType;
        
        if(creep.memory.state == 'mining') {
            if(creep.harvest(mineral[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(mineral[0]);
            }
            
            if(_.sum(creep.carry) == creep.carryCapacity) {
                creep.memory.state = 'delivering';
            }
        }
        
        if(creep.memory.state == 'delivering') {
            if(creep.transfer(creep.room.terminal, typeOfMineral) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.terminal);
            }
            
            if(_.sum(creep.carry) == 0) {
                creep.memory.state = 'mining';
            }
        }
    },
    
    emergencyMiner: function(creep) {
        if(creep.memory.state == undefined) {
            creep.memory.state = 'mining';
        }
        
        if(creep.memory.state == 'mining') {
            var sources = _.filter(creep.room.find(FIND_SOURCES), (source) => source.energy != 0);
            
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
            
            if(creep.carry.energy == creep.carryCapacity) {
                creep.memory.state = 'delivering';
            }
        }
        
        if(creep.memory.state == 'delivering') {
            var roomSpawns = creep.room.find(FIND_STRUCTURES, { //find all spawns that aren't full of energy
                filter: (structure) => { return (structure.structureType == STRUCTURE_SPAWN && structure.energy < structure.energyCapacity) }
            });
            
            var roomExtensions = creep.room.find(FIND_STRUCTURES, { //find all extensions that aren't full of energy
                filter: (structure) => { return (structure.structureType == STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity) }
            });
            
            if(roomSpawns.length) {
                if(creep.transfer(roomSpawns[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(roomSpawns[0]);
                }
            } else if(roomExtensions.length) {
                let targetExtension = creep.pos.findClosestByPath(roomExtensions, 'dijkstra');
                if(creep.transfer(targetExtension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { //give it energy
                    creep.moveTo(targetExtension); //and if we arne't in range, move to it
                }
            }
            
            if(creep.carry.energy == 0) {
                creep.memory.state = 'mining';
            }
        }
    },
    
    builder: function(creep) {
        if(creep.memory.state == undefined) {
            creep.memory.state = 'collecting';
        }
        
        if(creep.memory.state == 'collecting') {
            var targetStorage = _.filter(creep.room.find(FIND_MY_STRUCTURES), (structure) => structure.structureType == STRUCTURE_STORAGE);
            
            if(targetStorage.length) { //if there is a storage, then the drill is at the right position
                if(creep.withdraw(targetStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetStorage[0]); //otherwise just get out of the container
                }
            }
            
            if(creep.carry.energy == creep.carryCapacity) {
                
                creep.memory.state = 'building';
            }
        }
        
        if(creep.memory.state == 'building') {
            var buildingTargets = creep.room.find(FIND_CONSTRUCTION_SITES); //get all the construction sites
            
            if(buildingTargets.length) { //if there are building targets
                var specificTarget = creep.pos.findClosestByPath(buildingTargets);
                if(creep.build(specificTarget) == ERR_NOT_IN_RANGE) { //build one of them
                    creep.moveTo(specificTarget); //and if we aren't in range, move there
                }
            }
            
            if(creep.carry.energy == 0) { //when we run out of energy
                creep.memory.state = 'collecting'
            }
            
            if(buildingTargets.length == 0 && creep.carry.energy != 0) { //if there are no building targets and we still have energy left over
                creep.memory.state = 'idle';
            }
        }
    }, //functional, needs to be structure independant
    
    upgrader: function(creep) {
        
        var myLink = Game.getObjectById(Memory.Overmind.OwnedRooms[creep.room.name].upgraderLink);
        //var myLink = creep.pos.findInRange(creep.room.find(FIND_MY_STRUCTURES), 1, {
        //    filter: { structureType: STRUCTURE_LINK }
        //}); //FIND THE ADJACENT LINK
        var myStorage = creep.room.storage;
        

        
        if(myLink != undefined && myLink.energy > 50) {
            if(creep.withdraw(myLink, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(myLink);
            }
        } else {
            if(creep.withdraw(myStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(myStorage);
            }
        }
        
        if(myStorage != undefined) {
            if(creep.transfer(myStorage, RESOURCE_ENERGY, 42) == ERR_NOT_IN_RANGE) {
                creep.moveTo(myStorage);
            }
        }
        
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) { //upgrade the controller
            creep.moveTo(creep.room.controller); //and if we aren't in range, move to it
        }

    }, //functional, needs to be structure independant
    
    reserve: function(creep) {
        //this is a reserver that has a variable in it's memory that is the destination room
        
        if(typeof(creep.memory.targetRoom) === 'undefined') { //create the variable
            creep.memory.designatedRoom = 'needsTarget'; //set it as no target, cause we'll do that manually for now
        }
        
        if(creep.memory.targetRoom == 'needsTarget') { //if we don't have a target
            creep.say('Need Target'); //say something
            
        } else if(creep.room.name != creep.memory.targetRoom) { //if we aren't in the target room
            creep.moveTo(Game.flags[creep.memory.targetRoom]); //move to the target room's flag
            
        } else { //otherwise, we are in the right room
            if(creep.reserveController(Game.rooms[creep.memory.targetRoom].controller) == ERR_NOT_IN_RANGE) { //so try and claim the controller
                creep.moveTo(creep.room.controller); //if we aren't in range, move there
            }
        }
    }, //functional
    
    terminalManager: function(creep) {
        var energyType = RESOURCE_ENERGY;
        
        if(creep.memory.state == 'collecting') {
            if(creep.withdraw(creep.room.terminal, energyType) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.terminal);
            }
            
            if(creep.carry.energy == creep.carryCapacity) {
                creep.memory.state = 'delivering';
            }
        }
        
        if(creep.memory.state == 'delivering') {
            if(creep.transfer(creep.room.storage, energyType) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage);
            }
            
            if(creep.carry.energy == 0) {
                creep.memory.state = 'collecting';
            }
        }
    }, //funky base code. Will prolly be moved to a market managing module
    
    cleaner: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var droppedEnergy = creep.room.find(FIND_DROPPED_ENERGY);
            if(creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(droppedEnergy[0]);
            }
        } else {
            var roomStorage = creep.room.storage;
            if(creep.transfer(roomStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(roomStorage);
            }
        }
    }
}

module.exports = Drone;
