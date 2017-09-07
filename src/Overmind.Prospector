//Welcome to Project Prospector. This project will encompass any creeps that must go into non-owned rooms to build or maintain anything

var Prospector = {
    coreLogic: function(creep) {
        
        if(creep.memory.role == 'remoteDrill') {
            module.exports.remoteDrill(creep);
        }
        if(creep.memory.role == 'remoteHauler') {
            module.exports.remoteHauler(creep);
        }
        if(creep.memory.role == 'reserver') {
            module.exports.reserver(creep);
        }
        if(creep.memory.role == 'remoteMiner') {
            module.exports.remoteMiner(creep);
        }
        if(creep.memory.role == 'remoteBuilder') {
            module.exports.remoteBuilder(creep);
        }
        if(creep.memory.role == 'remoteJanitor') {
            module.exports.remoteJanitor(creep);
        }
        
    },
    
    remoteDrill: function(creep) { //this is the logic for a remote drill
        //so, idealy we want to assign each drill to a source, but we should get it into the room first
        if(creep.memory.state == 'traveling') {
            if(creep.room.name != creep.memory.targetRoom) {
                creep.moveTo(Game.flags[creep.memory.targetRoom]);
            } else {
                creep.moveTo(Game.flags[creep.memory.targetRoom]);
                creep.memory.state = 'mining';
            }
        }
        
        if(creep.memory.state == 'mining') {
            //so here, the goal is to forever mine from a source that is not being mined by another drill
            //to do this, we must have a record somewhere of what drill is assigned to what
            
            //the simplest way to do this is to have each remote drill keep track of it's room and it's assigned source/container
            //the room is assigned when it's spawned...the source should be chosen once we are in the room
            
            //so, if a remote drill that is assigned a source exists, don't choose that source, get the next one
            if(creep.memory.targetSource == undefined || creep.memory.targetSource == 'none') { //if we don't have a target source set
                var sources = creep.room.find(FIND_SOURCES); //get a list of all sources in our room
                
                for(i = 0; i < sources.length; i++) { //for each source
                    var creepAssigned = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteDrill' && creep.memory.targetSource == sources[i].id); //try and find another drill that is assigned to that source
                    if(creepAssigned.length == 0) { //if there is no other creep assigned that source
                        creep.memory.targetSource = sources[i].id; //take it for ourselves
                    }
                }
            } //don't do an else here so that we go right into moving after we get a source. by now it shouldn't be undefined
            
            var targetSource = Game.getObjectById(creep.memory.targetSource);
            if(creep.harvest(targetSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetSource);
            }
        }
    },
    
    remoteHauler: function(creep) { //this is the logic for a remote hauler
        //so this guy needs to do round trips. it will be assigned a room and then it will pick a drill to partner with
        
        if(creep.memory.state == 'collecting') {
            if(creep.room.name != creep.memory.targetRoom) {
                creep.moveTo(Game.flags[creep.memory.targetRoom]);
            } else {
                var targetDroppedEnergy = Game.getObjectById(creep.memory.targetSource).pos.findInRange(FIND_DROPPED_ENERGY, 1);
                if(targetDroppedEnergy[0] != undefined) {
                    if(creep.pickup(targetDroppedEnergy[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targetDroppedEnergy[0]);
                    }
                }
            }
            
            if(creep.carry.energy == creep.carryCapacity) {
                creep.memory.state = 'delivering';
            }
        }
        
        if(creep.memory.state == 'delivering') {
            
            //here we will head back to the home room. We will need a homeroom assigned at spawn
            if(creep.room.name != creep.memory.homeRoom) {
                creep.moveTo(Game.flags[creep.memory.homeRoom]);
            } else {
                if(creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
                }
            }
            
            //as we are walking around with energy, if the road we are standing on needs repair, repair it
            var currentRoad = _.filter(creep.pos.lookFor(LOOK_STRUCTURES), (object) => object.structureType == STRUCTURE_ROAD);
            
            if(currentRoad[0] != undefined) {
                if(currentRoad[0].hits < currentRoad[0].hitsMax) {
                    creep.repair(currentRoad[0]);
                }
            }
            
            if(creep.carry.energy == 0) {
                creep.memory.state = 'collecting';
            }
        }
    },
    
    reserver: function(creep) {
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
    },
    
    remoteMiner: function(creep) {
        if(creep.memory.targetRoom == undefined || creep.memory.targetRoom == 'none' ||
           creep.memory.homeRoom == undefined || creep.memory.homeRoom == 'none') {
               creep.memory.targetRoom = 'none';
               creep.memory.homeRoom = 'none';
               console.log(creep.name, 'is missing internal variables.'); //if we are missing variables, say so and set them as none
        }
            
        if(creep.memory.state == 'remoteMining') { //if we are remoteMining
            if(creep.room.name != creep.memory.targetRoom) { //and we aren't in the target room
                //creep.say('Going');
                creep.moveTo(Game.flags[creep.memory.targetRoom]); //go to the target room's flag
            } else { //otherwise we ARE in the room
                //creep.say('Mining');
                //var targetEnergy = Game.getObjectById(creep.memory.targetSource); //so get our target energy source
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) { //and mine it
                    creep.moveTo(sources[0]); //and if not in range, move to it
                }
            }
            
            if(creep.carry.energy == creep.carryCapacity) { //if we are full of energy
                creep.memory.state = 'remoteDelivering'; //flip to delivering
            }
        }
        
        if(creep.memory.state == 'remoteDelivering') { //if we are delivering
            if(creep.room.name != creep.memory.homeRoom) { //and we aren't in the Home room
                //creep.say('Returning');
                creep.moveTo(Game.rooms[creep.memory.homeRoom].controller); //go to the home room's controller
                
            } else { //otherwise we ARE in the Home room
                //creep.say('Delivering');
                var roomSpawns = creep.room.find(FIND_STRUCTURES, { //get the spawns
                    filter: (structure) => { return (structure.structureType == STRUCTURE_SPAWN && structure.energy < structure.energyCapacity) }
                });
                
                var roomExtensions = creep.room.find(FIND_STRUCTURES, { //get the extensions
                    filter: (structure) => { return (structure.structureType == STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity) }
                });
                
                var roomStorage = creep.room.find(FIND_STRUCTURES, { //get the storages
                    filter: (structure) => { return (structure.structureType == STRUCTURE_STORAGE) }
                });
                
                if(roomStorage.length > 0) { //go drop off at storages first
                    if(creep.transfer(roomStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(roomStorage[0]);
                    }
                } else if(roomSpawns.length > 0) { //then spawns
                    if(creep.transfer(roomSpawns[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(roomSpawns[0]);
                    }
                } else if(roomExtensions.length > 0) { //then extensions
                    if(creep.transfer(roomExtensions[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(roomExtensions[0]);
                    }
                }
            }
            
            //as we are walking around with energy, if the road we are standing on needs repair, repair it
            var currentRoad = _.filter(creep.pos.lookFor(LOOK_STRUCTURES), (object) => object.structureType == STRUCTURE_ROAD);
            
            if(currentRoad[0] != undefined) {
                if(currentRoad[0].hits < currentRoad[0].hitsMax) {
                    creep.repair(currentRoad[0]);
                }
            }
            
            if(creep.carry.energy == 0) { //if we are out of energy, flip to remoteMining mode
                creep.memory.state = 'remoteMining';
            }
        }
    },
    
    remoteBuilder: function(creep) {
        
        var allConstructionSites = Game.rooms[creep.memory.homeRoom].find(FIND_MY_CONSTRUCTION_SITES);
        for(reservedRoomName in Memory.Overmind.OwnedRooms[ownedRoom].reservedRooms) {
            if(Game.rooms[reservedRoomName] != undefined) {
                allConstructionSites.concat(Game.rooms[reservedRoomName].find(FIND_MY_CONSTRUCTION_SITES));
            }
        }
        
        var homeStorage = Game.rooms[creep.memory.homeRoom].storage; //get a list of all the storages
        
        var numConstructionSites = allConstructionSites.length;
        
        if(numConstructionSites > 0) { //if there are construction sites
            creep.memory.state = 'active';
        } else { //if there are no construction sites
            creep.memory.state = 'inactive';
        }
        
        if(creep.memory.state == 'active') { //if we are active
            if(creep.carry.energy == 0) { //if we have no energy
                creep.memory.targetSite = 'none'; //reset the target construciton site incase there is a closer one later
                
                if(creep.room.name != creep.memory.homeRoom) {
                    creep.moveTo(Game.flags[creep.memory.homeRoom]);
                } else {
                    if(creep.withdraw(homeStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { //so get energy from it
                        creep.moveTo(homeStorage); //and move to it if not in range
                    }
                }
            } else { //otherwise we have at least some energy
                if(creep.memory.targetSite == undefined || creep.memory.targetSite == 'none') { //if we don't have a construction site picked out
                    var roomsWithConstructionSites = [];
                    for(id in Game.constructionSites) {
                        if(roomsWithConstructionSites.indexOf(Game.constructionSites[id].pos.roomName) == -1) {
                            roomsWithConstructionSites.push(Game.constructionSites[id].pos.roomName);
                        }
                    }
                    
                    if(creep.room.name != roomsWithConstructionSites[0]) {
                        creep.moveTo(Game.flags[roomsWithConstructionSites[0]]);
                    } else {
                        if(creep.pos.x == 0 || creep.pos.y == 0 || creep.pos.x == 49 || creep.pos.y == 49) {
                            creep.moveTo(Game.flags[roomsWithConstructionSites[0]]);
                        }
                        var temp = creep.pos.findClosestByPath(creep.room.find(FIND_MY_CONSTRUCTION_SITES), 'dijkstra');
                        if(temp != null) {
                            creep.memory.targetSite = temp.id; //get the ID of the nearest site
                        }
                    }
                    
                } else { //otherwise we have already selected a construction site
                    if(creep.build(Game.getObjectById(creep.memory.targetSite)) == ERR_NOT_IN_RANGE) { //so build it
                        creep.moveTo(Game.getObjectById(creep.memory.targetSite)); //and move to it if not in range
                    }
                    
                    if(Game.constructionSites[creep.memory.targetSite] == undefined) {
                        creep.memory.targetSite = 'none';
                    }
                }
            }
        } else if(creep.memory.state == 'inactive') { //if we are inactive
            if(Memory.Overmind.useRemoteBuildersAsFortifiers) {
                var targetRoomToFortify = Game.rooms[Memory.Overmind.remoteBuilderFortifyRoom];
                
                if(creep.room.name != targetRoomToFortify.name) {
                    creep.moveTo(Game.flags[targetRoomToFortify.name]);
                } else {
                    if(creep.carry.energy == 0) {
                        var roomStorage = _.filter(creep.room.find(FIND_MY_STRUCTURES), (structure) => structure.structureType == STRUCTURE_STORAGE);
                        
                        if(roomStorage.length) {
                            if(creep.withdraw(roomStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(roomStorage[0]);
                            }
                        }
                    } else {
                        var walls = _.filter(creep.room.find(FIND_STRUCTURES), (structure) => structure.structureType == STRUCTURE_WALL && structure.hits < 1000000);
                        var ramparts = _.filter(creep.room.find(FIND_STRUCTURES), (structure) => structure.structureType == STRUCTURE_RAMPART && structure.hits < 1000000);
                        
                        if(ramparts.length) {
                            if(creep.repair(ramparts[0]) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(ramparts[0]);
                            }
                        } else if(walls.length) {
                            if(creep.repair(walls[0]) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(walls[0]);
                            }
                        }
                    }
                }
                
            } else {
                if(creep.room.name != creep.memory.homeRoom) {
                    creep.moveTo(Game.flags[creep.memory.homeRoom]);
                } else {
                    if(creep.transfer(homeStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { //so get energy from it
                        creep.moveTo(homeStorage); //and move to it if not in range
                    }
                }
            }
            //when this ends, the storage we are closest to is the one we are next to, and it is already set, so we are primed to be active again
        }
    },
    
    remoteJanitor: function(creep) {
        if(creep.memory.state == undefined) {
            creep.memory.state = 'traveling';
        }
        
        if(creep.memory.state == 'traveling') {
            if(creep.memory.targetRoom != creep.room.name) {
                creep.moveTo(Game.flags[creep.memory.targetRoom]);
            } else {
                creep.memory.state = 'mining';
            }
        }
            
        if(creep.memory.state == 'mining') {
            var sources = creep.room.find(FIND_SOURCES);
            
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
            
            if(creep.carry.energy == creep.carryCapacity) {
                creep.memory.state = 'repairing';
            }
        }
        
        if(creep.memory.state == 'repairing') {
            if(creep.memory.repairTarget == undefined) {
                creep.memory.repairTarget = 'none';
            }
            
            var repairTargets = _.filter(creep.room.find(FIND_STRUCTURES), (structure) => structure.structureType == STRUCTURE_ROAD && structure.hits < structure.hitsMax);
            
            if(repairTargets.indexOf(Game.getObjectById(creep.memory.repairTarget)) == -1) {
                creep.memory.repairTarget = 'none';
            }
            
            if(creep.memory.repairTarget == 'none') {
                var temp = creep.pos.findClosestByPath(repairTargets, 'dijkstra');
                if(temp != undefined) {
                    creep.memory.repairTarget = temp.id;
                }
            }
            
            if(creep.repair(Game.getObjectById(creep.memory.repairTarget)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.repairTarget));
            }
            
            if(creep.carry.energy == 0) {
                creep.memory.state = 'mining';
            }
        }
    }
}

module.exports = Prospector;
